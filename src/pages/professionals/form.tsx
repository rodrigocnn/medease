import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { Input } from '../../components/input';
import { Select } from '../../components/select';
import { Button } from '../../components/button';
import { Options, Professional, Role } from '../../interfaces';
import { Loading } from '../../components/loading';
import api from '../../services/api';
import ProfessionalMap from '../../mappers/ProfessionalMap';
import useApi from '../../hooks/useApi';

const statesOptions = [
  { label: 'Acre', value: 'AC' },
  { label: 'Bahia', value: 'BA' },
];

interface ProfessionalFormProps {
  action?: 'create' | 'edit';
}

export function ProfessionalForm({ action = 'create' }: ProfessionalFormProps) {
  const [professional, setProfessional] = useState<Professional>();
  const [roles, setRoles] = useState<Options[]>([]);
  const { loading, fetchDataShow, sendDataPost } = useApi();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (action === 'edit') {
      async function getProfessional() {
        const response = await fetchDataShow('professionals/show', id as string);
        setProfessional(response.data);
      }
      getProfessional();
    }
  }, []);

  useEffect(() => {
    getRoles();
  }, []);

  async function getRoles() {
    const response = await api.index('roles');
    const optionsRole = [{ label: 'Selecione um Cargo', value: '0' }];
    const updatedOptionsRole = response.data.map((item: Role) => ({
      label: item.description,
      value: item.id,
    }));
    setRoles([...optionsRole, ...updatedOptionsRole]);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    setProfessional({ ...professional, [fieldName]: value });
  };

  const onSubmit = async (event: React.FormEvent<EventTarget | HTMLFormElement>) => {
    event.preventDefault();
    if (professional) {
      if (action === 'edit') {
        const response = await api.update('professionals', id as string, ProfessionalMap.toPersistent(professional));
        if (response.data) {
          toast('Registro Atualizado com Sucesso', { type: 'success' });
          navigate('/profissionais');
        } else {
          toast('Não foi possivel realizar operação', { type: 'error' });
        }
      } else {
        const response = await sendDataPost('professionals', ProfessionalMap.toPersistent(professional));
        if (response.data) {
          toast('Registro Inserido com Sucesso', { type: 'success' });
          navigate('/profissionais');
        } else {
          toast('Não foi possivel realizar operação', { type: 'error' });
        }
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {loading && <Loading />}

      <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Dados Pessoais</div>

      <div className="mb-2 columns-2">
        <Input value={professional?.name} name="name" onChange={handleChange} type="text" placeholder="Nome" />
        <Input value={professional?.email} name="email" onChange={handleChange} type="text" placeholder="Email" />
      </div>

      <div className="mb-2 columns-2">
        <Input
          value={professional?.date_of_birth}
          name="date_of_birth"
          onChange={handleChange}
          type="text"
          placeholder="Data de Nascimento"
        />
        <Input value={professional?.phone} name="phone" onChange={handleChange} type="text" placeholder="Telefone" />
      </div>

      <div className="mb-2 columns-3">
        <Input value={professional?.cpf} name="cpf" onChange={handleChange} type="text" placeholder="CPF" />
        <Input value={professional?.rg} name="rg" onChange={handleChange} type="text" placeholder="RG" />
        <Select onChange={handleChange} value={professional?.role} name="role" options={roles} />
      </div>

      <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">Endereço</div>

      <div className="mb-2 columns-1">
        <Input
          value={professional?.address}
          name="address"
          onChange={handleChange}
          type="text"
          placeholder="Endereço"
        />
      </div>

      <div className="mb-2 columns-3">
        <Input
          value={professional?.district}
          name="district"
          onChange={handleChange}
          type="text"
          placeholder="Bairro"
        />
        <Input value={professional?.city} name="city" onChange={handleChange} type="text" placeholder="Cidade" />
        <Select onChange={handleChange} name="state" options={statesOptions} />
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
  );
}
