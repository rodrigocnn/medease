import { Dispatch, SetStateAction, useState } from 'react';

import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Select } from '../../components/select';

interface Appointment {
  id?: string;
  start?: string;
  end?: string;
  date?: string;
  patient?: string;
  professional?: string;
}

interface CreateAppointmentProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const professinalOptions = [
  { label: 'Mauricio Santos', value: 'Mauricio Santos' },
  { label: 'João Amaral', value: 'João Amaral' },
  { label: 'Caio Santos', value: 'Caio Santos' },
];

export function CreateAppointment({ show, setShowModal }: CreateAppointmentProps) {
  const [appointment, setAppointment] = useState<Appointment>();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Appointment = { ...appointment, [fieldName]: value };
    setAppointment(updatedState);
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await api.store('appointments', appointment);
    if (response.data) {
      toast('Registro Salvo com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  };

  return (
    <>
      <Modal title="Cadastrar Agenda" confirm={onConfirm} setShowModal={setShowModal} show={show}>
        <div className="mb-2 columns-2">
          <Select options={professinalOptions} />
          <Select options={professinalOptions} />
        </div>

        <div className="mb-2 columns-1">
          <Input type="text" name="price" onChange={handleChange} placeholder="Data" />
        </div>

        <div className="mb-2 columns-2">
          <Select options={professinalOptions} />
          <Select options={professinalOptions} />
        </div>
      </Modal>
    </>
  );
}
