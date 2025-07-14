export type selectedLanguageType = {
  sideBar: SideBar[];
  studentSideBar: SideBar[];
  cmpyCodeScreen: CmpyCodeScreen;
  getStartedScreen: GetStartedScreen;
  loginScreen: LoginScreen;
  dashboardScreen: DashboardScreen;
  coursesScreen: CoursesScreen;
  courseContentScreenAssign: CourseContentScreenAssign;
  messageScreen: MessageScreen;
  reportScreen: ReportScreen;
  studentProgressScreen: StudentProgressScreen;
  studentProgressReportScreen: StudentProgressReportScreen;
  studentAssessmentScreen: StudentAssessmentScreen;
  studentAssessmentReportScreen: StudentAssessmentReportScreen;
  markAttendenceDateWiseScreen: MarkAttendenceDateWiseScreen;
  viewByClass: ViewByClass;
  classDateList: ClassDateList;
  pincodeScreen: PincodeScreen;
  individualCheckinScreen: IndividualCheckinScreen;
  groupCheckinScreen: GroupCheckinScreen;
  notificationScreen: NotificationScreen;
  timeTrackerScreen: TimeTrackerScreen;
  addWage: AddWage;
  wageDetial: WageDetial;
  adminSchedule: AdminSchedule;
  ScheduleWeekView: ScheduleWeekView;
  timeSheet: TimeSheet;
  timeSheetDetial: TimeSheetDetial;
  timeOff: TimeOff;
  addTimeOffScreen: AddTimeOffScreen;
  approvelsScreen: ApprovelsScreen;
  courseContentScreen: CourseContentScreen;
  classNotesScreen: ClassNotesScreen;
  onlineClass: OnlineClass;
  classDetialScreen: ClassDetialScreen;
  classTab: ClassTab;
  loaderScreen: LoaderScreen;
  submittButton: SubmittButton;
  addOrEdit: AddOrEdit;
  commonWords: CommonWords;
  classListHeading: ClassListHeading;
  classMenu: ClassMenu[];
  storeScreen: StoreScreen;
};

interface StoreScreen {
  Store: string;
  Tabs: Tab2[];
}

interface ClassMenu {
  value: string;
  AssignedStudents?: string;
  ClassNotification?: string;
}

interface ClassListHeading {
  ClassNotificationFor: string;
  CheckAssignedStudent: string;
  WhiteBoardFor: string;
  onlineNotesFor: string;
  onlineClassFor: string;
}

interface CommonWords {
  loading: string;
  close: string;
  previous: string;
  next: string;
  markAsComplete: string;
  markAsIncomplete: string;
}

interface AddOrEdit {
  EditApprovals: string;
  SelectedApprovals: string;
  AddApprovals: string;
  SaveApprovals: string;
  PleaseWait: string;
  Failed: string;
  Success: string;
  Error: string;
  ShowSelectedOnly: string;
  SomethingWentWrong: string;
  ApproversHasBeenSaved: string;
}

interface SubmittButton {
  Submitting: string;
}

interface LoaderScreen {
  Loading: string;
}

interface ClassTab {
  NoData: string;
}

interface ClassDetialScreen {
  Details: string;
  NA: string;
}

interface OnlineClass {
  StartOnlineClass: string;
  EnterUrl: string;
  Save: string;
  StartClass: string;
}

interface ClassNotesScreen {
  ClassNotes: string;
  NoAttachmentsFound: string;
  Close: string;
  fileName: string;
  viewFile: string;
  download: string;
}

interface CourseContentScreen {
  setup: string;
  CourseContent: string;
  EnterUrl: string;
  PleaseEnterYourHangoutUrl: string;
  Loading: string;
  FailedToLoadData: string;
  NoMore: string;
  Error: string;
  GoToCourse: string;
  CannotGetStudentData: string;
  StudentProgress: string;
  WhiteBoardFor: string;
}

interface ApprovelsScreen {
  From: string;
  To: string;
  ItemType: string;
  StartDate: string;
  EndDate: string;
  Type: string;
  TotelHours: string;
  Status: string;
  NoApprovelsFound: string;
}

