import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Column, Table } from '../../components/table';
import IconButton from '../../components/buttonIcon';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { CreateAppointment } from './create';
import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import { EditAppointment } from './edit';
import api from '../../services/api';

interface Appointment {
  id: string;
  start?: Date | null;
  end?: Date | null;
  date?: Date | null;
  patient?: string;
  professional?: string;
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
    const editAppointment = { ...response.data };
    editAppointment.date = new Date(response.data.date);
    editAppointment.start = new Date(response.data.start);
    editAppointment.end = new Date(response.data.end);

    setShowModalEdit(true);
    setAppointment(editAppointment);
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

      {appointment && (
        <EditAppointment appointment={appointment} setShowModal={setShowModalEdit} show={showModalEdit} />
      )}

      <InsidePage title="Agenda">
        <Button onClick={() => setShowModal(true)} type="button">
          Novo
        </Button>

        <Table columns={columns}>
          {appointments?.map((appointment: Appointment) => {
            return (
              <tr key={appointment.id} className="table-row-default">
                <Column caption={appointment.professional} />
                <Column caption={appointment.date?.toString()} />
                <Column caption={appointment.start?.toString()} />
                <Column caption={appointment.end?.toString()} />
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
