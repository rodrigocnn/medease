import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

import { Modal } from '../../components/modal';
import { Select } from '../../components/select';
import { statusOptions, timeOptions } from '../../constants/timeOptions';
import { stringToDate, timeDefaultToString, timeNow } from '../../helpers/handleDate';
import api from '../../services/api';
import { Label } from '../../components/label';

interface Appointment {
  id?: string;
  start?: string | number;
  end?: string | number;
  date?: string;
  datepicker?: Date;
  patient?: string;
  professional?: string;
}

interface CreateAppointmentProps {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface Options {
  label: string;
  value: string;
}

interface Service {
  id: string;
  description: string;
  price: string;
  role: string;
}

const INITIA_STATE = {
  datepicker: new Date(),
  start: timeDefaultToString(timeNow()),
  end: timeDefaultToString(timeNow()),
  status: '1',
};

export function CreateAppointment({ show, setShowModal }: CreateAppointmentProps) {
  const [appointment, setAppointment] = useState<Appointment>(INITIA_STATE);
  const [professionals, setProfessionals] = useState<Options[]>([]);
  const [patients, setPatients] = useState<Options[]>([]);
  const [services, setServices] = useState<Options[]>([]);

  useEffect(() => {
    getProfessionals();

    async function getProfessionals() {
      const response = await api.index('professionals');
      const professinalOptions: Options[] = response.data.map((item: Professional) => {
        return { label: item.name, value: item.id };
      });

      const firstOption = { label: 'Selecione um Professional', value: '0' };
      professinalOptions.unshift(firstOption);
      setProfessionals(professinalOptions);
    }
  }, []);

  useEffect(() => {
    getPatients();

    async function getPatients() {
      const response = await api.index('patients');
      const patientsOptions: Options[] = response.data.map((item: Professional) => {
        return { label: item.name, value: item.id };
      });
      const firstOption = { label: 'Selecione um Paciente', value: '0' };
      patientsOptions.unshift(firstOption);
      setPatients(patientsOptions);
    }
  }, []);

  useEffect(() => {
    async function getServices() {
      const response = await api.index('services');
      const servicesOptions: Options[] = response.data.map((item: Service) => {
        return { label: item.description, value: item.id };
      });
      const firstOption = { label: 'Selecione um Serviço', value: '0' };
      servicesOptions.unshift(firstOption);
      setServices(servicesOptions);
    }

    getServices();
  }, []);

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

    const newAppointment = { ...appointment };
    newAppointment.start = stringToDate(newAppointment.start as string);
    newAppointment.end = stringToDate(newAppointment.end as string);
    newAppointment.date = newAppointment.datepicker?.toISOString().split('T')[0];

    const response = await api.store('bookings', newAppointment);
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
            <Label title="Professional" />
            <Select name="professional_id" onChange={handleChange} id="select_professional" options={professionals} />
          </div>

          <div className="relative mb-2">
            <Label title="Pacientes" />
            <Select name="patient_id" onChange={handleChange} id="select_patients" options={patients} />
          </div>
        </div>

        <div className="mb-2 columns-3">
          <div className="static  mb-2">
            <Label title="Data do Atendimento" />
            <DatePicker
              className="input-default"
              selected={appointment?.datepicker}
              onChange={date => handleDate(date, 'datepicker')}
            />
          </div>

          <div className="relative">
            <Label title="  Hora Início" />
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
            <Select name="service_id" onChange={handleChange} id="service" options={services} />
          </div>

          <div className="relative ">
            <Label title="Status" />
            <Select name="status" onChange={handleChange} id="status" options={statusOptions} />
          </div>
        </div>
      </Modal>
    </>
  );
}
