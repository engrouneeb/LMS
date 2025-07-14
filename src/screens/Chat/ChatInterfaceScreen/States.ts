export const stateConstants = {
  MESSAGES: 'MESSAGES',
  FILTERED_CHAT: 'FILTERED_CHAT',
  DATA: 'DATA',
  SKIP: 'SKIP',
  IS_LOAD_MORE: 'IS_LOAD_MORE',
  IS_LOAD_MORE_CHAT: 'IS_LOAD_MORE_CHAT',
  RECEIVER_TOKEN: 'RECEIVER_TOKEN',
  ALERT_MESSAGE: 'ALERT_MESSAGE',
  SHOW_ALERT: 'SHOW_ALERT',
  MODAL_VISIBLE: 'MODAL_VISIBLE',
  HEADER_TITLE: 'HEADER_TITLE',
  CHAT_ID: 'CHAT_ID',
  STD_ID: 'STD_ID',
  GROUP_NAME: 'GROUP_NAME',
  USER_LIST: 'USER_LIST',
  IS_SOCKET_CONNECTED: 'IS_SOCKET_CONNECTED',
  VIEW_CHAT_OF: 'VIEW_CHAT_OF',
  OTHER_CHAT_SKIP: 'OTHER_CHAT_SKIP',
  IS_READ_MESSAGE: 'IS_READ_MESSAGE',
  IS_USER_ONLINE: 'IS_USER_ONLINE',
  IS_TYPING: 'IS_TYPING',
  TYPING_TIME: 'TYPING_TIME',
  INTIAL_STATE: 'INTIAL_STATE',
  SET_MESSAGES: 'SET_MESSAGES',
  VIEW_MODAL: 'VIEW_MODAL',
  SET_TYPING_AND_TIME: 'SET_TYPING_AND_TIME',
  LOAD_MORE_AND_VIEW_CHAT_OF: 'LOAD_MORE_AND_VIEW_CHAT_OF',
  SET_FILTERED_CHAT_DATA_AND_OTHER_CHAT_SKIP:
    'SET_FILTERED_CHAT_DATA_AND_OTHER_CHAT_SKIP',
  SET_FILTERED_CHAT_DATA_AND_CHAT_SKIP: 'SET_FILTERED_CHAT_DATA_AND_CHAT_SKIP',
  IS_READ_MESSAGE_AND_RECEIVER_TOKEN: 'IS_READ_MESSAGE_AND_RECEIVER_TOKEN',
  GROUP_NAME_AND_OTHER_CHAT_SKIP: 'GROUP_NAME_AND_OTHER_CHAT_SKIP',
};

type viewChatOfType = {
  color: string;
  companyKey: number;
  companyName?: any;
  companyType: string;
  fname: string;
  fullName: string;
  image: string;
  index: number;
  isOWner: boolean;
  isUserActive: boolean;
  lastMessage?: any;
  lastMsgDateTime?: any;
  lname: string;
  notiCount?: any;
  phoneNo?: any;
  unReadMsgCount?: any;
  userGuid: string;
  userId: number;
  userName: string;
};

export type messagesType = {
  _id: number;
  attachment: string;
  audio: string;
  createdAt: string;
  file: string;
  image: string;
  isRead: boolean;
  isReceived: boolean;
  text: string;
  user: {
    _id: number;
    avatar: boolean;
    name: string;
  };
  video: string;
  videoThumbnailURL?: string;
};

interface chatInterfaceScreenInterface {
  messages?: messagesType[];
  filteredChat?: messagesType[];
  data?: any[];
  skip?: number;
  isLoadMore?: boolean;
  isLoadMoreChat?: boolean;
  recieverTokens?: string[];
  alertMessage?: string;
  showAlert?: boolean;
  modalVisible?: boolean;
  headerTitle?: string;
  chatID?: string;
  stdID?: number;
  groupName?: string;
  userList?: any[];
  isSocketConnected?: boolean;
  viewChatOf?: viewChatOfType;
  otherChatSkip?: number;
  isReadMessage?: boolean;
  isUserOnline?: boolean;
  isTyping?: boolean;
  typingTime?: Date;
  STD_ID?: number;
}

export const initialState: chatInterfaceScreenInterface = {
  messages: [],
  filteredChat: [],
  data: [],
  skip: 0,
  isLoadMore: true,
  isLoadMoreChat: true,
  recieverTokens: [],
  alertMessage: '',
  showAlert: false,
  modalVisible: false,
  headerTitle: '',
  chatID: '',
  stdID: 0,
  groupName: '',
  userList: [],
  isSocketConnected: true,
  viewChatOf: undefined,
  otherChatSkip: 0,
  isReadMessage: false,
  isUserOnline: false,
  isTyping: false,
  typingTime: new Date(),
  STD_ID: 0,
};
interface payloadChatInterfaceScreenInterface {
  data?:
    | any[]
    | boolean
    | number
    | string
    | Date
    | any
    | messagesType
    | viewChatOfType;
  type: string;
}

