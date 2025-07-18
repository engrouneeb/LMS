import { DataAccess } from '../../data/DAL';
import ApiEndPoint from '../../data/ApiEndpoints/index';
import { endpoint } from '../components';
import { loading, error } from './AsyncStorage';
const { Get, PostSecured } = DataAccess();
export const success = (success: any) => ({
  type: 'SUCCESS',
  data: success,
});

// get Notes Detial
export const getNotesDetial = (noteId: any, classId: any) => async (
  dispatch: any,
) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.GetNotesDetials;
    EndPoint.params = `?NoteId=${noteId}&ClassId=${classId}`;
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

export const SetStepState = (Obj: any) => async (dispatch: any) => {
  try {
    let response = await PostSecured(ApiEndPoint.SaveStepState, Obj);
    if (response.error) {
      return dispatch(error(response));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    /// dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

// Save Timesheet for Week
export const saveTimeSheet = (ids: any) => async (dispatch: any) => {
  try {
    let response = await PostSecured(ApiEndPoint.saveTimesheet, ids);
    if (response.error) {
      return dispatch(error(response));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    /// dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
