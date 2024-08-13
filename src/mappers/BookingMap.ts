import { convertTimestampToTime, stringToDate } from '../helpers/handleDate';
import {
  Appointment,
  AppointmentDataGrid,
  AppointmentFromApi,
  AppointmentPersist,
} from '../interfaces';

class BookingMap {
  toPersistent(booking: Appointment) {
    const appointment: AppointmentPersist = {};
    appointment.id = Number(booking.id);
    appointment.patientId = Number(booking.patient);
    appointment.serviceId = Number(booking.service);
    appointment.professionalId = Number(booking.professional);
    appointment.date = booking.datepicker?.toISOString();
    appointment.start = stringToDate(String(booking.start), booking.datepicker as Date);
    appointment.end = stringToDate(String(booking.end), booking?.datepicker as Date);
    appointment.status = Number(booking.status);
    return appointment;
  }

  normalizeApiData(booking: AppointmentFromApi) {
    const normalizeData: AppointmentDataGrid = {};
    normalizeData.id = String(booking.id);
    normalizeData.start = Number(booking.start);
    normalizeData.end = Number(booking.end);
    normalizeData.date = booking.date;
    normalizeData.title = booking.patient.name as string;
    normalizeData.patient = booking.patientId;
    normalizeData.professional = booking.professionalId;
    normalizeData.service = booking.serviceId;
    normalizeData.status = booking.status;
    return normalizeData;
  }

  normalizeToEdit(booking: Appointment) {
    const normalizeData: Appointment = {};
    normalizeData.id = booking.id;
    normalizeData.start = convertTimestampToTime(Number(booking.start));
    normalizeData.end = convertTimestampToTime(Number(booking.end));
    normalizeData.datepicker = new Date(booking.date as string);
    normalizeData.patient = booking.patient;
    normalizeData.service = booking.service;
    normalizeData.status = booking.status;
    normalizeData.professional = booking.professional;
    return normalizeData;
  }
}

export default new BookingMap();
