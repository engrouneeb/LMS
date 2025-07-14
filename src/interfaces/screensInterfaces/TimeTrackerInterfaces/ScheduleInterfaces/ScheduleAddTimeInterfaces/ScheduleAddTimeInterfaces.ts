export interface ScheduleAddTimeInterface {
  schedule: Schedule[];
  scheduleID: string;
  selectedDate: string;
  selectedDayID: number;
  selectedWageID: string;
  selectedWeekEndDate: string;
  selectedWeekStartDate: string;
  setEditingDisable: any;
  showModal: boolean;
  startTime: string;
  updateLocalState: (schedule: any) => void;
  userData: UserData;
  userID: number;
  userName: string;
  changeModalState: (visible: boolean) => void;
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
