import { useState } from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AppointmentCalendar from '@/components/secretary/AppointmentCalendar'

export default function AppointmentsPage() {
  return (
    <ProtectedRoute allowedRoles={['secretary', 'admin']}>
      <DashboardLayout title="Rendez-vous">
        <div className="space-y-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Rendez-vous</h1>
              <p className="mt-2 text-sm text-gray-700">
                Gérez les rendez-vous des clients.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
              >
                Nouveau rendez-vous
              </button>
            </div>
          </div>
          <AppointmentCalendar />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
