import { useEffect, useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Column, Table } from '../../components/table';
import { Button } from '../../components/button';

interface Patient {
  name: string;
  phone: string;
  role: string;
}

const columns = [
  {
    caption: 'Nome',
  },
  {
    caption: 'Telefone',
  },
  {
    caption: 'Cargo',
  },
  {
    caption: 'Editar',
  },
  {
    caption: 'Excluir',
  },
];

export function Patients() {
  const [patients, setPatients] = useState<Patient[]>();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await api.index('professionals');
    setPatients(response.data);
  }

  return (
    <>
      <div className="h-24 bg-[#06afb1]">
        <div className="h-24 min-h-full p-5 font-semibold text-white">Pacientes</div>
      </div>
      <div className="relative top-[-3rem]  h-full overflow-x-auto  p-5 ">
        <div className="rounded bg-white p-5">
          <Link to="/pacientes/novo">
            <Button type="button">Novo</Button>
          </Link>

          <Table columns={columns}>
            {patients?.map((patient: Patient) => {
              return (
                <tr key={patient.name} className="border-b bg-white  dark:border-gray-700 dark:bg-gray-800">
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
