import { Dispatch, SetStateAction, useContext } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import ptBR from 'date-fns/locale/pt-BR';

import { statusOptions, timeOptions } from '../../constants/timeOptions';
import { Label } from '../../components/Label';
import { Appointment, Patient, Professional } from '../../interfaces';
import { Modal } from '../../components/Modal';
import { Select } from '../../components/Select';
import { useFormAppointment } from '../../modules/appointments/hooks/useFormAppointment';
import { useCreateAppointment } from '../../modules/appointments/hooks/useCreateAppointment';
import { useIndexServices } from '../../modules/services/hooks/useIndexServices';
import { useGetPatients } from '../../modules/patients/hooks/useGetPatients';
import { useGeProfessionals } from '../../modules/professionals/hooks/useGetProfessionals';
import { ModalContext } from '../../shared/contexts/ModalContext';

registerLocale('ptBR', ptBR);

interface FormAppointmentProps {
  action?: 'create' | 'edit';
  appointment?: Appointment;
  id?: string;
}

export function FormAppointment({}: FormAppointmentProps) {
  const { handleChange, handleDate, getSelectOptions, appointment } = useFormAppointment();
  const { onConfirm } = useCreateAppointment(appointment);
  const { services } = useIndexServices();
  const { queryPatients } = useGetPatients();
  const { queryProfessionals } = useGeProfessionals();
  const { showModal, setShowModal } = useContext(ModalContext);

  return (
    <>
      <Modal title="Cadastrar Agenda" confirm={onConfirm} setShowModal={setShowModal} show={showModal}>
        <div className="mb-2 columns-2">
          <div className="relative ">
            <Label title="Professional" />
            <Select
              name="professional"
              value={appointment?.professional}
              onChange={handleChange}
              id="select_professional"
              options={getSelectOptions(queryProfessionals.data as Professional[])}
            />
          </div>

          <div className="relative mb-2">
            <Label title="Pacientes" />
            <Select
              value={appointment?.patient}
              name="patient"
              onChange={handleChange}
              id="select_patients"
              options={getSelectOptions(queryPatients.data as Patient[])}
            />
          </div>
        </div>

        <div className="mb-2 columns-3">
          <div className="static  mb-2">
            <Label title="Data do Atendimento" />
            <DatePicker
              locale="ptBR"
              dateFormat="dd/MM/yyyy"
              className="input-default"
              selected={appointment?.datepicker}
              onChange={date => handleDate(date, 'datepicker')}
            />
          </div>

          <div className="relative">
            <Label title="Hora Início" />
            <Select value={appointment?.start} name="start" onChange={handleChange} id="start" options={timeOptions} />
          </div>

          <div className="relative">
            <Label title="Hora Fim" />
            <Select value={appointment?.end} name="end" onChange={handleChange} id="end" options={timeOptions} />
          </div>
        </div>

        <div className="mb-2 columns-2">
          <div className="relative ">
            <Label title="Serviço" />
            <Select
              value={appointment?.service}
              name="service"
              onChange={handleChange}
              id="service"
              options={getSelectOptions(services)}
            />
          </div>

          <div className="relative ">
            <Label title="Status" />
            <Select
              value={appointment?.status}
              name="status"
              onChange={handleChange}
              id="status"
              options={statusOptions}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
