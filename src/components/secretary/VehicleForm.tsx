import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-toastify'
import SignaturePad from './SignaturePad'
import PhotoUpload from './PhotoUpload'

interface VehicleFormProps {
  vehicle?: any
  onClose: () => void
  onSuccess: () => void
}

interface VehicleFormData {
  client_name: string
  address: string
  phone: string
  brand_model: string
  mileage?: number
  work_type: string
  parts_supplies?: string
  entry_date: string
  exit_date?: string
  observations?: string
  mechanics: number[]
  registration_number: string
  status: string
}

export default function VehicleForm({ vehicle, onClose, onSuccess }: VehicleFormProps) {
  const [loading, setLoading] = useState(false)
  const [signature, setSignature] = useState<string | null>('')
  const [mechanics, setMechanics] = useState<any[]>([])
  const [selectedMechanics, setSelectedMechanics] = useState<string[]>(
    vehicle?.mechanics?.map((id: number) => id.toString()) || []
  )
  const [photos, setPhotos] = useState<string[]>([])

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<VehicleFormData>({
    defaultValues: {
      client_name: vehicle?.client_name || '',
      address: vehicle?.address || '',
      phone: vehicle?.phone || '',
      brand_model: vehicle?.brand_model || '',
      mileage: vehicle?.mileage || undefined,
      work_type: vehicle?.work_type || '',
      parts_supplies: vehicle?.parts_supplies || '',
      entry_date: vehicle?.entry_date || '',
      exit_date: vehicle?.exit_date || '',
      observations: vehicle?.observations || '',
      registration_number: vehicle?.registration_number || '',
      status: vehicle?.status || 'pending',
      mechanics: []  // Géré par selectedMechanics
    }
  })

  useEffect(() => {
    fetchMechanics()
    setPhotos(Array(4).fill('').map((_, index) => 
      vehicle?.photos?.[index] || ''
    ))
    
    if (vehicle) {
      // Mettre à jour tous les champs avec les valeurs du véhicule
      Object.entries(vehicle).forEach(([key, value]) => {
        if (key !== 'mechanics' && key !== 'photos' && key !== 'client_signature') {
          setValue(key as keyof VehicleFormData, value as string)
        }
      })
    }
  }, [vehicle, setValue])

  const fetchMechanics = async () => {
    try {
      const { data, error } = await supabase
        .from('mechanics')
        .select('id, name')
        .order('name')

      if (error) throw error
      
      console.log('Mechanics fetched:', data)
      setMechanics(data || [])
    } catch (error) {
      console.error('Error fetching mechanics:', error)
      toast.error('Erreur lors du chargement des mécaniciens')
    }
  }

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

  const handleMechanicsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(event.target.selectedOptions, option => option.value)
    setSelectedMechanics(values)
  }

  const onSubmit = async (data: VehicleFormData) => {
    try {
      setLoading(true)
      
      // Convertir les mécaniciens en nombres
      const mechanicIds = selectedMechanics.map(id => parseInt(id, 10));
      console.log('Mechanic IDs before save:', mechanicIds);
      
      // Créer l'objet de données à sauvegarder
      const vehicleData = {
        client_name: data.client_name,
        address: data.address,
        phone: data.phone,
        brand_model: data.brand_model,
        mileage: data.mileage,
        work_type: data.work_type,
        parts_supplies: data.parts_supplies,
        entry_date: data.entry_date,
        exit_date: data.exit_date,
        observations: data.observations,
        registration_number: data.registration_number,
        status: data.status,
        mechanics: mechanicIds,  // Utiliser exactement le même nom que dans la base de données
        client_signature: signature,
        photos: photos.filter(Boolean)
      };

      console.log('Vehicle data before cleanup:', vehicleData);

      // Retirer les champs undefined ou vides
      const cleanData = Object.fromEntries(
        Object.entries(vehicleData).filter(([key, value]) => {
          if (Array.isArray(value)) {
            return value.length > 0;
          }
          return value !== undefined && value !== '' && value !== null;
        })
      );

      console.log('Clean data before save:', cleanData);

      // Log de la requête exacte
      console.log('Update query:', {
        table: 'vehicles',
        data: cleanData,
        id: vehicle?.id
      });

      const { data: updateData, error: updateError } = vehicle?.id
        ? await supabase
            .from('vehicles')
            .update(cleanData)
            .eq('id', vehicle.id)
        : await supabase
            .from('vehicles')
            .insert(cleanData)
            .select();

      if (updateError) {
        console.error('Supabase error:', updateError);
        throw updateError;
      }

      console.log('Update response:', updateData);
      
      toast.success(
        vehicle
          ? 'Véhicule modifié avec succès'
          : 'Véhicule ajouté avec succès'
      );
      
      onSuccess();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      toast.error(
        vehicle
          ? 'Erreur lors de la modification du véhicule'
          : 'Erreur lors de l\'ajout du véhicule'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {vehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom du client</label>
                <input
                  type="text"
                  {...register('client_name', { required: 'Ce champ est requis' })}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
                {errors.client_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.client_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                  type="text"
                  {...register('address')}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="text"
                  {...register('phone', { required: 'Ce champ est requis' })}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Marque et Modèle</label>
                <input
                  type="text"
                  {...register('brand_model', { required: 'Ce champ est requis' })}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
                {errors.brand_model && (
                  <p className="mt-1 text-sm text-red-600">{errors.brand_model.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Kilométrage</label>
                <input
                  type="number"
                  {...register('mileage')}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Immatriculation</label>
                <input
                  type="text"
                  {...register('registration_number', { required: 'Ce champ est requis' })}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
                {errors.registration_number && (
                  <p className="mt-1 text-sm text-red-600">{errors.registration_number.message}</p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Type de travaux</label>
                <input
                  type="text"
                  {...register('work_type', { required: 'Ce champ est requis' })}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
                {errors.work_type && (
                  <p className="mt-1 text-sm text-red-600">{errors.work_type.message}</p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Pièces et fournitures</label>
                <textarea
                  {...register('parts_supplies')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date d'entrée</label>
                <input
                  type="date"
                  {...register('entry_date', { required: 'Ce champ est requis' })}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
                {errors.entry_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.entry_date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date de sortie prévue</label>
                <input
                  type="date"
                  {...register('exit_date')}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Statut</label>
                <select
                  {...register('status')}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                >
                  <option value="pending">En attente</option>
                  <option value="in_progress">En cours</option>
                  <option value="done">Terminé</option>
                  <option value="validated">Validé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mécaniciens</label>
                <select
                  multiple
                  value={selectedMechanics}
                  onChange={handleMechanicsChange}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                  size={4}
                >
                  {mechanics.map((mechanic) => (
                    <option 
                      key={mechanic.id} 
                      value={mechanic.id}
                    >
                      {mechanic.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Maintenez Ctrl (ou Cmd sur Mac) pour sélectionner plusieurs mécaniciens
                </p>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Observations</label>
                <textarea
                  {...register('observations')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Photos du véhicule</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <PhotoUpload
                    key={`${index}-${photo}`}
                    index={index}
                    imageUrl={photo}
                    onUpload={(url) => handlePhotoChange(index, url)}
                    onDelete={() => handlePhotoDelete(index)}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Vous pouvez ajouter jusqu'à 4 photos du véhicule
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Signature du client</label>
              <SignaturePad
                existingSignature={signature}
                onSave={(newSignature: string | null) => setSignature(newSignature)}
              />
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
                {loading ? 'Enregistrement...' : vehicle ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
