import moment from 'moment';

export const handleGetNumberOfWeeksInMonths = (startOfMonthDate: string) => {
  let monthStartWeek = moment(startOfMonthDate).startOf('week');
  let monthEndWeek = moment(
    moment(startOfMonthDate).endOf('month').toISOString()
  ).endOf('week');

  let numberOfWeeks = Math.ceil(
    moment.duration(monthEndWeek.diff(monthStartWeek)).asDays() / 7
  );
  return numberOfWeeks;
};

export const handleFindMonthWeeks = (
  startMonthDate: any,
  numberOfWeeks: any
) => {
  let weekDates = [];
  for (let i = 0; i < numberOfWeeks; i++) {
    weekDates.push({
      startDate: moment(startMonthDate)
        .add(i, 'weeks')
        .startOf('week')
        .format('MMM DD'),
      startDateIsoStr: moment(startMonthDate)
        .add(i, 'weeks')
        .startOf('week')
        .toISOString(),
      endDate: moment(startMonthDate)
        .add(i, 'weeks')
        .endOf('week')
        .format('MMM DD'),
      endDateIsoStr: moment(startMonthDate)
        .add(i, 'weeks')
        .endOf('week')
        .toISOString(),
    });
  }
  return weekDates;
};

export const getInitialData = (
  selectedWeekStartDate: any,
  setMonthName: any,
  setWeekDatesList: any
) => {
  let selectedDate = new Date(selectedWeekStartDate);
  let curMonth = +moment(selectedDate).format('MM');
  selectedDate.setMonth(curMonth - 2);
  let startOfMonthDate = moment(selectedDate).startOf('month').toISOString();
  let numberOfWeeks = handleGetNumberOfWeeksInMonths(startOfMonthDate);
  setMonthName(moment(selectedDate).format('MMM'));
  setWeekDatesList(handleFindMonthWeeks(startOfMonthDate, numberOfWeeks));
};

export const handleOnMonthValueChange: (
  index: any,
  monthsNameList: any,
  yearName: any,
  setMonthName: any,
  setWeekDatesList: any
) => void = (
  index,
  monthsNameList,
  yearName,
  setMonthName,
  setWeekDatesList
) => {
  setMonthName(monthsNameList[index]);
  let selectedDate = new Date();
  selectedDate.setMonth(index);
  selectedDate.setFullYear(yearName);
  let startOfMonthDate = moment(selectedDate).startOf('month').toISOString();
  let numberOfWeeks = handleGetNumberOfWeeksInMonths(startOfMonthDate);
  setWeekDatesList(handleFindMonthWeeks(startOfMonthDate, numberOfWeeks));
};