interface AddTimeOffScreen {
  AddTimeFor: string;
  Name: string;
  ApplyForItem: string;
  Date: string;
  StartTime: string;
  SelectStartTime: string;
  EndTime: string;
  SelectEndTime: string;
  Description: string;
  Comment: string;
  EnterComments: string;
  Add: string;
  Update: string;
}

interface TimeOff {
  TimeOff: string;
  TODAY: string;
  NoTimeOff: string;
  Success: string;
  Okay: string;
  IncorrectTimeInterval: string;
  PleaseSelectProperTimeInterval: string;
  IncompleteFields: string;
  TryAgain: string;
  Delete: string;
  DoYouWantToDeleteTimeOffFor: string;
  Yes: string;
  NO: string;
}

interface TimeSheetDetial {
  TimeSheetDetial: string;
  Submit: string;
  AddHr: string;
  AddCommentsHere: string;
  LoggedHr: string;
  TotelHr: string;
  Success: string;
  TimeSheetHoursIsLogedSuccessfully: string;
  Okay: string;
  Error: string;
  PleaseEnterSomeDataPleaseTryAgain: string;
  Retry: string;
}

interface TimeSheet {
  Timesheet: string;
  Approvers: string;
  NoApproversAssigned: string;
  NoTimesheetFound: string;
  Close: string;
  Status: string;
  TotelHrs: string;
  Error: string;
  Okay: string;
  Success: string;
}

interface ScheduleWeekView {
  Schedule: string;
  NoScheduleAvailable: string;
  Timings: string;
  Warning: string;
  YouMustAddedWageForYourSchedule: string;
  Error: string;
  CannotGetWagesAtMoment: string;
  Loading: string;
  ShowAvailability: string;
  UpdateAvailability: string;
  ApplyForItem: string;
  UseDateRange: string;
  StartDate: string;
  SelectedDate: string;
  EndDate: string;
  SelectedDays: string;
  Description: string;
  PleaseWait: string;
  UpdateSchedule: string;
  AddSchedule: string;
  ScheduleHasBeenAdded: string;
  SomethingWentWrong: string;
  PleaseSelectItem: string;
  PleaseSelectTimeMissingStarttimeEndtime: string;
  PleaseSelectDateMissingStartdateEnddate: string;
  PleaseSelectYourScheduleDays: string;
  Cancel: string;
}

interface AdminSchedule {
  Today: string;
  NoSchedule: string;
  Success: string;
  ScheduleHasBeenPublished: string;
  Error: string;
  SomethingWentWrong: string;
  NoData: string;
  Schedule: string;
  Summary: string;
  Saving: string;
  Loading: string;
  Publish: string;
  Notify: string;
  notificationTypes: NotificationType[];
}

interface NotificationType {
  Value: number;
  Text: string;
}

interface WageDetial {
  WagesDetial: string;
  TotalHour: string;
  TotalWage: string;
  Detial: string;
}

interface AddWage {
  Wages: string;
  ItemName: string;
  EnterItemName: string;
  WageFrom: string;
  SelectWageFrom: string;
  WageType: string;
  SelectWageType: string;
  EnterWageRate: string;
  Select: string;
  EffectiveDate: string;
  SelectEffectiveDate: string;
  WageRate: string;
  AddWage: string;
  UpdateWage: string;
  Error: string;
  Okay: string;
  PleaseEnterItemName: string;
  PleaseSelectWageFrom: string;
  PleaseSelectWageType: string;
  PleaseSelectEffectiveDate: string;
  PleaseEnterWageRate: string;
  AlreadyExists: string;
  PleaseEnterDifferentEffectiveDate: string;
  Success: string;
  SomeThingWentWrong: string;
  WageAddedSuccessfully: string;
  WageUpdatedSuccessfully: string;
}

interface TimeTrackerScreen {
  timeTracker: string;
  Schedule: string;
  Timesheet: string;
  TimeOff: string;
  Wages: string;
  Requests: string;
  Setup: string;
  ViewSummary: string;
  menuList: MenuList[];
  adminList: MenuList[];
}

