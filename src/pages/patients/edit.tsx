import { PatientForm } from './patientform';

export function PatientsEdit() {
  return (
    <>
      <div className="h-24 bg-[#06afb1]">
        <div className="h-24 min-h-full p-5 font-semibold text-white">Editar Paciente</div>
      </div>
      <PatientForm action="edit" />
    </>
  );
}
