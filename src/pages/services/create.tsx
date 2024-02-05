import { Dispatch, SetStateAction, useState } from 'react';
import { NumericFormat } from 'react-number-format';

import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { toast } from 'react-toastify';
import { Loading } from '../../components/loading';
import useApi from '../../hooks/useApi';

interface Service {
  name?: string;
  price?: string;
}

interface CreateServiceProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export function CreateService({ show, setShowModal }: CreateServiceProps) {
  const [service, setService] = useState<Service>();
  const { loading, sendDataPost } = useApi();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Service = { ...service, [fieldName]: value };
    setService(updatedState);
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await sendDataPost('services', service);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  };

  return (
    <>
      <Modal title="Cadastrar Serviço" confirm={onConfirm} setShowModal={setShowModal} show={show}>
        {loading && <Loading />}

        <div className="mb-2 columns-1">
          <Input value={service?.name} type="text" name="name" onChange={handleChange} placeholder="Nome" />
        </div>
        <div className="mb-2 columns-1">
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$"
            className='  className="block dark:focus:ring-blue-500" /> w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
    dark:focus:border-blue-500'
            value={service?.price}
            type="text"
            name="price"
            onChange={handleChange}
            placeholder="Valor"
          />
        </div>
      </Modal>
    </>
  );
}
