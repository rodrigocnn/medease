import ReactDataGrid from '@inovua/reactdatagrid-community';

import { CreateService } from './create';
import { EditService } from './edit';
import { DeleteConfirm } from '../../components/delete-confirm';
import { Button } from '../../components/button';
import { InsidePage } from '../../components/inside-page';
import { useIndexServices } from '../../modules/services/hooks/useIndexServices';
import IconButton from '../../components/button-icon';
import { formatToCurrency } from '../../shared/utils/currency';

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
      header: 'Preço R$',
      minWidth: 50,
      defaultFlex: 2,
      render: ({ data }: any) => <span>{formatToCurrency(data.price)}</span>,
    },
    {
      name: 'edit',
      header: 'Editar',
      maxWidth: 1000,
      defaultFlex: 1,
      render: ({ data }: any) => <IconButton icon="edit" onClick={() => editData(data.id)} />,
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

      {showModal && <CreateService />}

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
