import { InsidePage } from '../../components/InsidePage';
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
