import { SelectedItemProps } from '../../interfaces';
const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0)
export const stateConstants = {
  CHILDREN: 'children',
  STUDENT_ID: 'studentId',
  START_CLASS: 'startClass',
  REQUEST_COMPLETED: 'requestCompleted',
  ALERT_TITLE: 'alertTitle',
  ALERT_MESSAGE: 'alertMessage',
  SHOW_ALERT: 'showAlert',
  ALERT_FIRST_BTN: 'alertFirstBtn',
  ALERT_SECOND_BTN: 'alertSecondBtn',
  ALERT_MODAL_VISIBLE: 'alertModalVisible',
  ACTIVE: 'active',
  FOOTER_LOADER: 'footerLoader',
  CLASS_STARTED_MODAL: 'classStartedModal',
  CLASS_DETAIL: 'classDetail',
  ONLINE_CLASS_TYPE: 'onlineClassType',
  HANGOUT_URL: 'hangoutUrl',
  IS_LANDSCAPE: 'isLandscape',
  SELECTED_ITEM: 'selectedItem',
  SHOW_DETAILS_MODAL: 'showDetailsModal',
  INTITIAL_LOAD: 'intitialLoad',
  SKIP: 'skip',
  LOADINGS_DATES: 'loadingsDate',
  DATES_WITH_CLASSES: 'datesWithClasses',
  PREVIOUS_SELECTED_DATE: 'previousSelectedDate',
  CLASS_DATE_ARRAY: 'classDateArray',
  SELECTED_DAY: 'selectedDay',
  SELECTED_MONTH: 'selectedMonth',
  MODAL_DATA: 'modalData',
  MODAL_DATA_SEARCH: 'modalDataSearch',
  DELETE_POPUP: 'deletePopup',
  SHOW_ALERT_MESSAGE: 'showAlertMessage',
  ON_DAY_PRESS: 'onDayPress',
  SET_DATA: 'setData',
  SET_NO_DATA: 'setNoData',
  DATE_DATA: 'dateData',
  LOADING: 'loading',
  ERROR: 'error',
  MEETING_FAILURE: 'meetingFailure',
  SHOW_CANCEL_CLASS_ALERT: 'showCancelClassAlert',
  HIDE_DELETE_ALERT: 'hideDeleteAlert',
  SELECT_CLASS: 'selecClass',
  HANDLE_START_ONLINE_CLASS: 'startOnlineClass',
  REQUEST_MAKEUP_OR_CANCEL_CLASS: 'RequestMakeupOrCancelClass',
};

export interface InitialStateInterface {
  children: undefined | any[];
  studentId: number | string | null;
  startClass: boolean;
  requestCompleted: boolean;
  alertTitle: 'Warning' | 'Error' | 'Success';
  alertMessage: string;
  showAlert: boolean;
  alertFirstBtn: string;
  alertSecondBtn: string;
  alertModalVisible: boolean;
  active?: string;
  footerLoader: boolean;
  classStartedModal: boolean;
  classDetail: string | null;
  onlineClassType: number;
  hangoutUrl: string;
  isLandScape: boolean;
  selectedItem: SelectedItemProps;
  showDetailsModal: boolean;
  intitialLoad: boolean;
  skip: number;
  loadingsDate: boolean;
  datesWithClasses: [];
  classDateArray: {};
  previousSelectedDate: any;
  selectedDay: Date | any;
  selectedMonth: Date;
  modalData: [];
  modalDataSearch: [];
  deletePopup: boolean;
  requestMakeupOrCancelClass: {};
}

export type ReducerDataType =
  | string
  | number
  | boolean
  | Date
  | []
  | SelectedItemProps
  | any;

export const initialState: InitialStateInterface = {
  children: [],
  studentId: null,
  startClass: false,
  requestCompleted: true,
  alertTitle: 'Warning',
  alertMessage: '',
  showAlert: false,
  alertFirstBtn: 'Okay',
  alertSecondBtn: '',
  alertModalVisible: false,
  footerLoader: false,
  classStartedModal: false,
  classDetail: null,
  onlineClassType: 1,
  hangoutUrl: '',
  isLandScape: false,
  selectedItem: [],
  showDetailsModal: false,
  intitialLoad: false,
  skip: 10,
  loadingsDate: false,
  datesWithClasses: [],
  classDateArray: {},
  previousSelectedDate: null,
  selectedDay: undefined,
  selectedMonth: currentDate,
  modalData: [],
  modalDataSearch: [],
  deletePopup: false,
  active: undefined,
  requestMakeupOrCancelClass: {},
};

