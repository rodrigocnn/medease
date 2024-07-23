interface Patient {
  name?: string;
  email?: string;
  birth: string;
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
  handleBirthDate(date: string | Date) {
    if (typeof date === 'string') {
      return date;
    } else {
      return date.toISOString();
    }
  }

  toPersistent(patient: Patient) {
    let patientAux = Object.assign({});
    const patientPersist = { ...patient, ...patientAux };
    const originalBirth = patient.birth;
    patientPersist.birth = this.handleBirthDate(originalBirth);
    patientPersist.role_id = patient.role;
    delete patientPersist.role;
    return patientPersist;
  }
}

export default new PatientlMap();
