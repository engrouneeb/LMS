import { DataAccess } from '../../data/DAL';
import ApiEndPoint from '../../data/ApiEndpoints/index';
import { endpoint } from '../components';
import { loading, error } from './AsyncStorage';
import { SuperadminConfigurationEnum } from '../constants';

export const success = (success: any) => ({
  type: 'SUCCESS',
  data: success,
});
export const getToken = (token: any) => ({
  type: 'GET_TOKEN',
  token,
});

export const setUserInfo = (Info: any) => ({
  type: 'USER_INFO',
  Info,
});
export const setSuperadminPermissions = (permissions: any) => ({
  type: 'SET_USER_SUPERADMIN_PERMISSION',
  permissions,
});
export const setIsSecured = (isSecured: any) => ({
  type: 'isSecured',
  isSecured,
});

export const getData = (students: any, CourseIndex: any) => ({
  type: 'GET_DATA',
  students,
  CourseIndex,
});
export const setPermissions = (data:any) => ({
  type: 'SET_APP_MODUEL_PERMISSIONS_SUCCESS',
  data,
});
const { GetUnSecured, Post, Get } = DataAccess();
export const CompanyConfigs = (PinCode: any) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.CompnayConfigs;
    EndPoint.params = `?Pin=${PinCode}`;
    // ;
    let response = await GetUnSecured(EndPoint);
    // dispatch(loading(false));
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

export const doLogin = (UserName: any, Password: any, deviceId: any) => async (
  dispatch: any,
) => {
  debugger
  try {
    var EndPoint = ApiEndPoint.login;
    debugger;
    let response = await Post(EndPoint.url, {
      Username: UserName,
      Password: Password,
      DeviceId: deviceId,
    });

    if (response.error) {
          debugger
      return dispatch(error(response || 'ERROR'));
    } else {
          debugger
      dispatch(setUserInfo(response.user));
      return dispatch(success(response));
    }
  } catch (er) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const getSuperadminPermissions = () => async (dispatch: any) => {
  try {
    var EndPoint = ApiEndPoint.GetSuperadminPermissions;
    let response = await Get(EndPoint);
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      if (response.length > 0) {
        dispatch(setIsSecured(response[SuperadminConfigurationEnum['IsSecured']].grantAccess));
      }
      dispatch(setSuperadminPermissions(response));
      return dispatch(success(response));
    }
  } catch (er) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const GetStudents = (CourseId: any, index: any) => async (
  dispatch: any,
) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.Students;
    EndPoint.params = `?CourseId=${CourseId}`;
    let response = await Get(EndPoint);
    EndPoint.params = undefined;
    // dispatch(loading(false));
    if (response.error) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      var Data = {
        CourseIndex: index,
        Students: response,
      };
      return dispatch(getData(Data, index));
      //    return dispatch(success(Data));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const SetAppModuelPermissions = () => async (
  dispatch: any,
) => {
   const endpoint = ApiEndPoint.GetRoleBasePermissions;
      Get(endpoint).then(async(res: any) => {
        dispatch (setPermissions(res));
      });
};
