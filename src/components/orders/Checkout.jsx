import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { getTier, calculateDiscount, calculatePoints } from '../../utils/tierCalculator'

export function Checkout({ cartItems = [], totalAmount = 0, onSuccess }) {
  const { user, profile, fetchProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const tier = getTier(profile?.total_points || 0)
  const discountAmount = calculateDiscount(totalAmount, tier.discount)
  const finalAmount = totalAmount - discountAmount
  const pointsEarned = calculatePoints(finalAmount)

  const handleCheckout = async () => {
    if (!user) {
      setError('Silakan login terlebih dahulu')
      return
    }

    if (cartItems.length === 0) {
      setError('Keranjang belanja kosong')
      return
    }

    setLoading(true)
    setError('')

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
        .single()

      if (orderError) throw orderError

      // 2. Buat order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity || 1,
        price_at_time: item.price,
        subtotal: (item.price || 0) * (item.quantity || 1)
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // 3. Update poin member
      const newTotalPoints = (profile?.total_points || 0) + pointsEarned
      const newTier = getTier(newTotalPoints)

      const { error: updateError } = await supabase
        .from('member_profiles')
        .update({
          total_points: newTotalPoints,
          tier: newTier.label.toLowerCase(),
          tier_discount: newTier.discount
        })
        .eq('user_id', user.id)

      if (updateError) throw updateError

      // 4. Refresh profile
      await fetchProfile(user.id)

      alert(`✅ Transaksi berhasil!\n\nPoin didapat: ${pointsEarned}\nTotal poin: ${newTotalPoints}\nTier: ${newTier.icon} ${newTier.label}`)

      if (onSuccess) onSuccess()

    } catch (err) {
      setError(err.message)
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Silakan login untuk melakukan checkout</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">🛒 Checkout</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          ❌ {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Items */}
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Daftar Pesanan</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Keranjang kosong</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <span>{item.name} × {item.quantity || 1}</span>
                <span>Rp {((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="space-y-2">
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
          className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Memproses...' : '💳 Bayar Sekarang'}
        </button>
      </div>
    </div>
  )
}