export const reducer = (
  state: chatInterfaceScreenInterface,
  payload: payloadChatInterfaceScreenInterface
): any => {
  switch (payload.type) {
    case stateConstants.SET_MESSAGES:
      return {
        ...state,
        messages: payload.data.messages,
        filteredChat: payload.data.filteredChat,
      };
    case stateConstants.MESSAGES:
      return { ...state, messages: payload.data };
    case stateConstants.FILTERED_CHAT:
      return { ...state, filteredChat: payload.data };
    case stateConstants.DATA:
      return { ...state, data: payload.data };
    case stateConstants.SKIP:
      return { ...state, skip: payload.data };
    case stateConstants.IS_LOAD_MORE:
      return { ...state, isLoadMore: payload.data };
    case stateConstants.IS_LOAD_MORE_CHAT:
      return { ...state, isLoadMoreChat: payload.data };
    case stateConstants.RECEIVER_TOKEN:
      return { ...state, recieverTokens: payload.data };
    case stateConstants.ALERT_MESSAGE:
      return { ...state, alertMessage: payload.data };
    case stateConstants.SHOW_ALERT:
      return { ...state, showAlert: payload.data };
    case stateConstants.MODAL_VISIBLE:
      return { ...state, modalVisible: payload.data };
    case stateConstants.HEADER_TITLE:
      return { ...state, headerTitle: payload.data };
    case stateConstants.CHAT_ID:
      return { ...state, chatID: payload.data };
    case stateConstants.STD_ID:
      return { ...state, stdID: payload.data };
    case stateConstants.GROUP_NAME:
      return { ...state, groupName: payload.data };
    case stateConstants.GROUP_NAME_AND_OTHER_CHAT_SKIP:
      return {
        ...state,
        groupName: payload.data.groupName,
        otherChatSkip: payload.data.otherChatSkip,
      };
    case stateConstants.USER_LIST:
      return { ...state, userList: payload.data };
    case stateConstants.IS_SOCKET_CONNECTED:
      return { ...state, isSocketConnected: payload.data };
    case stateConstants.VIEW_CHAT_OF:
      return { ...state, viewChatOf: payload.data };
    case stateConstants.OTHER_CHAT_SKIP:
      return { ...state, otherChatSkip: payload.data };
    case stateConstants.IS_READ_MESSAGE:
      return { ...state, isReadMessage: payload.data };
    case stateConstants.IS_USER_ONLINE:
      return { ...state, isUserOnline: payload.data };
    case stateConstants.IS_TYPING:
      return { ...state, isTyping: payload.data };
    case stateConstants.TYPING_TIME:
      return { ...state, typingTime: payload.data };
    case stateConstants.SET_FILTERED_CHAT_DATA_AND_OTHER_CHAT_SKIP:
      let { filteredChat, otherChatSkip, data } = payload.data;
      return { ...state, filteredChat, otherChatSkip, data };
    case stateConstants.SET_FILTERED_CHAT_DATA_AND_CHAT_SKIP:
      const { filteredChat: newChat, skip, data: newData } = payload.data;
      return { ...state, filteredChat: newChat, skip, data: newData };
    case stateConstants.VIEW_MODAL:
      const { modalVisible, STD_ID, headerTitle, chatID } = payload.data;
      return {
        ...state,
        STD_ID,
        modalVisible,
        headerTitle,
        chatID,
      };
    case stateConstants.SET_TYPING_AND_TIME:
      const { isTyping, typingTime } = payload.data;
      return { ...state, typingTime, isTyping };
    case stateConstants.LOAD_MORE_AND_VIEW_CHAT_OF:
      const { isLoadMore, viewChatOf } = payload.data;
      return { ...state, isLoadMore, viewChatOf };
    case stateConstants.IS_READ_MESSAGE_AND_RECEIVER_TOKEN:
      const { isReadMessage, recieverTokens } = payload.data;
      return { ...state, isReadMessage, recieverTokens };
    case stateConstants.SET_FILTERED_CHAT_DATA_AND_OTHER_CHAT_SKIP:
      return {
        ...state,
        filteredChat: payload.data.filteredChat,
        skip: payload.data.skip,
        data: payload.data.data,
      };
    case stateConstants.INTIAL_STATE:
      return { ...initialState };
    default:
      return state;
  }
};
