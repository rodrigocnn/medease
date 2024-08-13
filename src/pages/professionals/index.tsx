import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import { InsidePage } from '../../components/InsidePage';
import IconButton from '../../components/ButtonIcon';
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
      name: 'edit',
      header: 'Editar',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ data }: any) => (
        <IconButton icon="edit" onClick={() => navigate(`/profissionais/editar/${data.id}`)} />
      ),
    },
    {
      name: 'delete',
      header: 'Excluir',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ data }: any) => <IconButton icon="delete" onClick={() => openDeleteConfirm(data.id)} />,
    },
  ];

  useEffect(() => {
    async function getProfessionals() {
      const response = await fetchAllData('professionals');
      setProfessionals(response.data);
    }
    getProfessionals();
  }, [fetchAllData, showDeleteConfirm]);

  async function openDeleteConfirm(id: string) {
    console.log(id);
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('professionals', rowIdSelected);
    if (response.data) {
      toast('Registro Excluído com Sucesso', { type: 'success' });
      setShowDeleteConfirm(false);
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
      setShowDeleteConfirm(false);
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
