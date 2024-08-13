import { useQuery } from '@tanstack/react-query';

import { Appointment, AppointmentFromApi } from '../../../interfaces';
import api from '../../../services/api';
import BookingMap from '../../../mappers/BookingMap';

export function useGetAppointments() {
  const getAppointments = async (): Promise<Appointment[]> => {
    const response = await api.index('schedules');
    const appointments: Appointment[] = response.data.map((item: AppointmentFromApi) => {
      const normalizeData = BookingMap.normalizeApiData(item);
      return {
        ...normalizeData,
      };
    });

    return appointments;
  };

  const queryAppointments = useQuery({
    queryKey: ['get-appointments'],
    queryFn: getAppointments,
  });

  return {
    queryAppointments,
  };
}
