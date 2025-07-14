import DrawerScreens from './navigation/Drawer/DrawerScreenNames';

export const NotificationTypes = {
  CourseCompletion: 1,
  LevelCompletion: 2,
  ChallengeCompletion: 3,
  Attendance: 4,
  ClassCancelled: 5,
  MakeUpScheduled: 6,
  Chat: 7,
  Announcement: 8,
  StoreItemsShipped: 9,
  StoreItemsPurchased: 10,
  SchedulePublish: 11,
  ScheduleCover: 12,
  TimeOffApproval: 13,
  TimesheetApproval: 14,
  ExpenseApproval: 15,
  SendNotificationToClass: 16,
  ClassFree: 17,
  Timesheet: 18,
  ScheduleCoverage: 19,
};

export const NotificationReminder = {
  OnlyStudentJoined: 1,
  OnlyInstuctorJoined: 0,
};

export const CoverRequestConstants = {
  Accept: 'Accept',
  Decline: 'Decline',
  Approved: 'Approved',
  Approve: 'Approve',
  Lock: 'Lock',
  Cover: 'Cover',
  Submitted: 'Submitted',
  Pending: 'Pending',
  Rejected: 'Rejected',
  Reject: 'Reject',
};
export const ClassTypesConstants = {
  VariantName: 1,
  Zoom: 2,
  GoogleMeet: 3,
};
export const HomeWorkTabTypesConstants = {
  Assigned: 1,
  Submitted: 2,
  Corrected: 3,
};
export const LanguageConstant = {
  English: 'English',
  Arabic: 'Arabic',
};
export const DashboardWidgets = {
  classCounters: 'Classes Counters',
  announcements: 'Announcements',
  quickLinks: 'Quick Links',
  enrollmentsReceived: 'Enrollments Received',
  pointsAchieved: 'Points Achieved',
  upcomingEvents: 'Upcoming Events',
  assignedClasses: 'Assigned Classes',
  studentPoints: 'Student Points',
  coursePointsAchieved: 'Course Points Achieved',
};

export const hidenManuForSmavy = [
  {
    Text: 'Store',
    Navigation: 'Store',
    color: '#e8973a',
    cstmClass: '',
  },
  {
    Text: 'Payments',
    Navigation: DrawerScreens.payments.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'Enroll',
    Navigation: DrawerScreens.enrollmentScreen.name,
    color: '#545454',
    cstmClass: '',
  },
];
export const menuForPlayStore = [
  {
    Text: 'Store',
    Navigation: 'Store',
    color: '#e8973a',
    cstmClass: '',
  },
  {
    Text: 'Financial',
    Navigation: DrawerScreens.payments.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'Enroll',
    Navigation: DrawerScreens.enrollmentScreen.name,
    color: '#545454',
    cstmClass: '',
  },
];

export const hideStemInventorMenu = [
  {
    Text: 'Financial',
    Navigation: DrawerScreens.payments.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'Enroll',
    Navigation: DrawerScreens.enrollmentScreen.name,
    color: '#545454',
    cstmClass: '',
  },
];

export const playStoreTestUser = [
  'Jake Smith',
  'Jeff Jarrett',
  'Walter Lawler',
  'Jerry Lawler ',

];

export enum ReturnPage {
  'AddToClass' = 1,
  'Payment' = 2,
  'Transaction' = 3,
  'AddStudentsToClass' = 4,
  'Reports' = 5,
  'Documents' = 6,
  'PendingPayments' = 7
}
export enum AppModuleTypeEnum {
  Courses = 1,
  Messages = 2,
  TimeTracker = 3,
  StaffInfo = 4,
  StudentInfo = 5,
  Events = 6,
  // Attendance=7
}

