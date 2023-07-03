import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CreateService } from './create';
import IconButton from '../../components/buttonIcon';
import { EditService } from './edit';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import api from '../../services/api';
import ReactDataGrid from '@inovua/reactdatagrid-community';

interface Service {
  id: string;
  name: string;
  price: string;
  role: string;
}

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [service, setService] = useState<Service>();
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
      name: 'price',
      header: 'Preço',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'edit',
      header: 'Editar',
      maxWidth: 1000,
      defaultFlex: 1,
      render: (row: any) => <IconButton icon="edit" onClick={() => editData(row.data.id)} />,
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
    getServices();
  }, []);

  async function getServices() {
    const response = await api.index('services');
    setServices(response.data);
  }

  async function editData(id: string) {
    const response = await api.show('services/show', id);
    setShowModalEdit(true);
    setService(response.data);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('services', rowIdSelected);
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
      <CreateService setShowModal={setShowModal} show={showModal} />

      {service && <EditService service={service} setShowModal={setShowModalEdit} show={showModalEdit} />}

      <InsidePage title="Serviços">
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
