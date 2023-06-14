import { InsidePage } from '../../components/insidePage';
import { ProfessionalForm } from './form';

export function CreateProfessional() {
  return (
    <>
      <InsidePage title="Cadastrar Profissional">
        <ProfessionalForm />
      </InsidePage>
    </>
  );
}