export enum AppModuleScreenTypeEnum {
  AssignedStudents = 1,
  ClassNotification = 2,
  ClassOverview = 3,
  ClassRoster = 4,
  Parents = 5,
  Staff = 6,
  Students = 7,
  Instructors = 8,
  FranchiseOwners = 9,
  Admin = 10,
  ViewInstructorStudentChat = 11,
  ViewInstructorParentChat = 12,
  Groups = 13,
  CreateGroup = 14,
  Overview = 15,
  UpdateStudentInfo = 16,
  UpdateFamilyInfo = 17,
  ShowContacts = 18,
  UpdateContact = 19,
  AddContact = 20,
  Skills = 21,
  Attachments = 22,
  Classes = 23,
  AddToClass = 24,
  Events = 25,
  Medicals = 26,
  Feedback = 27,
  Billing = 28,
  AddPaymentMethod = 29,
  Details = 30,
  StaffIntro = 31,
  Video = 32,
  AssignStudents = 33,
  Setup = 34,
  AddApproval = 35,
  Wages = 36,
  AddWages = 37,
  Schedule = 38,
  CreateSchedule = 39,
  PublishSchedule = 40,
  Timesheet = 41,
  AddTimesheet = 42,
  TimeOff = 43,
  AddTimeoff = 44,
  Requests = 45,
  RequestTimesheet = 46,
  RequestTimeOff = 47,
  RequestExpense = 48,
  RequestCover = 49,
  EventRoster = 50,
  // AddMakeUpClass=51
}
// currnetly these are screen and module which are permission base
export const ModuleScreenName = {
  //AttendanceAddMakeUpClass:"AddMakeUpClass"
  CoursesAssignedStudents: 'AssignedStudents',
  CoursesClassNotification: "ClassNotification",
  CoursesClassOverview: "ClassOverview",
  CoursesClassRoster: "ClassRoster",
  ParentsMessages: "ParentsMessages",
  StaffMessages: "StaffMessages",
  StudentsMessages: 'StudentsMessages',
  InstructorsMessages: "InstructorsMessages",
  FranchiseMessages: 'FranchiseMessages',
  AdminMessages: "AdminMessages",
  ViewInstructorStudentChatMessages: "ViewInstructorStudentChatMessages",
  ViewInstructorParentChatMessages: "ViewInstructorParentChatMessages",
  GroupsMessages: "GroupsMessages",
  CreateGroupMessages: "CreateGroupMessages",
  StudentInfoOverView: "StudentInfoOverView",
  StudentInfoUpdate: "UpdateStudentInfo",
  StudentInfoUpdateFamilyInfo: "UpdateFamilyInfo",
  StudentInfoShowContacts: "ShowContacts",
  StudentInfoUpdateContact: "UpdateContact",
  StudentInfoAddContact: "AddContact",
  StudentInfoSkills: "Skills",
  StudentInfoAttachments: "Attachments",
  StudentInfoClasses: "Classes",
  StudentInfoAddToClass: "AddToClass",
  StudentInfoEvents: "Events",
  StudentInfoMedicals: "Medicals",
  StudentInfoFeedback: "Feedback",
  StudentInfoBilling: "Billing",
  AddPaymentMethod: "AddPaymentMethod",
  StaffClassOverview: "StaffClassOverview",
  StaffDetails: "StaffDetails",
  StaffSkills: "StaffSkills",
  StaffIntro: "StaffIntro",
  StaffVideo: "StaffVideo",
  StaffAssignStudents: "StaffAssignStudents",
  StaffAttachments: "StaffAttachments",
  StaffFeedback: "StaffFeedback",
  TimeTrackerSetup: "Setup",
  TimeTrackerAddApproval: "AddApproval",
  TimeTrackerWages: "Wages",
  TimeTrackerAddWages: "AddWages",
  TimeTrackerSchedule: "Schedule",
  TimeTrackerCreateSchedule: "CreateSchedule",
  TimeTrackerPublishSchedule: "PublishSchedule",
  TimeTrackerTimesheet: "Timesheet",
  TimeTrackerAddTimesheet: "AddTimesheet",
  TimeTrackerTimeOff: "TimeOff",
  TimeTrackerAddTimeoff: "AddTimeoff",
  TimeTrackerRequests: "Requests",
  TimeTrackerRequestTimesheet: "RequestTimesheet",
  TimeTrackerRequestTimeOff: "RequestTimeOff",
  TimeTrackerRequestExpense: "RequestExpense",
  TimeTrackerRequestCover: "RequestCover",
}
export  enum SuperadminConfigurationEnum
 {
     IsSecured = 0,
     ZoomClass = 6,
     GoogleMeetClass = 7,
     KioskClassesMandatory = 11,
     KioskSubjectsMandory = 12,
 }

export const zoomJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiJcIjZBenZfQUFKUkxlZDFYUm5ybHZXa1FcIjsiLCJzZGtLZXkiOiJcIjZBenZfQUFKUkxlZDFYUm5ybHZXa1FcIjsiLCJtbiI6IjEyMzQ1Njc4OSIsInJvbGUiOjAsImlhdCI6MTcxOTgyMjkxNCwiZXhwIjoxNzE5ODMwMTE0LCJ0b2tlbkV4cCI6MTcxOTgzMDExNH0.XkAnb0tWNOCfnpvAuey2aBnX7Jmv-hfDmMhmsMK5xhY';
