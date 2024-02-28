import { object, string } from 'yup';

export const serviceSchema = object().shape({
  price: string().required('Valor do serviço é obrigatório '),
  name: string().required('Nome do serviço obrigatório'),
});
