import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';

import { Modal } from '../../components/modal';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Select } from '../../components/select';

interface Appointment {
  id?: string;
  start?: Date | null;
  end?: Date | null;
  date?: Date | null;
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

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Appointment = { ...appointment, [fieldName]: value };
    setAppointment(updatedState);
  };

  const handleDate = (date: Date | null, fieldName: string) => {
    const updatedState: Appointment = { ...appointment, [fieldName]: date };
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
          <div className="relative ">
            <label
              htmlFor="select_professional"
              className="left-1  z-10 origin-[0] -translate-y-4 scale-75 transform    text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-500 peer-focus:dark:text-blue-500"
            >
              Profissional
            </label>
            <Select name="professional" onChange={handleChange} id="select_professional" options={professinalOptions} />
          </div>

          <div className="relative mb-2">
            <label
              htmlFor="select_patients"
              className="left-1  z-10 origin-[0] -translate-y-4 scale-75 transform    text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-500 peer-focus:dark:text-blue-500"
            >
              Pacientes
            </label>
            <Select name="patient" onChange={handleChange} id="select_patients" options={professinalOptions} />
          </div>
        </div>

        <div className="mb-2 columns-3">
          <div className="relative  mb-2">
            <label
              htmlFor="select_professional"
              className="left-1  z-10 origin-[0] -translate-y-4 scale-75 transform    text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-500 peer-focus:dark:text-blue-500"
            >
              Data do Atendimento
            </label>
            <DatePicker
              className="input-default "
              selected={appointment?.date}
              onChange={date => handleDate(date, 'date')}
            />
          </div>

          <div className="relative mb-2">
            <label
              htmlFor="select_professional"
              className="left-1  z-10 origin-[0] -translate-y-4 scale-75 transform    text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-500 peer-focus:dark:text-blue-500"
            >
              Hora Início
            </label>
            <DatePicker
              className="input-default "
              selected={appointment?.start}
              onChange={date => handleDate(date, 'start')}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>

          <div className="relative ">
            <label
              htmlFor="select_professional"
              className="left-1  z-10 origin-[0] -translate-y-4 scale-75 transform    text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-500 peer-focus:dark:text-blue-500"
            >
              Hora Fim
            </label>
            <DatePicker
              className="input-default"
              selected={appointment?.end}
              onChange={date => handleDate(date, 'end')}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
