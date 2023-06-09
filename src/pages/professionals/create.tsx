import { useState } from 'react';
import { Input } from '../../components/input';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { InsidePage } from '../../components/insidePage';
import { Select } from '../../components/select';
import { Button } from '../../components/button';

interface Professional {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  rg?: string;
  phone?: string;
  data_nascimento?: string;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  role?: string;
}

const roleOptions = [
  { label: 'Selecione Cargo', value: '0' },
  { label: 'Manicure', value: '1' },
  { label: 'Fisio', value: '2' },
];

export function CreateProfessional() {
  const [professional, setProfessional] = useState<Professional>();

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Professional = { ...professional, [fieldName]: value };
    setProfessional(updatedState);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Prof', professional);
    const response = await api.store('professionals', professional);
    if (response.data) {
      toast('Registro Atualizado com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  };

  return (
    <>
      <InsidePage title="Cadastrar Profissional">
        <form onSubmit={onSubmit}>
          <div className="mb-5  w-full bg-gray-200 p-1">Dados Pessoais</div>
          <div className="mb-2 columns-1">
            <Input value={professional?.name} type="text" name="name" onChange={handleChange} placeholder="Nome" />
          </div>
          <div className="mb-2 columns-1">
            <Input value={professional?.email} type="text" name="email" onChange={handleChange} placeholder="Email" />
          </div>

          <div className="mb-2 columns-3">
            <Input
              value={professional?.data_nascimento}
              type="text"
              name="data_nascimento"
              onChange={handleChange}
              placeholder="Data de Nascimento"
            />
            <Input value={professional?.cpf} type="text" name="cpf" onChange={handleChange} placeholder="CPF" />
            <Input value={professional?.rg} type="text" name="rg" onChange={handleChange} placeholder="RG" />
          </div>
          <div className="mb-2 columns-2">
            <Select
              onChange={handleChange}
              placeholder="Selecione Cargo"
              name="role"
              id="select_role"
              options={roleOptions}
            />
            <Input value={professional?.phone} type="text" name="rg" onChange={handleChange} placeholder="Telefone" />
          </div>

          <div className="mb-5 mt-5  w-full bg-gray-200 p-1">Endereço</div>

          <div className="mb-2 columns-2">
            <Input
              value={professional?.endereco}
              type="text"
              name="endereco"
              onChange={handleChange}
              placeholder="Endereço"
            />
            <Input
              value={professional?.bairro}
              type="text"
              name="bairro"
              onChange={handleChange}
              placeholder="Bairro"
            />
          </div>

          <div className="mb-2 columns-2">
            <Input
              value={professional?.cidade}
              type="text"
              name="cidade"
              onChange={handleChange}
              placeholder="Cidade"
            />
            <Input
              value={professional?.estado}
              type="text"
              name="estado"
              onChange={handleChange}
              placeholder="Estado"
            />
          </div>

          <div className="mt-6 columns-2">
            <Button type="submit">Salvar</Button>
            <button
              onClick={() => {}}
              type="button"
              className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5
                          text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#06afb1]
                          focus:z-10  focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600
                          dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                          dark:focus:ring-gray-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </InsidePage>
    </>
  );
}
