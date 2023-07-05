import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactDataGrid from '@inovua/reactdatagrid-community';

import { Button } from '../../components/button';
import { CreateRole } from './create';
import { EditRole } from './edit';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { Role } from '../../interfaces';
import { InsidePage } from '../../components/insidePage';
import IconButton from '../../components/buttonIcon';
import useApi from '../../hooks/useApi';

export function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowIdSelected, setRowIdSelected] = useState('');
  const gridStyle = { minHeight: 370 };
  const filterValue = [{ name: 'description', operator: 'startsWith', type: 'string', value: '' }];
  const { loading, fetchAllData, deleteData } = useApi();

  const columns = [
    {
      name: 'description',
      header: 'Nome',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'id',
      header: 'Editar',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ value }: any) => <IconButton icon="edit" onClick={() => editRole(value)} />,
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
    async function getRoles() {
      const response = await fetchAllData('roles');
      setRoles(response.data);
    }
    getRoles();
  }, [showDeleteConfirm, showModal, showModalEdit, fetchAllData]);

  async function editRole(id: string) {
    setShowModalEdit(true);
    setRowIdSelected(id);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await deleteData('roles', rowIdSelected);
    if (response.status === 204) {
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

      <CreateRole setShowModal={setShowModal} show={showModal} />

      {showModalEdit && <EditRole id={rowIdSelected} setShowModal={setShowModalEdit} show={showModalEdit} />}

      <InsidePage loading={loading} title="Cargos">
        <Button onClick={() => setShowModal(true)} type="button">
          Novo
        </Button>

        <ReactDataGrid
          pagination={'local'}
          style={gridStyle}
          pageSizes={[10]}
          idProperty="id"
          dataSource={roles}
          columns={columns}
          defaultFilterValue={filterValue}
        />
      </InsidePage>
    </>
  );
}
