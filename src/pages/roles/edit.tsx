import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { Role } from '../../interfaces';
import { Loading } from '../../components/loading';
import useApi from '../../hooks/useApi';

interface ModalProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  id: string;
}

export const EditRole = ({ show, setShowModal, id }: ModalProps) => {
  const [updateRole, setUpdateRole] = useState<Role>();
  const { loading, sendDataUpdate, fetchDataShow } = useApi();

  useEffect(() => {
    async function getRole() {
      const response = await fetchDataShow('roles/show', id);
      setUpdateRole(response.data);
    }
    getRole();
  }, [fetchDataShow]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const updatedRole: Role = { ...updateRole, description: event.currentTarget.value };
    setUpdateRole(updatedRole);
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await sendDataUpdate('roles', updateRole?.id as string, updateRole);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
      setShowModal(false);
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowModal(false);
    }
  };

  return (
    <Modal title="Editar Cargo" confirm={onConfirm} setShowModal={setShowModal} show={show}>
      {loading && <Loading />}
      <Input value={updateRole?.description} onChange={handleChange} type="text" placeholder="Nome" />
    </Modal>
  );
};
