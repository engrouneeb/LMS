import { TimeOffInstructorActions } from '../../actions/timeOffInstructorActions';
export interface TimeOffInstructorInterface {
  readonly staffLoading: boolean;
  readonly staffSuccess: boolean;
  readonly staffFailed: boolean;
  readonly data: any;
}
const initialState: TimeOffInstructorInterface = {
  staffLoading: false,
  staffSuccess: false,
  staffFailed: false,
  data: [],
};

const TimeOffInstructorReducer = (
  state: TimeOffInstructorInterface = initialState,
  actions: any,
): TimeOffInstructorInterface => {
  switch (actions.type) {
    case TimeOffInstructorActions.TIME_OFF_INSTRUCTOR_LOADING:
      return {
        ...state,
        staffLoading: true,
        staffSuccess: false,
        staffFailed: false,
      };

    case TimeOffInstructorActions.TIME_OFF_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        staffLoading: false,
        staffSuccess: true,
        staffFailed: false,
        data: actions.payload,
      };
    case TimeOffInstructorActions.TIME_OFF_INSTRUCTOR_UPDATE:
      let instructorList = [...state.data];
      let index = state.data.findIndex(
        ({ userID }: any) => userID == actions.payload.userID,
      );
      if (index != -1) {
        let oldWeek = state.data[index].weekDays;
        let updated = [...oldWeek];
        let dayIndex = oldWeek.findIndex(
          (x: any) => x.dayDate == actions.payload.dayDate,
        );

        if (dayIndex != -1) {
          updated[dayIndex].dayId =
            actions.payload.type == 'Add' ? actions.payload.userID : 0;
        }
        instructorList[index].weekDays = updated;
      }

      return {
        ...state,
        staffLoading: false,
        staffSuccess: true,
        staffFailed: false,
        data: instructorList,
      };

    case TimeOffInstructorActions.TIME_OFF_INSTRUCTOR_FAILED:
      return {
        ...state,
        staffLoading: false,
        staffSuccess: false,
        staffFailed: true,
      };

    default:
      return state;
  }
};

export default TimeOffInstructorReducer;
