import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cek session saat load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen perubahan auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('member_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (!error && data) {
      setProfile(data)
    }
  }

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  }

  const register = async (email, password, name, phone = '') => {
    // 1. Register user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: 'member' }
      }
    })
    if (error) throw error

    if (data.user) {
      // 2. Buat customer
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert({
          name: name,
          email: email,
          phone: phone,
          loyalty: 'Bronze'
        })
        .select()
        .single()

      if (customerError) throw customerError

      // 3. Buat member_profiles
      const { error: profileError } = await supabase
        .from('member_profiles')
        .insert({
          user_id: data.user.id,
          customer_id: customer.id,
          total_points: 0,
          tier: 'bronze',
          tier_discount: 0
        })

      if (profileError) throw profileError
    }
    return data
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  const value = {
    user,
    profile,
    login,
    register,
    logout,
    loading,
    fetchProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}