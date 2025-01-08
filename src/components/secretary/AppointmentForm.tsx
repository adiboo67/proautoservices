import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-toastify'

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
  'Entretien',
  'Autres'
]

export default function AppointmentForm({ appointment, selectedDate, onClose, onSuccess, onDelete }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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

      if (appointment) {
        // Update
        const { error } = await supabase
          .from('appointments')
          .update(appointmentData)
          .eq('id', appointment.id)

        if (error) throw error
      } else {
        // Create
        const { error } = await supabase
          .from('appointments')
          .insert([appointmentData])

        if (error) throw error
      }

      toast.success(appointment ? 'Rendez-vous modifié' : 'Rendez-vous créé')
      onSuccess()
    } catch (error) {
      console.error('Error saving appointment:', error)
      toast.error('Erreur lors de l\'enregistrement du rendez-vous')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-medium mb-4">
          {appointment ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">
              Nom du client
            </label>
            <input
              type="text"
              id="client_name"
              {...register('client_name', { required: true })}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
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
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
            />
            {errors.phone && <span className="text-red-500 text-sm">Ce champ est requis</span>}
          </div>

          <div>
            <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
              Véhicule
            </label>
            <input
              type="text"
              id="vehicle"
              {...register('vehicle', { required: true })}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
            />
            {errors.vehicle && <span className="text-red-500 text-sm">Ce champ est requis</span>}
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
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Type de travaux</label>
            <textarea
              id="service"
              {...register('service', { required: true })}
              rows={6}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2 min-h-[200px]"
            />
            {errors.service && <span className="text-red-500 text-sm">Ce champ est requis</span>}
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
