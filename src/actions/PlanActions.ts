import { endpoint } from '../components';
import ApiEndPoint from '../../data/ApiEndpoints/index';
import { DataAccess } from '../../data/DAL';
import { loading, error } from './AsyncStorage';
const { Get } = DataAccess();

export const success = (success: any) => ({
  type: 'SUCCESS',
  data: success,
});

export const getToken = (token: any) => ({
  type: 'GET_TOKEN',
  token,
});
export const getData = (students: any, CourseIndex: any) => ({
  type: 'GET_DATA',
  students,
  CourseIndex,
});

export const GetCourses = () => async (dispatch: any) => {
  try {
    var EndPoint = ApiEndPoint.Courses;
    let response = await Get(EndPoint);
    // dispatch(loading(false));
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
export const getStudentAnalytics = () => async (dispatch: any) => {
  try {
    var EndPoint = ApiEndPoint.GetStudentAnalytics;
    let response = await Get(EndPoint);
    // dispatch(loading(false));
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

export const GetStudents = (CourseId: any, ClassId: any, index: any) => async (
  dispatch: any,
) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.Students;
    EndPoint.params = `?CourseId=${CourseId}&ClassId=${ClassId}`;
    let response = await Get(EndPoint);

    EndPoint.params = undefined;
    dispatch(loading(false));
    if (response.error) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      var Data = {
        CourseIndex: index,
        Students: response === 0 ? [] : response,
        GroupCheckedIn:
          response.filter((Obj: any) => Obj.isCheckedIn === false).length === 0
            ? false
            : true,
      };
      let studentsData = getData(Data, index);
      dispatch(studentsData);
      return studentsData;
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const CheckInOut = (Time: any, isCheckIn: any) => async (
  dispatch: any,
) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.IndCheckInOut;
    EndPoint.params = `?Time=${Time}&isCheckIn=${isCheckIn}`;
    let response = await Get(EndPoint);
    EndPoint.params = undefined;
    dispatch(loading(false));
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
