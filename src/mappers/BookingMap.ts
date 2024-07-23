import { stringToDate } from '../helpers/handleDate';
import { Appointment, AppointmentDataGrid, AppointmentFromApi, AppointmentPersist } from '../interfaces';

class BookingMap {
  toPersistent(booking: Appointment) {
    const appointment: AppointmentPersist = {
      start: '',
      end: '',
      date: '',
      patientId: 0,
      serviceId: 0,
      professionalId: 0,
      status: 0,
    };
    appointment.patientId = Number(booking.patient);
    appointment.serviceId = Number(booking.service);
    appointment.professionalId = Number(booking.professional);
    appointment.date = booking.datepicker?.toISOString();
    appointment.start = String(stringToDate(booking.start, booking.datepicker));
    appointment.end = String(stringToDate(booking.end, booking?.datepicker));
    appointment.date = booking.datepicker?.toISOString();
    appointment.status = Number(booking.status);
    return appointment;
  }

  normalizeApiData(booking: AppointmentFromApi) {
    const normalizeData: AppointmentDataGrid = {};
    normalizeData.id = booking.id as number;
    normalizeData.start = Number(booking.start);
    normalizeData.end = Number(booking.end);
    normalizeData.date = booking.date;
    normalizeData.title = booking.patient.name as string;
    normalizeData.patientId = booking.patientId;
    normalizeData.professionalId = booking.professionalId;
    normalizeData.serviceId = booking.serviceId;
    normalizeData.status = booking.status;
    return normalizeData;
  }
}

export default new BookingMap();
