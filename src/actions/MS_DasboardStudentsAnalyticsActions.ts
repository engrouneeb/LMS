export const MS_STUDENTSACTIONS = {
  MS_STUDENTS_LOADING: '/actions/ms/students/LOADING',
  MS_STUDENTS_SUCCESS: '/actions/ms/students/SUCCESS',
  MS_STUDENTS_FAILED: '/actions/ms/students/FAILED',
};

export function ms_studentsLoading() {
  return {
    type: MS_STUDENTSACTIONS.MS_STUDENTS_LOADING,
  };
}

export function ms_studentsSuccess(payload: any) {
  return {
    type: MS_STUDENTSACTIONS.MS_STUDENTS_SUCCESS,
    payload,
  };
}

export function ms_studentsFailed() {
  return {
    type: MS_STUDENTSACTIONS.MS_STUDENTS_FAILED,
  };
}
