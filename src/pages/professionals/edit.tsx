import { InsidePage } from '../../components/insidePage';
import { ProfessionalForm } from './form';

export function ProfessionalsEdit() {
  return (
    <>
      <InsidePage title="Editar Profissional">
        <ProfessionalForm action="edit" />
      </InsidePage>
    </>
  );
}
