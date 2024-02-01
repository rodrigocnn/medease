import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { Role } from '../../../interfaces';
import { ModalContext } from '../../../shared/contexts/ModalContext';

export function useCreateRole() {
  const [role, setRole] = useState<Role>();
  const { loading, sendDataPost } = useApi();
  const { showModal, setShowModal } = useContext(ModalContext);

  useEffect(() => {
    setRole({ name: '' });
  }, [showModal]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const updatedState: Role = { ...role, name: event.currentTarget.value };
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

  return {
    loading,
    handleChange,
    onConfirm,
    role,
  };
}
