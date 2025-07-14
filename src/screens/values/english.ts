import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';

export const englishSideBar = [
  {
    Text: 'Home',
    // Navigation: "dashboard",
    Navigation: DrawerScreens.dashboard.name,
    color: '#545454',
    csbmName: '',
  },
  {
    Text: 'Courses',
    // Navigation: "CoursePlayer",
    Navigation: DrawerScreens.coursePlayer.name,
    color: '#939393',
    csbmName: 'Enrollment Plan',
  },
  {
    Text: 'Messages',
    // Navigation: "msgScr",
    Navigation: DrawerScreens.msgScr.name,
    color: '#545454',
    csbmName: '',
  },
  {
    Text: 'Store',
    Navigation: 'store',
    color: '#e8973a',
    csbmName: '',
  },
  {
    Text: 'Attendance',
    // Navigation: "AttendanceDetail",
    Navigation: DrawerScreens.attendance.name,
    color: '#545454',
    csbmName: '',
  },
  {
    Text: 'Time Tracker',
    // Navigation: "TimeTracker",
    Navigation: DrawerScreens.timeTracker.name,
    color: '#939393',
    csbmName: '',
  },
  {
    Text: 'Kiosk',
    // Navigation: "pinCode",
    Navigation: DrawerScreens.pinCode.name,
    color: '#545454',
    csbmName: 'Check In/Out',
  },
  {
    Text: 'Notifications',
    // Navigation: "NotificationsTab",
    Navigation: DrawerScreens.notificationsTab.name,
    color: '#545454',
    csbmName: '',
  },
  {
    Text: 'Reports',
    // Navigation: "NotificationsTab",
    Navigation: DrawerScreens.reportsTab.name,
    color: '#545454',
    csbmName: '',
  },

  {
    Text: 'Logout',
    Navigation: 'Logout',
    color: '#939393',
    csbmName: '',
  },
];
export const englishCommonWords = {
  loading: 'Loading...',
  close: 'Close',
  previous: 'Previous',
  next: 'Next',
  markAsComplete: 'Mark As Complete',
  markAsIncomplete: 'Mark As Incomplete',
};
export const englishStudentSideBar = [
  {
    Text: 'Home',
    // Navigation: "dashboard",
    Navigation: DrawerScreens.dashboard.name,
    color: '#545454',
    csbmName: '',
  },
  {
    Text: 'Courses',
    // Navigation: "CoursePlayer",
    Navigation: DrawerScreens.coursePlayer.name,
    color: '#939393',
    csbmName: 'Enrollment Plan',
  },
  {
    Text: 'Homework/Assignments',
    // Navigation: "CoursePlayer",
    Navigation: DrawerScreens.HomeworkAssignment.name,
    color: '#939393',
    csbmName: '',
  },
  {
    Text: 'Assessments',
    // Navigation: "CoursePlayer",
    Navigation: DrawerScreens.StudentAssessments.name,
    color: '#939393',
    csbmName: 'Assessments',
  },
  {
    Text: 'Student Info',
    // Navigation: "Reports",
    Navigation: DrawerScreens.studentTab.name,
    color: '#545454',
    csbmName: 'Student Info',
  },
  {
    Text: 'Messages',
    // Navigation: "msgScr",
    Navigation: DrawerScreens.msgScr.name,
    color: '#545454',
    csbmName: '',
  },
  {
    Text: 'Attendance',
    // Navigation: "AttendanceDetail",
    Navigation: DrawerScreens.attendance.name,
    color: '#545454',
    csbmName: '',
  },
  {
    Text: 'Notifications',
    // Navigation: "NotificationsTab",
    Navigation: DrawerScreens.notificationsTab.name,
    color: '#545454',
    csbmName: '',
  },
  {
    Text: 'Reports',
    // Navigation: "Reports",
    Navigation: DrawerScreens.reportsTab.name,
    color: '#545454',
    csbmName: '',
  },

  {
    Text: 'Logout',
    Navigation: 'Logout',
    color: '#939393',
    csbmName: '',
  },
];
export const englishCompanyCodeScreen = {
  inputPlaceHolder: 'Enter Learning Center Code',
  btnText: 'CONTINUE',
};
export const englishGetStartedScreen = {
  btnText: 'GET STARTED',
};
export const englishLoginScreen = {
  userName: 'User Name ',
  password: 'Password',
  Login: 'Login',
  forgotPassword: "Don't remember the password",
  reset: 'reset?',
  submit: 'Submit',
};
export const englishCourseScreen = {
  Courses: 'Courses',
};
export const englishCourseContentScreen = {
  CoursesContent: 'Course Content',
  AssignStudents: 'Assigned Students',
  AssignInstructors: 'Assign Teachers',
  Assign: 'Assign',
};
export const englishMessageScreen = {
  Message: 'Messages',
  Tabs: [
    {
      TabName: 'Parents',
      Chatfor: 5,
    },
    {
      TabName: 'Staff',
      Chatfor: 6,
    },
    {
      TabName: 'Students',
      Chatfor: 4,
    },
    {
      TabName: 'Franchise Owners',
      Chatfor: 7,
    },
    {
      TabName: 'Instructors',
      Chatfor: 9,
    },
    {
      TabName: 'Admin',
      Chatfor: 8,
    },
  ],
};
export const englishStoreScreen = {
  Store: 'Store',
  Tabs: [
    {
      TabName: 'Add New Item',
      Navigation: 'AddNewItem',
    },
  ],
};
export const englishReportsScreen = {
  Reports: 'Reports',
  Tabs: [
    {
      TabName: 'Students Progress',
      Navigation: 'StudentProgressList',
    },
    {
      TabName: 'Assessment',
      Navigation: 'StudentAssessmentList',
    },
    // {
    //   TabName: "Challenge Points",
    // },

    // {
    //   TabName: "Points by month",
    // },
    // {
    //   TabName: "Redeemed points",
    // },
    // {
    //   TabName: "Progress in points",
    // },
    // {
    //   TabName: "Activity",
    // },
    // {
    //   TabName: "Attendance",
    // },
    // {
    //   TabName: " Assessment 1 Wise Report",
    // },
  ],
};
export const englishStudentProgressScreen = {
  StudentProgress: 'Student Progress',
};
export const englishStudentProgressReportScreen = {
  StudentProgressReport: 'Student Progress Report',
};
export const englishStudentAssessmentScreen = {
  StudentAssessment: 'Student Assessment',
};
export const englishStudentAssessmentReportScreen = {
  StudentAssessmentReport: 'Student Assessment Report',
};
export const englishDashboardScreen = {
  Home: 'Home',
  welCome: 'Welcome!',
  activeClasses: 'Active Classes',
  activeStudents: 'Active Students',
  CoursesCompleted: 'Courses Completed',
  AssignedStudent: 'Assigned Students',
  StudentPoints: 'Student Points',
  ChallengePoints: 'Challenge Points:',
  BounsPoints: 'Bouns Points:',
  RedeemedPoints: 'Redeemed Points:',
  AvailablePoints: 'Available Points:',
  EnrollmentsReceived: 'Enrollments Received',
  NoActiveStudentsFound: 'No active students found',
  PointsAchieved: 'Points Achieved',
  QuickLinks: 'Quick Links',
  ShowQuickLinks: 'Show Quick Links',
  NoEnrollmentIsFound: 'No enrollment is found',
  By: 'By',
  AssignedClasses: 'Assigned Classes',
  StartTime: 'Start Time',
  EndTime: 'End Time',
  Close: 'Close',
  Loading: 'Loading...',
};

