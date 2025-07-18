import moment from 'moment';
import { StateConstants } from './States';
import { ScheduleWeekViewInterface } from '../../../../../../interfaces';
const selectedDaysIndexes: any = [];

type _wagesType = { lable: string; value: string };
export const _getWages = (
  wages: any,
  _setState: (type: string, val: any) => void,
  ScheduleWeekView: ScheduleWeekViewInterface,
  selectedWageId: string
) => {
  const _wages: _wagesType[] = [];
  if (wages.length <= 0) _wages.push({ lable: 'No wage available', value: '' });
  else
    for (let i = 0; i < wages.length; i++) {
      const w = { lable: `${wages[i].itemName}`, value: wages[i].wageID };
      _wages.push(w);
    }

  _getSelectedWage(_wages, _setState, ScheduleWeekView, selectedWageId);
  _setState(StateConstants.wages, _wages);
};

const _getSelectedWage = (
  wages: any,
  _setState: (type: string, val: any) => void,
  ScheduleWeekView: ScheduleWeekViewInterface,
  selectedWageID: string
) => {
  let indexOf = wages.findIndex(function (wage: _wagesType) {
    return wage.value === selectedWageID;
  });
  if (indexOf != -1) {
    _setState(StateConstants.applyForItem_Name, {
      [StateConstants.applyForItem]: indexOf,
      [StateConstants.applyForItemName]: wages[indexOf].lable,
    });
    return;
  }
  _setState(StateConstants.applyForItem_Name, {
    [StateConstants.applyForItem]: indexOf,
    [StateConstants.applyForItemName]: ScheduleWeekView.ApplyForItem,
  });
};

export const findIndex = (daysList: any, day: any) =>
  daysList.findIndex((_day: any) => _day === day.day);

export const checkDayIndexExists = (selectedDaysIndexes: any, index: number) =>
  selectedDaysIndexes.find((item: any) => item == index);

export const checkDayExists = (_selectedDays: any, day: any) => {
  return _selectedDays.find((dayItem: any) => dayItem == day);
};

export const getRangeDates = (start: any, end: any) => {
  const _rangeDatesArray = [];
  let _startDate = moment(start);
  let _endDate = moment(end);
  while (_startDate <= _endDate) {
    _rangeDatesArray.push(moment(_startDate).format('MMM DD YY'));
    _startDate = moment(_startDate).add(1, 'days');
  }
  return _rangeDatesArray;
};

export const isEmptyNullUndefined = (str: string) =>
  ['', null, undefined].includes(str);

export const handleTimeConfirm = (
  date: any,
  state: any,
  _setState: (type: any, val: any) => void
) => {
  if (isEmptyNullUndefined(date)) return;
  if (state.hasDateSelection) {
    const selectedDate = new Date(date);
    if (!state.hasStartDateSelected) {
      selectedDate.setHours(0, 0, 0, 0);
      _setState(StateConstants.startDate, selectedDate);
      _setState(StateConstants.hasDateSelection, true);
    } else {
      selectedDate.setHours(23, 59, 59, 999);
      _setState(StateConstants.endDate, selectedDate);
    }
  } else {
    const selectedTime = moment(date).format('hh:mm A');
    if (!state.hasStartTimeSelected) {
      _setState(StateConstants.startTime, selectedTime);
      _setState(StateConstants.hasStartTimeSelected, true);
    } else _setState(StateConstants.endTime, selectedTime);
  }
};

export const isEveryIndexSame = (arr: any, conditionalFlag: any) =>
  arr.every((item: any) => item === conditionalFlag);

export const getSelectedWeekDaysIndexes = (
  currentWeekDates: any,
  startDate: any,
  endDate: any
) => {
  const dates = getRangeDates(startDate, endDate);
  const foundDatesIndexes = [];
  for (let i = 0; i < dates.length; i++) {
    for (let j = 0; j < currentWeekDates.length; j++) {
      if (dates[i] === currentWeekDates[j]) {
        foundDatesIndexes.push(j);
      }
    }
  }
  let selectedDaysIndexesOfWeek = foundDatesIndexes.filter((el) =>
    selectedDaysIndexes.includes(el)
  );

  return selectedDaysIndexesOfWeek;
};

