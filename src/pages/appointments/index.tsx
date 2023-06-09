import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import IconButton from '../../components/buttonIcon';
import { DeleteConfirm } from '../../components/DeleteConfirm';
import { CreateAppointment } from './create';
import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import { EditAppointment } from './edit';
import api from '../../services/api';
import ReactDataGrid from '@inovua/reactdatagrid-community';

interface Appointment {
  id: string;
  start?: Date | null;
  end?: Date | null;
  date?: Date | null;
  patient?: string;
  professional?: string;
}

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointment, setAppointment] = useState<Appointment>();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowIdSelected, setRowIdSelected] = useState('');

  const filterValue = [{ name: 'professional', operator: 'startsWith', type: 'string', value: '' }];

  const columns = [
    {
      name: 'professional',
      header: 'Profissional',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'date',
      header: 'Data',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'start',
      header: 'Início',
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: 'end',
      header: 'Término',
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

        <ReactDataGrid idProperty="id" dataSource={appointments} columns={columns} defaultFilterValue={filterValue} />
      </InsidePage>
    </>
  );
}
