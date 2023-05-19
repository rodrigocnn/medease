import { SetStateAction, useState } from "react";
import { Input } from "../../components/input";
import api from "../../services/api";
import { Button } from "../../components/button";
import { toast } from "react-toastify";

interface Role {
  name: string
}

export function RolesCreate() {
  const [role, setRole] = useState<SetStateAction<Role>>();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const role = {name: event.currentTarget.value}
    setRole(role);
  };

  const onSumit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const response = await api.store("roles", role);
    if(response.data){
      setRole({name:''})
      toast('Registro Inserido com Sucesso', {type:"success"})
    } else{
      toast('Não foi possivel realizar operação', {type:"error"})
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto  h-full   ">
        <div className="rounded">
          <div className="columns-1 mb-2">
            <Input value={role?.name} onChange={handleChange} type="text" placeholder="Nome" />
          </div>

          <div className="columns-2 mt-6">
            <Button  onClick={onSumit}>Salvar</Button>
            <button type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#06afb1]  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
