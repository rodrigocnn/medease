import { Input } from '../../components/input';
import { Select } from '../../components/select';
import { Button } from '../../components/button';
import { Loading } from '../../components/loading';
import { usePatientForm } from '../../modules/patients/hooks/usePatientForm';
import { useNavigate } from 'react-router-dom';
import Masks from '../../shared/utils/Masks';
import MaskedInput from 'react-text-mask';
import { StatesBR } from '../../constants/StatesBR';

interface PatientFormProps {
  action?: 'create' | 'edit';
}

export function PatientForm({ action = 'create' }: PatientFormProps) {
  const actionForm = action;
  const { patient, loading, handleChange, onSubmit } = usePatientForm(actionForm);
  const navigate = useNavigate();

  return (
    <>
      {loading && <Loading />}

      <div className="relative top-[-3rem]  h-full overflow-x-auto p-5  ">
        <div className="rounded bg-white p-5">
          <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Geral</div>
          <form onSubmit={onSubmit}>
            <div className="mb-2 columns-1">
              <Input value={patient?.name} name="name" onChange={handleChange} type="text" placeholder="Nome" />
            </div>
            <div className="mb-2 columns-2">
              <Input value={patient?.email} name="email" onChange={handleChange} type="text" placeholder="Email" />
              <MaskedInput
                mask={Masks.celular}
                value={patient?.phone}
                name="phone"
                onChange={handleChange}
                type="text"
                placeholder="Telefone"
                className='  className="block dark:focus:ring-blue-500" /> w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
    dark:focus:border-blue-500'
              />
            </div>

            <div className="mb-2 columns-3">
              <Input
                value={patient?.birth}
                name="birth"
                onChange={handleChange}
                type="text"
                placeholder="Data de Nascimento"
              />

              <MaskedInput
                mask={Masks.cpf}
                value={patient?.cpf}
                name="cpf"
                onChange={handleChange}
                type="text"
                placeholder="CPF"
                className='  className="block dark:focus:ring-blue-500" /> w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
    dark:focus:border-blue-500'
              />

              <Input value={patient?.rg} name="rg" onChange={handleChange} type="text" placeholder="RG" />
            </div>

            <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Endereço</div>

            <div className="mb-2 columns-1">
              <Input
                value={patient?.address}
                name="address"
                onChange={handleChange}
                type="text"
                placeholder="Endereço"
              />
            </div>

            <div className="mb-2 columns-3">
              <Input
                value={patient?.district}
                name="district"
                onChange={handleChange}
                type="text"
                placeholder="Bairro"
              />
              <Input value={patient?.city} name="city" onChange={handleChange} type="text" placeholder="Cidade" />
              <Select onChange={handleChange} name="state" options={StatesBR} />
            </div>
            <div className="mt-6 columns-2">
              <Button onClick={onSubmit}>Salvar</Button>
              <button
                onClick={() => navigate('/pacientes')}
                type="button"
                className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5
                text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#06afb1] focus:z-10
                focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800
                dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
