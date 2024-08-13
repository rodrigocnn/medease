import { object, string } from 'yup';

export const roleSchema = object().shape({
  name: string().required('Nome do cargo obrigatório'),
});
