import { CoursePlayerActions } from '../../actions/CoursePlayerAction';
export interface CoursePlayerContentInterface {
  readonly hasMoreData: boolean;
  readonly isdataLoaded: boolean;
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: [];
}
const initialState: CoursePlayerContentInterface = {
  hasMoreData: true,
  isdataLoaded: false,
  loading: false,
  success: false,
  failed: false,
  data: [],
};

const CoursePlayerContent = (
  state: CoursePlayerContentInterface = initialState,
  actions: any,
): CoursePlayerContentInterface => {
  switch (actions.type) {
    case CoursePlayerActions.COURSE_PLAYER_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case CoursePlayerActions.COURSE_PLAYER_SUCCESS:
      return {
        ...state,
        isdataLoaded: true,
        loading: false,
        success: true,
        failed: false,
        data: actions.payload?.data,
        hasMoreData: actions.payload?.hasMoreData,
      };
    case CoursePlayerActions.COURSE_PLAYER_HASMORE:
      return {
        ...state,
        hasMoreData: actions.payload,
      };

    case CoursePlayerActions.COURSE_PLAYER_FAILED:
      return {
        ...state,
        isdataLoaded: true,
        loading: false,
        success: false,
        failed: true,
      };

    default:
      return state;
  }
};

export default CoursePlayerContent;
