import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-toastify'
import PhotoUpload from '@/components/secretary/PhotoUpload'
import SignatureCanvas from 'react-signature-canvas'

interface VehicleFormModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: any
}

interface VehicleFormData {
  client_name: string
  phone: string
  address: string
  brand_model: string
  registration_number: string
  mileage: number
  work_type: string
  entry_date: string
  exit_date: string
  mechanics: string[]
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  parts_supplies: string
  observations: string
}

interface Mechanic {
  id: string
  name: string
}

export default function VehicleFormModal({ isOpen, onClose, appointment }: VehicleFormModalProps) {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<string[]>(['', '', '', ''])
  const [signatureURL, setSignatureURL] = useState<string>('')
  const [signaturePad, setSignaturePad] = useState<SignatureCanvas | null>(null)
  const [mechanics, setMechanics] = useState<Mechanic[]>([])

  const { register, handleSubmit, formState: { errors } } = useForm<VehicleFormData>({
    defaultValues: {
      client_name: appointment?.client_name || '',
      phone: appointment?.phone || '',
      address: '',
      brand_model: appointment?.vehicle || '',
      registration_number: '',
      mileage: 0,
      work_type: appointment?.service || '',
      entry_date: appointment ? new Date(appointment.start_time).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      exit_date: '',
      mechanics: [],
      status: 'pending',
      parts_supplies: '',
      observations: ''
    }
  })

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const { data, error } = await supabase
          .from('mechanics')
          .select('id, name')
          .order('name')

        if (error) throw error
        setMechanics(data || [])
      } catch (error) {
        console.error('Error fetching mechanics:', error)
        toast.error('Erreur lors du chargement des mécaniciens')
      }
    }

    if (isOpen) {
      fetchMechanics()
    }
  }, [isOpen])

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

  const clearSignature = () => {
    signaturePad?.clear()
    setSignatureURL('')
  }

  const saveSignature = () => {
    if (!signaturePad || signaturePad.isEmpty()) {
      toast.error('Veuillez signer avant de sauvegarder')
      return
    }
    setSignatureURL(signaturePad.getTrimmedCanvas().toDataURL('image/png'))
  }

  const onSubmit = async (data: VehicleFormData) => {
    try {
      setLoading(true)

      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError || !userData.user) throw new Error("Non authentifié")

      // Préparer les données à insérer
      const vehicleData = {
        client_name: data.client_name,
        phone: data.phone,
        address: data.address,
        brand_model: data.brand_model,
        registration_number: data.registration_number,
        mileage: data.mileage || 0,
        work_type: data.work_type,
        entry_date: data.entry_date,
        exit_date: data.exit_date,
        mechanics: data.mechanics,
        status: data.status,
        parts_supplies: data.parts_supplies,
        observations: data.observations,
        photos: photos.filter(Boolean),
        client_signature: signatureURL || null,
        created_by: userData.user.id,
        updated_by: userData.user.id
      }

      console.log('Données à insérer:', vehicleData)

      const { error } = await supabase
        .from('vehicles')
        .insert([vehicleData])

      if (error) {
        console.error('Erreur Supabase détaillée:', error)
        throw error
      }

      toast.success('Fiche véhicule créée avec succès')
      onClose()
    } catch (error) {
      console.error('Error creating vehicle:', error)
      toast.error('Erreur lors de la création de la fiche véhicule')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Nouvelle fiche véhicule</h2>
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            {/* Informations client */}
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

            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <input
                type="text"
                id="address"
                {...register('address')}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Informations véhicule */}
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
              <label htmlFor="registration_number" className="block text-sm font-medium text-gray-700">
                Immatriculation
              </label>
              <input
                type="text"
                id="registration_number"
                {...register('registration_number')}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
                Kilométrage
              </label>
              <input
                type="number"
                id="mileage"
                {...register('mileage', { 
                  valueAsNumber: true,
                  setValueAs: (value: string) => value === '' ? 0 : parseInt(value)
                })}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Informations intervention */}
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
              <label htmlFor="exit_date" className="block text-sm font-medium text-gray-700">
                Date de sortie prévue
              </label>
              <input
                type="date"
                id="exit_date"
                {...register('exit_date')}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="mechanics" className="block text-sm font-medium text-gray-700">
                Mécaniciens
              </label>
              <select
                multiple
                id="mechanics"
                {...register('mechanics')}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {mechanics.map((mechanic) => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">Maintenez Ctrl (ou Cmd sur Mac) pour sélectionner plusieurs mécaniciens</p>
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
                <option value="pending">En attente</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
              {errors.status && <span className="text-red-500 text-sm">Ce champ est requis</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="work_type" className="block text-sm font-medium text-gray-700">
                Type de travaux
              </label>
              <textarea
                id="work_type"
                rows={4}
                {...register('work_type', { required: true })}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.work_type && <span className="text-red-500 text-sm">Ce champ est requis</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="parts_supplies" className="block text-sm font-medium text-gray-700">
                Pièces et fournitures
              </label>
              <textarea
                id="parts_supplies"
                rows={4}
                {...register('parts_supplies')}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="observations" className="block text-sm font-medium text-gray-700">
                Observations
              </label>
              <textarea
                id="observations"
                rows={4}
                {...register('observations')}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Signature du client</label>
            <div className="border-2 border-gray-300 rounded-md">
              <SignatureCanvas
                ref={(ref) => setSignaturePad(ref)}
                canvasProps={{
                  className: 'signature-canvas',
                  style: { width: '100%', height: '160px' },
                  width: 500,
                  height: 160
                }}
                minWidth={1}
                maxWidth={2.5}
                velocityFilterWeight={0.7}
              />
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={clearSignature}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  Effacer
                </button>
                <button
                  type="button"
                  onClick={saveSignature}
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-900"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
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
              {loading ? 'Création...' : 'Créer la fiche'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
