import { useContext } from 'react';

import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Loading } from '../../components/Loading';
import { useUpdateRole } from '../../modules/roles/hooks/useUpdateRole';
import { AppContext } from '../../shared/contexts/AppContext';

interface ModalProps {
  id: string;
}

export const EditRole = ({ id }: ModalProps) => {
  const { onConfirmUpdate, handleChange, loading, updateRole } = useUpdateRole(id);
  const { showModalEdit, setShowModalEdit } = useContext(AppContext);

  return (
    <Modal
      title="Editar Cargo"
      confirm={onConfirmUpdate}
      setShowModal={setShowModalEdit}
      show={showModalEdit}
    >
      {loading && <Loading />}
      <Input value={updateRole?.name} onChange={handleChange} type="text" placeholder="Nome" />
    </Modal>
  );
};
