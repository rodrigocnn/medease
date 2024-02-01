import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { ModalContext } from '../../../shared/contexts/ModalContext';
import { Service } from '../../../interfaces';

export function useEditService(id: string) {
  const [updateService, setUpdateService] = useState<Service>();
  const { loading, sendDataUpdate, fetchDataShow } = useApi();
  const { showModalEdit, setShowModalEdit } = useContext(ModalContext);

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

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await sendDataUpdate('services', updateService?.id as string, updateService);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
      setShowModalEdit(false);
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowModalEdit(false);
    }
  };

  return {
    onConfirm,
    handleChange,
    setShowModalEdit,
    showModalEdit,
    loading,
    updateService,
  };
}
