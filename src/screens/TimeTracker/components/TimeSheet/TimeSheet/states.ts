import moment from 'moment';
export const stateConstants = {
  weekStart: 'weekStart',
  items: 'items',
  filteredItems: 'filteredItems',
  submittButton: 'submittButton',
  modalVisible: 'modalVisible',
  approvers: 'approvers',
  showAlert: 'showAlert',
  firstBtn: 'firstBtn',
  alertMessage: 'alertMessage',
  alertTitle: 'alertTitle',
  loading: 'loading',
  selectedSheets: 'selectedSheets',
  handleUpdateWeekDates: 'handleUpdateWeekDates',
  selectedSheetsAndLoading: 'selectedSheetsAndLoading',
  handleCustomAlert: 'handleCustomAlert',
};
const multiStateReq = [
  stateConstants.handleUpdateWeekDates,
  stateConstants.selectedSheetsAndLoading,
  stateConstants.handleCustomAlert,
];
export const initialState = {
  weekStart: moment().startOf('week'),
  items: [],
  filteredItems: [],
  submittButton: 'none',
  modalVisible: false,
  approvers: [],
  showAlert: false,
  firstBtn: undefined,
  alertMessage: undefined,
  alertTitle: undefined,
  loading: false,
  selectedSheets: [],
};
export const reducer = (state: any, action: any) => {
  if (multiStateReq.includes(action.type)) {
    switch (action.type) {
      case stateConstants.handleUpdateWeekDates:
        return {
          ...state,
          items: action.data.items,
          filteredItems: action.data.filteredItems,
          loading: action.data.loading,
          submittButton: action.data.submittButton,
          approvers: action.data.approvers,
          weekStart: action.data.weekStart,
        };
      case stateConstants.selectedSheetsAndLoading:
        return {
          ...state,
          loading: action.data.loading,
          selectedSheets: action.data.selectedSheets,
        };
      case stateConstants.handleCustomAlert:
        return {
          ...state,
          showAlert: action.data.showAlert,
          alertTitle: action.data.alertTitle,
          alertMessage: action.data.alertMessage,
          firstBtn: action.data.firstBtn,
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
