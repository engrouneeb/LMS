import { ScheduleActions } from '../../actions/ScheduleActions';

export interface ScheduleInterface {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: [];
}
const initialState: ScheduleInterface = {
  loading: false,
  success: false,
  failed: false,
  data: [],
};

const ScheduleReducer = (
  state: ScheduleInterface = initialState,
  action: any,
): ScheduleInterface => {
  switch (action.type) {
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
        data: action.payload,
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

export default ScheduleReducer;
