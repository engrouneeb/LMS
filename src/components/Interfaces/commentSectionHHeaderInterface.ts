export interface commentSectionHeaderInterface {
  UserData: UserData;
  checkHref: any;
  obj: Obj;
  onPressDeleteComment: any;
  onPressEdit: any;
  onPressLike: any;
  onPressReply: any;
}

interface Obj {
  cds_temp_guid?: any;
  comment: string;
  commentId: number;
  companyKey?: any;
  createdById: number;
  createdDate: string;
  discussionCount: number;
  guid?: any;
  imagePath: string;
  isLiked: boolean;
  itemId: number;
  likeCount: string;
  moduleId: number;
  parentId: number;
  repliedToComment?: any;
  reply: any;
  replyCount: string;
  userColor: string;
  userName: string;
  userTagsString?: any;
}

interface UserData {
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
