import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { toast } from 'react-toastify';
import api from '../../services/api';

interface Service {
  id?: string;
  name?: string;
  price?: string;
}

interface CreateServiceProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  service: Service;
}

export function EditService({ show, setShowModal, service }: CreateServiceProps) {
  const [updateService, setUpdateService] = useState<Service>(service);

  useEffect(() => {
    setUpdateService(service);
  }, [service]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Service = { ...service, [fieldName]: value };
    setUpdateService(updatedState);
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await api.update('services', updateService.id as string, updateService);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  };

  return (
    <>
      <Modal title="Editar Serviço" confirm={onConfirm} setShowModal={setShowModal} show={show}>
        <div className="mb-2 columns-1">
          <Input value={updateService?.name} type="text" name="name" onChange={handleChange} placeholder="Nome" />
        </div>
        <div className="mb-2 columns-1">
          <Input value={updateService?.price} type="text" name="price" onChange={handleChange} placeholder="Valor" />
        </div>
      </Modal>
    </>
  );
}
