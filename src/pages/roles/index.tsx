import ReactDataGrid from '@inovua/reactdatagrid-community';

import IconButton from '../../components/ButtonIcon';
import { Button } from '../../components/Button';
import { CreateRole } from './create';
import { EditRole } from './edit';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { InsidePage } from '../../components/InsidePage';

import { useIndexRole } from '../../modules/roles/hooks/useIndexRole';

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
  const gridStyle = { minHeight: 370 };
  const filterValue = [{ name: 'description', operator: 'startsWith', type: 'string', value: '' }];

  const columns = [
    {
      name: 'name',
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
      name: 'idDelete',
      header: 'Excluir',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ value }: any) => <IconButton icon="delete" onClick={() => openDeleteConfirm(value)} />,
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
          idProperty="id"
          dataSource={roles}
          columns={columns}
          defaultFilterValue={filterValue}
        />
      </InsidePage>
    </>
  );
}
