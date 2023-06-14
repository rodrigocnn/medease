import { InsidePage } from '../../components/insidePage';
import { ProfessionalForm } from './form';

export function ProfessionalsEdit() {
  return (
    <>
      <InsidePage title="Cadastrar Profissional">
        <ProfessionalForm action="edit" />
      </InsidePage>
    </>
  );
}
