export const AssignStudentsActions = {
  ASSIGN_STUDENTS_LOADING: '/actions/coursePlayer/ASSIGN_STUDENTS_LOADING',
  ASSIGN_STUDENTS_SUCCESS: '/actions/coursePlayer/ASSIGN_STUDENTS_SUCCESS',
  ASSIGN_STUDENTS_FAILED: '/actions/coursePlayer/ASSIGN_STUDENTS_FAILED',
};

export function assignStudentsLoading() {
  return {
    type: AssignStudentsActions.ASSIGN_STUDENTS_LOADING,
  };
}

export function assignStudentsSuccess(payload: any) {
  return {
    type: AssignStudentsActions.ASSIGN_STUDENTS_SUCCESS,
    payload,
  };
}

export function assignStudentsFailed() {
  return {
    type: AssignStudentsActions.ASSIGN_STUDENTS_FAILED,
  };
}
