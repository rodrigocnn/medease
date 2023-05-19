import { SetStateAction, useState } from 'react';
import { Input } from '../../components/input';
import api from '../../services/api';
import { Button } from '../../components/button';
import { toast } from 'react-toastify';

interface Role {
  name: string;
}

export function RolesCreate() {
  const [role, setRole] = useState<SetStateAction<Role>>();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const role = { name: event.currentTarget.value };
    setRole(role);
  };

  const onSumit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await api.store('roles', role);
    if (response.data) {
      setRole({ name: '' });
      toast('Registro Inserido com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  };

  return (
    <>
      <div className="relative h-full  overflow-x-auto   ">
        <div className="rounded">
          <div className="mb-2 columns-1">
            <Input value={role?.name} onChange={handleChange} type="text" placeholder="Nome" />
          </div>

          <div className="mt-6 columns-2">
            <Button onClick={onSumit}>Salvar</Button>
            <button
              type="button"
              className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#06afb1] focus:z-10  focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
