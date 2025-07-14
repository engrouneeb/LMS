export const TimeOffInstructorActions = {
  TIME_OFF_INSTRUCTOR_LOADING: '/actions/TIME_INSTRUCTOR_OFF/LOADING',
  TIME_OFF_INSTRUCTOR_SUCCESS: '/actions/TIME_INSTRUCTOR_OFF/SUCCESS',
  TIME_OFF_INSTRUCTOR_FAILED: '/actions/TIME_INSTRUCTOR_OFF/FAILED',
  TIME_OFF_INSTRUCTOR_UPDATE: '/actions/TIME_INSTRUCTOR_OFF/UPDATE',
};

export function timeOffInstructorLoading() {
  return {
    type: TimeOffInstructorActions.TIME_OFF_INSTRUCTOR_LOADING,
  };
}

export function timeOffInstructorSuccess(payload: any) {
  return {
    type: TimeOffInstructorActions.TIME_OFF_INSTRUCTOR_SUCCESS,
    payload,
  };
}
export function timeOffInstructorUpdate(payload: any) {
  return {
    type: TimeOffInstructorActions.TIME_OFF_INSTRUCTOR_UPDATE,
    payload,
  };
}

export function timeOffInstructorFailed() {
  return {
    type: TimeOffInstructorActions.TIME_OFF_INSTRUCTOR_FAILED,
  };
}
