import ApiEndpoints from '../../data/ApiEndpoints';
import { loading, error } from './AsyncStorage';
import { DataAccess } from '../../data/DAL';
import { endpoint } from 'components';

export const CoursePlayerActions = {
  COURSE_PLAYER_LOADING: '/actions/course/player/LOADING',
  COURSE_PLAYER_SUCCESS: '/actions/course/player/SUCCESS',
  COURSE_PLAYER_FAILED: '/actions/course/player/FAILED',
  COURSE_PLAYER_HASMORE: '/actions/course/player/HASMORE',
};

export function coursePlayerLoading() {
  return {
    type: CoursePlayerActions.COURSE_PLAYER_LOADING,
  };
}

export function coursePlayerSuccess(payload: any) {
  return {
    type: CoursePlayerActions.COURSE_PLAYER_SUCCESS,
    payload,
  };
}
export function coursePlayerHasMore(payload: any) {
  return {
    type: CoursePlayerActions.COURSE_PLAYER_HASMORE,
    payload,
  };
}

export function coursePlayerFailed() {
  return {
    type: CoursePlayerActions.COURSE_PLAYER_FAILED,
  };
}

export const SetAttachmentNavigateScreen = (screenName: any) => ({
  type: 'ATTACHMENT_NAVIGATE_SCREEN',
  screenName: screenName,
});
const { Get, PostSecured, PostSecuredWithParams } = DataAccess();
export const joinOnlineClass = (classId: any) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndpoints.JoinOnlineClass;
    EndPoint.params = `?ClassId=${classId}`;
    let response = await Get(EndPoint);
    dispatch(loading(false));
    if (response.error) {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return response;
    }
  } catch {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const saveOnlineClass = (
  classId: any,
  classType: any,
  url: any,
) => async (dispatch: any) => {
  try {
    let response = await PostSecured(ApiEndpoints.SaveOnlineClassType, {
      ClassId: classId,
      Type: classType,
      Url: url,
    });
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return response;
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const startMeeting = (classId: any, className: any) => async (
  dispatch: any,
) => {
  try {
    let response = await PostSecured(ApiEndpoints.StartMeeting, {
      MeetingId: classId,
      IsCourseMeeting: false,
      MeetingTopic: className,
    });
    if (response?.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return response;
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const getCourseSteps = (stepId: any, stepType: any) => async (
  dispatch: any,
) => {
  try {
    dispatch(loading(true));
    var EndPoint: endpoint = ApiEndpoints.GetCourseSteps;
    EndPoint.params = `?StepId=${stepId}&StepType=${stepType}`;
    let response = await Get(EndPoint);
    dispatch(loading(false));
    if (response?.error) {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return { data: response };
    }
  } catch {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const JoinRunningClass = (classId: any) => async (dispatch: any) => {
  try {
    let params = `?classId=${classId}`;
    let response = await PostSecuredWithParams(
      ApiEndpoints.JoinRunningClass,
      params,
    );
    if (response?.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return response;
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const StartCalimaticOnlineClass = (
  className: any,
  classId: any,
  url: any,
) => async (dispatch: any) => {
  try {
    let params = `?className=${className}&classId=${classId}&url=${url}`;
    let response = await PostSecuredWithParams(
      ApiEndpoints.StartCalimaticOnlineClass,
      params,
    );
    if (response?.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return response;
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const GetHomeWorkStep = (
  challengeId: any,
  HomeWorkId: any,
  StepId: any,
  StudentId: any,
) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndpoints.GetHomeWorkStep;
    EndPoint.params = `?challengeId=${challengeId}&HomeWorkId=${HomeWorkId}&StepId=${StepId}&StudentId=${StudentId}`;
    let response = await Get(EndPoint);
    dispatch(loading(false));
    if (response?.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return response;
    }
  } catch {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const SaveHomeWorkStep = (homework: any) => async (dispatch: any) => {
  try {
    let response = await PostSecured(ApiEndpoints.SaveHomeWorkStep, homework);
    if (response?.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return response;
    }
  } catch (err) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
