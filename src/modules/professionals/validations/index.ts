import { object, string } from 'yup';

export const professionalSchema = object().shape({
  state: string().required('O campo Estado é obrigatório '),
  city: string().required('O campo Cidade é obrigatório '),
  district: string().required('Valor Bairro é obrigatório '),
  address: string().required('O campo Endereço é obrigatório '),
  rg: string().required('O campo RG é obrigatório '),
  cpf: string().required('O campo CPF é obrigatório '),
  phone: string().required('O campo Telefone é obrigatório '),
  birth: string().required('O campo Data de Nascimento é obrigatório '),
  email: string().required('O campo Email é obrigatório '),
  name: string().required('O campo Nome é obrigatório '),
});
