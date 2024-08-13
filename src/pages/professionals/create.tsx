import { InsidePage } from '../../components/inside-page';
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
