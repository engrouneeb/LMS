import moment from 'moment';
import { StateConstants } from './States';
const selectedDaysIndexes: any = [];
export const deleteSchedule = (
  dayID: any,
  _setState: (type: string, value: any) => void
) => {
  _setState(StateConstants.handleDeleteSchedule, {
    [StateConstants.alertTitle]: 'Warning',
    [StateConstants.alertMessage]: 'Do you want to delete schedule?',
    [StateConstants.showAlert]: true,
    [StateConstants.firstBtn]: 'Yes',
    [StateConstants.secondBtn]: 'No',
    [StateConstants.dayID]: dayID,
  });
};

export const initializeStates = (
  _setState: (type: string, value: any) => void,
  props: any
) => {
  _setState(StateConstants.initialState, {
    [StateConstants.startTime]: props.isEdit ? props.startTime : '09:00 AM',
    [StateConstants.endTime]: props.isEdit ? props.endTime : '5:00 PM',
    [StateConstants.isMondayOn]: props.selectedDayID == 1 ? true : false,
    [StateConstants.isTuesdayOn]: props.selectedDayID == 2 ? true : false,
    [StateConstants.isWednesdayOn]: props.selectedDayID == 3 ? true : false,
    [StateConstants.isThursdayOn]: props.selectedDayID == 4 ? true : false,
    [StateConstants.isFridayOn]: props.selectedDayID == 5 ? true : false,
    [StateConstants.isSaturdayOn]: props.selectedDayID == 6 ? true : false,
    [StateConstants.isSundayOn]: props.selectedDayID == 0 ? true : false,
    [StateConstants.description]: props.isEdit ? props.description : '',
    [StateConstants.selectedDate]: props.selectedDate,
    [StateConstants.selectedDay]: props.selectedDayID,
    [StateConstants.dayID]: props.scheduleID,
    [StateConstants.selectedWeekStartDate]: props.selectedWeekStartDate,
    [StateConstants.selectedWeekEndDate]: props.selectedWeekEndDate,
  });
};

export const getWages = async (
  wages: any,
  _setState: (type: string, value: any) => void,
  selectedWageID: any
) => {
  const _wages: any = [
    wages.length <= 0
      ? { lable: 'No wage available', value: '' }
      : { lable: 'Apply for item', value: '' },
  ];
  for (let i = 0; i < wages.length; i++) {
    const w = { lable: `${wages[i].itemName}`, value: wages[i].wageID };
    _wages.push(w);
  }
  await _setState(StateConstants.wages, _wages);
  getSelectedWage(_wages, _setState, selectedWageID);
};

export const getSelectedWage = (
  wages: any,
  _setState: (type: string, value: any) => void,
  id: any
) => {
  let selectedWageID = id;
  let indexOf = wages.findIndex(function (wage: any) {
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
    [StateConstants.applyForItemName]: 'Apply For Item',
  });
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

export const handleTimeConfirm = (
  date: any,
  _setState: (type: any, value: any) => void,
  state: any
) => {
  if (date === null || date == undefined) return;
  if (state.hasDateSelection) {
    const selectedDate = new Date(date);
    if (!state.hasStartDateSelected) {
      selectedDate.setHours(0, 0, 0, 0);
      _setState(StateConstants.handleStartDate, {
        [StateConstants.startDate]: selectedDate,
        [StateConstants.hasStartDateSelected]: true,
      });
    } else {
      selectedDate.setHours(23, 59, 59, 999);
      _setState(StateConstants.endDate, selectedDate);
    }
  } else {
    const selectedTime = moment(date).format('hh:mm A');
    if (!state.hasStartTimeSelected) {
      _setState(StateConstants.handleDaySelection, {
        [StateConstants.startTime]: selectedTime,
        [StateConstants.hasStartTimeSelected]: true,
      });
    } else _setState(StateConstants.endTime, selectedTime);
  }
};

export const ToggleDaySelection = (
  existingDay: any,
  day: any,
  _setState: (type: any, value: any) => void,
  _selectedDays: any
) => {
  const dayMap: { [key: string]: string } = {
    Su: StateConstants.isSundayOn,
    M: StateConstants.isMondayOn,
    Tu: StateConstants.isTuesdayOn,
    W: StateConstants.isWednesdayOn,
    Th: StateConstants.isThursdayOn,
    F: StateConstants.isFridayOn,
    Sa: StateConstants.isSaturdayOn,
  };
  if (existingDay === day) {
    if (day in dayMap) {
      _setState(dayMap[day], false);
      _selectedDays.splice(_selectedDays.indexOf(day), 1);
    }
  } else {
    if (day in dayMap) {
      _setState(dayMap[day], true);
      _selectedDays.push(day);
    }
  }
};

export const findExistingItem = (array: any, item: any) =>
  array.find((id: any) => id === item);

export const findExistingItemIndex = (array: any, selectedDayIndex: any) =>
  array.findIndex((ind: any) => ind === selectedDayIndex);

export const isEmptyNullUndefinedZeroMinusOne = (item: any) =>
  ['', null, undefined, 0, -1].includes(item);

export const isEmptyNullUndefined = (str: any) =>
  ['', null, undefined].includes(str);

export const isEveryIndexSame = (arr: any, conditionalFlag: any) =>
  arr.every((item: any) => item === conditionalFlag);

export const doesScheduleExist = (
  startTime: any,
  endTime: any,
  checkIn: any,
  checkOut: any
) => {
  return startTime == checkIn && endTime == checkOut
    ? true
    : startTime > checkIn && startTime < checkOut
    ? true
    : endTime > checkIn && endTime < checkOut
    ? true
    : startTime < checkIn && endTime > checkOut
    ? true
    : startTime == checkIn && endTime > checkOut
    ? true
    : startTime < checkIn && endTime == checkOut
    ? true
    : false;
};
