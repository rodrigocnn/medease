import { useEffect, useState } from 'react';
import { Appointment, AppointmentFromApi } from '../../../interfaces';

import useApi from '../../../hooks/useApi';
import BookingMap from '../../../mappers/BookingMap';

export function useGetAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { loading, fetchAllData } = useApi();

  useEffect(() => {
    async function getAppointments() {
      const response = await fetchAllData('schedules');
      const appointments: Appointment[] = response.data.map((item: AppointmentFromApi) => {
        const normalizeData = BookingMap.normalizeApiData(item);
        return {
          ...normalizeData,
        };
      });

      setAppointments(appointments);
    }

    getAppointments();
  }, [fetchAllData]);

  return {
    appointments,
    loading,
  };
}
