import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Role } from '../../../interfaces';
import { AppContext } from '../../../shared/contexts/AppContext';
import useApi from '../../../hooks/useApi';

export function useUpdateRole(id: string) {
  const [updateRole, setUpdateRole] = useState<Role>();
  const { loading, sendDataUpdate, fetchDataShow } = useApi();
  const { showModalEdit, setShowModalEdit } = useContext(AppContext);

  useEffect(() => {
    async function getRole() {
      const response = await fetchDataShow('roles', id);
      setUpdateRole(response.data);
    }
    getRole();
  }, [fetchDataShow, showModalEdit]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const updatedRole: Role = { ...updateRole, name: event.currentTarget.value };
    setUpdateRole(updatedRole);
  };

  const onConfirmUpdate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await sendDataUpdate('roles', updateRole?.id as string, updateRole);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
      setShowModalEdit(false);
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowModalEdit(false);
    }
  };

  return {
    onConfirmUpdate,
    handleChange,
    loading,
    updateRole,
  };
}
