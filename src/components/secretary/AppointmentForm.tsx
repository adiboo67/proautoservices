import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

interface AppointmentFormProps {
  appointment?: any
  selectedDate?: Date | null
  onClose: () => void
  onSuccess: () => void
  onDelete: (id: string) => void
}

const SERVICES = [
  'Vidange',
  'Réparation',
  'Dépannage',
  'Diagnostic',
  'Pneumatique',
  'Climatisation',
  'Autres'
]

export default function AppointmentForm({ appointment, selectedDate, onClose, onSuccess, onDelete }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: appointment ? {
      client_name: appointment.client_name,
      phone: appointment.phone,
      vehicle: appointment.vehicle,
      service: appointment.service,
      start: appointment.start.split('T')[0],
      time: appointment.start.split('T')[1].substring(0, 5),
      notes: appointment.notes
    } : {
      start: selectedDate?.toISOString().split('T')[0],
      service: 'Vidange'
    }
  })
  const router = useRouter()

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)

      // Ajouter l'heure à la date
      const startDateTime = new Date(data.start + 'T' + data.time)
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // +1 heure

      // Préparer les données selon le schéma de la table
      const appointmentData = {
        client_name: data.client_name,
        phone: data.phone,
        vehicle: data.vehicle,
        service: data.service,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        notes: data.notes || null
      }

      if (appointment?.id) {
        // Update
        const { error } = await supabase
          .from('appointments')
          .update(appointmentData)
          .eq('id', appointment.id)

        if (error) throw error
        toast.success('Rendez-vous mis à jour avec succès')
      } else {
        // Create
        const { error } = await supabase
          .from('appointments')
          .insert([appointmentData])

        if (error) throw error
        toast.success('Rendez-vous créé avec succès')
      }

      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Error saving appointment:', error)
      toast.error(error.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {appointment ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Fermer</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">Nom du client</label>
            <input
              id="client_name"
              type="text"
              {...register('client_name', { required: 'Ce champ est requis' })}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
            />
            {errors.client_name && (
              <p className="mt-1 text-sm text-red-600">{String(errors.client_name.message || '')}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              id="phone"
              type="tel"
              {...register('phone', {
                required: 'Ce champ est requis',
                pattern: {
                  value: /^[0-9+\s-]+$/,
                  message: 'Numéro de téléphone invalide'
                }
              })}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{String(errors.phone.message || '')}</p>
            )}
          </div>

          <div>
            <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Véhicule</label>
            <input
              id="vehicle"
              type="text"
              {...register('vehicle', { required: 'Ce champ est requis' })}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
            />
            {errors.vehicle && (
              <p className="mt-1 text-sm text-red-600">{String(errors.vehicle.message || '')}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="start" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                id="start"
                type="date"
                {...register('start', { required: 'Ce champ est requis' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
              />
              {errors.start && (
                <p className="mt-1 text-sm text-red-600">{String(errors.start.message || '')}</p>
              )}
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Heure</label>
              <input
                id="time"
                type="time"
                {...register('time', { required: 'Ce champ est requis' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{String(errors.time.message || '')}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
            <select
              id="service"
              {...register('service', { required: 'Ce champ est requis' })}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
            >
              {SERVICES.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1 text-sm text-red-600">{String(errors.service.message || '')}</p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={3}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
            />
          </div>

          <div className="flex justify-end space-x-3">
            {appointment && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    router.push({
                      pathname: '/vehicles/new',
                      query: {
                        client_name: appointment.client_name,
                        phone: appointment.phone,
                        brand_model: appointment.vehicle,
                        work_type: appointment.service,
                        entry_date: new Date(appointment.start).toISOString().split('T')[0]
                      }
                    })
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Créer une fiche
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
                      onDelete(appointment.id)
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Supprimer
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Enregistrement...' : appointment ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
