export interface TimeTrackerInterface {
  readonly wages?: [];
  readonly wagesFrom?: [];
  readonly wagesType?: [];
  readonly wagesDetails?: [];
  readonly userWagesDetails: string;
  readonly timeTrackerBadges?: any;
}
const initialState: TimeTrackerInterface = {
  wages: [],
  wagesFrom: [],
  wagesType: [],
  wagesDetails: [],
  userWagesDetails: '',
  timeTrackerBadges: [],
};
const TimeTrackerReducer = (
  state: TimeTrackerInterface = initialState,
  action: any
): TimeTrackerInterface => {
  switch (action.type) {
    case 'SET_WAGES':
      return {
        ...state,
        wages: action.data.wages,
        wagesFrom: action.data.wagesFrom,
        wagesType: action.data.wagesType,
      };
    case 'SET_WAGES_DETAILS':
      return {
        ...state,
        wagesDetails: action.data,
      };
    case 'SET_USER_WAGES_DETAILS':
      return {
        ...state,
        userWagesDetails: action.data,
      };
    case 'SET_TIME_TRACKER_BADGES':
      return {
        ...state,
        timeTrackerBadges: action.data,
      };
    default:
      return state;
  }
};

export default TimeTrackerReducer;
