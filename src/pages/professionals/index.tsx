import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import IconButton from '../../components/buttonIcon';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import api from '../../services/api';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import useApi from '../../hooks/useApi';

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
  const { loading, fetchAllData } = useApi();
  const gridStyle = { minHeight: 370 };
  const navigate = useNavigate();
  const filterValue = [{ name: 'name', operator: 'startsWith', type: 'string', value: '' }];
  const columns = [
    {
      name: 'name',
      header: 'Nome',
      minWidth: 50,
      defaultFlex: 2,
    },

    {
      name: 'roleName',
      header: 'Cargo',
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
      name: 'id',
      header: 'Editar',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ value }: any) => <IconButton icon="edit" onClick={() => navigate(`/profissionais/editar/${value}`)} />,
    },
    {
      name: 'id',
      header: 'Excluir',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ value }: any) => <IconButton icon="delete" onClick={() => openDeleteConfirm(value)} />,
    },
  ];

  useEffect(() => {
    async function getProfessionals() {
      const response = await fetchAllData('professionals');
      setProfessionals(response.data);
    }
    getProfessionals();
  }, [fetchAllData]);

  async function openDeleteConfirm(id: string) {
    console.log(id);
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('professionals', rowIdSelected);
    if (response.status === 204) {
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

      <InsidePage loading={loading} title="Profissionais">
        <Button onClick={() => navigate('/profissionais/novo')} type="button">
          Novo
        </Button>

        <ReactDataGrid
          pagination={'local'}
          style={gridStyle}
          pageSizes={[10]}
          idProperty="id"
          dataSource={professionals}
          columns={columns}
          defaultFilterValue={filterValue}
        />
      </InsidePage>
    </>
  );
}
