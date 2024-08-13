import { useEffect, useState } from 'react';
import { Appointment, AppointmentFromApi } from '../../../interfaces';

import useApi from '../../../hooks/useApi';
import BookingMap from '../../../mappers/BookingMap';
import { useQuery } from '@tanstack/react-query';
import api from '../../../services/api';

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
