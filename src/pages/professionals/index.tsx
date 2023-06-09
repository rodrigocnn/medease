import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import IconButton from '../../components/buttonIcon';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import api from '../../services/api';
import ReactDataGrid from '@inovua/reactdatagrid-community';

interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export function Professionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [rowIdSelected, setRowIdSelected] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const filterValue = [{ name: 'description', operator: 'startsWith', type: 'string', value: '' }];
  const columns = [
    {
      name: 'description',
      header: 'Nome',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'email',
      header: 'Email',
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
    getProfessionals();
  }, []);

  async function getProfessionals() {
    const response = await api.index('professionals');
    setProfessionals(response.data);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('professionals', rowIdSelected);
    if (response.data) {
      toast('Registro Excluído com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  }

  return (
    <>
      <DeleteConfirm
        title="Excluir Cargo"
        setShowDeleteConfirm={setShowDeleteConfirm}
        deleteItem={deleteItem}
        show={showDeleteConfirm}
      />

      <InsidePage title="Profissionais">
        <Button onClick={() => navigate('/profissionais/novo')} type="button">
          Novo
        </Button>

        <ReactDataGrid idProperty="id" dataSource={professionals} columns={columns} defaultFilterValue={filterValue} />
      </InsidePage>
    </>
  );
}