interface MenuList {
  title: string;
}

interface NotificationScreen {
  Notification: string;
  ClearAll: string;
  NoNotificationisFound: string;
}

interface GroupCheckinScreen {
  HaveAGreatDay: string;
  StudentsChecked: string;
  CheckOut: string;
  CheckIn: string;
  successfuly: string;
  at: string;
  on: string;
}

interface IndividualCheckinScreen {
  Welcome: string;
  CheckOut: string;
  CheckIn: string;
  You: string;
  successfuly: string;
  at: string;
  on: string;
}

interface PincodeScreen {
  EnterYourPIN: string;
  InvalidPIN: string;
  keyMeta: KeyMeta[][][];
}

interface KeyMeta {
  Text: string;
  value: number;
  cstmClass: string;
}

interface ClassDateList {
  ClassTimings: string;
  NoTimingisFound: string;
  Undo: string;
  ClassCancelled: string;
  Cancel: string;
  Success: string;
  ClassHasBeenCancelled: string;
  Error: string;
  SomethingWentWrong: string;
  Makeup: string;
  Today: string;
  CancelClass: string;
  AreYouSureYouWantToCancelTheClass: string;
  Yes: string;
  No: string;
  Okay: string;
  ClassCancellationHasBeenSuccessfullyUndone: string;
}

interface ViewByClass {
  Attendance: string;
  SearchClass: string;
}

interface MarkAttendenceDateWiseScreen {
  MarkAttendence: string;
  ViewbyClass: string;
  CancelClass: string;
  AddMakeupClass: string;
  SubmitAttendance: string;
  NoDataFound: string;
  NoStudentFound: string;
  Oops: string;
  Okay: string;
  SomethingWentWrongPleaseTryAgain: string;
  Success: string;
  AttendanceMarkedSuccessfully: string;
  CannotRequestcheckNetworkTryAgain: string;
}

interface StudentAssessmentReportScreen {
  StudentAssessmentReport: string;
}

interface StudentAssessmentScreen {
  StudentAssessment: string;
}

interface StudentProgressReportScreen {
  StudentProgressReport: string;
}

interface StudentProgressScreen {
  StudentProgress: string;
}

interface ReportScreen {
  Reports: string;
  Tabs: Tab2[];
}

interface Tab2 {
  TabName: string;
  Navigation: string;
}

interface MessageScreen {
  Message: string;
  Tabs: Tab[];
}

interface Tab {
  TabName: string;
  Chatfor: number;
}

interface CourseContentScreenAssign {
  CoursesContent: string;
  AssignStudents: string;
  AssignInstructors: string;
  Assign: string;
}

interface CoursesScreen {
  Courses: string;
}

interface DashboardScreen {
  Home: string;
  welCome: string;
  activeClasses: string;
  activeStudents: string;
  CoursesCompleted: string;
  AssignedStudent: string;
  StudentPoints: string;
  ChallengePoints: string;
  BounsPoints: string;
  RedeemedPoints: string;
  AvailablePoints: string;
  EnrollmentsReceived: string;
  NoActiveStudentsFound: string;
  PointsAchieved: string;
  QuickLinks: string;
  ShowQuickLinks: string;
  NoEnrollmentIsFound: string;
  By: string;
  AssignedClasses: string;
  UpcomingEvents: string;
  StartTime: string;
  EndTime: string;
  Close: string;
  Loading: string;
  StudentAssessments: string;
}

interface LoginScreen {
  userName: string;
  password: string;
  Login: string;
}

interface GetStartedScreen {
  btnText: string;
}

interface CmpyCodeScreen {
  inputPlaceHolder: string;
  btnText: string;
}

interface SideBar {
  Text: string;
  Navigation: string;
  color: string;
  cstmClass: string;
}

export type filterdNotificationType = {
  id: number;
  title: string;
  notification: string;
  announcementId: number;
  notificationType: number;
  date: string;
};
