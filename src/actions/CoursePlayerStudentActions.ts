export const StudentActions = {
  STUDENT_LOADING: '/actions/coursePlayer/student/STUDENT_LOADING',
  STUDENT_SUCCESS: '/actions/coursePlayer/student/STUDENT_SUCCESS',
  STUDENT_FAILED: '/actions/coursePlayer/student/STUDENT_FAILED',
  STUDENT_PROGRESS: '/actions/coursePlayer/student/STUDENT_PROGRESS',
};

export function CP_studentLoading() {
  return {
    type: StudentActions.STUDENT_LOADING,
  };
}

export function CP_studentSuccess(payload: any) {
  return {
    type: StudentActions.STUDENT_SUCCESS,
    payload,
  };
}

export function CP_studentFailed() {
  return {
    type: StudentActions.STUDENT_FAILED,
  };
}

export function CP_studentProgress(payload: any) {
  return {
    type: StudentActions.STUDENT_PROGRESS,
    payload,
  };
}
