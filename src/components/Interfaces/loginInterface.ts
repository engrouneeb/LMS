export interface loginInterface {

}

interface Token {
  AttachmentNavigateScreen: string;
  AttendenceDetial: AttendenceDetial;
  AttendenceStudentList: any;
  ChatContactUsers: any;
  ChatFranchiseUsers: any;
  ChatRoomUsers: AttendenceDetial;
  ChatStaffUsers: any;
  CheckInSuccess: AttendenceDetial;
  CmpConfigs: AttendenceDetial;
  ConnectionID: string;
  CountNotifications: number;
  ForgetType: string;
  Message: AttendenceDetial;
  MessagesCount: MessagesCount;
  Notification: any;
  NotificationCount: MessagesCount;
  Proxy: AttendenceDetial;
  Students: any;
  UserData: AttendenceDetial;
  chatFor: string;
  currentFocus: string;
  data: AttendenceDetial;
  error?: any;
  fileFormate: string;
  fileUrl: string;
  isGetStarted: boolean;
  loading: boolean;
  logoutLoading: boolean;
  socketIO?: any;
  socketId?: any;
  timeOffInstructorId: string;
  token: AttendenceDetial;
  updatedTimeOff: boolean;
}

interface MessagesCount {
  Count: number;
}

interface AttendenceDetial {}

interface SelectedLanguage {
  ScheduleWeekView: ScheduleWeekView;
  addOrEdit: AddOrEdit;
  addTimeOffScreen: AddTimeOffScreen;
  addWage: AddWage;
  adminSchedule: AdminSchedule;
  approvelsScreen: ApprovelsScreen;
  classDateList: ClassDateList;
  classDetialScreen: ClassDetialScreen;
  classListHeading: ClassListHeading;
  classMenu: any;
  classNotesScreen: ClassNotesScreen;
  classTab: ClassTab;
  cmpyCodeScreen: CmpyCodeScreen;
  commonWords: CommonWords;
  courseContentScreen: CourseContentScreen;
  courseContentScreenAssign: CourseContentScreenAssign;
  coursesScreen: CoursesScreen;
  dashboardScreen: DashboardScreen;
  getStartedScreen: GetStartedScreen;
  groupCheckinScreen: GroupCheckinScreen;
  individualCheckinScreen: IndividualCheckinScreen;
  loaderScreen: LoaderScreen;
  loginScreen: LoginScreen;
  markAttendenceDateWiseScreen: MarkAttendenceDateWiseScreen;
  messageScreen: MessageScreen;
  notificationScreen: NotificationScreen;
  onlineClass: OnlineClass;
  pincodeScreen: PincodeScreen;
  reportScreen: ReportScreen;
  sideBar: any;
  storeScreen: StoreScreen;
  studentAssessmentReportScreen: StudentAssessmentReportScreen;
  studentAssessmentScreen: StudentAssessmentScreen;
  studentProgressReportScreen: StudentProgressReportScreen;
  studentProgressScreen: StudentProgressScreen;
  studentSideBar: any;
  submittButton: SubmittButton;
  timeOff: TimeOff;
  timeSheet: TimeSheet;
  timeSheetDetial: TimeSheetDetial;
  timeTrackerScreen: TimeTrackerScreen;
  viewByClass: ViewByClass;
  wageDetial: WageDetial;
}

interface WageDetial {
  Detial: string;
  TotalHour: string;
  TotalWage: string;
  WagesDetial: string;
}

interface ViewByClass {
  Attendance: string;
  SearchClass: string;
}

interface TimeTrackerScreen {
  Requests: string;
  Schedule: string;
  Setup: string;
  TimeOff: string;
  Timesheet: string;
  ViewSummary: string;
  Wages: string;
  adminList: any;
  menuList: any;
  timeTracker: string;
}

interface TimeSheetDetial {
  AddCommentsHere: string;
  AddHr: string;
  Error: string;
  LoggedHr: string;
  Okay: string;
  PleaseEnterSomeDataPleaseTryAgain: string;
  Retry: string;
  Submit: string;
  Success: string;
  TimeSheetDetial: string;
  TimeSheetHoursIsLogedSuccessfully: string;
  TotelHr: string;
}

