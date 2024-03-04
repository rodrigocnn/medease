import { toast } from 'react-toastify';

import { useContext, useEffect, useState } from 'react';
import { Service } from '../../../interfaces';
import { ModalContext } from '../../../shared/contexts/ModalContext';
import useApi from '../../../hooks/useApi';
import api from '../../../services/api';

export function useIndexServices() {
  const [services, setServices] = useState<Service[]>([]);
  const { showModal, setShowModal, showModalEdit, setShowModalEdit } = useContext(ModalContext);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowIdSelected, setRowIdSelected] = useState('');
  const { loading, fetchAllData } = useApi();

  useEffect(() => {
    async function getServices() {
      const response = await fetchAllData('services');
      setServices(response.data);
    }
    getServices();
  }, [fetchAllData, showModal, showDeleteConfirm, showModalEdit]);

  async function editData(id: string) {
    setShowModalEdit(true);
    setRowIdSelected(id);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('services', rowIdSelected);
    if (response.data) {
      toast('Registro Excluído com Sucesso', { type: 'success' });
      setShowDeleteConfirm(false);
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowDeleteConfirm(false);
    }
  }

  return {
    deleteItem,
    openDeleteConfirm,
    editData,
    setShowModalEdit,
    setShowDeleteConfirm,
    setShowModal,
    services,
    loading,
    showDeleteConfirm,
    rowIdSelected,
    showModalEdit,
    showModal,
  };
}
