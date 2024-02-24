import ReactDataGrid from '@inovua/reactdatagrid-community';

import { CreateService } from './create';
import { EditService } from './edit';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { Button } from '../../components/Button';
import { InsidePage } from '../../components/InsidePage';
import { useIndexServices } from '../../modules/services/hooks/useIndexServices';
import IconButton from '../../components/ButtonIcon';

export function Services() {
  const gridStyle = { minHeight: 370 };
  const filterValue = [{ name: 'description', operator: 'startsWith', type: 'string', value: '' }];

  const {
    deleteItem,
    editData,
    openDeleteConfirm,

    services,
    setShowDeleteConfirm,
    showDeleteConfirm,
    rowIdSelected,
    showModalEdit,
    setShowModal,
    showModal,
    loading,
  } = useIndexServices();

  const columns = [
    {
      name: 'name',
      header: 'Nome',
      minWidth: 50,
      defaultFlex: 2,
    },

    {
      name: 'price',
      header: 'Preço',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'id',
      header: 'Editar',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ value }: any) => <IconButton icon="edit" onClick={() => editData(value)} />,
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

      {showModal && <CreateService setShowModal={setShowModal} show={showModal} />}

      {showModalEdit && <EditService id={rowIdSelected} />}

      <InsidePage loading={loading} title="Serviços">
        <Button onClick={() => setShowModal(true)} type="button">
          Novo
        </Button>

        <ReactDataGrid
          pagination={'local'}
          style={gridStyle}
          pageSizes={[10]}
          idProperty="id"
          dataSource={services}
          columns={columns}
          defaultFilterValue={filterValue}
        />
      </InsidePage>
    </>
  );
}