// Attendence Marking Datewise Screen
export const englishAttendenceMarkingDateWiseScreen = {
  MarkAttendence: 'Mark Attendance',
  ViewbyClass: 'View by Class',
  CancelClass: 'Cancel Class',
  AddMakeupClass: 'Add Make-up Class',
  SubmitAttendance: 'Submit Attendance',
  NoDataFound: 'No data found',
  NoStudentFound: 'No Student Found',
  Oops: 'Oops',
  Okay: 'Okay',
  SomethingWentWrongPleaseTryAgain: 'Something went wrong. Please try again!',
  Success: 'Success',
  AttendanceMarkedSuccessfully: 'Attendance marked successfully',
  CannotRequestcheckNetworkTryAgain:
    'Cannot request on Network please  check Network and try again',
};

// showing Class List
export const englishViewbyClass = {
  Attendance: 'Attendance',
  SearchClass: 'Search Class...',
};
// showing Date List of Class
export const englishDateList = {
  ClassTimings: 'Class Timings',
  NoTimingisFound: 'No Class Timing is Found',
  Undo: 'Undo',
  Cancel: 'Cancel',
  Success: 'Success',
  ClassHasBeenCancelled: 'Class has been cancelled',
  Error: 'Error',
  SomethingWentWrong: 'Something went wrong....',
  Makeup: 'Makeup',
  Today: 'Today',
  CancelClass: 'Cancel Class',
  AreYouSureYouWantToCancelTheClass:
    'Are you sure you want to cancel the class?',
  Yes: 'Yes',
  No: 'No',
  Okay: 'Okay',
  ClassCancellationHasBeenSuccessfullyUndone:
    'Class cancellation has been successfully undone',
  ClassCancelled: 'Class Cancelled',
};

