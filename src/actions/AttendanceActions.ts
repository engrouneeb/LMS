import { convertUTCDateToLocalDateStringFormat } from '../Utilities';
import ApiEndPoint from '../../data/ApiEndpoints/index';
import { DataAccess } from '../../data/DAL';
import { success } from './AccountActions';
import { error, loading } from './AsyncStorage';
import { endpoint } from '../components/Interfaces';
const { Get, PostSecured } = DataAccess();
export const reset_attendence = () => ({
  type: 'RESET_ATTENDENCE',
});

export const setAttendenceDetials = (data: any) => ({
  type: 'ATTENDENCE_DETAILS',
  data,
});

export const setAttendenceStudentList = (data: any) => ({
  type: 'ATTENDENCE_STUDENT_LIST',
  data,
});
export const DateList = (data: any) => ({
  type: 'DATE_LIST',
  data,
});

export const setTodayAttend = (data: any, skip: any, take: any) => ({
  type: 'SET_TODAY_ATTENDENCE',
  data: data,
  skip: skip,
  take: take,
});
export const setClassesForAttendence = (data: any, skip: any, take: any) => ({
  type: 'SET_CLASSES_FOR_ATTENDENCE',
  data: data,
  skip: skip,
  take: take,
});
export const getTodayAttendence = async (
  Userid: any,
  date: any,
  skip: any,
  take: any,
  dispatch?: any,
) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.GetClasses;
    EndPoint.params = `?UserID=${Userid}&SelectedDate=${date}&Skip=${skip}&Take=${take}&ClassId=${null}`;
    let response = await Get(EndPoint);
    dispatch(loading(false));
    if (response?.error) {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(setTodayAttend(response, skip, take));
    }
  } catch (error) {}
};

export const getTodayAttendenceDB = async (
  MarkAttendObj: any,
  dispatch: any,
) => {
  try {
    let response = await PostSecured(
      ApiEndPoint.MarkTodayAttendence,
      MarkAttendObj,
    );
    if (response.error) {
      return dispatch(error(response));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

// Add a make up class

export const createMakeUpClass = (
  classBatchId: any,
  dateFrom: any,
  dateTo: any,
  timeFrom: any,
  timeTo: any,
  isBatch: any,
  timeZone: any = '',
  instructorIds: number[] = [],
) => async (dispatch: any) => {
  try {
    // call api to insert makeupclass then
    var EndPoint: endpoint = ApiEndPoint.CreateMakeup;
    EndPoint.params = `?ClassBatchId=${classBatchId}&StartDate=${dateFrom}&EndDate=${dateTo}&TimeFrom=${timeFrom}&TimeTo=${timeTo}&isBatch=${isBatch}`;
    if (timeZone != '')
      EndPoint.params += `&TimeZone=${timeZone?.standardName}`;
    if (instructorIds.length != 0)
      EndPoint.params += `&InstructorIds=${JSON.stringify(instructorIds)}`;
    let response = await Get(EndPoint);

    if (response?.error) {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      // ;
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const getTodayAllAttendenceDB = (
  UserID: any,
  date: any,
  isPresent: any,
) => async (dispatch: any) => {
  try {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    date = [month, day, year].join('-');
    var EndPoint: endpoint = ApiEndPoint.MarkTodayAllAttendence;
    EndPoint.params = `?UserID=${UserID}&SelectedDate=${date}&isPresent=${isPresent}`;

    let response = await Get(EndPoint);
    if (response?.error) {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const getClassDate = (
  ClassIdOrBatch: any,
  isBatch: any,
  startDate: any,
  endDate: any,
) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.AttendenceDate;
    EndPoint.params = `?ClassIdOrBatch=${ClassIdOrBatch}&StartDate=${startDate}&EndDate=${endDate}&isBatch=${isBatch}`;
    let response = await Get(EndPoint);
    if (response?.error || response.message == 'Network request failed') {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      var formatedArray = response.map((Obj: any) => {
        let day = Obj;
        day.attendanceDate = convertUTCDateToLocalDateStringFormat(
          Obj?.attendanceDate,
        );
        return day;
      });
      return dispatch(DateList(formatedArray));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const formatDate = (date: any, casee: any) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  casee == true
    ? (date = [month, day, year].join('-'))
    : (date = [day, month, year].join('-'));

  return date;
};

export const getStudentForAttendance = (
  classID: any,
  isBatch: any,
  timeId: any,
  date: any,
  makeUpClassId: any,
) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.MarkClassAttendence;
    EndPoint.params = `?ItemId=${classID}&isBatch=${isBatch}&TimeId=${timeId}&Date=${date}&MakeUpClassId=${makeUpClassId}`;
    let response = await Get(EndPoint);
    if (response.error || response.message == 'Network request failed') {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(setAttendenceStudentList(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const markAttendance = (
  timeID: any,
  date: any,
  isPresentList: any,
  isAbsentList: any,
  isDeleteList: any,
  classId: any,
) => async (dispatch: any) => {
  try {
    let fdate = formatDate(date, true);
    var EndPoint: endpoint = ApiEndPoint.MarkAttendance;
    EndPoint.params = `?TimeId=${timeID}&Date=${fdate}${isPresentList}${isAbsentList}${isDeleteList}&MakeUpClassId=${classId}`;

    let response = await Get(EndPoint);
    if (response.error || response.message == 'Network request failed') {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const ViewAttendence = (classID: any, isBatch: any) => async (
  dispatch: any,
) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.ViewAttendance;
    EndPoint.params = `?ClassId=${classID}&isBatch=${isBatch}`;
    let response = await Get(EndPoint);
    if (response.error || response.message == 'Network request failed') {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
