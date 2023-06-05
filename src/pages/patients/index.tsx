import { useEffect, useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Column, Table } from '../../components/table';
import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';

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
      <InsidePage title="Pacientes">
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
      </InsidePage>
    </>
  );
}
