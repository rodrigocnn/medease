import { InsidePage } from '../../components/inside-page';
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
