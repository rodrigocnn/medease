import ReactDataGrid from '@inovua/reactdatagrid-community';

import { CreateRole } from './create';
import { EditRole } from './edit';
import { useIndexRole } from '../../modules/roles/hooks/useIndexRole';
import { DeleteConfirm } from '../../components/delete-confirm';
import { InsidePage } from '../../components/inside-page';
import { Button } from '../../components/button';
import IconButton from '../../components/button-icon';

export function Roles() {
  const {
    editRole,
    openDeleteConfirm,
    deleteItem,
    setShowDeleteConfirm,
    setShowModal,
    showModal,
    setShowModalEdit,
    loading,
    showDeleteConfirm,
    rowIdSelected,
    roles,
  } = useIndexRole();
  const gridStyle = { minHeight: 550 };
  const filterValue = [{ name: 'description', operator: 'startsWith', type: 'string', value: '' }];

  const columns = [
    {
      name: 'name',
      header: 'Nome',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'edit',
      header: 'Editar',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ data }: any) => <IconButton icon="edit" onClick={() => editRole(data.id)} />,
    },
    {
      name: 'delete',
      header: 'Excluir',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ data }: any) => (
        <IconButton icon="delete" onClick={() => openDeleteConfirm(data.id)} />
      ),
    },
  ];

  return (
    <>
      <DeleteConfirm
        title="Excluir Cargo"
        setShowDeleteConfirm={setShowDeleteConfirm}
        deleteItem={deleteItem}
        show={showDeleteConfirm}
      />

      {showModal && <CreateRole />}

      {setShowModalEdit && <EditRole id={rowIdSelected} />}

      <InsidePage loading={loading} title="Cargos">
        <Button onClick={() => setShowModal(true)} type="button">
          Novo
        </Button>

        <ReactDataGrid
          pagination={'local'}
          style={gridStyle}
          pageSizes={[10]}
          limit={10}
          idProperty="id"
          dataSource={roles}
          columns={columns}
          defaultFilterValue={filterValue}
        />
      </InsidePage>
    </>
  );
}
