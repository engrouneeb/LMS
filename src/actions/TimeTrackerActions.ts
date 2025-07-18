import { endpoint } from '../components';
import ApiEndPoint from '../../data/ApiEndpoints';
import { DataAccess } from '../../data/DAL';
import { error, loading } from './AsyncStorage';

const { Get, PostSecured } = DataAccess();

export const setWage = (data: any) => ({
  type: 'SET_WAGES',
  data: data,
});

export const setWagesDetails = (data: any) => ({
  type: 'SET_WAGES_DETAILS',
  data: data,
});

export const setUserWagesDetails = (data: any) => ({
  type: 'SET_USER_WAGES_DETAILS',
  data: data,
});
export const setTimeTrackerBadges = (data: any) => ({
  type: 'SET_TIME_TRACKER_BADGES',
  data: data,
});

export const getWages = (UserId: any) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.GetWages;
    EndPoint.params = `?UserID=${UserId}`;
    let response = await Get(EndPoint);
    dispatch(loading(false));
    if (response.error) {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(setWage(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const getWagesDetails = () => async (dispatch: any) => {
  try {
    var EndPoint = ApiEndPoint.GetWagesDetails;
    let response = await Get(EndPoint);
    dispatch(loading(false));
    if (response.error) {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(setWagesDetails(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const getUserWagesDetail =
  (userID: any, assignmentId: any) => async (dispatch: any) => {
    try {
      var EndPoint: endpoint = ApiEndPoint.GetUserWagesDetail;
      EndPoint.params = `?userID=${userID}&assignmentId=${assignmentId}`;
      const { Get } = DataAccess();
      let response = await Get(EndPoint);
      dispatch(loading(false));
      if (response.error) {
        response.error_description = response.message;
        return dispatch(error(response || 'ERROR'));
      } else {
        return dispatch(setUserWagesDetails(response));
      }
    } catch (err) {
      dispatch(loading(false));
      dispatch(error('Something Went Wrong' || 'ERROR'));
    }
  };

export const addWages = (wagesArr: any, callback: any) => {
  PostSecured(ApiEndPoint.AddWages, wagesArr)
    .then((res: any) => {
      callback(res);
      return;
    })
    .catch((err: any) => {
      callback(err);
      return;
    });
};
