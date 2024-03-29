import { useContext } from 'react';

import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { Loading } from '../../components/loading';
import { useUpdateRole } from '../../modules/roles/hooks/useUpdateRole';
import { ModalContext } from '../../shared/contexts/ModalContext';

interface ModalProps {
  id: string;
}

export const EditRole = ({ id }: ModalProps) => {
  const { onConfirmUpdate, handleChange, loading, updateRole } = useUpdateRole(id);
  const { showModalEdit, setShowModalEdit } = useContext(ModalContext);

  return (
    <Modal title="Editar Cargo" confirm={onConfirmUpdate} setShowModal={setShowModalEdit} show={showModalEdit}>
      {loading && <Loading />}
      <Input value={updateRole?.name} onChange={handleChange} type="text" placeholder="Nome" />
    </Modal>
  );
};
