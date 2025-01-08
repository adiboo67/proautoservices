import { useState } from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import VehiclesList from '@/components/secretary/VehiclesList'

export default function VehiclesPage() {
  return (
    <ProtectedRoute allowedRoles={['secretary', 'admin']}>
      <DashboardLayout title="Fiches Véhicules">
        <div className="space-y-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Fiches Véhicules</h1>
              <p className="mt-2 text-sm text-gray-700">
                Liste de tous les véhicules enregistrés dans le système.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
              >
                Ajouter un véhicule
              </button>
            </div>
          </div>
          <VehiclesList />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
