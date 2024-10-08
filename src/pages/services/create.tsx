import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { Loading } from '../../components/loading';
import { useCreateService } from '../../modules/services/hooks/useCreateService';
import { InputNumeric } from '../../components/input-numeric';

export function CreateService() {
  const {
    handleChange,
    onConfirm,
    loading,
    showModal,
    setShowModal,
    service,
    validations,
    handleChangeNumeric,
  } = useCreateService();

  return (
    <>
      <Modal
        title="Cadastrar Serviço"
        confirm={onConfirm}
        setShowModal={setShowModal}
        show={showModal}
      >
        {loading && <Loading />}

        <div className="mb-2 columns-1">
          <Input
            error={validations?.fieldName === 'name' && !validations.validate}
            value={service?.name}
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Nome"
          />
        </div>
        <div className="mb-2 columns-1">
          <InputNumeric
            error={validations?.fieldName === 'price' && !validations.validate}
            value={service?.price}
            type="text"
            name="price"
            onChange={handleChangeNumeric}
            placeholder="Valor"
          />
        </div>
      </Modal>
    </>
  );
}