export const validateForm = (
  state: any,
  _setState: (type: string, val: any) => void,
  ScheduleWeekView: any
) => {
  if (moment(state.endDate).diff(moment(state.startDate), 'days') < 0) {
    _setState(StateConstants.alertTitle, ScheduleWeekView.Error);
    _setState(
      StateConstants.alertMessage,
      'End Date must be greater than Start Date for schedule'
    );
    _setState(StateConstants.showAlert, true);
    return true;
  }

  if (['', null, undefined, -1].includes(state.applyForItem)) {
    _setState(StateConstants.handleAlert, {
      [StateConstants.showAlert]: true,
      [StateConstants.alertTitle]: ScheduleWeekView.Error,
      [StateConstants.alertMessage]: ScheduleWeekView.PleaseSelectItem,
    });

    return true;
  }

  if (state.isRangeEnable) {
    if (
      isEmptyNullUndefined(state.startDate) ||
      isEmptyNullUndefined(state.endDate)
    ) {
      _setState(StateConstants.alertTitle, ScheduleWeekView.Error);
      _setState(
        StateConstants.alertMessage,
        ScheduleWeekView.PleaseSelectDateMissingStartdateEnddate
      );
      _setState(StateConstants.showAlert, true);
      return true;
    }

    if (
      isEveryIndexSame(
        [
          state.isSundayOn,
          state.isMondayOn,
          state.isTuesdayOn,
          state.isWednesdayOn,
          state.isThursdayOn,
          state.isFridayOn,
          state.isSaturdayOn,
        ],
        false
      )
    ) {
      _setState(StateConstants.alertTitle, ScheduleWeekView.Error);
      _setState(
        StateConstants.alertMessage,
        ScheduleWeekView.PleaseSelectYourScheduleDays
      );
      _setState(StateConstants.showAlert, true);
      return true;
    }
  }

  if (
    isEmptyNullUndefined(state.startTime) ||
    isEmptyNullUndefined(state.endTime)
  ) {
    _setState(StateConstants.alertTitle, ScheduleWeekView.Error);
    _setState(
      StateConstants.alertMessage,
      ScheduleWeekView.PleaseSelectTimeMissingStarttimeEndtime
    );
    _setState(StateConstants.showAlert, true);

    return true;
  }

  if (
    moment(state.startTime, 'h:mma').isAfter(moment(state.endTime, 'h:mma'))
  ) {
    _setState(StateConstants.alertTitle, 'Error');
    _setState(
      StateConstants.alertMessage,
      'End time must be greater than start time for Schedule'
    );
    _setState(StateConstants.showAlert, true);
    return true;
  }

  return false;
};

export const checkScheduleExistence = (
  state: any,
  day_schedules: any,
  _setState: (type: any, val: any) => void
) => {
  let isScheduleExist = false;
  for (let i = 0; i < day_schedules.length; i++) {
    let checkIn = day_schedules[i].checkIn.toUpperCase();
    let checkOut = day_schedules[i].checkOut.toUpperCase();
    if (state.startTime == checkIn && state.endTime == checkOut)
      isScheduleExist = true;
    else if (state.startTime > checkIn && state.startTime < checkOut)
      isScheduleExist = true;
    else if (state.endTime > checkIn && state.endTime < checkOut)
      isScheduleExist = true;
    else if (state.startTime < checkIn && state.endTime > checkOut)
      isScheduleExist = true;
    else if (state.startTime == checkIn && state.endTime > checkOut)
      isScheduleExist = true;
    else if (state.startTime < checkIn && state.endTime == checkOut)
      isScheduleExist = true;
    else isScheduleExist = false;
    console.log('object', isScheduleExist);
    if (isScheduleExist) {
      _setState(StateConstants.alertTitle, 'Error');
      _setState(
        StateConstants.alertMessage,
        state.isRangeEnable
          ? 'There is already a schedule present in a specified time between these two dates.'
          : 'There is already a schedule between specified time.'
      );
      _setState(StateConstants.showAlert, true);
      break;
    }
  }
};

export const handleClickOnDate = (
  showDatePicker: boolean,
  hasDateSelection: boolean,
  hasStartDateSelected: boolean,
  _setState: (type: any, timepkr: any) => void,
  setIsVisible?: any
) => {
  setIsVisible(true);
  _setState(StateConstants.datePicker, {
    [StateConstants.showDatePicker]: showDatePicker,
    [StateConstants.hasDateSelection]: hasDateSelection,
    [StateConstants.hasStartDateSelected]: hasStartDateSelected,
  });
};

export const handleClickOnTime = (
  showDatePicker: boolean,
  hasDateSelection: boolean,
  hasStartTimeSelected: boolean,
  _setState: (type: string, timepkr: any) => void,
  setIsVisible?: any
) => {
  setIsVisible(true);
  _setState(StateConstants.timePicker, {
    [StateConstants.showDatePicker]: showDatePicker,
    [StateConstants.hasDateSelection]: hasDateSelection,
    [StateConstants.hasStartTimeSelected]: hasStartTimeSelected,
  });
};

export const getTimeDuration = (_startTime: string, _endTime: any) => {
  if (!_startTime || !_endTime) return `${0} hr ${0} min`;
  let duration: any = moment.duration(
    moment(_endTime, 'HH:mm A').diff(moment(_startTime, 'HH:mm A'))
  );
  let hours = parseInt(duration.asHours());
  let minutes = parseInt(duration.asMinutes()) % 60;
  return `${hours} hr ${minutes} min`;
};

export const getDateDuration = (_startDate: string, _endDate: string) => {
  if (!_startDate || !_endDate) return `${0} Days\t`;
  let duration: moment.Duration = moment.duration(
    moment(_endDate).diff(moment(_startDate))
  );
  // console.log('duration', `${Math.round(duration.asDays()) - 1} Days\t`);
  return `${Math.round(duration.asDays())} Days\t`;
};
