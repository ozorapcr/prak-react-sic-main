import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { getTier, getNextTier, calculateProgress } from '../../utils/tierCalculator'

export function MemberDashboard() {
  const { user, profile } = useAuth()
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (!profile) return <div className="text-center py-10">Profile tidak ditemukan</div>

  const tier = getTier(profile.total_points)
  const nextTier = getNextTier(profile.total_points)
  const progress = calculateProgress(profile.total_points)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🏠 Dashboard Member</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Poin</p>
              <p className="text-3xl font-bold">{profile.total_points}</p>
            </div>
            <span className="text-4xl">⭐</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Tier</p>
              <p className="text-3xl font-bold">
                {tier.icon} {tier.label}
              </p>
              <p className="text-sm text-green-600">{tier.discount}% diskon</p>
            </div>
            <span className="text-4xl">🏅</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Transaksi</p>
              <p className="text-3xl font-bold">{recentOrders.length}</p>
            </div>
            <span className="text-4xl">📦</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      {nextTier && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="font-semibold mb-2">
            Progress ke {nextTier.icon} {nextTier.label}
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-red-600 h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {profile.total_points.toLocaleString()} / {nextTier.minPoints.toLocaleString()} poin
            ({progress}%)
          </p>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">📋 Aktivitas Terakhir</h2>
        {recentOrders.length === 0 ? (
          <p className="text-gray-500">Belum ada transaksi</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="border-b pb-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">
                      Pesanan #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rp {order.final_amount?.toLocaleString() || 0}</p>
                    <p className="text-sm text-blue-600">+{order.points_earned || 0} poin</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}