import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { ModalContext } from '../../../shared/contexts/ModalContext';
import { FieldValidate, Service } from '../../../interfaces';
import { serviceSchema } from '../validations';

export function useEditService(id: string) {
  const [updateService, setUpdateService] = useState<Service>();
  const { loading, sendDataUpdate, fetchDataShow } = useApi();
  const { showModalEdit, setShowModalEdit } = useContext(ModalContext);
  const [validations, setValidations] = useState<FieldValidate>();

  useEffect(() => {
    async function getService() {
      const response = await fetchDataShow('services', id);
      setUpdateService(response.data);
    }
    getService();
  }, [fetchDataShow]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    // @ts-ignore
    const updatedState: Service = { ...updateService, [fieldName]: value };
    setUpdateService(updatedState);
  };

  const handleChangeNumeric = (event: any) => {
    const value = event.target.value;
    const updatedState: Service = { ...updateService, price: value } as Service;
    setUpdateService(updatedState);
  };

  const validation = async () => {
    try {
      await serviceSchema.validate(updateService);
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
      const response = await sendDataUpdate('services', updateService?.id as string, updateService);
      if (response.data) {
        toast('Registro Atualizado com Sucesso', { type: 'success' });
        setShowModalEdit(false);
      } else {
        toast('Não foi possivel realizar operação', { type: 'error' });
        setShowModalEdit(false);
      }
    }
  };

  return {
    onConfirm,
    handleChange,
    handleChangeNumeric,
    setShowModalEdit,
    showModalEdit,
    loading,
    updateService,
    validations,
  };
}
