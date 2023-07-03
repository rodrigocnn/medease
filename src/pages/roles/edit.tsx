import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { Role } from '../../interfaces';
import api from '../../services/api';

interface ModalProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  role: Role;
}

export const EditRole = ({ show, setShowModal, role }: ModalProps) => {
  const [updateRole, setUpdateRole] = useState<Role>(role);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const updatedRole: Role = { ...updateRole, description: event.currentTarget.value };
    setUpdateRole(updatedRole);
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await api.update('roles', updateRole.id as string, updateRole);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  };

  return (
    <Modal title="Editar Cargo" confirm={onConfirm} setShowModal={setShowModal} show={show}>
      <Input value={updateRole.description} onChange={handleChange} type="text" placeholder="Nome" />
    </Modal>
  );
};
