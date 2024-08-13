import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import { InsidePage } from '../../components/InsidePage';
import IconButton from '../../components/ButtonIcon';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { toast } from 'react-toastify';
import api from '../../services/api';
import useApi from '../../hooks/useApi';

interface Patient {
  name: string;
  phone: string;
  role: string;
}

export function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const filterValue = [{ name: 'name', operator: 'startsWith', type: 'string', value: '' }];
  const { loading, fetchAllData } = useApi();
  const [rowIdSelected, setRowIdSelected] = useState('');
  const navigate = useNavigate();

  const gridStyle = { minHeight: 370 };

  const columns = [
    {
      name: 'name',
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
      name: 'id',
      header: 'Editar',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ data }: any) => (
        <IconButton icon="edit" onClick={() => navigate(`/pacientes/editar/${data.id}`)} />
      ),
    },
    {
      name: 'id',
      header: 'Excluir',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ data }: any) => (
        <IconButton icon="delete" onClick={() => openDeleteConfirm(data.id)} />
      ),
    },
  ];

  useEffect(() => {
    async function getPatients() {
      const response = await fetchAllData('patients');
      setPatients(response.data);
    }
    getPatients();
  }, [showDeleteConfirm, fetchAllData]);

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('patients', rowIdSelected);

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
      <InsidePage loading={loading} title="Pacientes">
        <Link to="/pacientes/novo">
          <Button type="button">Novo</Button>
        </Link>

        <DeleteConfirm
          title="Excluir Cargo"
          setShowDeleteConfirm={setShowDeleteConfirm}
          deleteItem={deleteItem}
          show={showDeleteConfirm}
        />

        <ReactDataGrid
          idProperty="id"
          style={gridStyle}
          dataSource={patients}
          columns={columns}
          defaultFilterValue={filterValue}
          activateRowOnFocus={false}
          pagination={'local'}
          pageSizes={[10]}
        />
      </InsidePage>
    </>
  );
}
