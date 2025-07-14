import ApiEndPoint from '../../data/ApiEndpoints';
import { DataAccess } from '../../data/DAL';
import { error } from './AsyncStorage';
import { success } from './DashBoardActions';
const { PostSecured } = DataAccess();

export const AddTimeOff = (
  startTime: any,
  endTime: any,
  timeOffId: any,
  userID: any,
  url: any,
  description: any,
  title: any,
) => async (dispatch: any) => {
  try {
    let Obj = {
      Title: title,
      Start: startTime,
      End: endTime,
      AllDay: false,
      Description: description,
      UserID: userID,
      Id: timeOffId,
      DomainUrl: url,
    };
    let response = await PostSecured(ApiEndPoint.AddTimeOff, Obj);

    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const DeleteTimeOff = (timeOffId: any) => async (dispatch: any) => {
  try {
    let response = await PostSecured(ApiEndPoint.DeleteTimeOff, {
      Id: timeOffId,
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
