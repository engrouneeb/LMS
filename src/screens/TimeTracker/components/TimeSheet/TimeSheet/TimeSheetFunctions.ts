import moment from 'moment';

export const GetStartOfWeek = (date: any) =>
  moment(date).startOf('week').format('ddd MMM DD YYYY');

export const GetEndOfWeek = (date: any) =>
  moment(date).endOf('week').format('ddd MMM DD YYYY');
