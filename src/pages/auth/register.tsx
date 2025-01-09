import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import AuthLayout from '@/components/layouts/AuthLayout'
import { toast } from 'react-toastify'

type RegisterForm = {
  email: string
  password: string
  confirmPassword: string
  role: 'secretary' | 'mechanic'
  fullName: string
  parts_supplies: string
}

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>()
  const password = watch('password')

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true)

      // Vérifier si l'utilisateur est admin
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error('Vous devez être connecté en tant qu\'administrateur')
        router.push('/auth/login')
        return
      }

      const { data: currentUser } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (currentUser?.role !== 'admin') {
        toast.error('Accès non autorisé')
        router.push('/')
        return
      }

      // Créer le nouvel utilisateur
      const { error: signUpError, data: authData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (signUpError) throw signUpError

      // Ajouter les informations supplémentaires dans la table users
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user?.id,
            email: data.email,
            full_name: data.fullName,
            role: data.role,
            parts_supplies: data.parts_supplies,
          }
        ])

      if (profileError) throw profileError

      toast.success('Utilisateur créé avec succès!')
      router.push('/admin/dashboard')
    } catch (error) {
      toast.error('Erreur lors de la création du compte')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Créer un nouveau compte">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Nom complet
          </label>
          <div className="mt-1">
            <input
              id="fullName"
              type="text"
              {...register('fullName', { required: 'Nom complet requis' })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Adresse email
          </label>
          <div className="mt-1">
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide'
                }
              })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Rôle
          </label>
          <div className="mt-1">
            <select
              id="role"
              {...register('role', { required: 'Rôle requis' })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="secretary">Secrétaire</option>
              <option value="mechanic">Mécanicien</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="parts_supplies" className="block text-sm font-medium text-gray-700">
            Pièces et fournitures
          </label>
          <div className="mt-1">
            <input
              id="parts_supplies"
              type="text"
              {...register('parts_supplies', { required: 'Pièces et fournitures requises' })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.parts_supplies && (
              <p className="mt-1 text-sm text-red-600">{errors.parts_supplies.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div className="mt-1">
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Mot de passe requis',
                minLength: {
                  value: 8,
                  message: 'Le mot de passe doit contenir au moins 8 caractères'
                }
              })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmer le mot de passe
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Veuillez confirmer le mot de passe',
                validate: value => value === password || 'Les mots de passe ne correspondent pas'
              })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Création...' : 'Créer le compte'}
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