// Pin Code Screen
export const englishPincodeScreen = {
  EnterYourPIN: 'Enter Your PIN',
  InvalidPIN: 'Invalid PIN',
  keyMeta: [
    [
      [
        {
          Text: '1',
          value: 1,
          csbmName: '',
        },
        {
          Text: '2',
          value: 2,
          csbmName: '',
        },
        {
          Text: '3',
          value: 3,
          csbmName: '',
        },
      ],
      [
        {
          Text: '4',
          value: 4,
          csbmName: '',
        },
        {
          Text: '5',
          value: 5,
          csbmName: '',
        },
        {
          Text: '6',
          value: 6,
          csbmName: '',
        },
      ],
      [
        {
          Text: '7',
          value: 7,
          csbmName: '',
        },
        {
          Text: '8',
          value: 8,
          csbmName: '',
        },
        {
          Text: '9',
          value: 9,
          csbmName: '',
        },
      ],
      [
        {
          Text: 'Clear',
          value: -1,
          csbmName: '',
        },
        {
          Text: '0',
          value: 0,
          csbmName: '',
        },
        {
          Text: 'Delete',
          value: -2,
          csbmName: '',
        },
      ],
    ],
  ],
};

// individual Checkin screen
export const englishIndividualScreen = {
  Welcome: 'Welcome',
  CheckOut: 'Check-Out',
  CheckIn: 'Check-In',
  You: 'You ',
  successfuly: 'successfuly',
  at: 'at',
  on: 'on',
};

// Group Checkin screen
export const englishGroupScreen = {
  HaveAGreatDay: 'Have a great day!',
  StudentsChecked: 'Students  checked ',
  CheckOut: 'Check-Out',
  CheckIn: 'Check-In',
  successfuly: 'successfuly',
  at: 'at',
  on: 'on',
};

// Notifications Screen
export const englishNotificationScreen = {
  Notification: 'Notifications',
  ClearAll: 'Clear All',
  NoNotificationisFound: 'No notifications found',
};

// Time Tracker Screen
export const englishTrackerScreen = {
  timeTracker: 'Time Tracker',
  Schedule: 'Schedule',
  Timesheet: 'Timesheet',
  TimeOff: 'Time Off',
  Wages: 'Wages',
  Approvals: 'Approvals',
  Setup: 'Setup',
  ViewSummary: 'View Summary',
  menuList: [
    { title: 'Wages' },
    { title: 'Schedule' },
    { title: 'Timesheet' },
    { title: 'Time Off' },
    { title: 'Approvals' },
  ],
  adminList: [
    { title: 'Setup' },
    { title: 'Wages' },
    { title: 'Schedule' },
    { title: 'Timesheet' },
    { title: 'Time Off' },
    { title: 'Approvals' },
  ],
};

