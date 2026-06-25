import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { getTier, calculateDiscount, calculatePoints } from '../utils/tierCalculator';

export default function Checkout() {
  const { user, profile, fetchProfile } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Ambil data dari localStorage atau state
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const tier = getTier(profile?.total_points || 0);
  const discountAmount = calculateDiscount(totalAmount, tier.discount);
  const finalAmount = totalAmount - discountAmount;
  const pointsEarned = calculatePoints(finalAmount);

  const handleCheckout = async () => {
    if (!user) {
      setError('Silakan login terlebih dahulu');
      return;
    }

    if (cartItems.length === 0) {
      setError('Keranjang belanja kosong');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Buat order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: user.id,
          total_amount: totalAmount,
          discount_amount: discountAmount,
          final_amount: finalAmount,
          points_earned: pointsEarned,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Buat order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity || 1,
        price_at_time: item.price,
        subtotal: (item.price || 0) * (item.quantity || 1)
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Update poin member
      const newTotalPoints = (profile?.total_points || 0) + pointsEarned;
      const newTier = getTier(newTotalPoints);

      const { error: updateError } = await supabase
        .from('member_profiles')
        .update({
          total_points: newTotalPoints,
          tier: newTier.label.toLowerCase(),
          tier_discount: newTier.discount
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // 4. Refresh profile
      await fetchProfile(user.id);

      // 5. Clear cart
      localStorage.removeItem('cart');
      setCartItems([]);

      setSuccess(true);
      alert(`✅ Transaksi berhasil!\n\nPoin didapat: ${pointsEarned}\nTotal poin: ${newTotalPoints}\nTier: ${newTier.icon} ${newTier.label}`);

    } catch (err) {
      setError(err.message);
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Silakan login untuk melakukan checkout</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="p-6 text-center">
        <div className="bg-green-100 text-green-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">🎉 Transaksi Berhasil!</h2>
          <p>Terima kasih sudah berbelanja di Sedap!</p>
          <button 
            onClick={() => window.location.href = '/products'}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Lanjut Belanja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Checkout</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          ❌ {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Items */}
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Daftar Pesanan</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Keranjang kosong</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <span>{item.name} × {item.quantity || 1}</span>
                <div>
                  <span className="mr-4">Rp {((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                  <button 
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span>Total Belanja</span>
            <span>Rp {totalAmount.toLocaleString()}</span>
          </div>
          
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Diskon {tier.icon} {tier.label} ({tier.discount}%)</span>
              <span>-Rp {discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total Bayar</span>
            <span>Rp {finalAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-blue-600">
            <span>Poin yang didapat</span>
            <span>{pointsEarned} poin</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || cartItems.length === 0}
          className="w-full mt-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Memproses...' : '💳 Bayar Sekarang'}
        </button>
      </div>
    </div>
  );
}