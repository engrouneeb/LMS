export const stateConstants = {
  timeSheet: 'timeSheet',
  alertTitle: 'alertTitle',
  alertMessage: 'alertMessage',
  showAlert: 'showAlert',
  firstBtn: 'firstBtn',
  warningOnly: 'warningOnly',
  showSubmitBtn: 'showSubmitBtn',
  dynamicHeight: 'dynamicHeight',

  handleCustomAlert: 'handleCustomAlert',
  handleTimeSheetAndShowSubmitBtn: 'handleTimeSheetAndShowSubmitBtn',
};

export const initialState = {
  timeSheet: [],
  alertTitle: undefined,
  alertMessage: undefined,
  showAlert: false,
  firstBtn: undefined,
  warningOnly: false,
  showSubmitBtn: false,
  dynamicHeight: undefined,
};

const multiStateReq = [
  stateConstants.handleCustomAlert,
  stateConstants.handleTimeSheetAndShowSubmitBtn,
];

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
          warningOnly: action.data.warningOnly,
        };

      case stateConstants.handleTimeSheetAndShowSubmitBtn:
        return {
          ...state,
          timeSheet: action.data.timeSheet,
          showSubmitBtn: action.data.showSubmitBtn,
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
