import { ScheduleActions } from '../../actions/ScheduleAdminAction';
export interface adminScheduleInterface {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: [];
}
const initialState: adminScheduleInterface = {
  loading: false,
  success: false,
  failed: false,
  data: [],
};

const AdminScheduleReducer = (
  state: adminScheduleInterface = initialState,
  actions: any,
): adminScheduleInterface => {
  switch (actions.type) {
    case ScheduleActions.SCHEDULE_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case ScheduleActions.SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        failed: false,
        data: actions.payload,
      };

    case ScheduleActions.SCHEDULE_FAILED:
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

export default AdminScheduleReducer;
