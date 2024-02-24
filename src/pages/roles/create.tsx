import { useContext } from 'react';

import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Loading } from '../../components/Loading';
import { useCreateRole } from '../../modules/roles/hooks/useCreateRole';
import { ModalContext } from '../../shared/contexts/ModalContext';

export const CreateRole = () => {
  const { onConfirm, role, loading, handleChange } = useCreateRole();
  const { showModal, setShowModal } = useContext(ModalContext);

  return (
    <Modal title="Cadastrar Cargo" confirm={onConfirm} setShowModal={setShowModal} show={showModal}>
      {loading && <Loading />}
      <Input value={role?.name} onChange={handleChange} type="text" placeholder="Nome" />
    </Modal>
  );
};
