export const MS_STUDENTSENROLLEDACTIONS = {
  MS_STUDENTS_LOADING: '/actions/ms/students/enrolled/LOADING',
  MS_STUDENTS_SUCCESS: '/actions/ms/students/enrolled/SUCCESS',
  MS_STUDENTS_FAILED: '/actions/ms/students/enrolled/FAILED',
};

export function ms_studentsEnrolledLoading() {
  return {
    type: MS_STUDENTSENROLLEDACTIONS.MS_STUDENTS_LOADING,
  };
}

export function ms_studentsEnrolledSuccess(payload: any) {
  return {
    type: MS_STUDENTSENROLLEDACTIONS.MS_STUDENTS_SUCCESS,
    payload,
  };
}

export function ms_studentsEnrolledFailed() {
  return {
    type: MS_STUDENTSENROLLEDACTIONS.MS_STUDENTS_FAILED,
  };
}
