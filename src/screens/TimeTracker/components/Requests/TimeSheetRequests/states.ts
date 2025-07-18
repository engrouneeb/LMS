interface TimeSheetApprovalsInterface {
  itemId: number;
  itemName: string;
  itemType: string;
  isTimeSheetAutomated: boolean;
  timeSheetEntryType: number;
  startDateDisplay: string;
  endDateDisplay: string;
  startTimeDisplay?: any;
  endTimeDisplay?: any;
  userId: number;
  userName: string;
  startDate: string;
  endDate: string;
  status: string;
  statusHtml: string;
  totalHours: number;
  fullName: string;
  startDateTemp: string;
  endDateTemp: string;
  userWage: number;
  isSubmittedToQB: boolean;
  applyWageFrom?: any;
  statusInt: number;
  startTime?: any;
  endTime?: any;
  requestedToUserName?: any;
  requestedFromUserName?: any;
  comments: string;
}

interface activeTabInterface {
  [key: string]: string;
}

interface initialStateInterface {
  TimeSheetApprovals: TimeSheetApprovalsInterface[];
  showModal: boolean;
  modalComment: string;
  modalStatus: string;
  modalItem: {};
  modalBtn: string;
  loading: boolean;
  rejectVisible: boolean;
  activeTab: activeTabInterface[];
  showAlert: boolean;
  alertMessage: string;
  alertTitle: string;
}

export const initialState: initialStateInterface = {
  TimeSheetApprovals: [],
  showModal: false,
  modalComment: '',
  modalStatus: '',
  modalItem: {},
  modalBtn: '',
  loading: false,
  rejectVisible: false,
  activeTab: [],
  showAlert: false,
  alertMessage: '',
  alertTitle: '',
};

export const iniitialState_Constants = {
  TimeSheetApprovals: 'TimeSheetApprovals',
  showModal: 'showModal',
  modalComment: 'modalComment',
  modalStatus: 'modalStatus',
  modalItem: 'modalItem',
  modalBtn: 'modalBtn',
  loading: 'loading',
  rejectVisible: 'rejectVisible',
  activeTab: 'activeTab',
  showAlert: 'showAlert',
  alertMessage: 'alertMessage',
  alertTitle: 'alertTitle',
};

export const timeSheetReducer = (
  state: any,
  payLoad: { type: string; data: any }
) => {
  if (Object.keys(state).includes(payLoad.type))
    return { ...state, [payLoad.type]: payLoad.data };
  else return state;
};
