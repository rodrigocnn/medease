import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { Appointment, AppointmentPersist } from '../../../interfaces';
import { useContext, useState } from 'react';
import { appointmentSchema } from '../validations';
import { AppContext } from '../../../shared/contexts/AppContext';
import api from '../../../services/api';
import BookingMap from '../../../mappers/BookingMap';

export function useUpdateAppointment(appointment: Appointment) {
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

  const updateAppointment = async (appointment: AppointmentPersist) => {
    console.log('Atualizar', appointment.id);
    const response = await api.update('schedules', String(appointment.id), appointment);
    return response.data;
  };

  const mutation = useMutation<AxiosResponse, AxiosError, AppointmentPersist>({
    mutationFn: updateAppointment,
    onSuccess: data => {
      if (data) {
        toast('Registro Atualizado com Sucesso', { type: 'success' });
        setShowModal(false);
        queryClient.refetchQueries({ queryKey: ['get-appointments'] });
      }
    },
    onError: () => {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowModal(false);
    },
  });

  const onUpdate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const appointmentPersist = BookingMap.toPersistent(appointment);
    if (await validation(appointmentPersist)) {
      mutation.mutate(appointmentPersist);
    }
  };

  return {
    onUpdate,
    validations,
  };
}
