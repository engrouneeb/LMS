export interface MyRequestDetailsInterface {
  route: RouteInterface;
}
interface RouteInterface {
  key: string;
  name: string;
  params: Params;
  path: string;
}

interface Params {
  data: DataInterface;
  type: string;
}
export interface DataInterface {
  applyWageFrom?: any;
  comments: string;
  endDate: string;
  endDateDisplay: string;
  endDateTemp: string;
  endTime?: startEndTime;
  endTimeDisplay: string;
  fullName: string;
  isSubmittedToQB: boolean;
  isTimeSheetAutomated: boolean;
  itemId: number;
  itemName: string;
  itemType: string;
  requestedFromUserName?: any;
  requestedToUserName?: any;
  startDate: string;
  startDateDisplay: string;
  startDateTemp: string;
  startTime?: startEndTime;
  startTimeDisplay: string;
  status: string;
  statusHtml: string;
  statusInt: number;
  timeSheetEntryType: number;
  totalHours: number;
  userId: number;
  userName: string;
  userWage: number;
}

interface startEndTime {
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

export interface RequestDetailInterface {
  id: number;
  fullName: string;
  status: string;
  comments: string;
}

export interface MyRequestDetailsHeaderCardInterface {
  userName: string;
  type: string;
  data: DataInterface;
}
