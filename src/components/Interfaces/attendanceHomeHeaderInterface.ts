import { mainNavigationInterface } from '.';

export interface attendanceHomeHeaderInterface {
  AttendanceTypes?: any;
  UserInfo: UserInfo;
  chosenDate: string;
  classId?: any;
  filteredStudentlist: FilteredStudentlist[];
  isAllAbsent: boolean;
  isAllPresent: boolean;
  markedAttendance: any;
  navigation: mainNavigationInterface;
  selected: boolean;
  setChosenDate: any;
  setFilteredStudentlist: any;
  setIsAllAbsent: any;
  setIsAllPresent: any;
  setLoading: any;
  setMarkedAttendence: any;
  setSelected: any;
  setSelectedAttendanceTypeAll: any;
  showMenu?: boolean;
  fetchAll: (date: DateConstructor) => void;
}

interface FilteredStudentlist {
  batchID: number;
  classId: number;
  className: string;
  color: string;
  dateFrom?: any;
  dateTo?: any;
  firstName: string;
  image: string;
  isPresent?: any;
  lastName: string;
  makeUpClassId: number;
  status: number;
  studentID: number;
  time: string;
  timeFrom?: any;
  timeId: number;
  timeTo?: any;
  uniqueId: string;
  userName: string;
}

interface UserInfo {
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
