import { CourseAttachmentActions } from '../../actions/DownloadAction';
export interface CourseDownloadReducerInterface {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: [];
}
const initialState: CourseDownloadReducerInterface = {
  loading: false,
  success: false,
  failed: false,
  data: [],
};

const CourseDownloadReducer = (
  state: CourseDownloadReducerInterface = initialState,
  actions: any,
): CourseDownloadReducerInterface => {
  switch (actions.type) {
    case CourseAttachmentActions.COURSE_ATTACHMENT_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case CourseAttachmentActions.COURSE_ATTACHMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        failed: false,
        data: actions.payload,
      };

    case CourseAttachmentActions.COURSE_ATTACHMENT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
      };

    default:
      return state;
  }
};

export default CourseDownloadReducer;
