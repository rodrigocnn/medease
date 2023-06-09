import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import api from '../../services/api';
import { Input } from '../../components/input';
import { Modal } from '../../components/modal';

interface Role {
  description: string;
}

interface CreateRoleProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateRole = ({ show, setShowModal }: CreateRoleProps) => {
  const [role, setRole] = useState<Role>();

  useEffect(() => {
    setRole({ description: '' });
  }, [show]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const updatedState: Role = { ...role, description: event.currentTarget.value };
    setRole(updatedState);
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await api.store('roles/', role);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  };

  return (
    <Modal title="Cadastrar Cargo" confirm={onConfirm} setShowModal={setShowModal} show={show}>
      <Input value={role?.description} onChange={handleChange} type="text" placeholder="Nome" />
    </Modal>
  );
};
