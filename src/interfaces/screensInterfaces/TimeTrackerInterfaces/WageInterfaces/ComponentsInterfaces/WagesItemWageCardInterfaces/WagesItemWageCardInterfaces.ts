export interface ObjInterface {
  assignmentKey: number;
  disabled?: any;
  isCoverRequestSent: boolean;
  returnUrl: string;
  role: string;
  roleType: number;
  scheduleDateTime?: any;
  scheduleDayId: number;
  totalLoggedHours?: any;
  totalWages: number;
  userGuid: string;
  userID: number;
  userName: string;
  wageItemName?: any;
}
export interface WagesItemWageCardInterface {
  onPressCard: () => void;
  Obj: ObjInterface;
  onPressSummary: () => void;
  onPressArrow: () => void;
  expanded: boolean;
}
