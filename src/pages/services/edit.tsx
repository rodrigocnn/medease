import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { Loading } from '../../components/loading';
import { useEditService } from '../../modules/services/hooks/useEditService';
import { InputNumeric } from '../../components/input-numeric';

interface EditServiceProps {
  id: string;
}

export function EditService({ id }: EditServiceProps) {
  const {
    updateService,
    onConfirm,
    showModalEdit,
    setShowModalEdit,
    handleChange,
    handleChangeNumeric,
    loading,
    validations,
  } = useEditService(id);

  return (
    <Modal
      title="Editar Serviço"
      confirm={onConfirm}
      setShowModal={setShowModalEdit}
      show={showModalEdit}
    >
      {loading && <Loading />}
      <div className="mb-2 columns-1">
        <Input
          value={updateService?.name}
          type="text"
          name="name"
          error={validations?.fieldName === 'name' && !validations.validate}
          onChange={handleChange}
          placeholder="Nome"
        />
      </div>
      <div className="mb-2 columns-1">
        <InputNumeric
          value={updateService?.price}
          type="text"
          name="price"
          error={validations?.fieldName === 'price' && !validations.validate}
          onChange={handleChangeNumeric}
          placeholder="Valor"
        />
      </div>
    </Modal>
  );
}
