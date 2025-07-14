export interface AttendenceReducerInterface {
  TodayAttendence?: any;
  readonly OldAttendence?: any;
  readonly AttendenceByClass?: [];
  readonly originalAttendence?: [];
  readonly ClassesList?: any;
  readonly skip: number;
  readonly take: number;
  readonly classTake: number;
}
const initialState: AttendenceReducerInterface = {
  TodayAttendence: [],
  OldAttendence: [],
  AttendenceByClass: [],
  originalAttendence: [],
  ClassesList: [],
  skip: 0,
  take: 0,
  classTake: 0,
};
const AttendenceReducer = (
  state: AttendenceReducerInterface = initialState,
  action: any,
): AttendenceReducerInterface => {
  switch (action.type) {
    case 'RESET_ATTENDENCE':
      return {
        ...state,
        TodayAttendence: [],
        OldAttendence: [],
        AttendenceByClass: [],
        originalAttendence: [],
        ClassesList: [],
        skip: 0,
        take: 0,
        classTake: 0,
      };
    case 'SET_TODAY_ATTENDENCE':
      if (action.skip == 0) {
        return {
          ...state,
          TodayAttendence: action.data,
          skip: action.skip,
          take: action.take,
        };
      }
      return {
        ...state,
        TodayAttendence: [...state.TodayAttendence, ...action.data],
        skip: action.skip,
        take: action.take,
      };
    case 'SET_CLASSES_FOR_ATTENDENCE':
      if (action.take == 10) {
        return {
          ...state,
          ClassesList: action.data,
          skip: action.skip,
          classTake: action.take,
        };
      }
      return {
        ...state,
        ClassesList: [...state.TodayAttendence, ...action.data],
        skip: action.skip,
        classTake: action.take,
      };
    case 'ATTENDENCE_STUDENT_LIST':
      return {
        ...state,
        AttendenceByClass: action.data,
      };

    case 'SAVE_ATTENDENCE_BEFORE_SUBMITTING':
      if (action.take > 10) {
        return {
          ...state,
          OldAttendence: [...state.OldAttendence, ...action.data],
        };
      }
      return {
        ...state,
        OldAttendence: action.data,
      };
    default:
      return state;
  }
};

export default AttendenceReducer;
