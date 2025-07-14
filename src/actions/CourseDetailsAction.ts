export const CourseDetailsActions = {
  COURSE_DETAILS_LOADING: '/actions/course/COURSE_DETAILS_LOADING',
  COURSE_DETAILS_SUCCESS: '/actions/course/COURSE_DETAILS_SUCCESS',
  COURSE_DETAILS_FAILED: '/actions/course/COURSE_DETAILS_FAILED',
};

export function courseDetailLoading() {
  return {
    type: CourseDetailsActions.COURSE_DETAILS_LOADING,
  };
}

export function courseDetailSuccess(payload: any) {
  return {
    type: CourseDetailsActions.COURSE_DETAILS_SUCCESS,
    payload,
  };
}

export function courseDetailFailed() {
  return {
    type: CourseDetailsActions.COURSE_DETAILS_FAILED,
  };
}
