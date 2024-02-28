import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { Role } from '../../../interfaces';
import { ModalContext } from '../../../shared/contexts/ModalContext';
import { roleSchema } from '../validations';

export function useCreateRole() {
  const [role, setRole] = useState<Role>();
  const { loading, sendDataPost } = useApi();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [validations, setValidations] = useState<string[]>([]);

  useEffect(() => {
    setRole({ name: '' });
  }, [showModal]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const updatedState: Role = { ...role, name: event.currentTarget.value };
    setRole(updatedState);
  };

  const validation = async () => {
    try {
      await roleSchema.validate(role);
      return true;
    } catch (error: any) {
      toast(error.errors[0], { type: 'error' });
      setValidations(error.errors);
      return false;
    }
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (await validation()) {
      const response = await sendDataPost('roles', role);
      if (response.data) {
        toast('Registro Atualizado com Sucesso', { type: 'success' });
        setShowModal(false);
      } else {
        toast('Não foi possivel realizar operação', { type: 'error' });
        setShowModal(false);
      }
    }
  };

  return {
    loading,
    validations,
    role,
    handleChange,
    onConfirm,
  };
}
