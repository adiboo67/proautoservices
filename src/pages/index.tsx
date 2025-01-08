import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth/login')
        return
      }

      // Récupérer le rôle de l'utilisateur
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Error fetching user data:', error)
        router.push('/auth/login')
        return
      }

      if (!userData) {
        console.error('No user data found')
        router.push('/auth/login')
        return
      }

      // Rediriger vers le bon dashboard
      switch (userData.role) {
        case 'admin':
          router.push('/admin/dashboard')
          break
        case 'secretary':
          router.push('/secretary/dashboard')
          break
        case 'mechanic':
          router.push('/mechanic/dashboard')
          break
        default:
          router.push('/auth/login')
      }
    } catch (error) {
      console.error('Error in checkUser:', error)
      router.push('/auth/login')
    }
  }

  return (
    <Layout title="Accueil - ProAutoServices">
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Chargement...</h2>
        </div>
      </div>
    </Layout>
  )
}
