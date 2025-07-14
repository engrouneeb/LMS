import moment from 'moment';

export const startDateFormatting = (date: any) => {
  return moment(date).startOf('month').toISOString();
};

export const endDateFormatting = (date: any) => {
  return moment(date).endOf('month').toISOString();
};

export const convertTime12to24 = (time12h: any) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}:00.000`;
};
