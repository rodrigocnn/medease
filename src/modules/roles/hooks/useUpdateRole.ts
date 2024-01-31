import { useContext, useEffect, useState } from 'react';
import { Role } from '../../../interfaces';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { ModalContext } from '../../../shared/contexts/ModalContext';

export function useUpdateRole(id: string) {
  const [updateRole, setUpdateRole] = useState<Role>();
  const { loading, sendDataUpdate, fetchDataShow } = useApi();
  const { setShowModal } = useContext(ModalContext);

  useEffect(() => {
    async function getRole() {
      const response = await fetchDataShow('roles', id);
      setUpdateRole(response.data);
    }
    getRole();
  }, [fetchDataShow]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const updatedRole: Role = { ...updateRole, name: event.currentTarget.value };
    setUpdateRole(updatedRole);
  };

  const onConfirmUpdate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await sendDataUpdate('roles', updateRole?.id as string, updateRole);
    console.log('Response', response);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
      setShowModal(false);
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowModal(false);
    }
  };

  return {
    onConfirmUpdate,
    handleChange,
    loading,
    updateRole,
  };
}
