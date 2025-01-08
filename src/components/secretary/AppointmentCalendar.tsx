import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-toastify'
import AppointmentForm from './AppointmentForm'

interface Appointment {
  id: string
  title: string
  start: string
  end: string
  client_name: string
  phone: string
  vehicle: string
  service: string
  notes?: string
}

export default function AppointmentCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .gte('start_time', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

      if (error) throw error

      const formattedAppointments = data.map(appointment => ({
        ...appointment,
        title: `${appointment.client_name} - ${appointment.service}`,
        start: appointment.start_time,
        end: appointment.end_time
      }))

      setAppointments(formattedAppointments)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      toast.error('Erreur lors du chargement des rendez-vous')
    }
  }

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date)
    // Ajouter la classe selected au jour cliqué
    document.querySelectorAll('.fc-day-selected').forEach(el => {
      el.classList.remove('fc-day-selected')
    })
    arg.dayEl.classList.add('fc-day-selected')
    setSelectedAppointment(null)
    setIsFormOpen(true)
  }

  const handleEventClick = (arg: any) => {
    const appointment = appointments.find(a => a.id === arg.event.extendedProps.id)
    if (appointment) {
      setSelectedAppointment(appointment)
      setIsFormOpen(true)
    }
  }

  const handleEventDrop = async (arg: any) => {
    try {
      const appointment = appointments.find(a => a.id === arg.event.extendedProps.id)
      if (!appointment) return

      // Récupérer l'heure d'origine
      const originalTime = new Date(appointment.start).toTimeString().substring(0, 8)
      
      // Créer la nouvelle date de début avec l'heure d'origine
      const newStartDate = new Date(arg.event.start)
      const [hours, minutes, seconds] = originalTime.split(':')
      newStartDate.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds))
      
      // Calculer la nouvelle date de fin (1 heure après le début)
      const newEndDate = new Date(newStartDate.getTime() + 60 * 60 * 1000)

      const { error } = await supabase
        .from('appointments')
        .update({
          start_time: newStartDate.toISOString(),
          end_time: newEndDate.toISOString()
        })
        .eq('id', appointment.id)

      if (error) throw error

      toast.success('Rendez-vous déplacé avec succès')
      fetchAppointments()
    } catch (error) {
      console.error('Error updating appointment:', error)
      toast.error('Erreur lors du déplacement du rendez-vous')
      arg.revert()
    }
  }

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId)

      if (error) throw error

      toast.success('Rendez-vous supprimé avec succès')
      setIsFormOpen(false)
      fetchAppointments()
    } catch (error) {
      console.error('Error deleting appointment:', error)
      toast.error('Erreur lors de la suppression du rendez-vous')
    }
  }

  const getEventColor = (service: string) => {
    switch (service.toLowerCase()) {
      case 'vidange':
        return '#4CAF50'
      case 'réparation':
        return '#F44336'
      case 'dépannage':
        return '#FF9800'
      case 'diagnostic':
        return '#2196F3'
      case 'pneumatique':
        return '#9C27B0'
      case 'climatisation':
        return '#00BCD4'
      default:
        return '#607D8B'
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          events={appointments.map(appointment => ({
            ...appointment,
            backgroundColor: getEventColor(appointment.service),
            extendedProps: {
              id: appointment.id
            }
          }))}
          height="auto"
          locale="fr"
          buttonText={{
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine"
          }}
        />
      </div>

      {isFormOpen && (
        <AppointmentForm
          appointment={selectedAppointment}
          selectedDate={selectedDate}
          onClose={() => {
            setIsFormOpen(false)
            setSelectedAppointment(null)
          }}
          onSuccess={fetchAppointments}
          onDelete={handleDeleteAppointment}
        />
      )}
    </div>
  )
}
