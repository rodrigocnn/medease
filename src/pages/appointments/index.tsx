import { useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Button } from '../../components/Button';
import { InsidePage } from '../../components/InsidePage';
import { FormAppointment } from './form';
import { ModalContext } from '../../shared/contexts/ModalContext';
import { useGetAppointments } from '../../modules/appointments/hooks/useGetAppointments';
import { Appointment } from '../../interfaces';

export function Appointments() {
  const [editMode, setEditMode] = useState(false);
  const [modeEdit, setModeEdit] = useState<null | string>(null);

  const { setShowModal } = useContext(ModalContext);
  const { appointments, loading } = useGetAppointments();
  const [appointment, setAppointament] = useState<Appointment>();

  async function editData(id: string) {
    setModeEdit(id);
  }

  const findAppointmentById = (id: number) => {
    return appointments.find(item => Number(item.id) === Number(id));
  };

  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  const handleEventClick = (arg: any) => {
    setAppointament(findAppointmentById(arg.event.id));
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <>
      {editMode ? <FormAppointment appointment={appointment} action="edit" /> : <FormAppointment />}

      <InsidePage loading={loading} title="Agenda">
        <Button onClick={() => setShowModal(true)} type="button">
          Novo
        </Button>

        <FullCalendar
          events={appointments}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          displayEventTime={false}
        />
      </InsidePage>
    </>
  );
}
