export interface fetchScheduleUserListViewResponse {
  scheduleHeader?: any;
  scheduleBody: ScheduleBody[];
  status: number;
}

interface ScheduleBody {
  userID: number;
  userName: string;
  userImage: string;
  weekStartDate: string;
  weekEndDate: string;
  weekDays: WeekDay[];
}

interface WeekDay {
  title?: any;
  dayId: number;
  dayHours: number;
  dayValue: number;
  dayTimesheetId: number;
  dayDate: string;
  isCellDirty: boolean;
  isCompute: boolean;
  dayComments?: any;
  dayName: string;
  dayDateString: string;
  timeFrom?: any;
  timeTo?: any;
  scheduleID: number;
  scheduleColor?: any;
  scheduleTimeOfDay?: any;
  haveAnySchedule: boolean;
  isAllowedForCRUD: boolean;
  isPublished: boolean;
  dayTimeOff: DayTimeOff;
  daySchedules: (
    | DaySchedule
    | DaySchedules2
    | DaySchedules3
    | DaySchedules4
    | DaySchedules4
  )[];
}

interface DaySchedules4 {
  dayTimesheetId?: any;
  dayId: number;
  scheduleID: number;
  timeFrom: string;
  timeTo: string;
  scheduleTimeOfDay: string;
  scheduleColor?: any;
  dayComments?: any;
  dayName: string;
  isPublished: boolean;
  myProperty: number;
}

interface DaySchedules3 {
  dayTimesheetId: number;
  dayId: number;
  scheduleID: number;
  timeFrom: string;
  timeTo: string;
  scheduleTimeOfDay: string;
  scheduleColor: string;
  dayComments: string;
  dayName: string;
  isPublished: boolean;
  myProperty: number;
}

interface DaySchedules2 {
  dayTimesheetId?: number;
  dayId: number;
  scheduleID: number;
  timeFrom: string;
  timeTo: string;
  scheduleTimeOfDay: string;
  scheduleColor: string;
  dayComments?: string;
  dayName: string;
  isPublished: boolean;
  myProperty: number;
}

interface DaySchedule {
  dayTimesheetId?: any;
  dayId: number;
  scheduleID: number;
  timeFrom: string;
  timeTo: string;
  scheduleTimeOfDay: string;
  scheduleColor: string;
  dayComments: string;
  dayName: string;
  isPublished: boolean;
  myProperty: number;
}

interface DayTimeOff {
  title?: any;
  description?: any;
  startTime?: any;
  endTime?: any;
  isApproved?: any;
  timeOffDate: string;
}

export interface singleDayScheduleInterface {
  dayComments?: any;
  dayId: number;
  dayName: string;
  dayTimesheetId?: any;
  isPublished: boolean;
  myProperty: number;
  scheduleColor?: any;
  scheduleID: number;
  scheduleTimeOfDay: string;
  timeFrom: string;
  timeTo: string;
}
export interface onValueChangeSingleItemInterface {
  Text: string;
  Value: number;
}

export interface onSearchInterface {
  fName: string;
  lName: string;
  schedule: [];
  userID: number;
}
