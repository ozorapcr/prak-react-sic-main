import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    totalProducts: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Total orders
      const { count: orders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      // Total customers
      const { count: customers } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })

      // Total revenue
      const { data: revenueData } = await supabase
        .from('orders')
        .select('final_amount')
        .eq('status', 'completed')

      const totalRevenue = revenueData?.reduce((sum, item) => sum + (item.final_amount || 0), 0) || 0

      // Total products
      const { count: products } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      setStats({
        totalOrders: orders || 0,
        totalCustomers: customers || 0,
        totalRevenue: totalRevenue,
        totalProducts: products || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-10">Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500">Total Customers</p>
          <p className="text-3xl font-bold">{stats.totalCustomers}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold">Rp {stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500">Total Products</p>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>
      </div>
    </div>
  )
}