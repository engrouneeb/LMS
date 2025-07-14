export const CourseAttachmentActions = {
  COURSE_ATTACHMENT_LOADING: '/actions/course/COURSE_ATTACHMENT_LOADING',
  COURSE_ATTACHMENT_SUCCESS: '/actions/course/COURSE_ATTACHMENT_SUCCESS',
  COURSE_ATTACHMENT_FAILED: '/actions/course/COURSE_ATTACHMENT_FAILED',
};

export function courseAttachmentLoading() {
  return {
    type: CourseAttachmentActions.COURSE_ATTACHMENT_LOADING,
  };
}

export function courseAttachmentSuccess(payload: any) {
  return {
    type: CourseAttachmentActions.COURSE_ATTACHMENT_SUCCESS,
    payload,
  };
}

export function courseAttachmentFailed() {
  return {
    type: CourseAttachmentActions.COURSE_ATTACHMENT_FAILED,
  };
}
