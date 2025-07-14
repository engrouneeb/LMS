export const StateConstants = {
  alertMessage: 'alertMessage',
  alertTitle: 'alertTitle',
  applyForItem: 'applyForItem',
  applyForItemName: 'applyForItemName',
  bgColor: 'bgColor',
  dayID: 'dayID',
  description: 'description',
  endDate: 'endDate',
  endTime: 'endTime',
  hasDateSelection: 'hasDateSelection',
  hasStartDateSelected: 'hasStartDateSelected',
  hasStartTimeSelected: 'hasStartTimeSelected',
  isEdit: 'isEdit',
  isRangeEnable: 'isRangeEnable',
  isFridayOn: 'isFridayOn',
  isMondayOn: 'isMondayOn',
  isSaturdayOn: 'isSaturdayOn',
  isSundayOn: 'isSundayOn',
  isThursdayOn: 'isThursdayOn',
  isTuesdayOn: 'isTuesdayOn',
  isWednesdayOn: 'isWednesdayOn',
  resetState: 'resetState',
  selectedDate: 'selectedDate',
  selectedDay: 'selectedDay',
  selectedDays: 'selectedDays',
  showAlert: 'showAlert',
  showDatePicker: 'showDatePicker',
  startDate: 'startDate',
  startTime: 'startTime',
  userID: 'userID',
  wages: 'wages',
  handleAlert: 'handleAlert',
  assignProps: 'assignProps',
  applyForItem_Name: 'applyForItem_Name',
  timePicker: 'timePicker',
  datePicker: 'datePicker',
};

const multiStateReq = [
  StateConstants.handleAlert,
  StateConstants.assignProps,
  StateConstants.applyForItem_Name,
  StateConstants.timePicker,
  StateConstants.datePicker,
];

export const initialState = {
  alertMessage: '',
  alertTitle: '',
  applyForItem: '',
  applyForItemName: '',
  bgColor: '',
  dayID: 0,
  description: '',
  endDate: new Date(),
  endTime: '10:00 AM',
  hasDateSelection: true,
  hasStartDateSelected: '',
  hasStartTimeSelected: false,
  isEdit: false,
  Saturday: false,
  Sunday: false,
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  isFridayOn: false,
  isMondayOn: false,
  isRangeEnable: true,
  isSaturdayOn: false,
  isSundayOn: false,
  isThursdayOn: false,
  isTuesdayOn: false,
  isWednesdayOn: false,
  selectedDate: '',
  selectedDay: 0,
  selectedDays: [],
  showAlert: false,
  showDatePicker: false,
  startDate: new Date(),
  startTime: '09:00 AM',
  userID: '',

  wages: [],
};

export const reducer = (state: any, action: any) => {
  if (multiStateReq.includes(action.type)) {
    switch (action.type) {
      case StateConstants.handleAlert:
        return {
          ...state,
          showAlert: action.data.showAlert,
          alertTitle: action.data.alertTitle,
          alertMessage: action.data.alertMessage,
        };
      case StateConstants.assignProps:
        return {
          ...state,
          [StateConstants.startTime]: action.data.startTime,
          [StateConstants.endTime]: action.data.endTime,
          [StateConstants.description]: action.data.description,
          [StateConstants.selectedDate]: action.data.selectedDate,
          [StateConstants.selectedDay]: action.data.selectedDay,
          [StateConstants.dayID]: action.data.dayID,
        };
      case StateConstants.applyForItem_Name:
        return {
          ...state,
          [StateConstants.applyForItem]: action.data.applyForItem,
          [StateConstants.applyForItemName]: action.data.applyForItemName,
        };

      case StateConstants.timePicker:
        return {
          ...state,
          [StateConstants.showDatePicker]: action.data.showDatePicker,
          [StateConstants.hasDateSelection]: action.data.hasDateSelection,
          [StateConstants.hasStartTimeSelected]:
            action.data.hasStartTimeSelected,
        };

      case StateConstants.datePicker:
        return {
          ...state,
          [StateConstants.showDatePicker]: action.data.showDatePicker,
          [StateConstants.hasDateSelection]: action.data.hasDateSelection,
          [StateConstants.hasStartDateSelected]:
            action.data.hasStartDateSelected,
        };

      default:
        return state;
    }
  } else {
    if (Object.keys(state).includes(action.type))
      return { ...state, [action.type]: action.data };
    else return state;
  }
};
