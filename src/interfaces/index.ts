export interface Patient {
  name?: string;
  email?: string;
  birth?: Date;
  phone?: string;
  cpf?: string;
  rg?: string;
  gender?: string;
  address?: string;
  district?: string;
  city?: string;
  state?: string;
}

export interface Appointment {
  id?: string;
  start?: string;
  end?: string;
  date?: string;
  datepicker?: Date;
  patient?: number;
  service?: number;
  status?: number;
  professional?: number;
}

export interface AppointmentPersist {
  id?: number;
  start?: string;
  end?: string;
  date?: string;
  patientId?: number;
  serviceId?: number;
  professionalId?: number;
  status?: number;
}

export interface AppointmentFromApi {
  id?: number;
  title: string;
  start: string;
  end: string;
  date: string;
  patientId: number;
  serviceId: number;
  professionalId: number;
  status: number;
  patient: Patient;
}
export interface AppointmentDataGrid {
  id?: string;
  start?: number;
  end?: number;
  date?: string;
  datepicker?: Date;
  title?: string;
  status?: number;
  patient?: number;
  professional?: number;
  service?: number;
}

export interface Professional {
  id?: string;
  roleId?: number;
  roleName?: string;
  name?: string;
  email?: string;
  birth?: Date | string;
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
