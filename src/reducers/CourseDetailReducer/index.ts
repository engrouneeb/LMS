import { CourseDetailsActions } from '../../actions/CourseDetailsAction';
export interface CourseDetailReducerInterface {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: [];
}
const initialState: CourseDetailReducerInterface = {
  loading: false,
  success: false,
  failed: false,
  data: [],
};

const CourseDetailReducer = (
  state: CourseDetailReducerInterface = initialState,
  actions: any,
): CourseDetailReducerInterface => {
  switch (actions.type) {
    case CourseDetailsActions.COURSE_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case CourseDetailsActions.COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        failed: false,
        data: actions.payload,
      };

    case CourseDetailsActions.COURSE_DETAILS_FAILED:
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

export default CourseDetailReducer;
