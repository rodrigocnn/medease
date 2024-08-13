import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

export default function Calendar() {
  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  const handleEventClick = (arg: any) => {
    console.log('Args', arg);
    console.log('teste', arg.event.id);
    console.log('teste', arg.event.start);
    console.log('teste', arg.event.end);
  };

  const dataStart = new Date(2024, 6, 8, 13, 0, 0);
  const dataEnd = new Date(2024, 6, 8, 14, 0, 0);
  const dataStart1 = new Date(2024, 6, 8, 16, 0, 0);
  const dataEnd1 = '2024-07-08T20:00:00.000Z';

  return (
    <FullCalendar
      events={[
        { id: '1', title: 'Carlos', date: '2024-07-08', start: dataStart1, end: dataEnd1 },
        { id: '2', title: 'Marcela', date: '2024-07-08', start: dataStart, end: dataEnd },
      ]}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      displayEventTime={false}
    />
  );
}
