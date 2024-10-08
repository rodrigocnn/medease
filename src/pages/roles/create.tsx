import { useContext } from 'react';

import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { Loading } from '../../components/loading';
import { useCreateRole } from '../../modules/roles/hooks/useCreateRole';
import { AppContext } from '../../shared/contexts/AppContext';

export const CreateRole = () => {
  const { onConfirm, role, loading, handleChange, validations } = useCreateRole();
  const { showModal, setShowModal } = useContext(AppContext);

  return (
    <Modal title="Cadastrar Cargo" confirm={onConfirm} setShowModal={setShowModal} show={showModal}>
      {loading && <Loading />}
      <Input
        error={validations.length > 0}
        value={role?.name}
        onChange={handleChange}
        type="text"
        placeholder="Nome"
      />
    </Modal>
  );
};
