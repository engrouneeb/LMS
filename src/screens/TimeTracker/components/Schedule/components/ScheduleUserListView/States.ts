import moment from 'moment';

export const StateConstants = {
  weekStart: 'weekStart',
  weekEnd: 'weekEnd',
  selectedNotifyType: 'selectedNotifyType',
  dayIdList: 'dayIdList',
  userIdList: 'userIdList',
  isPublishing: 'isPublishing',
  filteredData: 'filteredData',
  data: 'data',
  showAlert: 'showAlert',
  alertTitle: 'alertTitle',
  alertMessage: 'alertMessage',
  showScheduleModal: 'showScheduleModal',
  footerLoader: 'footerLoader',
  searchEnabled: 'searchEnabled',
};

export const initialState = {
  weekStart: moment().startOf('week'),
  weekEnd: moment().startOf('week'),
  selectedNotifyType: 0,
  dayIdList: [],
  userIdList: [],
  isPublishing: false,
  filteredData: [],
  data: [],
  showAlert: false,
  alertTitle: '',
  alertMessage: '',
  showScheduleModal: false,
  footerLoader: false,
  searchEnabled: false,
};

export const reducer = (state: any, action: any) => {
  if (Object.keys(state).includes(action.type))
    return { ...state, [action.type]: action.data };
  else return state;
};
