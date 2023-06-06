import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { Modal } from '../../components/modal';
import { toast } from 'react-toastify';
import { Select } from '../../components/select';
import api from '../../services/api';

interface Appointment {
  id?: string;
  start?: Date | null;
  end?: Date | null;
  date?: Date | null;
  patient?: string;
  professional?: string;
}

interface EditAppointmentProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  appointment: Appointment;
}

const professinalOptions = [
  { label: 'Mauricio Santos', value: 'Mauricio Santos' },
  { label: 'João Amaral', value: 'João Amaral' },
  { label: 'Caio Santos', value: 'Caio Santos' },
];

export function EditAppointment({ show, setShowModal, appointment }: EditAppointmentProps) {
  const [appointmentUpdate, setAppointmentUdate] = useState<Appointment>(appointment);

  useEffect(() => {
    setAppointmentUdate(appointment);
  }, [appointment]);

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Appointment = { ...appointmentUpdate, [fieldName]: value };
    setAppointmentUdate(updatedState);
  };

  const handleDate = (date: Date | null, fieldName: string) => {
    const updatedState: Appointment = { ...appointmentUpdate, [fieldName]: date };
    setAppointmentUdate(updatedState);
  };

  const onConfirm = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await api.store('appointments', setAppointmentUdate);
    if (response.data) {
      toast('Registro Salvo com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  };

  return (
    <>
      <Modal title="Editar Agenda" confirm={onConfirm} setShowModal={setShowModal} show={show}>
        <div className="mb-2 columns-2">
          <div className="relative ">
            <label htmlFor="select_professional" className="label-appointment">
              Profissional
            </label>
            <Select
              value={appointmentUpdate?.professional}
              name="professional"
              onChange={handleChange}
              id="select_professional"
              options={professinalOptions}
            />
          </div>

          <div className="relative mb-2">
            <label htmlFor="select_patients" className="label-appointment">
              Pacientes
            </label>
            <Select
              value={appointmentUpdate?.patient}
              name="patient"
              onChange={handleChange}
              id="select_patients"
              options={professinalOptions}
            />
          </div>
        </div>

        <div className="mb-2 columns-3">
          <div className="relative  mb-2">
            <label htmlFor="select_professional" className="label-appointment">
              Data do Atendimento
            </label>
            <DatePicker
              className="input-default "
              selected={appointmentUpdate?.date}
              onChange={date => handleDate(date, 'date')}
            />
          </div>

          <div className="relative mb-2">
            <label htmlFor="select_professional" className="label-appointment">
              Hora Início
            </label>
            <DatePicker
              className="input-default "
              selected={appointmentUpdate?.start}
              onChange={date => handleDate(date, 'start')}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>

          <div className="relative ">
            <label htmlFor="select_professional" className="label-appointment">
              Hora Fim
            </label>
            <DatePicker
              className="input-default"
              selected={appointmentUpdate?.end}
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
