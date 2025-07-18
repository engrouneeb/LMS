import { DataAccess } from '../../data/DAL';
import ApiEndPoint from '../../data/ApiEndpoints/index';
import { endpoint } from '../components';
import { loading, error } from './AsyncStorage';
const { Get, PostSecured } = DataAccess();

export const success = (success: any) => ({
  type: 'SUCCESS',
  data: success,
});
export const getTimeSheetData = (startDate: any, endDate: any) => async (
  dispatch: any,
) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.timeSheet;
    EndPoint.params = `?sDate=${startDate}&eDate=${endDate}`;
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

// submitt hr for Timesheet
export const submittTimeSheetHour = (weekArray: any) => async (
  dispatch: any,
) => {
  try {
    //
    let response = await PostSecured(
      ApiEndPoint.submittHourForTimesheet,
      weekArray,
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
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
