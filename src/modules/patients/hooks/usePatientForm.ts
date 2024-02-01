import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import { Patient } from '../../../interfaces';

import api from '../../../services/api';
import PatientMap from '../mappers/PatientMap';

export function usePatientForm(action: string) {
  const [patient, setPatient] = useState<Patient>();
  const { loading, fetchDataShow, sendDataPost } = useApi();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (action === 'edit') {
      async function getPatient() {
        const response = await fetchDataShow('patients/show', id as string);
        setPatient(response.data);
      }
      getPatient();
    }
  }, [action, id, fetchDataShow]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    setPatient({ ...patient, [fieldName]: value });
  };

  const onSubmit = async (event: React.FormEvent<EventTarget | HTMLFormElement>) => {
    event.preventDefault();
    if (patient) {
      if (action === 'edit') {
        const response = await api.update('patients', id as string, PatientMap.toPersistent(patient));
        if (response.data) {
          toast('Registro Atualizado com Sucesso', { type: 'success' });
          navigate('/pacientes');
        } else {
          toast('Não foi possivel realizar operação', { type: 'error' });
        }
      } else {
        const response = await sendDataPost('patients', PatientMap.toPersistent(patient));
        if (response.data) {
          toast('Registro Inserido com Sucesso', { type: 'success' });
          navigate('/pacientes');
        } else {
          toast('Não foi possivel realizar operação', { type: 'error' });
        }
      }
    }
  };

  return {
    onSubmit,
    handleChange,
    loading,
    patient,
  };
}
