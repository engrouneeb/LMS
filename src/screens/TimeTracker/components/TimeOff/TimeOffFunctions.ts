import moment from 'moment';

export const endDateFormatting = (date: any) => {
  return moment(date).endOf('week').toISOString();
};

export const startDateFormatting = (date: any) => {
  return moment(date).startOf('week').toISOString();
};

export const handleBack = (navigation: any) => {
  navigation.goBack();
  return true;
};
