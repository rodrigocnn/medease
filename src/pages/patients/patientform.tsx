import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import { Input } from '../../components/input';
import { Select } from '../../components/select';
import { Button } from '../../components/button';

interface patient {
  name?: string;
  email?: string;
  date_of_birth?: string;
  phone?: string;
  cpf?: string;
  rg?: string;
  gender?: string;
  address?: string;
  district?: string;
  city?: string;
  state?: string;
}

const statesOptions = [
  { label: 'Masculino', value: 'M' },
  { label: 'Feminino', value: 'F' },
];

interface PatientFormProps {
  action?: 'create' | 'edit';
}

export function PatientForm({ action = 'create' }: PatientFormProps) {
  const [patient, setPatient] = useState<patient>();
  const navigate = useNavigate();

  useEffect(() => {
    if (action === 'edit') {
      getPatient();
    }
  }, []);

  async function getPatient() {
    const response = await api.show('professionals', '1');
    console.log('resppons', response.data);
    setPatient(response.data);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    setPatient({ ...patient, [fieldName]: value });
  };

  const onSubmit = async (event: React.FormEvent<EventTarget | HTMLFormElement>) => {
    event.preventDefault();
    const response = await api.store('patients', patient);
    if (response.data) {
      toast('Registro Inserido com Sucesso', { type: 'success' });
      navigate('/pacientes');
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  };

  return (
    <div className="relative top-[-3rem]  h-full overflow-x-auto p-5  ">
      <div className="rounded bg-white p-5">
        <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Geral</div>
        <form onSubmit={onSubmit}>
          <div className="mb-2 columns-2">
            <Input value={patient?.name} name="name" onChange={handleChange} type="text" placeholder="Nome" />
            <Input value={patient?.email} name="email" onChange={handleChange} type="text" placeholder="Email" />
          </div>

          <div className="mb-2 columns-2">
            <Input
              value={patient?.date_of_birth}
              name="date_of_birth"
              onChange={handleChange}
              type="text"
              placeholder="Data de Nascimento"
            />
            <Input value={patient?.phone} name="phone" onChange={handleChange} type="text" placeholder="Telefone" />
          </div>

          <div className="mb-2 columns-3">
            <Input value={patient?.cpf} name="cpf" onChange={handleChange} type="text" placeholder="CPF" />
            <Input value={patient?.rg} name="rg" onChange={handleChange} type="text" placeholder="RG" />
            <Select options={statesOptions} />
          </div>

          <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Endereço</div>

          <div className="mb-2 columns-1">
            <Input value={patient?.address} name="address" onChange={handleChange} type="text" placeholder="Endereço" />
          </div>

          <div className="mb-2 columns-3">
            <Input value={patient?.district} name="district" onChange={handleChange} type="text" placeholder="Bairro" />
            <Input value={patient?.city} name="city" onChange={handleChange} type="text" placeholder="Cidade" />
            <Select options={statesOptions} />
          </div>
          <div className="mt-6 columns-2">
            <Button onClick={onSubmit}>Salvar</Button>
            <button
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
  );
}
