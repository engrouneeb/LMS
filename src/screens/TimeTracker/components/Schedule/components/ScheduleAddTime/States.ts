export const StateConstants = {
  userID: 'userID',
  applyForItem: 'applyForItem',
  applyForItemName: 'applyForItemName',
  startDate: 'startDate',
  hasStartTimeSelected: 'hasStartTimeSelected',
  endDate: 'endDate',
  startTime: 'startTime',
  endTime: 'endTime',
  isMondayOn: 'isMondayOn',
  isTuesdayOn: 'isTuesdayOn',
  isWednesdayOn: 'isWednesdayOn',
  isThursdayOn: 'isThursdayOn',
  isFridayOn: 'isFridayOn',
  isSaturdayOn: 'isSaturdayOn',
  isSundayOn: 'isSundayOn',
  selectedDays: 'selectedDays',
  description: 'description',
  bgColor: 'bgColor',
  hasDateSelection: 'hasDateSelection',
  showDatePicker: 'showDatePicker',
  isEdit: 'isEdit',
  selectedDate: 'selectedDate',
  selectedDay: 'selectedDay',
  isRangeEnable: 'isRangeEnable',
  wages: 'wages',
  dayID: 'dayID',
  alertTitle: 'alertTitle',
  showAlert: 'showAlert',
  alertMessage: 'alertMessage',
  firstBtn: 'firstBtn',
  secondBtn: 'secondBtn',
  showInstructorModal: 'showInstructorModal',
  selectedWeekStartDate: 'selectedWeekStartDate',
  selectedWeekEndDate: 'selectedWeekEndDate',
  hasStartDateSelected: 'hasStartDateSelected',
  handleAlert: 'handleAlert',
  applyForItem_Name: 'applyForItem_Name',
  handleStartDate: 'handleStartDate',
  handleStartTime: 'handleStartTime',
  handleRangeEnable_ShowDatePicker: 'handleRangeEnable_ShowDatePicker',
  handleDeleteSchedule: 'handleDeleteSchedule',
  handleTimePicker: 'handleTimePicker',
  handleDaySelection: 'handleDaySelection',
  isVisibleCreate: 'isVisibleCreate',
  initialState: 'initialState',
};

export const initialState = {
  userID: '',
  applyForItem: '',
  applyForItemName: '',
  startDate: '',
  endDate: '',
  startTime: '09:00 AM',
  endTime: '10:00 AM',
  isMondayOn: false,
  isTuesdayOn: false,
  isWednesdayOn: false,
  isThursdayOn: false,
  isFridayOn: false,
  isSaturdayOn: false,
  isSundayOn: false,
  selectedDays: [],
  description: '',
  bgColor: '',
  hasDateSelection: true,
  hasStartTimeSelected: false,
  showDatePicker: false,
  isEdit: false,
  selectedDate: '',
  selectedDay: '',
  isRangeEnable: true,
  wages: [],
  dayID: '',
  alertTitle: '',
  alertMessage: '',
  showAlert: false,
  firstBtn: undefined,
  secondBtn: undefined,
  showInstructorModal: false,
  hasStartDateSelected: false,
  selectedWeekStartDate: '',
  selectedWeekEndDate: '',
  isVisibleCreate: false,
};

const multiStateReq = [
  StateConstants.handleAlert,
  StateConstants.applyForItem_Name,
  StateConstants.handleStartDate,
  StateConstants.handleStartTime,
  StateConstants.handleRangeEnable_ShowDatePicker,
  StateConstants.handleDeleteSchedule,
  StateConstants.handleTimePicker,
  StateConstants.initialState,
  StateConstants.handleDaySelection,
];

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
      case StateConstants.applyForItem_Name:
        return {
          ...state,
          applyForItem: action.data.applyForItem,
          applyForItemName: action.data.applyForItemName,
        };
      case StateConstants.handleStartDate:
        return {
          ...state,
          startDate: action.data.startDate,
          hasStartDateSelected: action.data.hasStartDateSelected,
        };

      case StateConstants.handleStartTime:
        return {
          ...state,
          startTime: action.data.startTime,
          hasStartDateSelected: action.data.hasStartTimeSelected,
        };
      case StateConstants.handleRangeEnable_ShowDatePicker:
        return {
          ...state,
          isRangeEnable: action.data.isRangeEnable,
          showDatePicker: action.data.showDatePicker,
        };

      case StateConstants.handleDeleteSchedule:
        return {
          ...state,
          showAlert: action.data.showAlert,
          alertTitle: action.data.alertTitle,
          alertMessage: action.data.alertMessage,
          firstBtn: action.data.firstBtn,
          secondBtn: action.data.secondBtn,
          dayID: action.data.dayID,
        };

      case StateConstants.handleTimePicker:
        return {
          ...state,
          showDatePicker: action.data.showDatePicker,
          hasDateSelection: action.data.hasDateSelection,
          hasStartTimeSelected: action.data.hasStartTimeSelected,
        };
      case StateConstants.handleDaySelection: {
        return {
          ...state,
          startTime: action.data.startTime,
          hasStartTimeSelected: action.data.hasStartTimeSelected,
        };
      }
      case StateConstants.initialState:
        return {
          ...state,
          startTime: action.data.startTime,
          endTime: action.data.endTime,
          isMondayOn: action.data.isMondayOn,
          isTuesdayOn: action.data.isTuesdayOn,
          isWednesdayOn: action.data.isWednesdayOn,
          isThursdayOn: action.data.isThursdayOn,
          isFridayOn: action.data.isFridayOn,
          isSaturdayOn: action.data.isSaturdayOn,
          isSundayOn: action.data.isSundayOn,
          description: action.data.description,
          selectedDate: action.data.selectedDate,
          selectedDay: action.data.selectedDay,
          dayID: action.data.dayID,
          selectedWeekStartDate: action.data.selectedWeekStartDate,
          selectedWeekEndDate: action.data.selectedWeekEndDate,
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