interface TimeSheet {
  Approvers: string;
  Close: string;
  Error: string;
  NoApproversAssigned: string;
  NoTimesheetFound: string;
  Okay: string;
  Status: string;
  Success: string;
  Timesheet: string;
  TotelHrs: string;
}

interface TimeOff {
  Delete: string;
  DoYouWantToDeleteTimeOffFor: string;
  IncompleteFields: string;
  IncorrectTimeInterval: string;
  NO: string;
  NoTimeOff: string;
  Okay: string;
  PleaseSelectProperTimeInterval: string;
  Success: string;
  TODAY: string;
  TimeOff: string;
  TryAgain: string;
  Yes: string;
}

interface SubmittButton {
  Submitting: string;
}

interface StudentProgressScreen {
  StudentProgress: string;
}

interface StudentProgressReportScreen {
  StudentProgressReport: string;
}

interface StudentAssessmentScreen {
  StudentAssessment: string;
}

interface StudentAssessmentReportScreen {
  StudentAssessmentReport: string;
}

interface StoreScreen {
  Store: string;
  Tabs: any;
}

interface ReportScreen {
  Reports: string;
  Tabs: any;
}

interface PincodeScreen {
  EnterYourPIN: string;
  InvalidPIN: string;
  keyMeta: any;
}

interface OnlineClass {
  EnterUrl: string;
  Save: string;
  StartClass: string;
  StartOnlineClass: string;
}

interface NotificationScreen {
  ClearAll: string;
  NoNotificationisFound: string;
  Notification: string;
}

interface MessageScreen {
  Message: string;
  Tabs: any;
}

interface MarkAttendenceDateWiseScreen {
  AddMakeupClass: string;
  AttendanceMarkedSuccessfully: string;
  CancelClass: string;
  CannotRequestcheckNetworkTryAgain: string;
  MarkAttendence: string;
  NoDataFound: string;
  NoStudentFound: string;
  Okay: string;
  Oops: string;
  SomethingWentWrongPleaseTryAgain: string;
  SubmitAttendance: string;
  Success: string;
  ViewbyClass: string;
}

interface LoginScreen {
  Login: string;
  password: string;
  userName: string;
  forgotPassword: string;
  reset: string;
}

interface LoaderScreen {
  Loading: string;
}

interface IndividualCheckinScreen {
  CheckIn: string;
  CheckOut: string;
  Welcome: string;
  You: string;
  at: string;
  on: string;
  successfuly: string;
}

interface GroupCheckinScreen {
  CheckIn: string;
  CheckOut: string;
  HaveAGreatDay: string;
  StudentsChecked: string;
  at: string;
  on: string;
  successfuly: string;
}

interface GetStartedScreen {
  btnText: string;
}

interface DashboardScreen {
  AssignedClasses: string;
  AssignedStudent: string;
  AvailablePoints: string;
  BounsPoints: string;
  By: string;
  ChallengePoints: string;
  Close: string;
  CoursesCompleted: string;
  EndTime: string;
  EnrollmentsReceived: string;
  Home: string;
  Loading: string;
  NoActiveStudentsFound: string;
  NoEnrollmentIsFound: string;
  PointsAchieved: string;
  QuickLinks: string;
  RedeemedPoints: string;
  ShowQuickLinks: string;
  StartTime: string;
  StudentAssessments: string;
  StudentPoints: string;
  UpcomingEvents: string;
  activeClasses: string;
  activeStudents: string;
  welCome: string;
}

interface CoursesScreen {
  Courses: string;
}

interface CourseContentScreenAssign {
  Assign: string;
  AssignInstructors: string;
  AssignStudents: string;
  CoursesContent: string;
}

interface CourseContentScreen {
  CannotGetStudentData: string;
  CourseContent: string;
  EnterUrl: string;
  Error: string;
  FailedToLoadData: string;
  GoToCourse: string;
  Loading: string;
  NoMore: string;
  PleaseEnterYourHangoutUrl: string;
  StudentProgress: string;
  WhiteBoardFor: string;
  setup: string;
}

interface CommonWords {
  close: string;
  loading: string;
  markAsComplete: string;
  markAsIncomplete: string;
  next: string;
  previous: string;
}

interface CmpyCodeScreen {
  btnText: string;
  inputPlaceHolder: string;
}

