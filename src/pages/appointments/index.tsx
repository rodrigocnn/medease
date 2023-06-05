import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Column, Table } from '../../components/table';
import IconButton from '../../components/buttonIcon';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { CreateAppointment } from './create';
import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import api from '../../services/api';

interface Appointment {
  id: string;
  start: string;
  end: string;
  date: string;
  patient: string;
  professional: string;
}

const columns = [
  {
    caption: 'Profissional',
  },

  {
    caption: 'Data',
  },
  {
    caption: 'Inicio',
  },
  {
    caption: 'Término',
  },
  {
    caption: 'Editar',
  },
  {
    caption: 'Excluir',
  },
];

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>();
  const [appointment, setAppointment] = useState<Appointment>();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowIdSelected, setRowIdSelected] = useState('');

  useEffect(() => {
    getAppointments();
  }, []);

  async function getAppointments() {
    const response = await api.index('appointments');
    setAppointments(response.data);
  }

  async function editData(id: string) {
    const response = await api.show('appointments', id);
    setShowModalEdit(true);
    setAppointment(response.data);
  }

  async function openDeleteConfirm(id: string) {
    setShowDeleteConfirm(true);
    setRowIdSelected(id);
  }

  async function deleteItem() {
    const response = await api.delete('appointments', rowIdSelected);
    if (response.data) {
      toast('Registro Excluído com Sucesso', { type: 'success' });
    } else {
      toast('Não foi possivel realizar operação', { type: 'error' });
    }
  }

  return (
    <>
      <DeleteConfirm
        title="Excluir Agenda"
        setShowDeleteConfirm={setShowDeleteConfirm}
        deleteItem={deleteItem}
        show={showDeleteConfirm}
      />
      <CreateAppointment setShowModal={setShowModal} show={showModal} />
      <InsidePage title="Agenda">
        <Button onClick={() => setShowModal(true)} type="button">
          Novo
        </Button>

        <Table columns={columns}>
          {appointments?.map((appointment: Appointment) => {
            return (
              <tr key={appointment.id} className="border-b bg-white  dark:border-gray-700 dark:bg-gray-800">
                <Column caption={appointment.professional} />
                <Column caption={appointment?.date} />
                <Column caption={appointment.start} />
                <Column caption={appointment?.end} />
                <Column icon={<IconButton icon="edit" onClick={() => editData(appointment.id)} />} />
                <Column icon={<IconButton icon="delete" onClick={() => openDeleteConfirm(appointment.id)} />} />
              </tr>
            );
          })}
        </Table>
      </InsidePage>
    </>
  );
}
