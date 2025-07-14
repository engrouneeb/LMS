import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import { AppModuleScreenTypeEnum,AppModuleTypeEnum } from '../../constants';

export const englishSideBar = [
  {
    Text: 'Home',
    // Navigation: "dashboard",
    Navigation: DrawerScreens.dashboard.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Courses',
    // Navigation: "CoursePlayer",
    Navigation: DrawerScreens.coursePlayer.name,
    color: '#939393',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Homework/Assignments',
    // Navigation: "CoursePlayer",
    Navigation: DrawerScreens.HomeworkAssignment.name,
    color: '#939393',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Messages',
    // Navigation: "msgScr",
    Navigation: DrawerScreens.msgScr.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Attendance',
    // Navigation: "AttendanceDetail",
    Navigation: DrawerScreens.attendance.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Time Tracker',
    // Navigation: "TimeTracker",
    Navigation: DrawerScreens.timeTracker.name,
    color: '#939393',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Drive',
    Navigation: DrawerScreens.drive.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Financial',
    Navigation: DrawerScreens.payments.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Calendar',
    // Navigation: "pinCode",
    Navigation: DrawerScreens.Calendar.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Store',
    Navigation: 'store',
    color: '#e8973a',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Kiosk',
    // Navigation: "pinCode",
    Navigation: DrawerScreens.pinCode.name,
    color: '#545454',
    csbmName: 'Check In/Out',
    csbmKey: 55,
  },
  {
    Text: 'Articles',
    // Navigation: "Enroll",
    Navigation: DrawerScreens.articles.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Enroll',
    // Navigation: "Enroll",
    Navigation: DrawerScreens.enrollmentScreen.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Reports',
    // Navigation: "NotificationsTab",
    Navigation: DrawerScreens.reportsTab.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Notifications',
    // Navigation: "NotificationsTab",
    Navigation: DrawerScreens.notificationsTab.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Staff Info',
    // Navigation: "NotificationsTab",
    Navigation: DrawerScreens.StaffMenu.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
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
    csbmKey: '',
  },
  {
    Text: 'Courses',
    Navigation: DrawerScreens.coursePlayer.name,
    color: '#939393',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Homework/Assignments',
    Navigation: DrawerScreens.HomeworkAssignment.name,
    color: '#939393',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Assessments',
    Navigation: DrawerScreens.StudentAssessments.name,
    color: '#939393',
    csbmName: 'Assessments',
    csbmKey: 46,
  },
  {
    Text: 'Student Info',
    Navigation: DrawerScreens.studentTab.name,
    color: '#545454',
    csbmName: 'Student Info',
    csbmKey: 42,
  },
  {
    Text: 'Messages',
    Navigation: DrawerScreens.msgScr.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Attendance',
    Navigation: DrawerScreens.attendance.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Drive',
    Navigation: DrawerScreens.drive.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  // {
  //   Text: 'Financial',
  //   Navigation: DrawerScreens.payments.name,
  //   color: '#545454',
  //   csbmName: '',
  //   csbmKey: '',
  // },
  {
    Text: 'Calendar',
    // Navigation: "pinCode",
    Navigation: DrawerScreens.Calendar.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Store',
    Navigation: 'store',
    color: '#e8973a',
    csbmName: '',
    csbmKey: '',
  },
  // {
  //   Text: 'Kiosk',
  //   // Navigation: "pinCode",
  //   Navigation: DrawerScreens.pinCode.name,
  //   color: '#545454',
  //   csbmName: 'Check In/Out',
  //   csbmKey: 50,
  // },
  {
    Text: 'Reports',
    // Navigation: "Reports",
    Navigation: DrawerScreens.reportsTab.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Notifications',
    // Navigation: "NotificationsTab",
    Navigation: DrawerScreens.notificationsTab.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Articles',
    // Navigation: "Enroll",
    Navigation: DrawerScreens.articles.name,
    color: '#545454',
    csbmName: '',
    csbmKey: '',
  },
  {
    Text: 'Enroll',
    // Navigation: "Enroll",
    Navigation: DrawerScreens.enrollmentScreen.name,
    color: '#545454',
    csbmName: 'Classes Overview > Class Students',
    csbmKey: 62,
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
  forgotPassword: 'Forgot your Password?',
  submit: 'submit',
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
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.Parents
    },
    {
      TabName: 'Staff',
      Chatfor: 6,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.Staff
    },
    {
      TabName: 'Students',
      Chatfor: 4,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.Students
    },
    {
      TabName: 'Franchise Owners',
      Chatfor: 7,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.FranchiseOwners
    },
    {
      TabName: 'Instructors',
      Chatfor: 9,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.Instructors
    },
    {
      TabName: 'Admin',
      Chatfor: 8,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.Admin
    },
    {
      TabName: 'View Instructor-Student Chat',
      Chatfor: 11,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.ViewInstructorStudentChat
    },
    {
      TabName: 'View Instructor-Parents Chat',
      Chatfor: 12,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.ViewInstructorParentChat
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
    {
      TabName: 'Shipment Needed',
      Navigation: 'Shipment',
    },
    {
      TabName: 'All Transactions',
      Navigation: 'Transactions',
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
    {
      TabName: 'System Reports',
      Navigation: 'SystemReports',
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
  BounsPoints: 'Bonus Points:',
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
  UpcomingEvents: 'Upcoming Events',
  StartTime: 'Start Time',
  EndTime: 'End Time',
  Close: 'Close',
  Loading: 'Loading...',
  StudentAssessments: 'Assessments',
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
          cstmClass: '',
        },
        {
          Text: '2',
          value: 2,
          cstmClass: '',
        },
        {
          Text: '3',
          value: 3,
          cstmClass: '',
        },
      ],
      [
        {
          Text: '4',
          value: 4,
          cstmClass: '',
        },
        {
          Text: '5',
          value: 5,
          cstmClass: '',
        },
        {
          Text: '6',
          value: 6,
          cstmClass: '',
        },
      ],
      [
        {
          Text: '7',
          value: 7,
          cstmClass: '',
        },
        {
          Text: '8',
          value: 8,
          cstmClass: '',
        },
        {
          Text: '9',
          value: 9,
          cstmClass: '',
        },
      ],
      [
        {
          Text: 'Clear',
          value: -1,
          cstmClass: '',
        },
        {
          Text: '0',
          value: 0,
          cstmClass: '',
        },
        {
          Text: 'Delete',
          value: -2,
          cstmClass: '',
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
  CheckIn: 'Check In',
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
  Requests: 'Requests',
  Setup: 'Setup',
  ViewSummary: 'View Summary',
  menuList: [
    { title: 'Wages',module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.Wages  },
    { title: 'Schedule',module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.Schedule },
    { title: 'Timesheet',module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.Timesheet },
    { title: 'Time Off' ,module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.TimeOff},
    { title: 'Requests',module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.Requests },
  ],
  adminList: [
    { title: 'Setup',module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.Setup },
    { title: 'Wages',module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.Wages },
    { title: 'Schedule',module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.Schedule },
    { title: 'Timesheet',module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.Timesheet },
    { title: 'Time Off',module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.TimeOff },
    { title: 'Requests',module:AppModuleTypeEnum.TimeTracker,screen:AppModuleScreenTypeEnum.Requests },
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
  NoTimesheetFound: 'No Timesheet found',
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
  AddHr: 'Add Hours(0-24)',
  AddCommentsHere: 'Add comments here',
  LoggedHr: 'Logged Hour',
  TotelHr: 'Total Hr',
  Success: 'Success',
  TimeSheetHoursIsLogedSuccessfully: 'Timesheet hours are logged successfully',
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
  AddTimeFor: 'Time-off for',
  Name: 'Title *',
  ApplyForItem: 'Apply for item',
  Date: 'Date',
  StartTime: 'Start Time *',
  SelectStartTime: 'Select Start Time',
  EndTime: 'End Time *',
  SelectEndTime: 'Select End Time',
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
  Status: 'Status :',
  NoApprovelsFound: 'No Approvals found',
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
  EnterUrl: 'Enter Url',
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
  { value: 'Assigned Students', AssignedStudents: 'Assigned Students',module:AppModuleTypeEnum.Courses,screen:AppModuleScreenTypeEnum.AssignedStudents },
  { value: 'Class Notification', ClassNotification: 'Class Notification',module:AppModuleTypeEnum.Courses,screen:AppModuleScreenTypeEnum.ClassNotification },
  { value: 'Class Overview', ClassOverview: 'Class Overview',module:AppModuleTypeEnum.Courses,screen:AppModuleScreenTypeEnum.ClassOverview },
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
  Error: 'Error',
  ShowSelectedOnly: 'Show Selected Only',
  SomethingWentWrong: 'Something went wrong, Please try again later',
  ApproversHasBeenSaved: 'Approvals have been saved',
};

//  Submitting Button
export const englishSubmittingButton = {
  Submitting: 'Submitting',
};

export const TimeTrackerTabs = {
  Approvals: 'Approvals',
  MyRequests: 'My Requests',
};

//Timetracker Requests/Cover Requests
export const englishRequests = {
  Accept: 'Accept',
  Decline: 'Decline',
  Reject: 'Reject',
  Approve: 'Approve',
  AddYourComment: 'Add Your Comment',
  Wouldyouliketocover: 'Would you like to cover',
  requesthasbeenacceptedby: 'request has been accepted by',
  requestcoverto: 'request cover to',
};
