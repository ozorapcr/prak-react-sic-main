import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name')
      
      if (!error) setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-10">Loading...</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🍽️ Produk</h1>
        {user?.user_metadata?.role === 'admin' && (
          <Link 
            to="/products/add"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            + Tambah Menu
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {product.image_url && (
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-red-600 font-bold text-lg">
                  Rp {product.price?.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">Stok: {product.stock}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link 
                  to={`/products/${product.id}`}
                  className="flex-1 text-center bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
                >
                  Detail
                </Link>
                {user && user.user_metadata?.role === 'member' && (
                  <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">
                    Beli
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 py-10">Belum ada produk</p>
      )}
    </div>
  )
}