export const stateConstants = {
  enteredWageFrom: 'enteredWageFrom',
  enteredWageType: 'enteredWageType',
  enteredItemName: 'enteredItemName',
  enteredWageRate: 'enteredWageRate',
  showAlert: 'showAlert',
  alertTitle: 'alertTitle',
  alertMessage: 'alertMessage',
  firstBtn: 'firstBtn',
  hasModified: 'hasModified',

  handleCustomAlert: 'handleCustomAlert',
  handleUpdateWageStates: 'handleUpdateWageStates',
};

const multiStateReq = [
  stateConstants.handleCustomAlert,
  stateConstants.handleUpdateWageStates,
];

export const initialState = {
  enteredWageFrom: '',
  enteredWageType: '',
  enteredItemName: '',
  enteredWageRate: '',
  showAlert: false,
  alertTitle: '',
  alertMessage: '',
  firstBtn: 'Okay',
  hasModified: false,
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
        };

      case stateConstants.handleUpdateWageStates:
        return {
          ...state,
          enteredItemName: action.data.enteredItemName,
          enteredWageFrom: action.data.enteredWageFrom,
          enteredWageType: action.data.enteredWageType,
          enteredWageRate: action.data.enteredWageRate,
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
