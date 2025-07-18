export const stateConstants = {
  isVisible: 'isVisible',
  selectedDay: 'selectedDay',
  markedDates: 'markedDates',
  isTimeOff: 'isTimeOff',
  timeIn: 'timeIn',
  _timeOff: '_timeOff',
  timeOffId: 'timeOffId',
  timeOffComment: 'timeOffComment',
  alertTitle: 'alertTitle',
  alertMessage: 'alertMessage',
  showAlert: 'showAlert',
  firstBtn: 'firstBtn',
  secondBtn: 'secondBtn',
  title: 'title',
  instructorDetails: 'instructorDetails',
  handleCustomAlert: 'handleCustomAlert',
  handleDateChange: 'handleDateChange',
};

const multiStateReq = [
  stateConstants.handleCustomAlert,
  stateConstants.handleDateChange,
];
export const initialState = {
  isVisible: false,
  selectedDay: new Date(),
  markedDates: {},
  isTimeOff: false,
  timeIn: '',
  _timeOff: '',
  timeOffId: '',
  timeOffComment: '',
  alertTitle: '',
  alertMessage: '',
  showAlert: false,
  firstBtn: '',
  secondBtn: '',
  title: '',
  instructorDetails: {},
};

export const reducer = (state: any, action: any) => {
  if (multiStateReq.includes(action.type)) {
    switch (action.type) {
      case stateConstants.handleCustomAlert:
        return {
          ...state,
          showAlert: action.data.showAlert,
          alertTitle: action.data.alertTitle,
          alertMessage: action.data.alertMessage,
          firstBtn: action.data.firstBtn,
          secondBtn: action.data.secondBtn,
        };
      case stateConstants.handleDateChange:
        return {
          ...state,
          timeOffId: action.data.timeOffId,
          isTimeOff: action.data.isTimeOff,
          timeIn: action.data.timeIn,
          _timeOff: action.data._timeOff,
          timeOffComment: action.data.timeOffComment,
          title: action.data.title,
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
