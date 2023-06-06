import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CreateService } from './create';
import { Column, Table } from '../../components/table';
import IconButton from '../../components/buttonIcon';
import { EditService } from './edit';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import api from '../../services/api';

interface Service {
  id: string;
  name: string;
  price: string;
  role: string;
}

const columns = [
  {
    caption: 'Nome',
  },

  {
    caption: 'Preço',
  },
  {
    caption: 'Editar',
  },
  {
    caption: 'Excluir',
  },
];

export function Services() {
  const [services, setServices] = useState<Service[]>();
  const [service, setService] = useState<Service>();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowIdSelected, setRowIdSelected] = useState('');

  useEffect(() => {
    getServices();
  }, []);

  async function getServices() {
    const response = await api.index('services');
    setServices(response.data);
  }

  async function editData(id: string) {
    const response = await api.show('services', id);
    setShowModalEdit(true);
    setService(response.data);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('services', rowIdSelected);
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
      <CreateService setShowModal={setShowModal} show={showModal} />

      {service && <EditService service={service} setShowModal={setShowModalEdit} show={showModalEdit} />}

      <InsidePage title="Serviços">
        <Button onClick={() => setShowModal(true)} type="button">
          Novo
        </Button>

        <Table columns={columns}>
          {services?.map((service: Service) => {
            return (
              <tr key={service.id} className="table-row-default">
                <Column caption={service.name} />
                <Column caption={service.price} />
                <Column icon={<IconButton icon="edit" onClick={() => editData(service.id)} />} />
                <Column icon={<IconButton icon="delete" onClick={() => openDeleteConfirm(service.id)} />} />
              </tr>
            );
          })}
        </Table>
      </InsidePage>
    </>
  );
}
