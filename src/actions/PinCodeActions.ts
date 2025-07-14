import { DataAccess } from '../../data/DAL';
import ApiEndPoint from '../../data/ApiEndpoints/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoint } from 'components';
import ApiEndpoints from '../../data/ApiEndpoints/index';
import { loading, error } from './AsyncStorage';
export const success = (success: any) => ({
  type: 'SUCCESS',
  data: success,
});

export const checkInSuccess = (success: any) => ({
  type: 'CHECKIN_SUCCESS',
  data: success,
});

export const message = (message: any) => ({
  type: 'MESSAGE',
  Msg: message,
});
export const ClassStudentCheckIn = (studentId: any, isCheckIn: any) => ({
  type: 'Clas_Student_CheckIn_success',
  studentId,
  isCheckIn,
});
export const indCheckIn = (isCheckedIn: any, StudentIndex: any) => ({
  type: 'IND_CHECKIN',
  isCheckedIn,
  StudentIndex,
});

export const GropCheckInOut = (isCheckedIn: any) => ({
  type: 'Group_CHECKIN',
  isCheckedIn,
});
export const UserInfo = (Info: any) => ({
  type: 'USER_INFO',
  Info,
});
export const UpdateUserCheckedInStatus = (status: boolean) => ({
  type: 'UPDATE_USER',
  status,
});
export const UserNotificationMessagesCount = (data: any) => ({
  type: 'NOTIFICATION_MESSAGES_BADGES',
  data,
});
export const setUserInfo = (Info: any) => ({
  type: 'SET_USER',
  Info,
});

export const getData = (response: any) => ({
  type: 'GET_DATA',
  response,
});
export const saveCheckInList = (data: any) => ({
  type: 'SAVE_CHECKIN_LIST',
  data,
});
export const saveCoursesList = (data: any) => ({
  type: 'SAVE_COURSES_LIST',
  data,
});
export const currentCheckinMethod = (data: string) => ({
  type: 'SAVE_CURRENT_CHECKIN_METHOD',
  data,
});
const { Get, PostSecuredWithParams, PostSecured } = DataAccess();

export const validatePin = async (pin: any) => {
  var EndPoint: endpoint = ApiEndPoint.pinAuthentication;
  EndPoint.params = `?Pin=${pin}`;
  let response = await Get(EndPoint);
  return response;
};
export const getKioskCheckinList = () => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.GetKioskCheckinList;
    let response = await Get(EndPoint);
    if (response.error) return dispatch(error(response || 'ERROR'));
    else {
      if (response.length > 0) {
        const updatedArray = response.map((item: any) => ({
          id: item.id,
          name: item.name,
          isSelected: false,
        }));
        dispatch(saveCheckInList(updatedArray));
        return dispatch(success(updatedArray));
      }
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const getCompanyCoursClassesList = (userId: string | number) => async (
  dispatch: any,
) => {
  try {
    var EndPoint: endpoint = ApiEndpoints.GetUserCoursesAndClasses;
    EndPoint.params = `?userId=${userId}`;
    let response = await Get(EndPoint);
    if (response.error) {
      dispatch(error(response || 'ERROR'));
      return Promise.reject(response.error);
    } else {
      if (response.length > 0) {
        dispatch(saveCoursesList(response));
      }
      return Promise.resolve(response);
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
    return Promise.reject(err);
  }
};
export const validateQRcode = (info: string) => async (dispatch: any) => {
  try {
    let EndPoint = ApiEndpoints.GetQRCodeDetail;
    let params = `?code=${info}`;
    let response = await PostSecuredWithParams(EndPoint, params);
    if (!response.isSuccess) {
      dispatch(error(response || 'ERROR'));
      return response;
    } else {
      getData(response.qrCodeDetail);
      dispatch(setUserInfo(response.qrCodeDetail));
      return dispatch(success(response.qrCodeDetail));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const viaQRCode = (info: string) => async (dispatch: any) => {
  let EndPoint: endpoint = ApiEndpoints.CheckInCheckOutViaQR;
  EndPoint.params = `?code=${info}`;
  let res = await Get(EndPoint);
  return dispatch(success(res));
};
export const saveCheckInMethod = (method: string) => async (dispatch: any) => {
 dispatch(currentCheckinMethod(method));
};

export const CheckInOut = async (
  isCheckIn: boolean,
  UserId: string|number,
  CheckInListItemsIds: string[] = [],
  classesIds: string[] = [],
) => {
  console.log('CheckInOut called with params:', {
    isCheckIn,
    UserId,
    CheckInListItemsIds,
    classesIds,
  });

  const EndPoint = ApiEndPoint.IndCheckInOut;
  const params = {
    isCheckIn,
    userId: UserId,
    checkInListItemsIds: CheckInListItemsIds,
    checkInClassIds: classesIds,
  };

  try {
    const response = await PostSecured(EndPoint, params);
    return response;
  } catch (error) {
    console.error('Error in CheckInOut:', error);
    throw error;
  }
};

export const SubmitGroupCheckIn = (
  Students: any,
  CourseId: any,
  isCheckIn: any,
) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.GroupCheckIn;
    EndPoint.params = `?CourseId=${CourseId}&&isCheckedin=${isCheckIn}`;
    EndPoint.params = EndPoint.params + Students;
    let response = await Get(EndPoint);
    EndPoint.params = undefined;
    dispatch(loading(false));
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      //     if(isCheckIn == true){
      //         isCheckIn = response.ID;
      //     }
      //    return dispatch(indCheckIn(isCheckIn,StudentIndex));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const SubmitClassUserCheckIn = (
  studentId: any,
  classId: any,
  isCheckIn: any,
) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.GroupClassStudentCheckIn;
    EndPoint.params = `?ClassId=${classId}&&isCheckedin=${isCheckIn}&&StudentId=${studentId}`;

    let response = await Get(EndPoint);
    // EndPoint.params = undefined;
    // console.log('response', response);

    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      // dispatch(ClassStudentCheckIn(studentId, isCheckIn));
      return response;
    }
  } catch (error) {
    return false;
  }
};

export const GetUserData = () => async (dispatch: any) => {
  try {
    var EndPoint = ApiEndPoint.GetUser;
    let response = await Get(EndPoint);
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      response?.roleName &&
        AsyncStorage.setItem('userRole', response?.roleName);
      dispatch(UserInfo(response));
      return response;
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const GetUserNotification = () => async (dispatch: any) => {
  try {
    var EndPoint = ApiEndPoint.GetNotiMsgCount;
    let response = await Get(EndPoint);
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      dispatch(UserNotificationMessagesCount(response));
      return response;
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
