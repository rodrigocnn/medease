import { Patient } from '../../../interfaces';

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
    const originalBirth = patient.birth as Date;
    patientPersist.birth = this.handleBirthDate(originalBirth);
    return patientPersist;
  }
}

export default new PatientlMap();
