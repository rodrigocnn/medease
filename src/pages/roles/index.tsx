import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactDataGrid from '@inovua/reactdatagrid-community';

import { Button } from '../../components/button';
import { CreateRole } from './create';
import { EditRole } from './edit';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import IconButton from '../../components/buttonIcon';

import { InsidePage } from '../../components/insidePage';
import api from '../../services/api';

interface Role {
  id: string;
  description: string;
}

export function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [role, setRole] = useState<Role>();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowIdSelected, setRowIdSelected] = useState('');
  const gridStyle = { minHeight: 370 };
  const filterValue = [{ name: 'description', operator: 'startsWith', type: 'string', value: '' }];

  const columns = [
    {
      name: 'description',
      header: 'Nome',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'edit',
      header: 'Editar',
      maxWidth: 1000,
      defaultFlex: 1,
      render: (row: any) => <IconButton icon="edit" onClick={() => editRole(row.data.id)} />,
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
    getRoles();
  }, [showDeleteConfirm, showModal]);

  async function getRoles() {
    const response = await api.index('roles');
    setRoles(response.data);
  }

  async function editRole(id: string) {
    const response = await api.show('roles/show', id);
    setShowModalEdit(true);
    setRole(response.data);
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
      <DeleteConfirm
        title="Excluir Cargo"
        setShowDeleteConfirm={setShowDeleteConfirm}
        deleteItem={deleteItem}
        show={showDeleteConfirm}
      />

      <CreateRole setShowModal={setShowModal} show={showModal} />

      {role && <EditRole role={role} setShowModal={setShowModalEdit} show={showModalEdit} />}

      <InsidePage title="Cargos">
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
