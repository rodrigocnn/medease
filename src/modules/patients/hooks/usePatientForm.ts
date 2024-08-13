import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import { FieldValidate, Patient } from '../../../interfaces';

import api from '../../../services/api';
import PatientMap from '../mappers/PatientMap';
import { patientsSchema } from '../validations';

export function usePatientForm(action: string) {
  const [patient, setPatient] = useState<Patient>();
  const { loading, fetchDataShow, sendDataPost } = useApi();
  const [validations, setValidations] = useState<FieldValidate>();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (action === 'edit') {
      async function getPatient() {
        const response = await fetchDataShow('patients', id as string);
        setPatient(response.data);
      }
      getPatient();
    }
  }, [action, id, fetchDataShow]);

  const validation = async () => {
    try {
      await patientsSchema.validate(patient);
      return true;
    } catch (error: any) {
      toast(error.errors[0], { type: 'error' });
      const fieldNameValidation = { fieldName: error.path as string, validate: false };
      setValidations(fieldNameValidation);
      return false;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    setPatient({ ...patient, [fieldName]: value });
  };

  const handleDate = (date: Date | null, fieldName: string) => {
    const updatedState: Patient = { ...patient, [fieldName]: date };
    setPatient(updatedState);
  };

  const onSubmit = async (event: React.FormEvent<EventTarget | HTMLFormElement>) => {
    event.preventDefault();
    if (await validation()) {
      if (patient) {
        if (action === 'edit') {
          const response = await api.update(
            'patients',
            id as string,
            PatientMap.toPersistent(patient)
          );
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
    }
  };

  return {
    onSubmit,
    handleChange,
    handleDate,
    loading,
    validations,
    patient,
  };
}
