import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-toastify'

interface Vehicle {
  id: string
  client_name: string
  phone: string
  brand_model: string
  mileage: number
  work_type: string
  entry_date: string
  observations: string
  status: string
}

export default function MechanicDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [editingMileage, setEditingMileage] = useState<{[key: string]: number}>({})
  const [editingObservations, setEditingObservations] = useState<{[key: string]: string}>({})

  useEffect(() => {
    getCurrentUser()
  }, [])

  useEffect(() => {
    if (userId) {
      fetchVehicles()
    }
  }, [userId])

  const getCurrentUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUserId(session.user.id)
      }
    } catch (error) {
      console.error('Error getting current user:', error)
    }
  }

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'in_progress')
        .order('entry_date', { ascending: false })

      if (error) throw error
      
      const newVehicles = data || []
      setVehicles(newVehicles)
      
      // Mettre à jour editingMileage et editingObservations uniquement pour les nouveaux véhicules
      const updatedMileageValues = { ...editingMileage }
      const updatedObservationsValues = { ...editingObservations }
      
      newVehicles.forEach(vehicle => {
        if (!(vehicle.id in updatedMileageValues)) {
          updatedMileageValues[vehicle.id] = vehicle.mileage
        }
        if (!(vehicle.id in updatedObservationsValues)) {
          updatedObservationsValues[vehicle.id] = vehicle.observations || ''
        }
      })
      
      setEditingMileage(updatedMileageValues)
      setEditingObservations(updatedObservationsValues)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      toast.error('Erreur lors du chargement des véhicules')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (vehicleId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ status: newStatus })
        .eq('id', vehicleId)

      if (error) throw error

      toast.success('Statut mis à jour avec succès')
      fetchVehicles()
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Erreur lors de la mise à jour du statut')
    }
  }

  const handleUpdateMileage = async (vehicleId: string) => {
    try {
      const newMileage = editingMileage[vehicleId]
      const { error } = await supabase
        .from('vehicles')
        .update({ mileage: newMileage })
        .eq('id', vehicleId)

      if (error) throw error

      // Mettre à jour localement le véhicule au lieu de recharger tous les véhicules
      setVehicles(vehicles.map(vehicle => 
        vehicle.id === vehicleId 
          ? { ...vehicle, mileage: newMileage }
          : vehicle
      ))

      toast.success('Kilométrage mis à jour avec succès')
    } catch (error) {
      console.error('Error updating mileage:', error)
      toast.error('Erreur lors de la mise à jour du kilométrage')
    }
  }

  const handleUpdateObservations = async (vehicleId: string) => {
    try {
      const newObservations = editingObservations[vehicleId]
      const { error } = await supabase
        .from('vehicles')
        .update({ observations: newObservations })
        .eq('id', vehicleId)

      if (error) throw error

      // Mettre à jour localement le véhicule
      setVehicles(vehicles.map(vehicle => 
        vehicle.id === vehicleId 
          ? { ...vehicle, observations: newObservations }
          : vehicle
      ))

      toast.success('Observations mises à jour avec succès')
    } catch (error) {
      console.error('Error updating observations:', error)
      toast.error('Erreur lors de la mise à jour des observations')
    }
  }

  return (
    <ProtectedRoute allowedRoles={['mechanic']}>
      <DashboardLayout title="Dashboard Mécanicien">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Véhicules en cours</h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun véhicule en cours</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {vehicle.client_name}
                        </h3>
                        <p className="text-sm text-gray-500">{vehicle.phone}</p>
                      </div>
                      <button
                        onClick={() => handleUpdateStatus(vehicle.id, 'done')}
                        className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                      >
                        Terminer
                      </button>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Véhicule:</span> {vehicle.brand_model}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Kilométrage:</span>
                        <input
                          type="number"
                          value={editingMileage[vehicle.id]}
                          onChange={(e) => {
                            const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                            setEditingMileage({
                              ...editingMileage,
                              [vehicle.id]: value
                            });
                          }}
                          className="mt-1 block w-32 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm"
                          min="0"
                        />
                        <button
                          onClick={() => handleUpdateMileage(vehicle.id)}
                          className="px-2 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          Enregistrer
                        </button>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Travaux:</span> {vehicle.work_type}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Date d'entrée:</span>{' '}
                        {new Date(vehicle.entry_date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Observations
                      </label>
                      <div className="flex items-start space-x-2">
                        <textarea
                          rows={3}
                          value={editingObservations[vehicle.id] || ''}
                          onChange={(e) => setEditingObservations({
                            ...editingObservations,
                            [vehicle.id]: e.target.value
                          })}
                          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <button
                          onClick={() => handleUpdateObservations(vehicle.id)}
                          className="mt-1 px-2 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
