import { useEffect, useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';

import IconButton from '../../components/buttonIcon';
import { Button } from '../../components/button';
import { InsidePage } from '../../components/insidePage';
import { formatDateBR, timeDefaultToString } from '../../helpers/handleDate';
import { FormAppointment } from './form';
import api from '../../services/api';
import { Appointment } from '../../interfaces';

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [modeEdit, setModeEdit] = useState<null | string>(null);
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
          date: formatDateBR(item.date as string),
        };
      });
      setAppointments(bookings);
    }

    getAppointments();
  }, []);

  async function editData(id: string) {
    setShowModalEdit(true);
    setModeEdit(id);
  }

  return (
    <>
      <FormAppointment setShowModal={setShowModal} show={showModal} />
      {modeEdit && <FormAppointment action="edit" id={modeEdit} setShowModal={setShowModalEdit} show={showModalEdit} />}

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
