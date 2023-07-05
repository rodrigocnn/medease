import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { Role } from '../../interfaces';
import { Loading } from '../../components/loading';
import useApi from '../../hooks/useApi';

interface CreateRoleProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateRole = ({ show, setShowModal }: CreateRoleProps) => {
  const [role, setRole] = useState<Role>();
  const { loading, sendDataPost } = useApi();

  useEffect(() => {
    setRole({ description: '' });
  }, [show]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const updatedState: Role = { ...role, description: event.currentTarget.value };
    setRole(updatedState);
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await sendDataPost('roles', role);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
      setShowModal(false);
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowModal(false);
    }
  };

  return (
    <Modal title="Cadastrar Cargo" confirm={onConfirm} setShowModal={setShowModal} show={show}>
      {loading && <Loading />}
      <Input value={role?.description} onChange={handleChange} type="text" placeholder="Nome" />
    </Modal>
  );
};
