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
  const { showModal, setShowModal, showModalEdit, setShowModalEdit } = useContext(ModalContext);

  useEffect(() => {
    async function getRoles() {
      const response = await fetchAllData('roles');
      setRoles(response.data);
    }
    getRoles();
  }, [showDeleteConfirm, showModal, showModalEdit, fetchAllData]);

  async function editRole(id: string) {
    setShowModalEdit(true);
    setRowIdSelected(id);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await deleteData('roles', rowIdSelected);
    if (response.data) {
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
    setShowModal,
    showModal,
    setShowModalEdit,
    showDeleteConfirm,
    loading,
    rowIdSelected,
    roles,
  };
}
