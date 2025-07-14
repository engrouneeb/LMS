import { DataAccess } from '../../data/DAL';
import ApiEndPoint from '../../data/ApiEndpoints/index';
import { loading, error } from './AsyncStorage';
const { Get, PostSecured } = DataAccess();

export const success = (success: any) => ({
  type: 'SUCCESS',
  data: success,
});
export const saveNotification = (notification: any) => ({
  type: 'SAVE_NOTIFICATIONS',
  data: notification,
});
export const SetCount = (Count: any) => ({
  type: 'SAVE_NOTIFICATIONS_COUNT',
  data: Count,
});
export const ClearCount = (Count: any) => ({
  type: 'CLEAR_NOTIFICATIONS_COUNT',
  data: Count,
});
export const MessageCount = (Count: any) => ({
  type: 'MESSAGE_COUNT',
  data: Count,
});
export const getUserNotifications = () => async (dispatch: any) => {
  try {
    var EndPoint = ApiEndPoint.GetUserNotifications;
    let response = await Get(EndPoint);

    if (response.error) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      dispatch(saveNotification(response));
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const DeleteNotification = (id?: any) => async (dispatch: any) => {
  try {
    let response = await PostSecured(ApiEndPoint.DeleteNotification, {
      Id: id,
    });
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const setNotificationCount = (Count: any) => async (dispatch: any) => {
  try {
    return dispatch(SetCount(Count));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const clearNotificationCount = (Count: any) => (dispatch: any) => {
  try {
    return dispatch(ClearCount(Count));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
