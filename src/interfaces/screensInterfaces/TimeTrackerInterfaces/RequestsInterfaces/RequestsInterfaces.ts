export interface ItemInterface {
  name: string;
  navigateTo: string;
  badgeCount: number;
}

interface TimeTrackerBadgesInterface {
  timeSheetCount: number;
  timeOffCount: number;
  expenseCount: number;
  coverCount: number;
  coverageCount: number;
}

interface CurrentUserInteface {
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
  zoomConfig: ZoomConfig;
}

interface ZoomConfig {
  sdkClientKey: string;
  sdkClientSecret: string;
}

export interface UserAndBadgesInterface {
  currentUser: CurrentUserInteface;
  timeTrackerBadges: TimeTrackerBadgesInterface;
}

export interface CounterInterface {
  item: ItemInterface;
}
