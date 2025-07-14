export interface AddScheduleByRangeInterface {
  schedule: Schedule[];
  scheduleID: string;
  selectedDate: string;
  selectedDayID: number;
  selectedWageID: string;
  selectedWeekEndDate: string;
  selectedWeekStartDate: string;
  showModal: boolean;
  startTime: string;
  updateLocalState: any;
  userData: UserData;
  userID: number;
  userName: string;
  changeModalState: any;
  dates: any;
  dayID: string;
  description: string;
  domainURL: string;
  endTime: string;
  fetchData: any;
  isEdit: boolean;
  navigation: any;
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

interface Schedule {
  checkIn: string;
  daySchedules: any;
  timeOffs: any;
}

export type MultiScheduleDataType = {
  ApplyForItem: number;
  BgColor: string;
  Description: string;
  EndDate: string;
  EndTimeString: string;
  IsCalenderView: boolean;
  ScheduleID: number;
  StartDate: string;
  StartTimeString: string;
  UserID: number;
  isFridayOn: boolean;
  isMondayOn: boolean;
  isSaturdayOn: boolean;
  isSundayOn: boolean;
  isThursdayOn: boolean;
  isTuesdayOn: boolean;
  isWednesdayOn: boolean;
};

export type MultiScheduleResponseType = {
  item1: boolean;
  item2: number;
  item3: string;
  status: number;
};

export type UserType = {
  fName: string;
  lName: string;
  schedule: any[];
};
