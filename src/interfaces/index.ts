export interface Appointment {
  id?: string;
  start?: string | number;
  end?: string | number;
  date?: string | Date;
  datepicker?: Date;
  patient?: string;
  service?: string;
  status?: string;
  professional?: string;
}

export interface Patient {
  name?: string;
  email?: string;
  birth?: string;
  phone?: string;
  cpf?: string;
  rg?: string;
  gender?: string;
  address?: string;
  district?: string;
  city?: string;
  state?: string;
}

export interface Professional {
  id?: string;
  roleId?: number;
  roleName?: string;
  name?: string;
  email?: string;
  birth?: string;
  phone?: string;
  cpf?: string;
  rg?: string;
  gender?: string;
  address?: string;
  district?: string;
  city?: string;
  state?: string;
  role?: string;
}

export interface Service {
  id?: string;
  name: string;
  price: string;
  role?: string;
}

export interface ServiceRequest {
  name: string;
  price: number | null | string;
}

export interface Role {
  id?: string;
  name?: string;
}

export interface Options {
  label: string;
  value: string;
}

export interface ValidationError {
  name: string;
  errors: string[];
}

export interface FieldValidate {
  fieldName: string;
  validate: boolean;
}
