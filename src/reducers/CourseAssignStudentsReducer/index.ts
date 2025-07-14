import { AssignStudentsActions } from '../../actions/CourseAssignStudentsAction';
export interface CourseAssignStudentsReducerInterface {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: [];
}
const initialState: CourseAssignStudentsReducerInterface = {
  loading: false,
  success: false,
  failed: false,
  data: [],
};

const CourseAssignStudentsReducer = (
  state: CourseAssignStudentsReducerInterface = initialState,
  actions: any,
): CourseAssignStudentsReducerInterface => {
  switch (actions.type) {
    case AssignStudentsActions.ASSIGN_STUDENTS_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case AssignStudentsActions.ASSIGN_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        failed: false,
        data: actions.payload,
      };

    case AssignStudentsActions.ASSIGN_STUDENTS_FAILED:
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

export default CourseAssignStudentsReducer;
