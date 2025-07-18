export const stateConstants: any = {
  schedule: 'schedule',
  showModal: 'showModal',
  showAddByRangeModal: 'showAddByRangeModal',
  weekStart: 'weekStart',
  weekDate: 'weekDate',
  weekDates: 'weekDates',
  selectedDate: 'selectedDate',
  selectedDayID: 'selectedDayID',
  isEdit: 'isEdit',
  startTime: 'startTime',
  endTime: 'endTime',
  scheduleID: 'scheduleID',
  dayID: 'dayID',
  selectedWageID: 'selectedWageID',
  dayComments: 'dayComments',
  isCopyWeekScheduleModal: 'isCopyWeekScheduleModal',
  alertTitle: 'alertTitle',
  alertMessage: 'alertMessage',
  showAlert: 'showAlert',
  firstBtn: 'firstBtn',
  secondBtn: 'secondBtn',
  showAddScheduleModal: 'showAddScheduleModal',
  showOptionModal: 'showOptionModal',
  isWeekEmpty: 'isWeekEmpty',
  previousWeekStartDate: 'previousWeekStartDate',
  previousWeekEndDate: 'previousWeekEndDate',
  isScheduleEditing: 'isScheduleEditing',
  scheduleDate: 'scheduleDate',
  Custom_Alert: 'Custom_Alert',
  Change_Modal_State: 'Change_Modal_State',
  Change_Range_Modal_State: 'Change_Range_Modal_State',
};

const multiStateReq = [
  stateConstants.Custom_Alert,
  stateConstants.Change_Modal_State,
  stateConstants.Change_Range_Modal_State,
];

export const initialState = {
  schedule: [],
  showModal: false,
  showAddByRangeModal: false,
  weekStart: '',
  weekDate: '',
  weekDates: [],
  selectedDate: null,
  selectedDayID: null,
  isEdit: false,
  startTime: null,
  endTime: null,
  scheduleID: null,
  dayID: null,
  selectedWageID: '',
  dayComments: '',
  isCopyWeekScheduleModal: false,
  alertTitle: undefined,
  alertMessage: undefined,
  showAlert: false,
  firstBtn: undefined,
  secondBtn: undefined,
  showAddScheduleModal: false,
  showOptionModal: false,
  isWeekEmpty: false,
  previousWeekStartDate: null,
  previousWeekEndDate: null,
  isScheduleEditing: false,
  scheduleDate: '',
};

export const reducer = (state: any, action: any) => {
  if (multiStateReq.includes(action.type)) {
    switch (action.type) {
      case stateConstants.Custom_Alert:
        return {
          ...state,
          showAlert: action.data.showAlert,
          alertTitle: action.data.alertTitle,
          alertMessage: action.data.alertMessage,
          firstBtn: action.data.firstBtn && action.data.firstBtn,
          secondBtn: action.data.secondBtn && action.data.secondBtn,
        };

      case stateConstants.Change_Modal_State:
        return {
          ...state,
          selectedDayID: action.data.selectedDayID,
          showModal: action.data.showModal,
          startTime: action.data.startTime,
          endTime: action.data.endTime,
          scheduleID: action.data.scheduleID,
          dayID: action.data.dayID,
          selectedWageID: action.data.selectedWageID,
          dayComments: action.data.dayComments,
          isEdit: action.data.isEdit,
        };

      case stateConstants.Change_Range_Modal_State:
        return {
          ...state,
          selectedDayID: action.data.selectedDayID,
          showAddByRangeModal: action.data.showAddByRangeModal,
          startTime: action.data.startTime,
          endTime: action.data.endTime,
          scheduleID: action.data.scheduleID,
          dayID: action.data.dayID,
          selectedWageID: action.data.selectedWageID,
          dayComments: action.data.dayComments,
          isEdit: action.data.isEdit,
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
