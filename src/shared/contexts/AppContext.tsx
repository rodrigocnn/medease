import { ReactNode, createContext, useMemo, useState } from 'react';
import { Appointment } from '../../interfaces';
import { timeNowToStringAM } from '../../helpers/handleDate';

export const AppContext = createContext<any>({
  showModal: false,
  setShowModal: () => {},
  showModalEdit: false,
  setShowModalEdit: () => {},
  appointment: {},
  setAppointment: () => {},
});

const INITIAL_STATE_APPOINTMENT = {
  id: '',
  start: timeNowToStringAM(),
  end: timeNowToStringAM(),
  date: '',
  patient: -1,
  service: -1,
  status: 1,
  professional: -1,
  datepicker: new Date(),
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<Appointment>(INITIAL_STATE_APPOINTMENT);

  const contextValue = useMemo(
    () => ({
      showModal,
      setShowModal,
      showModalEdit,
      setShowModalEdit,
      appointment,
      setAppointment,
    }),
    [showModal, setShowModal, showModalEdit, setShowModalEdit, appointment, setAppointment]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
