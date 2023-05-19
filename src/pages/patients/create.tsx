import {  useState } from "react";
import { toast } from "react-toastify";
import {  useNavigate} from "react-router-dom";


import api from "../../services/api";
import { Input } from "../../components/input";
import { Select } from "../../components/select";

interface patient {
  name?: string
  email?:string
  date_of_birth?:string
  phone?: string
  cpf?:string
  rg?:string
  gender?:string
  address?:string
  district?:string
  city?:string
  state?:string
}

export function PatientsCreate() {

  const [patient, setPatient] = useState<patient>();
  const statesOptions = [{ label: "Masculino", value: "M" },{ label: "Feminino", value: "F" }];
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name
    const value = event.target.value
    setPatient({...patient, [fieldName]: value});

  };

  const onSubmit = async (event: React.FormEvent<EventTarget | HTMLFormElement>)=>{
    event.preventDefault()
    const response = await api.store("patients", patient);
    if(response.data){
      toast('Registro Inserido com Sucesso', {type:"success"})
      navigate("/pacientes")
    } else{
      toast('Não foi possivel realizar operação', {type:"error"})
    }

  }

  return (
    <>
      <div className="h-24 bg-[#06afb1]">
        <div className="h-24 min-h-full p-5 text-white font-semibold">
          Cadastrar Paciente
        </div>
      </div>

      <div className="relative overflow-x-auto  h-full p-5 top-[-3rem]  ">
        <div className="bg-white p-5 rounded">
          <div className="text-[#06afb1] font-bold p-1   mt-4 mb-4 ">Geral</div>
          <form onSubmit={onSubmit}>
              <div className="columns-2 mb-2">
                <Input value={patient?.name} name="name" onChange={handleChange}  type="text" placeholder="Nome" />
                <Input value={patient?.email} name="email"onChange={handleChange} type="text" placeholder="Email" />
              </div>

              <div className="columns-2 mb-2">
                <Input  value={patient?.date_of_birth} name="date_of_birth" onChange={handleChange} type="text" placeholder="Data de Nascimento" />
                <Input  value={patient?.phone} name="phone" onChange={handleChange} type="text" placeholder="Telefone" />
              </div>

              <div className="columns-3 mb-2">
                <Input value={patient?.cpf} name="cpf" onChange={handleChange} type="text" placeholder="CPF" />
                <Input value={patient?.rg} name="rg" onChange={handleChange} type="text" placeholder="RG" />
                <Select options={statesOptions} />
              </div>

              <div className="text-[#06afb1] font-bold p-1   mt-4 mb-4 ">
                Endereço
              </div>

              <div className="columns-1 mb-2">
                <Input  value={patient?.address} name="address" onChange={handleChange} type="text" placeholder="Endereço" />
              </div>

              <div className="columns-3 mb-2">
                <Input value={patient?.district} name="district" onChange={handleChange}  type="text" placeholder="Bairro" />
                <Input value={patient?.city} name="city" onChange={handleChange} type="text" placeholder="Cidade" />
                <Select options={statesOptions} />

              </div>
              <div className="columns-2 mt-6">
                <button
                  type="submit"
                  className="text-white bg-[#01d8da] hover:bg-[#06afb1] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#06afb1]  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
