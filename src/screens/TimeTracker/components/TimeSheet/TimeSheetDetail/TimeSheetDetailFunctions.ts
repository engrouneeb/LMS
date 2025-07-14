import { Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { stateConstants } from './states';
import { isPortrait } from 'components';

const numberRegularExpression = /^[0-9\b]+$/;

export const handleCustomAlert = (
  setState: any,
  showAlert?: boolean,
  alertTitle?: string,
  alertMessage?: string,
  firstBtn?: string,
  warningOnly?: boolean,
) => {
  setState(stateConstants.handleCustomAlert, {
    showAlert,
    alertTitle,
    alertMessage,
    firstBtn,
    warningOnly,
  });
};

export const determineHeight = (setState: any) => {
  let h = isTablet()
    ? Dimensions.get('screen').height - 180
    : isPortrait()
    ? Dimensions.get('screen').height - 240
    : 185;
  setState(stateConstants.dynamicHeight, h);
};

export const _setHour = (
  setState: any,
  text: any,
  item: any,
  items: any,
  tmskey: any,
) => {
  if (text == '') return;
  if (!numberRegularExpression.test(text)) {
    handleCustomAlert(
      setState,
      true,
      'Error',
      'Hour(s) should be between 0 to 24',
      'Okay',
      true,
    );
    return;
  }
  let dates = [...items];
  let index = dates.findIndex((singleUser) => singleUser.date === item.date);
  if (Number(text) < 0 || Number(text) > 24) {
    dates[index].time = 0;
    var day = [];
    day.push({
      hour: 0,
      dayvalue: index,
      tmskey: tmskey,
      comments: text,
    });
    var tmSht = [];
    tmSht = dates.map((Obj, index) => {
      return {
        dayvalue: index,
        hour: Obj.time,
        tmskey: tmskey,
        comments: Obj.comments,
      };
    });
    setState(stateConstants.handleTimeSheetAndShowSubmitBtn, {
      [stateConstants.timeSheet]: tmSht,
      [stateConstants.showSubmitBtn]: false,
    });

    handleCustomAlert(
      setState,
      true,
      'Error',
      'Hour(s) should be between 0 to 24',
      'Okay',
      true,
    );

    return;
  }
  dates[index].time = Number(text);
  var day = [];
  day.push({
    hour: Number(item.time),
    dayvalue: index,
    tmskey: tmskey,
    comments: text,
  });
  var tmSht = [];
  tmSht = dates.map((Obj, index) => {
    return {
      dayvalue: index,
      hour: Obj.time,
      tmskey: tmskey,
      comments: Obj.comments,
    };
  });
  setState(stateConstants.handleTimeSheetAndShowSubmitBtn, {
    [stateConstants.timeSheet]: tmSht,
    [stateConstants.showSubmitBtn]: true,
  });
};

export const setComments = (
  text: string,
  item: any,
  items: any,
  tmskey: any,
  setState: any,
) => {
  let dates = [...items];
  let index = dates.findIndex((singleUser) => singleUser.date === item.date);
  dates[index].comments = text;
  var day = [];
  day.push({
    hour: Number(item.time),
    dayvalue: index,
    tmskey: tmskey,
    comments: text,
  });
  var tmSht = [];
  tmSht = dates.map((Obj, index) => {
    return {
      dayvalue: index,
      hour: Obj.time,
      tmskey: tmskey,
      comments: Obj.comments,
    };
  });
  setState(stateConstants.timeSheet, tmSht);
};
