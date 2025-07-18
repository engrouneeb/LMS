import { endpoint } from '../components';
import ApiEndPoint from '../../data/ApiEndpoints/index';
import { DataAccess } from '../../data/DAL';
import { loading, error } from './AsyncStorage';
export const success = (success: any) => ({
  type: 'SUCCESS',
  data: success,
});
const { PostSecured, Get } = DataAccess();
// submitt course work
export const submittCourseWork = (submitedValue: any) => async (
  dispatch: any,
) => {
  try {
    let response = await PostSecured(
      ApiEndPoint.SubmittHomework,
      submitedValue,
    );
    if (response.error) {
      dispatch(error(response));
      return response;
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    /// dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

// Get Course work
export const getCourseWork = (
  challengeId: any,
  userID: any,
  isFromHomework: any,
) => async (dispatch: any) => {
  var EndPoint: endpoint = isFromHomework
    ? ApiEndPoint.GetStudentHomeWork
    : ApiEndPoint.getChallengeWork;
  EndPoint.params = isFromHomework
    ? `?HomeWorkId=${challengeId}&StudentId=${userID}`
    : `?ChallengeId=${challengeId}&StudentId=${userID}`;
  try {
    let response = await Get(EndPoint);
    if (!response) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      return response;
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
