// export interface chatObjectInterface {
//   ChatObj: ChatObj;
//   ChatUserObj: ChatUserObj;
//   UserData: UserData;
// }

export interface UserData {
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
  // userID?: number;
  userImag: string;
  userName: string;
  zoomConfig?: ZoomConfig;
  userID?: any;
}

interface ZoomConfig {
  sdkClientKey: string;
  sdkClientSecret: string;
}

export interface ChatUserObj {
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
  lastMsgDateTime: string;
  lname: string;
  notiCount?: any;
  phoneNo?: any;
  unReadMsgCount?: any;
  userGuid: string;
  userId: number;
  userName: string;
}

export interface ChatObj {
  attachment: string;
  dateTime: string;
  fromContactID: string;
  fromId: number;
  fromUserName: string;
  id: number;
  isRead: boolean;
  isRecieved: boolean;
  message: string;
  toContactID: string;
  toId: number;
  toUsername: string;
  videoThumbnailURL: string;
  image?: any;
  video?: any;
  file?: any;
  audio?: any;
  FromId?: any;
}
