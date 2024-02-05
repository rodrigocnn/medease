import { Professional } from '../interfaces';

class ProfessionalMap {
  toPersistent(professional: Professional) {
    let professionalAux = Object.assign({});
    const patientPersist = { ...professional, ...professionalAux };
    patientPersist.roleId = Number(professional.roleId);
    delete patientPersist.role;
    return patientPersist;
  }
}

export default new ProfessionalMap();
