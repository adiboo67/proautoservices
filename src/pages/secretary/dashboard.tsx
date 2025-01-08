import { Tab } from '@headlessui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AppointmentCalendar from '@/components/secretary/AppointmentCalendar';
import VehiclesList from '@/components/secretary/VehiclesList';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { supabase } from '@/lib/supabase';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SecretaryDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ProtectedRoute allowedRoles={['secretary']}>
      <DashboardLayout title="Dashboard Secrétaire">
        <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <Tab.Group onChange={setSelectedTab}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-800 p-1">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-blue-700'
                      : 'text-white hover:bg-blue-700 hover:text-white'
                  )
                }
              >
                Fiches Véhicules
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-blue-700'
                      : 'text-white hover:bg-blue-700 hover:text-white'
                  )
                }
              >
                Rendez-vous
              </Tab>
            </Tab.List>

            <Tab.Panels className="mt-4">
              <Tab.Panel>
                <div className="bg-white shadow sm:rounded-lg">
                  <VehiclesList />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <AppointmentCalendar />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
