import { MS_STUDENTSENROLLEDACTIONS } from '../../actions/MS_DBStudentsEnrolledActions';
export interface StudentsEnrolledInterface {
  readonly ms_db_loading: boolean;
  readonly ms_db_success: boolean;
  readonly ms_db_failed: boolean;
  readonly data?: [];
}
const initialState: StudentsEnrolledInterface = {
  ms_db_loading: false,
  ms_db_success: false,
  ms_db_failed: false,
  data: [],
};

const StudentsEnrolledReducer = (
  state: StudentsEnrolledInterface = initialState,
  actions: any,
): StudentsEnrolledInterface => {
  switch (actions.type) {
    case MS_STUDENTSENROLLEDACTIONS.MS_STUDENTS_LOADING:
      return {
        ...state,
        ms_db_loading: true,
        ms_db_success: false,
        ms_db_failed: false,
      };

    case MS_STUDENTSENROLLEDACTIONS.MS_STUDENTS_SUCCESS:
      return {
        ...state,
        ms_db_loading: false,
        ms_db_success: true,
        ms_db_failed: false,
        data: actions.payload,
      };

    case MS_STUDENTSENROLLEDACTIONS.MS_STUDENTS_FAILED:
      return {
        ...state,
        ms_db_loading: false,
        ms_db_success: false,
        ms_db_failed: true,
      };

    default:
      return state;
  }
};

export default StudentsEnrolledReducer;