// Add Wages Screen
export const englishAddWages = {
  Wages: 'Wages',
  ItemName: 'Item Name',
  EnterItemName: 'Enter Item Name',
  WageFrom: 'Wage From',
  SelectWageFrom: 'Select Wage From',
  WageType: 'Wage Type',
  SelectWageType: 'Select Wage Type',
  EnterWageRate: 'Enter Wage Rate',
  Select: 'Select',
  EffectiveDate: ' Effective Date',
  SelectEffectiveDate: 'Select Effective Date',
  WageRate: 'Wage Rate',
  AddWage: 'Add Wage',
  UpdateWage: 'Update Wage',
  Error: 'Error',
  Okay: 'Okay',
  PleaseEnterItemName: 'Please enter item name',
  PleaseSelectWageFrom: 'Please select wage from',
  PleaseSelectWageType: 'Please select wage type',
  PleaseSelectEffectiveDate: 'Please select effective date',
  PleaseEnterWageRate: 'Please enter wage rate',
  AlreadyExists: 'Already exists!',
  PleaseEnterDifferentEffectiveDate: 'Please enter a different effective date',
  Success: 'Success',
  SomeThingWentWrong: 'SomeThing went wrong. Please try again!',
  WageAddedSuccessfully: 'Wage added successfully',
  WageUpdatedSuccessfully: 'Wage updated successfully',
};

// wages Detial
export const englishWagesDetial = {
  WagesDetial: 'Wages Detial',
  TotalHour: 'Total Hour :',
  TotalWage: 'Total Wage :',
  Detial: 'Detial',
};
// wages DetialIndividualsUser
export const englishWagesDetialIndividualUSer = {};
// wages DetialIndividualsUser
export const englishAdminSchedule = {
  Today: 'Today',
  NoSchedule: 'No Schedule',
  Success: 'Success',
  ScheduleHasBeenPublished: 'Schedule has been published!',
  Error: 'Error',
  SomethingWentWrong: 'Something went wrong, please try again later.',
  NoData: 'No Data',
  Schedule: 'Schedule',
  Summary: 'Summary',
  Saving: 'Saving...',
  Loading: 'Loading...',
  Publish: 'Publish',
  Notify: 'Select Notify',
  notificationTypes: [
    { Value: 1, Text: 'Notify everyone in the team' },
    { Value: 2, Text: 'Notify team members with changes only' },
    { Value: 3, Text: "Don't notify anyone" },
  ],
};

// ScheduleWeekView
export const englishScheduleWeekView = {
  Schedule: 'Schedule',
  NoScheduleAvailable: 'No Schedule Available',
  Timings: 'Timings',
  Warning: 'Warning !',
  YouMustAddedWageForYourSchedule:
    'You must add wage for your schedule, currently there are 0 wages',
  Error: 'Error',
  CannotGetWagesAtMoment:
    'Cannot get wages at the moment, please try again later',
  Loading: 'Loading...',
  ShowAvailability: 'Show Availability',
  UpdateAvailability: 'Update Availability',
  ApplyForItem: 'Apply For Item',
  UseDateRange: 'Use Date Range',
  StartDate: 'Start Date *',
  SelectedDate: 'Selected Date *',
  EndDate: 'End Date *',
  SelectedDays: 'Selected Days *',
  Description: 'Description',
  PleaseWait: 'Please wait...',
  UpdateSchedule: 'Update Schedule',
  AddSchedule: 'Add Schedule',
  ScheduleHasBeenAdded: 'Schedule has been added',
  SomethingWentWrong: 'Something went wrong, please try again later.',
  PleaseSelectItem: 'Please Select Item',
  PleaseSelectTimeMissingStarttimeEndtime:
    'Please select time, you are missing start time or maybe end time',
  PleaseSelectDateMissingStartdateEnddate:
    'Please select Date, you are missing start date or maybe end date',
  PleaseSelectYourScheduleDays: 'Please select your schedule days',
  Cancel: 'Cancel',
};

