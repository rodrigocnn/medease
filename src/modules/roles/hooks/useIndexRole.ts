import { toast } from 'react-toastify';

import { useContext, useEffect, useState } from 'react';
import { Role } from '../../../interfaces';
import { ModalContext } from '../../../shared/contexts/ModalContext';
import useApi from '../../../hooks/useApi';

export function useIndexRole() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowIdSelected, setRowIdSelected] = useState('');

  const { loading, fetchAllData, deleteData } = useApi();
  const { showModal, setShowModal } = useContext(ModalContext);

  useEffect(() => {
    async function getRoles() {
      const response = await fetchAllData('roles');
      setRoles(response.data);
    }
    getRoles();
  }, [showDeleteConfirm, showModal, fetchAllData]);

  async function editRole(id: string) {
    setShowModal(true);
    setRowIdSelected(id);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await deleteData('roles', rowIdSelected);
    if (response.status === 204) {
      toast('Registro Excluído com Sucesso', { type: 'success' });
      setShowDeleteConfirm(false);
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowDeleteConfirm(false);
    }
  }

  return {
    openDeleteConfirm,
    deleteItem,
    setShowDeleteConfirm,
    editRole,

    showDeleteConfirm,
    loading,
    rowIdSelected,
    roles,
  };
}
