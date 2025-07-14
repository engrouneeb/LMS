//Assign courses of course player
export const AssignCourseActionTypes = {
  LOADING: '/assign/course/actions/LOADING',
  SUCCESS: '/assign/course/actions/SUCCESS',
  FAILED: '/assign/course/actions/FAILED',
};

export function assignCoursesLoading() {
  return {
    type: AssignCourseActionTypes.LOADING,
  };
}

export function assignCoursesSuccess(payload: any) {
  return {
    type: AssignCourseActionTypes.SUCCESS,
    payload,
  };
}

export function assignCoursesFailed() {
  return {
    type: AssignCourseActionTypes.FAILED,
  };
}