// Time Sheet
export const englishTimesheet = {
  Timesheet: 'Time Sheet',
  Approvers: 'Approvers',
  NoApproversAssigned: 'No Approvers is assigned',
  NoTimesheetFound: '  No Timesheet is found',
  Close: 'Close',
  Status: 'Status',
  TotelHrs: 'Total Hrs',
  Error: 'Error',
  Okay: 'Okay',
  Success: 'Success',
};

// Time Sheet Detial
export const englishTimeSheetDetial = {
  TimeSheetDetial: 'Time Sheet Detail',
  Submit: 'Submit',
  AddHr: 'Add Hr',
  AddCommentsHere: 'Add comments here',
  TotelHr: 'Total Hr',
  Success: 'Success',
  TimeSheetHoursIsLogedSuccessfully: 'TimeSheet Hours is loged successfully',
  Okay: 'Okay',
  Error: 'Error',
  PleaseEnterSomeDataPleaseTryAgain:
    'Please enter some data\n Please try again',
  Retry: 'Retry',
};

// Time Off Screen
export const englishTimeOffScreen = {
  TimeOff: 'Time Off',
  TODAY: 'TODAY',
  NoTimeOff: 'No Time Off',
  Success: 'Success',
  Okay: 'Okay',
  IncorrectTimeInterval: 'Incorrect Time Interval',
  PleaseSelectProperTimeInterval: 'Please select a proper time interval',
  IncompleteFields: 'Incomplete Fields',
  TryAgain: 'Try Again',
  Delete: 'Delete',
  DoYouWantToDeleteTimeOffFor: 'Do you want to delete time off for ',
  Yes: 'Yes',
  NO: 'No',
};

// Add TimeOff For
export const englishAddTimeOff = {
  AddTimeFor: 'Add time for',
  Name: 'Title *',
  ApplyForItem: 'Apply for item',
  Date: 'Date',
  StartTime: 'Start Time',
  SelectStartTime: 'Select Start Time *',
  EndTime: 'End Time',
  SelectEndTime: 'Select End Time *',
  Description: 'Description',
  Comment: 'Comment',
  EnterComments: 'Enter comments .....',
  Add: 'Add',
  Update: 'Update',
};

// Approvels Screen
export const englishApprovel = {
  From: 'From',
  To: 'To',
  ItemType: 'Item Type :',
  StartDate: 'Start Date :',
  EndDate: 'End Date :',
  Type: 'Type :',
  TotelHours: 'Total Hours :',
  Status: 'Status',
  NoApprovelsFound: 'No Approvels found',
};

// Course Contents
export const englishCourseContent = {
  setup: 'Setup',
  CourseContent: 'Course Content',
  EnterUrl: 'Enter Url',
  PleaseEnterYourHangoutUrl: 'Please enter your google meet url',
  Loading: 'Loading...',
  FailedToLoadData: ' Failed to load data',
  NoMore: 'No More',
  Error: 'Error',
  GoToCourse: 'Go to Course',
  CannotGetStudentData: 'Cannot get student data',
  StudentProgress: 'Student Progress',
  WhiteBoardFor: 'White Board for',
};