const multiStateReq = [
  stateConstants.SHOW_ALERT_MESSAGE,
  stateConstants.ON_DAY_PRESS,
  stateConstants.SET_DATA,
  stateConstants.SET_NO_DATA,
  stateConstants.DATE_DATA,
  stateConstants.LOADING,
  stateConstants.ERROR,
  stateConstants.MEETING_FAILURE,
  stateConstants.SHOW_CANCEL_CLASS_ALERT,
  stateConstants.HIDE_DELETE_ALERT,
  stateConstants.SELECT_CLASS,
  stateConstants.HANDLE_START_ONLINE_CLASS,
];

export const reducer = (state: any, action: any) => {
  if (multiStateReq.includes(action.type)) {
    switch (action.type) {
      case stateConstants.SHOW_ALERT_MESSAGE:
        return {
          ...state,
          alertTitle: action.data.alertTitle,
          alertMessage: action.data.alertMessage,
          showAlert: action.data.showAlert,
        };
      case stateConstants.ON_DAY_PRESS:
        return {
          ...state,
          loadingsDate: action.data.loadingsDate,
          modalData: action.data.modalData,
          modalDataSearch: action.data.modalDataSearch,
          skip: action.data.skip,
          intitialLoad: action.data.intitialLoad,
          selectedDay: action.data.selectedDay,
        };
      case stateConstants.SET_DATA:
        return {
          ...state,
          modalData: [...state.modalData, ...action.data],
          modalDataSearch: [...state.modalDataSearch, ...action.data],
        };
      case stateConstants.SET_NO_DATA:
        return {
          ...state,
          modalData: [],
          modalDataSearch: [],
          loadingsDate: false,
          footerLoader: false,
        };
      case stateConstants.DATE_DATA:
        return {
          ...state,
          datesWithClasses: action.data.datesWithClasses,
          classDateArray: action.data.classDateArray,
        };
      case stateConstants.LOADING:
        return {
          ...state,
          loadingsDate: action.data,
          footerLoader: action.data,
        };
      case stateConstants.SELECT_CLASS:
        return {
          ...state,
          showDetailsModal: action.data.showDetailsModal,
          selectedItem: action.data.selectedItem,
          classDetail: action.data.selectedItem,
          requestMakeupOrCancelClass: action.data.RequestMakeupOrCancelClass,
        };
      case stateConstants.HANDLE_START_ONLINE_CLASS:
        return {
          ...state,
          classDetail: action.data.classDetail,
          onlineClassType: action.data.onlineClassType,
          hangoutUrl: action.data.hangoutUrl,
          startClass: action.data.startClass,
        };
      case stateConstants.ERROR:
        return {
          ...state,
          skip: action.data.skip,
          alertTitle: 'Error',
          alertMessage: action.data.alertMessage,
          showAlert: action.data.showAlert,
          alertFirstBtn: action.data.alertFirstBtn,
          alertSecondBtn: action.data.alertSecondBtn,
          alertModalVisible: action.data.alertModalVisible,
        };
      case stateConstants.SHOW_CANCEL_CLASS_ALERT:
        return {
          ...state,
          showDetailsModal: action.data.showDetailsModal,
          alertTitle: action.data.alertTitle,
          alertMessage: action.data.alertMessage,
          deletePopup: action.data.deletePopup,
          alertFirstBtn: action.data.alertFirstBtn,
          alertSecondBtn: action.data.alertSecondBtn,
          alertModalVisible: action.data.alertModalVisible,
        };
      case stateConstants.MEETING_FAILURE:
        return {
          ...state,
          alertTitle: 'Error',
          alertMessage: action.data.alertMessage,
        };
      case stateConstants.HIDE_DELETE_ALERT:
        return {
          ...state,
          alertTitle: '',
          alertMessage: '',
          alertModalVisible: false,
          deletePopup: false,
        };
      default:
        break;
    }
  } else if (Object.keys(state).includes(action.type))
    return { ...state, [action.type]: action.data };
  console.log({ 'Does not exist(action.type)': action.type });
  return state;
};
