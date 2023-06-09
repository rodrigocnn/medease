import { Dispatch, SetStateAction, useState } from 'react';

import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { toast } from 'react-toastify';
import api from '../../services/api';

interface Service {
  description?: string;
  price?: string;
}

interface CreateServiceProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export function CreateService({ show, setShowModal }: CreateServiceProps) {
  const [service, setService] = useState<Service>();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Service = { ...service, [fieldName]: value };
    setService(updatedState);
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await api.store('services/', service);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  };

  return (
    <>
      <Modal title="Cadastrar Serviço" confirm={onConfirm} setShowModal={setShowModal} show={show}>
        <div className="mb-2 columns-1">
          <Input
            value={service?.description}
            type="text"
            name="description"
            onChange={handleChange}
            placeholder="Nome"
          />
        </div>
        <div className="mb-2 columns-1">
          <Input value={service?.price} type="text" name="price" onChange={handleChange} placeholder="Valor" />
        </div>
      </Modal>
    </>
  );
}
