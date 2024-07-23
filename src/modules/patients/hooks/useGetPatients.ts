import { useQuery } from '@tanstack/react-query';
import api from '../../../services/api';

import { Patient } from '../../../interfaces';

export function useGetPatients() {
  const getPatients = async (): Promise<Patient[]> => {
    const response = await api.index('patients');
    return response.data;
  };

  const queryPatients = useQuery({
    queryKey: ['get-patients'],
    queryFn: getPatients,
  });

  return {
    queryPatients,
  };
}
