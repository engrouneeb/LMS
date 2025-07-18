import { DataAccess } from '../../data/DAL';
import ApiEndPoint from '../../data/ApiEndpoints/index';
import { endpoint } from '../components';
import { loading, error } from './AsyncStorage';

export const success = (success: any) => ({
  type: 'SUCCESS',
  data: success,
});
export const SetSocketId = (id: any) => ({
  type: 'SET_SOCKET_ID',
  socketId: id,
});
export const SetupSocketIO = (Obj: any) => ({
  type: 'SETUP_SOCKET_IO',
  socketIO: Obj,
});

export const setLogoutLoading = (bool: any) => ({
  type: 'LOGOUT_LOADING',
  logout: bool,
});
const { Get } = DataAccess();
export const getStudentAnalytics = (id: any) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.GetStudentAnalytics;
    EndPoint.params = `?studentId=${id}`;
    let response = await Get(EndPoint);

    if (response.error) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const getEnrollmentPerCoursePerMonthChart = () => async (
  dispatch: any,
) => {
  try {
    var EndPoint = ApiEndPoint.EnrollmentPerCoursePerMonth;
    let response = await Get(EndPoint);

    if (response.error) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const getClassesDates = (id?: any) => async (dispatch: any) => {
  try {
    let date = new Date();
    date.setHours(0, 0, 0, 0)
    var EndPoint: endpoint = ApiEndPoint.getAssignClassesDates;
    EndPoint.params = `?UserId=${id}&date=${date.toISOString()}`;
    let response = await Get(EndPoint);
    if (response.error) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const getClassesDetails = (id: any) => async (dispatch: any) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const formattedDate = today.toISOString();
    var EndPoint: endpoint = ApiEndPoint.getAssignClassesDetails;
    EndPoint.params = `?clsIds=${id}&selectedDate=${formattedDate}`;
    let response = await Get(EndPoint);
    if (response.error) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
