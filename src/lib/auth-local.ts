import { supabase } from './supabase'

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  return { success: true }
}

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

export const getUser = async () => {
  const session = await getSession()
  if (!session) return null
  
  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single()
    
  if (error) throw error
  return userData
}

export const getUserRole = async () => {
  const user = await getUser()
  return user?.role || null
}
