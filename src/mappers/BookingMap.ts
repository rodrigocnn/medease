interface Appointment {
  id?: string;
  start?: string | number;
  end?: string | number;
  date?: string | Date;
  datepicker?: Date;
  patient?: string;
  service?: string;
  status?: string;
  professional?: string;
}

class BookingMap {
  toPersistent(booking: Appointment) {
    let bookingAux = Object.assign({});
    const bookingPersist = { ...booking, ...bookingAux };
    bookingPersist.patient_id = booking.patient;
    bookingPersist.service_id = booking.service;
    bookingPersist.professional_id = booking.professional;
    delete bookingPersist.professional;
    delete bookingPersist.service;
    delete bookingPersist.patient;
    delete bookingPersist.datepicker;
    return bookingPersist;
  }
}

export default new BookingMap();
