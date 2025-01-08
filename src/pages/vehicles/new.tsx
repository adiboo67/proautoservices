import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-toastify'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import PhotoUpload from '@/components/secretary/PhotoUpload'

export default function NewVehicle() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<string[]>(['', '', '', ''])
  const router = useRouter()
  const { client_name, phone, brand_model, work_type, entry_date } = router.query

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      client_name: client_name as string || '',
      phone: phone as string || '',
      brand_model: brand_model as string || '',
      work_type: work_type as string || '',
      entry_date: entry_date as string || new Date().toISOString().split('T')[0],
      status: 'En attente'
    }
  })

  const handlePhotoChange = (index: number, url: string) => {
    const newPhotos = [...photos]
    newPhotos[index] = url
    setPhotos(newPhotos)
  }

  const handlePhotoDelete = (index: number) => {
    const newPhotos = [...photos]
    newPhotos[index] = ''
    setPhotos(newPhotos)
  }

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)

      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error("Non authentifié")

      const vehicleData = {
        ...data,
        photos: photos.filter(Boolean),
        created_by: userData.user.id,
        updated_by: userData.user.id
      }

      const { error } = await supabase
        .from('vehicles')
        .insert([vehicleData])

      if (error) throw error

      toast.success('Véhicule créé avec succès')
      router.push('/vehicles')
    } catch (error) {
      console.error('Error creating vehicle:', error)
      toast.error('Erreur lors de la création du véhicule')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={['secretary']}>
      <DashboardLayout title="Nouveau véhicule">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Nouveau véhicule</h1>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">
                      Nom du client
                    </label>
                    <input
                      type="text"
                      id="client_name"
                      {...register('client_name', { required: true })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.client_name && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone', { required: true })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.phone && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                  </div>

                  <div>
                    <label htmlFor="brand_model" className="block text-sm font-medium text-gray-700">
                      Marque et modèle
                    </label>
                    <input
                      type="text"
                      id="brand_model"
                      {...register('brand_model', { required: true })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.brand_model && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                  </div>

                  <div>
                    <label htmlFor="work_type" className="block text-sm font-medium text-gray-700">
                      Type de travail
                    </label>
                    <select
                      id="work_type"
                      {...register('work_type', { required: true })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="Vidange">Vidange</option>
                      <option value="Réparation">Réparation</option>
                      <option value="Dépannage">Dépannage</option>
                      <option value="Diagnostic">Diagnostic</option>
                      <option value="Entretien">Entretien</option>
                      <option value="Autres">Autres</option>
                    </select>
                    {errors.work_type && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                  </div>

                  <div>
                    <label htmlFor="entry_date" className="block text-sm font-medium text-gray-700">
                      Date d'entrée
                    </label>
                    <input
                      type="date"
                      id="entry_date"
                      {...register('entry_date', { required: true })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.entry_date && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Statut
                    </label>
                    <select
                      id="status"
                      {...register('status', { required: true })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="En attente">En attente</option>
                      <option value="En cours">En cours</option>
                      <option value="Terminé">Terminé</option>
                    </select>
                    {errors.status && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Photos du véhicule</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <PhotoUpload
                        key={index}
                        index={index}
                        imageUrl={photo}
                        onUpload={(url) => handlePhotoChange(index, url)}
                        onDelete={() => handlePhotoDelete(index)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => router.push('/vehicles')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {loading ? 'Création...' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
