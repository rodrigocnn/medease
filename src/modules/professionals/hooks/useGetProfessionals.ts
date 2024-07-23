import { useQuery } from '@tanstack/react-query';
import api from '../../../services/api';

import { Patient } from '../../../interfaces';

export function useGeProfessionals() {
  const getProfessionals = async (): Promise<Patient[]> => {
    const response = await api.index('professionals');
    return response.data;
  };

  const queryProfessionals = useQuery({
    queryKey: ['get-professionals'],
    queryFn: getProfessionals,
  });

  return {
    queryProfessionals,
  };
}
