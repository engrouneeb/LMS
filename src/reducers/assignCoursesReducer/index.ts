import { AssignCourseActionTypes } from '../../actions/AssignCoursesAction';
export interface AssignCoursesInterface {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: [];
}
const initialState: AssignCoursesInterface = {
  loading: false,
  success: false,
  failed: false,
  data: [],
};

const reducer = (
  state: AssignCoursesInterface = initialState,
  actions: any,
): AssignCoursesInterface => {
  switch (actions.type) {
    case AssignCourseActionTypes.LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case AssignCourseActionTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        failed: false,
        data: actions.payload,
      };

    case AssignCourseActionTypes.FAILED:
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

export default reducer;
