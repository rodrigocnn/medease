import { useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import BookingMap from '../../mappers/BookingMap';
import { Button } from '../../components/button';
import { FormAppointment } from './form';
import { AppContext } from '../../shared/contexts/AppContext';
import { useGetAppointments } from '../../modules/appointments/hooks/useGetAppointments';
import { timeNowToStringAM } from '../../helpers/handleDate';
import { InsidePage } from '../../components/inside-page';

const INITIAL_STATE_APPOINTMENT = {
  id: '',
  start: timeNowToStringAM(),
  end: timeNowToStringAM(),
  date: '',
  patient: -1,
  service: -1,
  status: 1,
  professional: -1,
  datepicker: new Date(),
};

export function Appointments() {
  const [editMode, setEditMode] = useState(false);
  const { setShowModal, setAppointment } = useContext(AppContext);
  const { queryAppointments } = useGetAppointments();

  const findAppointmentById = (id: number) => {
    return queryAppointments.data?.find(item => Number(item.id) === Number(id));
  };

  const handleEventClick = (arg: any) => {
    const appointment = findAppointmentById(arg.event.id);
    if (appointment) {
      const appointmentEdit = BookingMap.normalizeToEdit(appointment);
      setAppointment(appointmentEdit);
      setEditMode(true);
      setShowModal(true);
    }
  };

  const openModal = () => {
    setAppointment(INITIAL_STATE_APPOINTMENT);
    setShowModal(true);
  };

  return (
    <>
      {<FormAppointment action={editMode ? 'edit' : 'create'} />}

      <InsidePage loading={queryAppointments.isLoading} title="Agenda">
        <Button onClick={() => openModal()} type="button">
          Novo
        </Button>

        <FullCalendar
          events={queryAppointments.data}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          eventClick={handleEventClick}
          displayEventTime={false}
          locale={'pt-br'}
          noEventsText="Sem Eventos"
          buttonText={{
            today: 'Hoje',
            month: 'Mês',
            day: 'Dia',
          }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridDay',
          }}
          views={{
            listWeek: { buttonText: 'Lista' },
          }}
        />
      </InsidePage>
    </>
  );
}
