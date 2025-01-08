import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-toastify';

interface Vehicle {
  id: number;
  client_name: string;
  brand: string;
  model: string;
  registration: string;
  mileage: number;
  mechanic_notes: string;
  status: string;
  entry_date: string;
}

export default function VehiclesInProgress() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'in_progress')
        .order('entry_date', { ascending: false });

      if (error) throw error;
      
      console.log('Vehicles in progress:', data);
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setError('Erreur lors du chargement des véhicules');
      toast.error('Erreur lors du chargement des véhicules');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle({
      ...vehicle,
      mileage: vehicle.mileage || 0
    });
  };

  const handleSave = async () => {
    if (!editingVehicle) return;

    try {
      const updates: any = {
        mechanic_notes: editingVehicle.mechanic_notes
      };

      // Si le kilométrage a été modifié
      if (editingVehicle.mileage !== undefined) {
        updates.mileage = editingVehicle.mileage;
      }

      // Si le statut a été changé à "done"
      if (editingVehicle.status === 'done') {
        updates.status = 'done';
      }

      const { error } = await supabase
        .from('vehicles')
        .update(updates)
        .eq('id', editingVehicle.id);

      if (error) throw error;

      await fetchVehicles();
      setEditingVehicle(null);
      toast.success('Véhicule mis à jour avec succès');
    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast.error('Erreur lors de la mise à jour du véhicule');
    }
  };

  const handleCancel = () => {
    setEditingVehicle(null);
  };

  if (loading) {
    return <div className="text-center py-4">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      {vehicles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucun véhicule en cours
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Véhicule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Immatriculation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kilométrage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Observations
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                {editingVehicle?.id === vehicle.id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vehicle.client_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {`${vehicle.brand} ${vehicle.model}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vehicle.registration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editingVehicle.mileage}
                        onChange={(e) => {
                          const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                          setEditingVehicle({
                            ...editingVehicle,
                            mileage: value
                          });
                        }}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        min="0"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <textarea
                        value={editingVehicle.mechanic_notes}
                        onChange={(e) => setEditingVehicle({
                          ...editingVehicle,
                          mechanic_notes: e.target.value
                        })}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        rows={3}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={handleSave}
                        className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md mr-2"
                      >
                        Enregistrer
                      </button>
                      <button
                        onClick={() => {
                          setEditingVehicle({
                            ...editingVehicle,
                            status: 'done'
                          });
                          handleSave();
                        }}
                        className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md mr-2"
                      >
                        Terminer
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Annuler
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vehicle.client_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {`${vehicle.brand} ${vehicle.model}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vehicle.registration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vehicle.mileage}
                    </td>
                    <td className="px-6 py-4">
                      {vehicle.mechanic_notes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Modifier
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
