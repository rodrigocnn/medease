import { Professional } from '../interfaces';

class ProfessionalMap {
  handleBirthDate(date: string | Date) {
    if (typeof date === 'string') {
      return date;
    } else {
      return date.toISOString();
    }
  }

  toPersistent(professional: Professional) {
    let professionalAux = Object.assign({});
    const professionaPersist = { ...professional, ...professionalAux };
    const originalBirth = professional.birth as Date;
    professionaPersist.roleId = Number(professional.roleId);
    professionaPersist.birth = this.handleBirthDate(originalBirth);
    delete professionaPersist.role;
    return professionaPersist;
  }
}

export default new ProfessionalMap();