// Class Notes Screen
export const englishNoteScreen = {
  ClassNotes: 'Class Notes',
  NoAttachmentsFound: 'No Attachments Found',
  Close: 'Close',
  fileName: 'File Name',
  viewFile: 'View File',
  download: 'Download',
};
// Online Class  Screen
export const englishOnlineClassScreen = {
  StartOnlineClass: 'Start Online Class',
  EnterUrl: ' Enter Url :',
  Save: ' Save',
  StartClass: 'Start Class',
};
//  Class detials Screen
export const englishClassDetialScreen = {
  Details: 'Details',
  NA: 'N/A',
};
//  Class Tabs Screen
export const englishClassTabScreen = {
  NoData: 'No Data',
};
//  Loader Screen
export const englishLoaderScreen = {
  Loading: 'Loading .....',
};
//  Classes List Heading
export const englishClassHeading = {
  ClassNotificationFor: 'Class Notification for',
  CheckAssignedStudent: 'Check Assigned Student',
  WhiteBoardFor: 'White Board for',
  onlineNotesFor: 'Online Notes for',
  onlineClassFor: 'Online Class for',
};
//  Class option Menu
export const englishClassMenu = [
  { value: 'Assigned Students', AssignedStudents: 'Assigned Students' },
  { value: 'Class Notification', ClassNotification: 'Class Notification' },
];

// Add or Edit Approvels
export const englishAddorEdit = {
  EditApprovals: 'Edit Approvals',
  SelectedApprovals: 'Selected Approvals',
  AddApprovals: 'Add Approvals',
  SaveApprovals: 'Save Approvals',
  PleaseWait: 'Please wait',
  Failed: 'Failed',
  Success: 'Success',
  SomethingWentWrong: 'Something went wrong, Please try again later',
  ApproversHasBeenSaved: 'Approvals have been saved',
};

//  Submitting Button
export const englishSubmittingButton = {
  Submitting: 'Submitting',
};

//Time Tracker CoverTradeShiftStatus
export const CoverTradeShiftStatus = {
  Submitted: 1,
  Accepted: 2,
  Rejected: 3,
  Approved: 4,
  RejectedByApprover: 5,
};

//Time Tracker Requests Tabs
export const TimeTrackerRequests = {
  TimeSheet: 'TimeSheet',
  TimeOff: 'Time Off',
  Expense: 'Expense',
  Cover: 'Cover',
};

// time tracker request approvals types
export const ApprovalTypes = {
  TimeSheet: 0,
  TimeOff: 1,
  ExpenseList: 2,
  Cover: 3,
};
// time tracker request tabs
export const TimeTrackerRequestsTabs = [
  { name: 'Approvals' },
  { name: 'My Requests' },
];
export const ClassNotesTabs = {
  Details: 'Details',
  Attachments: 'Attachments',
};
export const TimeTrackerAdminTabs = [{ name: 'Approvals' }];

export const UserPermissionsEnums = {
  //CHALLENGES PERMISSIONS
  StudentChallenges: 26,
  TasksinTaskBoard: 27,
  BonusPoints: 28,
  RedeemPoints: 29,
  CourseStatus: 30,
  LevelStatus: 31,
  ClassChallenges: 32,
  ClassNotes: 33,
  ClassNotesRecordings: 311,
  CreateMakeupClass:497,
  StaffTasks: 34,
  PredefinedTasks: 35,
  ManageStatus: 36,
  StudentBoardRubricSetting: 286,
  ClassBoardRubricSetting: 287,

  //DASHBOARD PERMISSIONS
  WidgetsBasedOnRole: 1,
  CountersBasedOnRole: 316,
  ActivityCard: 317,
  DashboardUsersLink: 318,
  DashboardCurriculumLink: 319,
  DashboardClassesEventsLink: 320,
  DashboardPaymentLink: 321,
  DashboardScheduleLink: 322,
  DashboardCRMLink: 323,
  DashboardCalendarLink: 324,
  DashboardProfileLink: 325,
  DashboardWhiteboardLink: 326,
  DashboardAssessmenteLink: 327,
  DashboardAssignmentsLink: 328,
  DashboardJoinOnlineClassLink: 329,
  DashboardStudentsLink: 331,
  DashboardReportsLink: 332,
};

export const DriveTabTypeEnum = {
  Student: 1,
  Parent: 2,
  Instructor: 3,
};
export const HomeworkTabTypeEnum = {
  AssignedToStudent: 'Assigned to Student',
  SubmittedByStudent: 'Submitted by Student',
};
