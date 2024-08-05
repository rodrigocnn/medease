export const stringToDate = (hour: string, date: Date) => {
  const [hours, minutes] = hour.split(':');
  const dateObj = new Date(date);
  dateObj.setHours(Number(hours));
  dateObj.setMinutes(Number(minutes));

  return dateObj.getTime().toString();
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

export function timeNowToStringAM(): string {
  const currentTime = new Date();
  currentTime.setMinutes(0); // Set minutes to zero
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  return `${hour}:${minute.toString().padStart(2, '0')}`;
}

export const timeNow = () => {
  const dateObj: Date = new Date();
  const hours: number = dateObj.getHours();
  const minutes: number = dateObj.getMinutes();
  const currentTime: number = hours * 100 + minutes;
  return currentTime;
};

export const formatDateBR = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export const convertTimestampToTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  return `${formattedHours}:00`;
};
