import { object, string } from 'yup';

export const appointmentSchema = object().shape({
  status: string().required('Selecione status '),
  serviceId: string().required('Selecione um Serviço'),
  end: string().required('O campo Hora Fim é obrigatório '),
  start: string().required('O campo Hora Inicial é obrigatório '),
  date: string().required('Data de Nascimento é obrigatório '),
  patientId: string().required('Selecione um paciente '),
  professionalId: string().required('Selecione um profissional '),
});
