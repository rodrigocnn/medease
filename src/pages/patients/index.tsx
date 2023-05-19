import { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { Column, Table } from "../../components/table";
import { Button } from "../../components/button";


interface Patient {
  name: string;
  phone: string;
  role: string;
}

const columns = [
  {
    caption: "Nome",
  },
  {
    caption: "Telefone",
  },
  {
    caption: "Cargo",
  },
  {
    caption: "Editar",
  },
  {
    caption: "Excluir",
  },
];

export function Patients() {
  const [patients, setPatients] = useState<Patient[]>();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await api.index("professionals");
    setPatients(response.data);
  }

  return (
    <>
      <div className="h-24 bg-[#06afb1]">
        <div className="h-24 min-h-full p-5 text-white font-semibold">
          Pacientes
        </div>
      </div>
      <div className="relative overflow-x-auto  h-full p-5  top-[-3rem] ">
        <div className="bg-white p-5 rounded">

          <Link to="/pacientes/novo"><Button type="button">Novo</Button></Link>

          <Table columns={columns}>
            {patients?.map((patient: Patient) => {
              return (
                <tr key={patient.name} className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700">
                  <Column caption={patient.name} />
                  <Column caption={patient.phone} />
                  <Column caption={patient.role} />
                  <Column icon={<FaRegEdit />} />
                  <Column icon={<FaTrashAlt />} />
                </tr>
              );
            })}
          </Table>
        </div>
      </div>
    </>
  );
}
