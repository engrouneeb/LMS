export const stateConstants = {
  SHOW_MODAL: 'showModal',
  IS_EDITING: 'isEditing',
  EDITING_ITEM: 'editingItem',
  REDEEM_CODES: 'redeemCodes',
  IS_LOADING: 'isLoading',
  SHOW_ALERT: 'showAlert',
  ALERT_MESSAGE: 'alertMessage',
  DELETING_ITEM: 'deletingitem',
  SHOW_ALERT_MESSAGE: 'showAlertMessage',
  SHOW_EDITING_MODAL: 'showEditingModal',
};

type redeemCodeType = {
  redeemCode?: string;
  redeemCodeId?: number;
  createdDate?: Date;
};
type editingItemType = {
  redeemCode: string;
  redeemCodeId: number;
};

export interface initialStateInterface {
  showModal: boolean;
  isEditing: boolean;
  editingItem: editingItemType;
  redeemCodes: redeemCodeType[];
  isLoading: boolean;
  showAlert: boolean;
  alertMessage: string;
  deletingitem: string;
}

export type ReducerDataType =
  | boolean
  | string
  | editingItemType
  | redeemCodeType;

export const initialState: initialStateInterface = {
  showModal: false,
  isEditing: false,
  editingItem: {
    redeemCode: '',
    redeemCodeId: 0,
  },
  redeemCodes: [],
  isLoading: false,
  showAlert: false,
  alertMessage: '',
  deletingitem: '',
};

const multiStateReq = [
  stateConstants.SHOW_ALERT_MESSAGE,
  stateConstants.SHOW_EDITING_MODAL,
];
export const reducer = (state: any, action: any) => {
  if (multiStateReq.includes(action.type)) {
    switch (action.type) {
      case stateConstants.SHOW_ALERT_MESSAGE:
        return {
          ...state,
          alertMessage: action.data.alertMessage,
          showAlert: action.data.showAlert,
        };
      case stateConstants.SHOW_EDITING_MODAL:
        return {
          ...state,
          showModal: action.data.showModal,
          isEditing: action.data.isEditing,
          editingItem: action.data.editingItem,
        };
      default:
        break;
    }
  } else if (Object.keys(state).includes(action.type))
    return { ...state, [action.type]: action.data };
  console.log({ 'Does not exist(action.type)': action.type });
  return state;
};
