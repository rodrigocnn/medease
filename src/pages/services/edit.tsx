import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Loading } from '../../components/Loading';
import { useEditService } from '../../modules/services/hooks/useEditService';

interface EditServiceProps {
  id: string;
}

export function EditService({ id }: EditServiceProps) {
  const { updateService, onConfirm, showModalEdit, setShowModalEdit, handleChange, loading } = useEditService(id);

  return (
    <Modal title="Editar Serviço" confirm={onConfirm} setShowModal={setShowModalEdit} show={showModalEdit}>
      {loading && <Loading />}
      <div className="mb-2 columns-1">
        <Input value={updateService?.name} type="text" name="name" onChange={handleChange} placeholder="Nome" />
      </div>
      <div className="mb-2 columns-1">
        <Input value={updateService?.price} type="text" name="price" onChange={handleChange} placeholder="Valor" />
      </div>
    </Modal>
  );
}
