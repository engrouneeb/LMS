import { StudentActions } from '../../actions/CoursePlayerStudentActions';
export interface CP_StudentReducerInterface {
  readonly cpLoading: boolean;
  readonly cpSuccess: boolean;
  readonly cpFailed: boolean;
  readonly cpProgress: boolean;
  readonly data: [];
}
const initialState: CP_StudentReducerInterface = {
  cpLoading: false,
  cpSuccess: false,
  cpFailed: false,
  cpProgress: false,
  data: [],
};

const CP_StudentReducer = (
  state: CP_StudentReducerInterface = initialState,
  actions: any,
): CP_StudentReducerInterface => {
  switch (actions.type) {
    case StudentActions.STUDENT_LOADING:
      return {
        ...state,
        cpLoading: true,
        cpSuccess: false,
        cpFailed: false,
        cpProgress: false,
      };

    case StudentActions.STUDENT_SUCCESS:
      return {
        ...state,
        cpLoading: false,
        cpSuccess: true,
        cpFailed: false,
        cpProgress: true,
        data: actions.payload,
      };

    case StudentActions.STUDENT_FAILED:
      return {
        ...state,
        cpLoading: false,
        cpSuccess: false,
        cpFailed: true,
        cpProgress: false,
      };

    case StudentActions.STUDENT_PROGRESS:
      return {
        ...state,
        cpLoading: false,
        cpSuccess: false,
        cpFailed: false,
        cpProgress: actions.payload,
      };

    default:
      return state;
  }
};

export default CP_StudentReducer;
