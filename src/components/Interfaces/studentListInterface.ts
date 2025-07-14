export interface studentListInterface {
  fetchingParams: FetchingParams;
  filteredStudentlist: FilteredStudentlist[];
  isAllAbsent: boolean;
  isAllPresent: boolean;
  markedAttendance: any;
  onEndReached: boolean;
  selected: boolean;
  selectedAttendacneTypeAll: string;
  setFilteredStudentlist: any;
  setMarkedAttendence: any;
  setSelectedAttendanceTypeAll: any;
}

interface FilteredStudentlist {
  [x: string]: any;
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
  timeFrom: any;
  timeId: number;
  timeTo: any;
  uniqueId: string;
  userName: string;
}

interface FetchingParams {
  date: string;
  id: number;
}
