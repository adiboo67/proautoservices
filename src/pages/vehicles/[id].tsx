import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import SignaturePad from '@/components/secretary/SignaturePad'
import toast from 'react-hot-toast'

interface Vehicle {
  id: string
  client_name: string
  client_address: string
  phone: string
  brand_model: string
  mileage: number
  work_description: string
  entry_date: string
  status: string
  signature?: string
}

export default function VehicleDetails() {
  const router = useRouter()
  const { id } = router.query
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)

  useEffect(() => {
    if (id) {
      fetchVehicle()
    }
  }, [id])

  const fetchVehicle = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setVehicle(data)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleSignatureSave = async (signature: string | null) => {
    try {
      if (!id) return

      const { error } = await supabase
        .from('vehicles')
        .update({ client_signature: signature })
        .eq('id', id)

      if (error) throw error
      toast.success('Signature enregistrée')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (!vehicle) return null

  return (
    <ProtectedRoute allowedRoles={['secretary']}>
      <DashboardLayout title={`Véhicule - ${vehicle.brand_model}`}>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Informations client</h3>
                    <dl className="mt-2 text-sm text-gray-500">
                      <div className="mt-1">
                        <dt className="font-medium">Nom</dt>
                        <dd>{vehicle.client_name}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="font-medium">Adresse</dt>
                        <dd>{vehicle.client_address}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="font-medium">Téléphone</dt>
                        <dd>{vehicle.phone}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Informations véhicule</h3>
                    <dl className="mt-2 text-sm text-gray-500">
                      <div className="mt-1">
                        <dt className="font-medium">Marque et modèle</dt>
                        <dd>{vehicle.brand_model}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="font-medium">Kilométrage</dt>
                        <dd>{vehicle.mileage} km</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="font-medium">Date d'entrée</dt>
                        <dd>{new Date(vehicle.entry_date).toLocaleDateString()}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="font-medium">Statut</dt>
                        <dd className="capitalize">{vehicle.status.replace('_', ' ')}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Description des travaux</h3>
                  <p className="mt-2 text-sm text-gray-500">{vehicle.work_description}</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Signature du client</h3>
                  <SignaturePad onSave={handleSignatureSave} existingSignature={vehicle.signature} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
