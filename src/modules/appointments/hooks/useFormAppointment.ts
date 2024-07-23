import { useState } from 'react';
import { Appointment, Options } from '../../../interfaces';
import { timeNowToStringAM } from '../../../helpers/handleDate';

export function useFormAppointment() {
  const INITIA_STATE = {
    datepicker: new Date(),
    start: timeNowToStringAM(),
    end: timeNowToStringAM(),
    status: '1',
  };

  const [appointment, setAppointment] = useState<Appointment>(INITIA_STATE);

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const fieldName = event.currentTarget.name;
    const value = event.currentTarget.value;
    const updatedState: Appointment = { ...appointment, [fieldName]: value };
    setAppointment(updatedState);
  };

  const handleDate = (date: Date | null, fieldName: string) => {
    const updatedState: Appointment = { ...appointment, [fieldName]: date };
    setAppointment(updatedState);
  };

  const getSelectOptions = <T>(items: T[]): Options[] => {
    if (!items) {
      console.error('Items is undefined');
      return [];
    }
    const options = items.map(item => {
      return { label: (item as any).name, value: (item as any).id };
    });
    options.unshift({ label: 'Selecione uma opção', value: 0 });
    return options;
  };

  return {
    handleChange,
    handleDate,
    getSelectOptions,
    appointment,
  };
}
