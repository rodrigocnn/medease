import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDataGrid from '@inovua/reactdatagrid-community';

import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import IconButton from '../../components/buttonIcon';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { toast } from 'react-toastify';
import api from '../../services/api';

interface Patient {
  name: string;
  phone: string;
  role: string;
}

export function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const filterValue = [{ name: 'description', operator: 'startsWith', type: 'string', value: '' }];
  const [rowIdSelected, setRowIdSelected] = useState('');

  const columns = [
    {
      name: 'description',
      header: 'Nome',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'phone',
      header: 'Telefone',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'role',
      header: 'Cargo',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'edit',
      header: 'Editar',
      maxWidth: 1000,
      defaultFlex: 1,
      render: (row: any) => <IconButton icon="edit" onClick={() => {}} />,
    },
    {
      name: 'delete',
      header: 'Excluir',
      maxWidth: 1000,
      defaultFlex: 1,
      render: (row: any) => <IconButton icon="delete" onClick={() => openDeleteConfirm(row.data.id)} />,
    },
  ];

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await api.index('professionals');
    setPatients(response.data);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('roles', rowIdSelected);
    console.log(response);
    if (response.status === 204) {
      toast('Registro Excluído com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  }

  return (
    <>
      <InsidePage title="Pacientes">
        <Link to="/pacientes/novo">
          <Button type="button">Novo</Button>
        </Link>

        <DeleteConfirm
          title="Excluir Cargo"
          setShowDeleteConfirm={setShowDeleteConfirm}
          deleteItem={deleteItem}
          show={showDeleteConfirm}
        />

        <ReactDataGrid idProperty="id" dataSource={patients} columns={columns} defaultFilterValue={filterValue} />
      </InsidePage>
    </>
  );
}
