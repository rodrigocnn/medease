export const stringToDate = (hour: string) => {
  const [hours, minutes] = hour.split(':');
  const dateObj = new Date();
  dateObj.setHours(Number(hours));
  dateObj.setMinutes(Number(minutes));

  return dateObj.getTime();
};

export const dateToString = (date: number) => {
  const newDate = new Date(date);
  const hour = newDate.getHours();
  const hourString = hour.toString().padStart(2, '0');
  return hourString;
};

export const timeDefaultToString = (hour: number) => {
  const dateObj: Date = new Date(hour);
  const hours: string = dateObj.getHours().toString().padStart(2, '0');
  const minutes: string = dateObj.getMinutes().toString().padStart(2, '0');
  const timeString: string = hours + ':' + minutes;
  return timeString;
};

export const timeNow = () => {
  const dateObj: Date = new Date();
  const hours: number = dateObj.getHours();
  const minutes: number = dateObj.getMinutes();
  const currentTime: number = hours * 100 + minutes;
  return currentTime;
};

export const formatDateBR = (date: string) => {
  const dateParts = date.split('-');
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
};
