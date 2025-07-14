export interface MessageScreenInterface {
  Chatfor: number;
  TabName: string;
}
export interface chatForInterface {
  chatFor: number;
}
export interface chatUserScreenInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: undefined;
}

interface Params {
  chatFor: number;
  group: string;
}

export interface MsgCounterProps {
  UnreadCount: number;
}

export interface intialChatUsersScreenStateInterface {
  loading: boolean;
  userList: any[];
  secured: any[];
  skip: number;
  error?: any;
  refreshing: boolean;
  hasScrolled: boolean;
  chatUsers: any[];
  filteredData: any[];
  onlineUsers: any[];
  chatFor: number;
  hasMoreData: boolean;
  allUsersLoaded: boolean;
  showUserProfileModal: boolean;
  showUserProfile: {
    userId: number;
    fname: string;
    lname: string;
    image: any;
    fullName: string;
  };
}

export interface getChatMembersType {
  key: boolean;
  status: number;
  value: {
    color: string;
    companyKey: number;
    companyName?: any;
    companyType: string;
    fname: string;
    fullName: string;
    image?: any;
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
}

export interface getAllUserFunctionType {
  key: boolean;
  status: number;
  value: {
    color: string;
    companyKey: number;
    companyName?: any;
    companyType: string;
    fname: string;
    fullName: string;
    image?: string;
    index: number;
    isOWner: boolean;
    isUserActive: boolean;
    lastMessage?: string;
    lastMsgDateTime?: string;
    lname: string;
    notiCount?: any;
    phoneNo?: any;
    unReadMsgCount?: any;
    userGuid: string;
    userId: number;
    userName?: string;
  }[];
}

export interface receiveMsgType {
  _id: string;
  createdAt: string;
  text: string;
  user: {
    _id: number;
  };
}

export interface msgType {
  color: string;
  companyKey: number;
  companyName?: any;
  companyType: string;
  fname: string;
  fullName: string;
  image?: string;
  index: number;
  isOWner: boolean;
  isUserActive: boolean;
  lastMessage?: string;
  lastMsgDateTime?: string;
  lname: string;
  notiCount?: any;
  phoneNo?: any;
  unReadMsgCount?: any;
  userGuid: string;
  userId: number;
  userName?: string;
}
export interface renderUserMetaInterface {
  item: msgType;
  index: number;
}
