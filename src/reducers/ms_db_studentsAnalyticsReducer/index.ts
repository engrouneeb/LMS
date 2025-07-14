import { MS_STUDENTSACTIONS } from '../../actions/MS_DasboardStudentsAnalyticsActions';
export interface StudentsAnalyticsInterface {
  readonly ms_db_loading: boolean;
  readonly ms_db_success: boolean;
  readonly ms_db_failed: boolean;
  readonly data?: [];
}
const initialState: StudentsAnalyticsInterface = {
  ms_db_loading: false,
  ms_db_success: false,
  ms_db_failed: false,
  data: [],
};

const StudentsAnalyticsReducer = (
  state: StudentsAnalyticsInterface = initialState,
  actions: any,
): StudentsAnalyticsInterface => {
  switch (actions.type) {
    case MS_STUDENTSACTIONS.MS_STUDENTS_LOADING:
      return {
        ...state,
        ms_db_loading: true,
        ms_db_success: false,
        ms_db_failed: false,
      };

    case MS_STUDENTSACTIONS.MS_STUDENTS_SUCCESS:
      return {
        ...state,
        ms_db_loading: false,
        ms_db_success: true,
        ms_db_failed: false,
        data: actions.payload,
      };

    case MS_STUDENTSACTIONS.MS_STUDENTS_FAILED:
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

export default StudentsAnalyticsReducer;
