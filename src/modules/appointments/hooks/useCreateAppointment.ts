import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { Appointment, AppointmentPersist } from '../../../interfaces';
import { useContext, useState } from 'react';
import { appointmentSchema } from '../validations';
import { AppContext } from '../../../shared/contexts/AppContext';
import api from '../../../services/api';
import BookingMap from '../../../mappers/BookingMap';

export function useCreateAppointment(appointment: Appointment) {
  const [validations, setValidations] = useState<string[]>([]);
  const { setShowModal } = useContext(AppContext);
  const queryClient = useQueryClient();

  const validation = async (appointment: AppointmentPersist) => {
    try {
      await appointmentSchema.validate(appointment);
      return true;
    } catch (error: any) {
      toast(error.errors[0], { type: 'error' });
      setValidations(error.errors);
      return false;
    }
  };

  const createAppointment = async (appointment: AppointmentPersist) => {
    delete appointment.id;
    const response = await api.store('schedules', appointment);
    return response.data;
  };

  const mutation = useMutation<AxiosResponse, AxiosError, AppointmentPersist>({
    mutationFn: createAppointment,
    onSuccess: data => {
      if (data) {
        toast('Registro Salvo com Sucesso', { type: 'success' });
        setShowModal(false);
        queryClient.refetchQueries({ queryKey: ['get-appointments'] });
      }
    },
    onError: () => {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowModal(false);
    },
  });

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const appointmentPersist = BookingMap.toPersistent(appointment);
    if (await validation(appointmentPersist)) {
      mutation.mutate(appointmentPersist);
    }
  };

  return {
    onConfirm,
    validations,
  };
}
