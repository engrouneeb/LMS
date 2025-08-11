import { stateConstants } from './states';

export const formatDate = (date: any) => {
  var month: string, day: string, year: number;
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  date = [month, day, year].join('/');
  return date;
};

export const showHideAlert = (
  showAlert: any,
  alertTitle: any,
  alertMessage: any,
  firstBtn: any,
  setState: any
) => {
  setState(stateConstants.handleCustomAlert, {
    showAlert,
    alertTitle,
    alertMessage,
    firstBtn,
  });
};

export const checkInputs = (
  addWage: any,
  showHideAlert: any,
  state: any,
  enteredEffectiveDate: any,
  setState: any
) => {
  const {
    Error,
    PleaseEnterItemName,
    Okay,
    PleaseSelectWageFrom,
    PleaseSelectWageType,
    PleaseSelectEffectiveDate,
    PleaseEnterWageRate,
  } = addWage;
  if (state.enteredItemName === '') {
    showHideAlert(true, Error, PleaseEnterItemName, Okay, setState);
    return false;
  } else if (state.enteredWageFrom === '') {
    showHideAlert(true, Error, PleaseSelectWageFrom, Okay, setState);
    return false;
  } else if (state.enteredWageType === '') {
    showHideAlert(true, Error, PleaseSelectWageType, Okay, setState);
    return false;
  } else if (enteredEffectiveDate === '') {
    showHideAlert(true, Error, PleaseSelectEffectiveDate, Okay, setState);
    return false;
  } else if (state.enteredWageRate === '') {
    showHideAlert(true, Error, PleaseEnterWageRate, Okay, setState);
    return false;
  } else {
    return true;
  }
};

export const isWageAlreadyExists = (
  enteredEffectiveDate: any,
  wages: any,
  setState: any,
  addWage: any
) => {
  var formattedDate = formatDate(enteredEffectiveDate);
  var result = false;
  wages.map((item: any) => {
    let dateOfI = formatDate(item.effectiveDate);
    if (dateOfI.toString() === formattedDate.toString()) {
      showHideAlert(
        true,
        addWage.Error,
        `${addWage.AlreadyExists} ,${addWage.PleaseEnterDifferentEffectiveDate}`,
        addWage.Okay,
        setState
      );
      result = true;
    }
  });
  return result;
};

export const setWageFrom = (value: any, wagesFrom: any, setState: any) =>
  setState(stateConstants.enteredWageFrom, value);

export const handleSetWageType = (value: any, setState: any, wagesType: any) =>
  setState(stateConstants.enteredWageType, value);

export const getWageFromValue = (wagesFrom: any, wageFrom: any) => {
  return wagesFrom.filter(function (x: any) {
    return x.key == wageFrom;
  })[0].value;
};

export const getWageTypeValue = (wagesType: any, wageType: any) => {
  return wagesType?.filter(function (x: any) {
    return x.key == wageType;
  })[0].value;
};
