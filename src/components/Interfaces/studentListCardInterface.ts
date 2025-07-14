export interface studentListCardInterface {
  item: Item;
  props: Props;
  index: number;
  // previous: any;
  onItrate: any;
}

interface Props {
  fetchingParams: FetchingParams;
  filteredStudentlist: any;
  isAllAbsent: boolean;
  isAllPresent: boolean;
  markedAttendance: any;
  onEndReached: boolean;
  selected: boolean;
  selectedAttendacneTypeAll: any;
  setFilteredStudentlist: any;
  setMarkedAttendence: any;
  setSelectedAttendanceTypeAll: any;
  isClassAttendance: any;
}

interface FetchingParams {
  date: string;
  id: number;
}

interface Item {
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
  timeFrom: TimeFrom;
  timeId: number;
  timeTo: TimeFrom;
  uniqueId: string;
  userName: string;
  showDropDown: boolean;
}

interface TimeFrom {
  days: number;
  hours: number;
  milliseconds: number;
  minutes: number;
  seconds: number;
  ticks: number;
  totalDays: number;
  totalHours: number;
  totalMilliseconds: number;
  totalMinutes: number;
  totalSeconds: number;
}
