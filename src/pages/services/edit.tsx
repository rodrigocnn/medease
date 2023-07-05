import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { toast } from 'react-toastify';
import { Loading } from '../../components/loading';
import useApi from '../../hooks/useApi';

interface Service {
  id?: string;
  description?: string;
  price?: string;
}

interface CreateServiceProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  id: string;
}

export function EditService({ show, setShowModal, id }: CreateServiceProps) {
  const [updateService, setUpdateService] = useState<Service>();
  const { loading, sendDataUpdate, fetchDataShow } = useApi();

  useEffect(() => {
    async function getService() {
      const response = await fetchDataShow('services/show', id);
      setUpdateService(response.data);
    }
    getService();
  }, [fetchDataShow]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Service = { ...updateService, [fieldName]: value };
    setUpdateService(updatedState);
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await sendDataUpdate('services', updateService?.id as string, updateService);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
      setShowModal(false);
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowModal(false);
    }
  };

  return (
    <Modal title="Editar Serviço" confirm={onConfirm} setShowModal={setShowModal} show={show}>
      {loading && <Loading />}
      <div className="mb-2 columns-1">
        <Input
          value={updateService?.description}
          type="text"
          name="description"
          onChange={handleChange}
          placeholder="Nome"
        />
      </div>
      <div className="mb-2 columns-1">
        <Input value={updateService?.price} type="text" name="price" onChange={handleChange} placeholder="Valor" />
      </div>
    </Modal>
  );
}
