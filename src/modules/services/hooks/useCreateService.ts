import { toast } from 'react-toastify';

import ServiceMap from '../mappers/ServiceMap';
import useApi from '../../../hooks/useApi';
import { useContext, useState } from 'react';
import { ModalContext } from '../../../shared/contexts/ModalContext';
import { Service } from '../../../interfaces';
import { serviceSchema } from '../validations';

interface FielValidate {
  fieldName: string;
  validate: boolean;
}

export function useCreateService() {
  const [service, setService] = useState<Service>();
  const { loading, sendDataPost } = useApi();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [validations, setValidations] = useState<FielValidate>();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Service = { ...service, [fieldName]: value } as Service;
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
        const request = ServiceMap.toPersistent(requestService);
        const response = await sendDataPost('services', request);
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
    onConfirm,
    loading,
    showModal,
    setShowModal,
    validations,
    service,
  };
}
