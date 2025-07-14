export interface ChatInterfaceScreenInterface {
  navigation: any;
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
}

interface Params {
  name: string;
  To: number;
  UserObj: UserObj;
  groupName: string;
  shiftToTop?: any;
}

interface UserObj {
  userId: number;
  userName: string;
  phoneNo?: any;
  companyName?: any;
  companyKey: number;
  companyType: string;
  isOWner: boolean;
  color: string;
  fname: string;
  lname: string;
  userGuid: string;
  fullName: string;
  image: string;
  index: number;
  lastMessage: string;
  lastMsgDateTime: string;
  isUserActive: boolean;
  unReadMsgCount?: any;
  notiCount?: any;
}

export interface getChatObjectAgrgument_SenderInterface {
  businessCompanyGuid: string;
  companyID: number;
  companySecureUrl: string;
  companyUrl: string;
  email: string;
  firstName: string;
  fullName: string;
  groupName: string;
  initial: string;
  isCheckedIn: boolean;
  isFranchise: boolean;
  isOwner: boolean;
  isValid: boolean;
  lastName: string;
  licenseCmpKey: number;
  roleName: string;
  status: number;
  userColor: string;
  userGuid: string;
  userID: number;
  userImag: string;
  userName: string;
}

export interface getChatObjectArgument_ReceiverInterface {
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
  lastMessage: string;
  lastMsgDateTime: Date;
  lname: string;
  notiCount?: any;
  phoneNo?: any;
  unReadMsgCount?: any;
  userGuid: string;
  userId: number;
  userName: string;
}

export interface getChatObjectArgument_MsgInterface {
  color?: string;
  companyKey?: number;
  companyName?: any;
  companyType?: string;
  fname?: string;
  fullName?: string;
  image?: string;
  index?: number;
  isOWner?: boolean;
  isUserActive?: boolean;
  lastMessage?: string;
  lastMsgDateTime?: string;
  lname?: string;
  notiCount?: any;
  phoneNo?: any;
  unReadMsgCount?: any;
  userGuid?: string;
  userId?: number;
  userName?: string;
  audio?: string;
  text: string;
  object?: any;
}

export interface getUserChatParam {
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
}

export interface getChatObjectArgument_StateInterface {
  messages: any[];
  filteredChat: FilteredChat[];
  data: Datum[];
  skip: number;
  isLoadMore: boolean;
  isLoadMoreChat: boolean;
  recieverTokens: any[];
  alertMessage: string;
  showAlert: boolean;
  modalVisible: boolean;
  headerTitle: string;
  chatID: string;
  stdID?: any;
  groupName: string;
  userList: any[];
  isSocketConnected: boolean;
  otherChatSkip: number;
  isReadMessage: IsReadMessage;
  isUserOnline: boolean;
  isTyping: boolean;
  typingTime: string;
  STD_ID: number;
}

export interface IsReadMessage {
  fromId: number;
  fromUserName: string;
  toId: number;
  toUsername: string;
  message: string;
  id: number;
  dateTime: string;
  isRead: boolean;
  isRecieved: boolean;
  toContactID: string;
  fromContactID: string;
  attachment: string;
  videoThumbnailURL?: any;
}

export interface Datum {
  _id: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  attachment: string;
  image?: string;
  isReceived: boolean;
  videoThumbnailURL?: string;
  user: User2;
  audio?: string;
}

export interface User2 {
  _id: number;
  name: string;
  avatar: boolean;
}

export interface FilteredChat {
  text: string;
  user: User;
  createdAt: string;
  _id: number | string;
  isRead: boolean;
  isReceived: boolean;
  attachment?: string;
  videoThumbnailURL?: string;
  image?: string;
  audio?: string;
  video?: string;
}

export interface User {
  _id: number;
  name?: string;
  avatar?: boolean;
}

export interface UpdateChatObjArgument_chatlistInterface {
  fromId: number;
  fromUserName: string;
  toId: number;
  toUsername: string;
  message: string;
  id: number;
  dateTime: string;
  isRead: boolean;
  isRecieved: boolean;
  toContactID: string;
  fromContactID: string;
  attachment: string;
  videoThumbnailURL?: string;
}

export interface UpdateChatObjArgument_ChatUserInfoInterface {
  userId: number;
  userName: string;
  phoneNo?: any;
  companyName?: any;
  companyKey: number;
  companyType: string;
  isOWner: boolean;
  color: string;
  fname: string;
  lname: string;
  userGuid: string;
  fullName: string;
  image: string;
  index: number;
  lastMessage: string;
  lastMsgDateTime: string;
  isUserActive: boolean;
  unReadMsgCount?: any;
  notiCount?: any;
}

export interface UpdateChatObjArgument_UserInfoInterface {
  isValid: boolean;
  roleName: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  userImag: string;
  userColor: string;
  isCheckedIn: boolean;
  initial: string;
  companyUrl: string;
  companySecureUrl: string;
  userID: number;
  userName: string;
  groupName: string;
  companyID: number;
  isFranchise: boolean;
  isOwner: boolean;
  userGuid: string;
  licenseCmpKey: number;
  businessCompanyGuid: string;
  status: number;
}

export interface UpdateChatObj_returningObj {
  _id: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  attachment: string;
  isReceived: boolean;
  videoThumbnailURL?: string;
  user: User;
  image?: string;
  audio?: string;
}

export interface handleMsgReceivedInterface {
  UserObj: {
    attachmentUrl: any;
    BusinessCompanyGuid: string;
    CompanyID: number;
    DateTime: string;
    FromId: number;
    FromRoleName: string;
    FromUserName: string;
    Message: string;
    TextMessage: string;
    ToId: number;
    ToUsername: string;
    isOwner: boolean;
    isRead: number;
    isReceive: number;
    licenseCmpKey: number;
    notificationType: number;
    receiverUsrGuid: string;
    recieverNotiCout: number;
    recieverTokens: string[];
    senderName: string;
    videoThumbnailURL: string;
  };
  chatFor: number;
  familyCode: string;
  licenseCode: string;
  message: {
    _id: string;
    createdAt: Date;
    text: string;
    user: {}[];
  }[];
  receiverObj: {
    businessCompanyGuid: string;
    companyID: number;
    companySecureUrl: string;
    companyUrl: string;
    email: string;
    firstName: string;
    fullName: string;
    groupName: string;
    initial: string;
    isCheckedIn: boolean;
    isFranchise: boolean;
    isOwner: boolean;
    isValid: boolean;
    lastName: string;
    licenseCmpKey: number;
    roleName: string;
    status: number;
    userColor: string;
    userGuid: string;
    userID: number;
    userImag: string;
    userName: string;
  };
  reciever: string;
  variantName: string;
}

export interface onSendMsgInterface {
  text: string;
  user: {
    _id: number;
  };
  createdAt: string | Date;
  _id: string;
  messageType?: string;
  audio?: string;
  color?: string;
  companyKey?: number;
  companyName?: any;
  companyType?: string;
  fname?: string;
  fullName?: string;
  image?: string;
  index?: number;
  isOWner?: boolean;
  isUserActive?: boolean;
  lastMessage?: string;
  lastMsgDateTime?: string;
  lname?: string;
  notiCount?: any;
  phoneNo?: any;
  unReadMsgCount?: any;
  userGuid?: string;
  userId?: number;
  userName?: string;
}

export interface voiceMsgPlaybackInterface {
  currentPosition: number;
  duration: number;
  isMuted: boolean;
}
