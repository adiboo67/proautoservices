import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Créer un utilisateur admin
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'admin@proautoservices.com',
      password: 'admin123456'
    })

    if (authError) throw authError

    // Ajouter les informations dans la table users
    const { error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user?.id,
          email: 'admin@proautoservices.com',
          full_name: 'Administrateur',
          role: 'admin'
        }
      ])

    if (userError) throw userError

    res.status(200).json({ message: 'Admin user created successfully' })
  } catch (error) {
    console.error('Error creating admin:', error)
    res.status(500).json({ message: 'Error creating admin user', error })
  }
}