interface ClassTab {
  NoData: string;
}

interface ClassNotesScreen {
  ClassNotes: string;
  Close: string;
  NoAttachmentsFound: string;
  download: string;
  fileName: string;
  viewFile: string;
}

interface ClassListHeading {
  CheckAssignedStudent: string;
  ClassNotificationFor: string;
  WhiteBoardFor: string;
  onlineClassFor: string;
  onlineNotesFor: string;
}

interface ClassDetialScreen {
  Details: string;
  NA: string;
}

interface ClassDateList {
  AreYouSureYouWantToCancelTheClass: string;
  Cancel: string;
  CancelClass: string;
  ClassCancellationHasBeenSuccessfullyUndone: string;
  ClassCancelled: string;
  ClassHasBeenCancelled: string;
  ClassTimings: string;
  Error: string;
  Makeup: string;
  No: string;
  NoTimingisFound: string;
  Okay: string;
  SomethingWentWrong: string;
  Success: string;
  Today: string;
  Undo: string;
  Yes: string;
}

interface ApprovelsScreen {
  EndDate: string;
  From: string;
  ItemType: string;
  NoApprovelsFound: string;
  StartDate: string;
  Status: string;
  To: string;
  TotelHours: string;
  Type: string;
}

interface AdminSchedule {
  Error: string;
  Loading: string;
  NoData: string;
  NoSchedule: string;
  Notify: string;
  Publish: string;
  Saving: string;
  Schedule: string;
  ScheduleHasBeenPublished: string;
  SomethingWentWrong: string;
  Success: string;
  Summary: string;
  Today: string;
  notificationTypes: any;
}

interface AddWage {
  AddWage: string;
  AlreadyExists: string;
  EffectiveDate: string;
  EnterItemName: string;
  EnterWageRate: string;
  Error: string;
  ItemName: string;
  Okay: string;
  PleaseEnterDifferentEffectiveDate: string;
  PleaseEnterItemName: string;
  PleaseEnterWageRate: string;
  PleaseSelectEffectiveDate: string;
  PleaseSelectWageFrom: string;
  PleaseSelectWageType: string;
  Select: string;
  SelectEffectiveDate: string;
  SelectWageFrom: string;
  SelectWageType: string;
  SomeThingWentWrong: string;
  Success: string;
  UpdateWage: string;
  WageAddedSuccessfully: string;
  WageFrom: string;
  WageRate: string;
  WageType: string;
  WageUpdatedSuccessfully: string;
  Wages: string;
}

interface AddTimeOffScreen {
  Add: string;
  AddTimeFor: string;
  ApplyForItem: string;
  Comment: string;
  Date: string;
  Description: string;
  EndTime: string;
  EnterComments: string;
  Name: string;
  SelectEndTime: string;
  SelectStartTime: string;
  StartTime: string;
  Update: string;
}

interface AddOrEdit {
  AddApprovals: string;
  ApproversHasBeenSaved: string;
  EditApprovals: string;
  Error: string;
  Failed: string;
  PleaseWait: string;
  SaveApprovals: string;
  SelectedApprovals: string;
  ShowSelectedOnly: string;
  SomethingWentWrong: string;
  Success: string;
}

interface ScheduleWeekView {
  AddSchedule: string;
  ApplyForItem: string;
  Cancel: string;
  CannotGetWagesAtMoment: string;
  Description: string;
  EndDate: string;
  Error: string;
  Loading: string;
  NoScheduleAvailable: string;
  PleaseSelectDateMissingStartdateEnddate: string;
  PleaseSelectItem: string;
  PleaseSelectTimeMissingStarttimeEndtime: string;
  PleaseSelectYourScheduleDays: string;
  PleaseWait: string;
  Schedule: string;
  ScheduleHasBeenAdded: string;
  SelectedDate: string;
  SelectedDays: string;
  ShowAvailability: string;
  SomethingWentWrong: string;
  StartDate: string;
  Timings: string;
  UpdateAvailability: string;
  UpdateSchedule: string;
  UseDateRange: string;
  Warning: string;
  YouMustAddedWageForYourSchedule: string;
}

interface Route {
  key: string;
  name: string;
  params: string;
  path: string;
}
