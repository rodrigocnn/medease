import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import IconButton from '../../components/buttonIcon';

import { CreateAppointment } from './create';
import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import { EditAppointment } from './edit';
import api from '../../services/api';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import { formatDateBR, timeDefaultToString } from '../../helpers/handleDate';

interface Appointment {
  id: string;
  start?: string | number;
  end?: string | number;
  date: string;
  patient?: string;
  professional?: string;
}

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointment, setAppointment] = useState<Appointment>();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const gridStyle = { minHeight: 370 };

  const filterValue = [
    { name: 'professional_name', operator: 'startsWith', type: 'string', value: '' },
    { name: 'date', operator: 'startsWith', type: 'string', value: '' },
  ];

  const columns = [
    {
      name: 'professional_name',
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
  ];

  useEffect(() => {
    async function getAppointments() {
      const response = await api.index('bookings');
      const bookings: Appointment[] = response.data.map((item: Appointment) => {
        return {
          ...item,
          start: timeDefaultToString(item.start as number),
          end: timeDefaultToString(item.end as number),
          date: formatDateBR(item.date),
        };
      });
      setAppointments(bookings);
    }

    getAppointments();
  }, []);

  async function editData(id: string) {
    const response = await api.show('appointments', id);
    const editAppointment = { ...response.data };
    editAppointment.date = new Date(response.data.date);
    editAppointment.start = new Date(response.data.start);
    editAppointment.end = new Date(response.data.end);
    setShowModalEdit(true);
    setAppointment(editAppointment);
  }

  return (
    <>
      <CreateAppointment setShowModal={setShowModal} show={showModal} />

      {appointment && (
        <EditAppointment appointment={appointment} setShowModal={setShowModalEdit} show={showModalEdit} />
      )}

      <InsidePage title="Agenda">
        <Button onClick={() => setShowModal(true)} type="button">
          Novo
        </Button>

        <ReactDataGrid
          style={gridStyle}
          idProperty="id"
          dataSource={appointments}
          columns={columns}
          defaultFilterValue={filterValue}
          pagination={'local'}
          pageSizes={[10]}
        />
      </InsidePage>
    </>
  );
}
