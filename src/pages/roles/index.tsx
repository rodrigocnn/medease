import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Column, Table } from '../../components/table';
import { Button } from '../../components/button';
import { CreateRole } from './create';
import { EditRole } from './edit';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import IconButton from '../../components/buttonIcon';
import api from '../../services/api';
import { InsidePage } from '../../components/insidePage';

interface Role {
  id: string;
  name: string;
}

const columns = [
  {
    caption: 'Nome',
  },
  {
    caption: 'Editar',
  },
  {
    caption: 'Excluir',
  },
];

export function Roles() {
  const [roles, setRoles] = useState<Role[]>();
  const [role, setRole] = useState<Role>();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowIdSelected, setRowIdSelected] = useState('');

  useEffect(() => {
    getRoles();
  }, [showDeleteConfirm, showModal]);

  async function getRoles() {
    const response = await api.index('roles');
    setRoles(response.data);
  }

  async function editRole(id: string) {
    const response = await api.show('roles', id);
    setShowModalEdit(true);
    setRole(response.data);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('roles', rowIdSelected);
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

      <CreateRole setShowModal={setShowModal} show={showModal} />

      {role && <EditRole role={role} setShowModal={setShowModalEdit} show={showModalEdit} />}

      <InsidePage title="Cargos">
        <Button onClick={() => setShowModal(true)} type="button">
          Novo
        </Button>

        <Table columns={columns}>
          {roles?.map((role: Role) => {
            return (
              <tr key={role.id} className="border-b bg-white  dark:border-gray-700 dark:bg-gray-800">
                <Column caption={role.name} />
                <Column icon={<IconButton icon="edit" onClick={() => editRole(role.id)} />} />
                <Column icon={<IconButton icon="delete" onClick={() => openDeleteConfirm(role.id)} />} />
              </tr>
            );
          })}
        </Table>
      </InsidePage>
    </>
  );
}
