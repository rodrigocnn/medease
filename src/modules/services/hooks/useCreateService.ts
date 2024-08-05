import { toast } from 'react-toastify';

import useApi from '../../../hooks/useApi';
import { useContext, useState } from 'react';
import { AppContext } from '../../../shared/contexts/AppContext';
import { FieldValidate, Service } from '../../../interfaces';
import { serviceSchema } from '../validations';

export function useCreateService() {
  const [service, setService] = useState<Service>();
  const { loading, sendDataPost } = useApi();
  const { showModal, setShowModal } = useContext(AppContext);
  const [validations, setValidations] = useState<FieldValidate>();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Service = { ...service, [fieldName]: value } as Service;
    setService(updatedState);
  };

  const handleChangeNumeric = (event: any) => {
    const value = event.target.value;
    const updatedState: Service = { ...service, price: value } as Service;
    setService(updatedState);
  };

  const validation = async () => {
    try {
      await serviceSchema.validate(service);
      return true;
    } catch (error: any) {
      toast(error.errors[0], { type: 'error' });
      const fieldNameValidation = { fieldName: error.path as string, validate: false };
      setValidations(fieldNameValidation);
      return false;
    }
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (await validation()) {
      if (service) {
        const requestService = {
          name: service.name as string,
          price: service.price as string,
        };
        const response = await sendDataPost('services', requestService);
        if (response.data) {
          toast('Registro Atualizado com Sucesso', { type: 'success' });
          setShowModal(false);
        }
      } else {
        toast('Não foi possivel realizar operação', { type: 'error' });
        setShowModal(false);
      }
    }
  };

  return {
    handleChange,
    handleChangeNumeric,
    onConfirm,
    loading,
    showModal,
    setShowModal,
    validations,
    service,
  };
}
