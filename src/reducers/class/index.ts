export interface ClassReducerInterface {
  readonly Classes: [];
  readonly FlatClasses: [];
  readonly DateList: [];
  readonly Courses: [];
}
const initialstate: ClassReducerInterface = {
  Classes: [],
  FlatClasses: [],
  DateList: [],
  Courses: [],
};
const classReducer = (
  state: ClassReducerInterface = initialstate,
  action: any,
): ClassReducerInterface => {
  switch (action.type) {
    case 'SET_PLANE_COURSES':
      return { ...state, Courses: action.data };

    case 'SET_CLASSES':
      var FlatClasses = action.classes.courseClasses.reduce((a, b) =>
        a.concat(b),
      );
      return { ...state, Classes: action.classes, FlatClasses: FlatClasses };
    case 'DATE_LIST':
      return { ...state, DateList: action.data };
    case 'UPDATE_CANCEL_CLASSES':
      var tempArray: any = state.DateList;
      var Slot: any = tempArray[action.index];
      Slot.cancelClassId = action.CancelClassId;
      tempArray[action.index] = Slot;
      return { ...state, DateList: tempArray };
    default:
      return state;
  }
};

export default classReducer;
