interface Patient {
  name?: string;
  email?: string;
  date_of_birth?: string;
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

class PatientlMap {
  toPersistent(patient: Patient) {
    let patientAux = Object.assign({});
    const patientPersist = { ...patient, ...patientAux };
    patientPersist.role_id = patient.role;
    delete patientPersist.role;
    return patientPersist;
  }
}

export default new PatientlMap();
