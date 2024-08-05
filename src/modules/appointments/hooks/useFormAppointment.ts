import { useContext } from 'react';
import { Appointment, Options } from '../../../interfaces';

import { AppContext } from '../../../shared/contexts/AppContext';

export function useFormAppointment() {
  const { appointment, setAppointment } = useContext(AppContext);

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
  };
}
