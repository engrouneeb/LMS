export default {
  login: {
    url: '/token',
  },
  GetDrawerConfiguration: {
    url: '/api/GetDrawerConfiguration',
  },
  ForgetPassword: {
    url: '/api/Account/ForgetPassword',
  },
  CheckIsTokenValid: {
    url: '/api/Account/CheckIsTokenValid',
  },
  GetCompanySecureSettings: {
    url: '/api/Account/GetCompanySecureSettings',
  },
  GetCompanyFranchise: {
    url: '/api/Account/GetCompanyFranchises',
  },
  GetVariantCompany: {
    url: '/api/Account/GetVariantCompanyFranchises',
  },
  GetCoursesEmbededCode: {
    url: '/api/Account/GetCoursesEmbededCode',
  },
  GetRefreshToken: {
    url: '/api/Account/RefreshToken',
  },
  GetSuperadminPermissions: {
    url: '/api/Account/GetSuperadminPermissions',
  },
  // Getting App Module base permission for hide and show module and its sub screens
 GetRoleBasePermissions:{
  url:'/api/Account/GetRoleBasePermissions'
 },
  //getting announcent details
  GetAnnouncementsDetail: {
    url: '/api/GetAnnouncementDetail',
  },
  updatePassword: {
    url: '/api/Account/UpdatePassword',
  },
  messagingAppUrl: {
    url: 'https://messaging.calibermatrix.com',
  },
  pinAuthentication: {
    url: '/api/Kiosk/Pin',
  },
  IndCheckInOut: {
    url: '/api/Kiosk/checkincheckout',
  },
  Students: {
    url: '/api/Kiosk/Students',
  },
  GroupCheckIn: {
    url: '/api/Kiosk/GroupCheckIn',
  },
  courseCheckIn: {
    url: '/api/Kiosk/CourseCheckIn',
  },

  // Getting User against its pin
  GetUser: {
    url: '/api/Kiosk/User',
  },
  GetKioskCheckinList: {
    url: '/api/Kiosk/GetKioskCheckinList',
  },
  GetQRCodeDetail: {
    url: '/api/Kiosk/GetQRCodeDetail',
  },

  CompnayConfigs: {
    url: '/api/Account/CompanyConfig',
    Configs: {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      }),
    },
  },
  Contacts: {
    url: '/api/Messenger/Contacts',
  },
  //Get All Courses against company
  Classes: {
    url: '/api/Class/CompanyCoursesList',
  },

  //Get All Courses against user pin
  GetUserCoursesAndClasses: {
    url: '/api/Class/GetUserCoursesAndClasses',
  },

  Courses: {
    url: '/api/Class/CompanyCourses',
  },
  CourseLevel: {
    url: '/api/Class/GetClasses',
  },
  //Get Class for specific Course
  GetClasses: {
    url: '/api/Class/StudentsClasses',
  },
  // Get Wages List
  GetWages: {
    url: '/api/TimeTracker/GetWages',
  },
  // Getting Billing Info
  GetBillingInfo: {
    url: '/api/Billing/GetBillingInfo',
  },
  // Get Wages Details
  GetWagesDetails: {
    url: '/api/TimeTracker/GetWagesDetails',
  },
  GetPlaidToken: {
    url: '/api/Billing/GetLinkToken',
  },

  GetPlaidAccessToken: {
    url: '/api/Billing/GetAccessToken',
  },
  GetScheduleInstructorList: {
    url: '/api/TimeTracker/GetUserList',
  },
  // Get User Wages Detail
  GetUserWagesDetail: {
    url: '/api/TimeTracker/GetUserWagesDetail',
  },
  AddWages: {
    url: '/api/TimeTracker/SaveWages',
  },
  GetAnnouncements: {
    url: '/api/GetAnnouncements',
  },
  //Get Students for specific Class
  // ClassStudent: {
  //   url: "/api/Course/ClassStudents",
  // },
  AttendenceDate: {
    url: '/api/Attendance/AttendanceDate/',
  },
  AttendanceStudent: {
    url: '/api/Attendance/AttendanceStudents/',
  },
  MarkAttendance: {
    url: '/api/Attendance/MarkAttendance',
  },
  //Mark today Attendence
  MarkTodayAttendence: {
    url: '/api/Attendance/MarkStudentsAttendance',
  },
  //Mark today Attendence of All Students
  MarkTodayAllAttendence: {
    url: '/api/Class/MarkAllStudentsAttendance',
  },
  //Get Classes for View by Class Screen
  GetAllCompanyClasses: {
    url: '/api/Class/GetAllCompanyClasses',
  },
  GetCompanyCancelClasses: {
    url: '/api/Class/GetCompanyCancelClasses',
  },
  GetCanceledClassTimings: {
    url: '/api/Attendance/GetCanceledClassTimings',
  },
  //View Attendence
  ViewAttendance: {
    url: '/api/Attendance/ViewAttendance/',
  },
  // Cancel Class for a specific Course at a Specific time
  CancelClass: {
    url: '/api/Attendance/cancleClass',
  },
  // Create a Makeup Class for a specific Course Class at a specific Time
  CreateMakeup: {
    url: '/api/class/CreateMakeupClass',
  },
  // Undo a Cancelled Class
  UndoCanel: {
    url: '/api/Class/UndoCancel',
  },
  // Cancel a Scheduled Class
  DoCanel: {
    url: '/api/class/CancleClass',
  },
  // Mark Attendence against Date and Class
  MarkClassAttendence: {
    url: '/api/Attendance/TimingStudents',
  },
  SavefireBasetoken: {
    url: '/api/SaveFirebaseToken',
  },
  LogoutUser: {
    url: '/api/Account/LogoutUser',
  },
  GetStudentAnalytics: {
    url: '/api/DashboardCounters',
  },
  GetStudentList: {
    url: '/api/StudentInfo/GetStudentList',
  },
  GetActiveStudent: {
    url: '/api/getactivestudentschart',
  },
  GetPointsByMonthChart: {
    url: '/api/getpointsbymonthchart',
  },
  GetUserNotifications: {
    url: '/api/GetUserNotifications',
  },
  GroupClassStudentCheckIn: {
    url: '/api/Kiosk/ClassStudentCheckin',
  },
  EnrollmentPerCoursePerMonth: {
    url: '/api/enrollmentspercoursepermonth',
  },
  StudentPointsCounters: {
    url: '/api/studentpointscounters',
  },
  getAssignClassesDates: {
    url: '/api/Class/AssignedClasses',
  },
  getAssignClassesDetails: {
    url: '/api/Class/GetClassesDetail',
  },
  saveStaffSchedule: {
    //Staff Schedule Endpoint
    url: '/api/TimeTracker/SaveSchedule',
  },
  // Getting Time Sheet Data Admin
  timeSheet: {
    url: '/api/TimeTracker/GetTimesheet',
  },
  // For Submitting hours againt Timesheet for Week
  submittHourForTimesheet: {
    url: '/api/TimeTracker/UpdateTimesheetHours',
  },
  SaveSpecificDaySchedule: {
    url: '/api/TimeTracker/SaveSpecificDaySchedule',
  },
  SaveMultipleSchedules: {
    url: '/api/TimeTracker/SaveSchedule',
  },
  CopyWeekSchedule: {
    url: '/api/TimeTracker/CopyWeekSchedule',
  },
  getSchedule: {
    url: '/api/TimeTracker/GetSchedule',
  },
  getSetupAndApprovers: {
    url: '/api/TimeTracker/GetTimeTrackerSetup',
  },
  getAppoversUsers: {
    url: '/api/TimeTracker/GetApproversAgainstUser',
  },
  updateApprovers: {
    url: '/api/TimeTracker/AddApprovers',
  },
  getCoverUsers: {
    url: '/api/TimeTracker/GetCoverUsers',
  },
  getTradeUsers: {
    url: '/api/TimeTracker/GetTradeShiftUsers',
  },
  saveCover: {
    url: '/api/TimeTracker/SaveCoverUserAssignTo',
  },
  GetWeeklyTimeOff: {
    url: '/api/TimeTracker/GetWeeklyTimeOff',
  },
  // Add Time Off
  AddTimeOff: {
    url: '/api/TimeTracker/AddTimeoff',
  },
  // Delete Time Off
  DeleteTimeOff: {
    url: '/api/TimeTracker/DeleteTimeoff',
  },

  // Delete Billing Payment Method
  DeletePaymentMethod: {
    url: '/api/Billing/RemovePaymentMethod',
  },

  // For saving Timesheet for Week
  saveTimesheet: {
    url: '/api/TimeTracker/SaveTimesheet',
  },
  publishSchedule: {
    url: '/api/TimeTracker/PublishSchedules',
  },
  //Wages
  getUserWages: {
    url: '/api/TimeTracker/GetUserWages',
  },
  // For deleting notification for Week
  DeleteNotification: {
    url: '/api/DeleteUserNotification',
  },
  // For Getting Approvals Detail List for Approvel or Rejection
  GetApprovalsDetail: {
    url: '/api/TimeTracker/GetApprovalsDetail',
  },
  // For Approvels or Rejection of Timesheet etc
  SaveApprovalStatus: {
    url: '/api/TimeTracker/SaveApprovalStatus',
  },
  //Get All Courses
  GetCoursePlayerContent: {
    url: '/api/CoursePlayer/GetCourses',
  },
  //Get Course Details Of Course Player
  GetCourseDetails: {
    url: '/api/CoursePlayer/GetCourseDetail',
  },
  //Get Challenge Detail
  GetChallengeDetail: {
    url: '/api/CoursePlayer/GetChallengeDetail',
  },
  //Send Message to class
  SendNotificationToClass: {
    url: '/api/CoursePlayer/SendNotificationToClass',
  },
  //Course Steps
  GetCourseSteps: {
    url: '/api/CoursePlayer/GetChallengeStepsDetails',
  },
  //Saving Step Status
  SaveStepState: {
    url: '/api/CoursePlayer/SaveStepStatus',
  },
  //Get Course Player Student data
  GetCoursePlayerStudentData: {
    url: '/api/CoursePlayer/GetUserCourseProgress',
  },
  GetCourseOnlineClass: {
    url: '/api/CoursePlayer/CourseOnlineClasses',
  },
  JoinOnlineClass: {
    url: '/api/CoursePlayer/JoinOnlineClass',
  },
  SaveOnlineClassType: {
    url: '/api/CoursePlayer/SaveOnlineClassType',
  },
  StartMeeting: {
    url: '/api/CoursePlayer/StartMeeting',
    //Get All Notes
  },
  // Get Notes Detials
  GetNotesDetials: {
    url: '/api/CoursePlayer/GetClassNotesDetail',
  },
  GetCourseAssignStudents: {
    url: '/api/CoursePlayer/GetCourseAssignStudents',
  },
  GetPrevChat: {
    url: '/api/Messenger/GetPrevChat',
  },
  // get Chellenge Work
  getChallengeWork: {
    url: '/api/CoursePlayer/GetStudentChallengeWork',
  },
  // Submitt Chellenge Work
  SubmittChallenge: {
    url: '/api/CoursePlayer/SubmitChallengeWork',
  },
  getChallengeSteps: {
    url: '/api/CoursePlayer/GetChallengeSteps',
  },
  GetStudentHomeWork: {
    url: '/api/CoursePlayer/GetStudentHomeWork',
  },
  SubmittHomework: {
    url: '/api/CoursePlayer/SubmitStudentHomeWork',
  },
  JoinRunningClass: {
    url: '/api/CoursePlayer/JoinCalimaticOnlineClass',
  },
  StartCalimaticOnlineClass: {
    url: '/api/CoursePlayer/StartCalimaticOnlineClass',
  },
  GetCourseAttachment: {
    url: '/api/CoursePlayer/GetCourseAttachments',
  },
  GetHomeWorkStep: {
    url: '/api/CoursePlayer/GetHomeWorkStep',
  },
  SaveHomeWorkAttachment: {
    url: '/api/CoursePlayer/SaveHomeWorkAttachment',
  },
  SaveHomeWorkAttachmentBase64: {
    url: '/api/CoursePlayer/SaveHomeWorkAttachmentBase64',
  },
  UpdateUserProfileImage: {
    url: '/api/Account/UpdateUserProfileImage',
  },

  // updating billing status
  UpdateBillingStatus: {
    url: '/api/Billing/UpdatePaymentStatus',
  },

  DeleteAttachment: {
    url: '/api/CoursePlayer/DeleteAttachment',
  },
  SaveHomeWorkStep: {
    url: '/api/CoursePlayer/SaveHomeWorkStep',
  },
  GetStudentHomeWorkWhiteBoardLinks: {
    url: '/api/CoursePlayer/GetStudentHomeWorkWhiteBoardLinks',
  },
  //Delete Schedule
  DeleteSchedule: {
    url: '/api/TimeTracker/DeleteDaySchedule',
  },
  getCourseClasses: {
    url: '/api/CoursePlayer/AssignCourseToStudents',
  },
  getCourseClassStudents: {
    url: '/api/CoursePlayer/GetClassAssignStudents',
  },
  getCourseClassNote: {
    url: '/api/CoursePlayer/GetOnlineClassNotes',
  },
  // Get Course Reviews
  GetCourseReviews: {
    url: '/api/CoursePlayer/GetCourseReviews',
  },
  // Get Course Reviews against user that is parent or student
  GetCourseReviewAgainstUser: {
    url: '/api/CoursePlayer/GetCourseReviewAgainstUser',
  },
  // Add Course Reviews against user that is parent or student
  AddCourseReview: {
    url: '/api/CoursePlayer/AddCourseReview',
  },
  // Accept EULA by User
  AcceptEulaByUser: {
    url: '/api/SetUserAgree',
  },
  // Get Discussions
  GetDiscussions: {
    url: '/api/Discussion/GetDiscussions',
  },
  // Save Discussions
  SaveDiscussion: {
    url: '/api/Discussion/SaveDiscussion',
  },
  // Like Discussions
  LikeDiscussion: {
    url: '/api/Discussion/LikeDiscussion',
  },
  // Delete Discussions
  DeleteDiscussion: {
    url: '/api/Discussion/DeleteDiscussion',
  },
  // Get Badges
  GetNotiMsgCount: {
    url: '/api/GetNotificationMsgCounts',
  },
  // Clear Group badges
  UpdateMsgGroupsBadgeCount: {
    url: '/api/UpdateMsgGroupsBadgeCount',
  },
  // Get Student Dashboard classes
  GetStudentCourseClasses: {
    url: '/api/GetStudentCourseClasses',
  },
  // Get Student Dashboard Assessment list
  GetStudentAssessments: {
    url: '/api/GetStudentAssessments',
  },
  // Get Assigned Online Assessments Students list
  GetAssignedOnlineAssessmentsStudents: {
    url: '/api/Reports/GetAssignedOnlineAssessmentsStudents',
  },
  // Get Student Challenges List
  GetStudentChallengesList: {
    url: '/api/Reports/GetStudentChallengesList',
  },
  // Get Online Assessments Against Challenge
  GetOnlineAssessmentsAgainstChallenge: {
    url: '/api/Reports/GetOnlineAssessmentsAgainstChallenge',
  },
  //Get Online Assessment Report
  GetOnlineAssessmentReport: {
    url: '/api/Reports/GetOnlineAssessmentReport',
  },
  //Get PieChart For Online Assessment Report
  GetPieChartForOnlineAssessmentReport: {
    url: '/api/Reports/GetPieChartForOnlineAssessmentReport',
  },
  //Get Assessment Result Data
  GetAssessmentResultData: {
    url: '/api/Reports/GetAssessmentResultData',
  },
  //Get Student Courses
  GetStudentCourses: {
    url: '/api/Reports/GetStudentCourses',
  },
  GetStudentsAgainstCourses: {
    url: '/api/Reports/GetStudentsAgainstCourses',
  },
  //Get Student Progress Details
  GetStudentProgressDetails: {
    url: '/api/Reports/GetStudentProgressDetails',
  },
  //Get Courses Levels
  GetCoursesLevels: {
    url: '/api/Reports/GetCoursesLevels',
  },
  //Get Challenge Data
  GetChallengeData: {
    url: '/api/Reports/GetChallengeData',
  },
  //Get Assessment View
  GetAssessmentView: {
    url: '/api/Reports/GetAssessmentView',
  },
  //Get Home Work Chart
  GetHomeWorkChart: {
    url: '/api/Reports/GetHomeWorkChart',
  },

  //Get Student Overview
  getStudentOverview: {
    url: '/api/StudentInfo/GetStudentOverview',
  },
  //Get Student info Skills
  GetStudentSkills: {
    url: '/api/StudentInfo/GetRating',
  },
  //Get Student info EnrolledEvents
  GetUserEnrolledEvents: {
    url: '/api/StudentInfo/GetUserEnrolledEvents',
  },
  //Get Student info Medical
  GetStudentMedical: {
    url: '/api/StudentInfo/GetMedical',
  },
  //Get Student Feedback
  GetStudentFeedback: {
    url: '/api/StudentInfo/GetFeedback',
  },
  //Get Student info Classes
  GetStudentInfoClasses: {
    url: '/api/StudentInfo/GetClassesAgainstStudent',
  },
  StudentGetClasses: {
    url: '/api/StudentInfo/GetClasses',
  },
  //Create New Payment Method
  CreateNewPaymentMethod: {
    url: '/api/Billing/CreateNewPaymentMethod',
  },
  //Get Homework Courses
  GetHomeworkCourses: {
    url: '/api/Homework/GetHomeworkCourses',
  },
  //Get Course Homeworks
  GetCourseHomeworks: {
    url: '/api/Homework/GetCourseHomeworks',
  },
  //Get Company Terminologies
  GetCompanyTerminologies: {
    url: '/api/Account/GetCompanyTerminologies',
  },
  //Inventory
  GetInventoriesCategories: {
    url: '/api/Inventory/GetInventoriesCategories',
  },
  //get all inventories
  GetAllStoreItems: {
    url: '/api/Inventory/GetAllStoreItems',
  },
  CreateInventory: {
    url: '/api/Inventory/CreateInventory',
  },
  GetInvnetoryAllStatus: {
    url: '/api/Inventory/GetInventorieStatus',
  },
  CreateUpdateInventory: {
    url: '/api/Inventory/CreateUpdateInventory',
  },
  InventoryPayment: {
    url: '/Account/ProcessPaymentForMobile',
  },
  //get inventory tags
  GetAllTags: {
    url: '/api/Inventory/GetAllTags',
  },
  //upload invnetory item attachment
  UploadItemAttachment: {
    url: '/api/Attachment/UploadBase64Attachment',
  },
  //save new tag
  SaveTag: {
    url: '/api/Inventory/SaveTag',
  },
  GetAllRedeemCode: {
    url: '/api/Inventory/GetAllRedeemCode',
  },
  AddUpdateRedeemCode: {
    url: '/api/Inventory/AddUpdateRedeemCode',
  },
  DeleteRedeemCode: {
    url: '/api/Inventory/DeleteRedeemCode',
  },
  //get inventory attachment
  GetAttachment: {
    url: '/api/Attachment/GetAttachments',
  },
  //save attachment
  SaveAttachment: {
    url: '/api/Attachment/SaveAttachment',
  },
  //delet inventory
  DeleteInventory: {
    url: '/api/Inventory/DeleteInventory',
  },
  //update inventory Description
  UpdateInventoryDesc: {
    url: '/api/Inventory/UpdateInventoryDesc',
  },
  CreateUpdateStoreCategory: {
    url: '/api/Inventory/CreateUpdateStoreCategory',
  },
  DeleteCategory: {
    url: '/api/Inventory/DeleteCategory',
  },
  GetBalancePoints: {
    url: '/api/Inventory/GetBalancePoints',
  },
  GetAllStoreTransactions: {
    url: '/api/Inventory/GetAllStoreTransactions',
  },
  AddInventoryStoreItem: {
    url: '/api/Inventory/AddInventoryStoreItem',
  },
  GetAllShippedItems: {
    url: '/api/Inventory/GetAllShippedItems',
  },
  //UpdateCoverageStatus in TimeTracker Requests
  UpdateApprovalsDetails: {
    url: '/api/TimeTracker/UpdateCoverageStatus',
  },
  UpdateCoverageStatus: {
    url: '/api/TimeTracker/UpdateCoverageStatus',
  },
  GetTimeTrackingCounter: {
    url: '/api/TimeTracker/GetTimeTrackingCounter',
  },
  GetModuelPagesPermissions: {
    url: '/api/Account/GetModuelPagesPermissions',
  },
  GetUserInfoDetail: {
    url: '/api/Messenger/GetUserInfoDetail',
  },
  GetRequestApprovalsStaus: {
    url: '/api/TimeTracker/GetRequestApprovalsStaus',
  },
  ViewChatContacts: {
    url: '/api/Messenger/ViewChatContacts',
  },
  GetEventsTypes: {
    url: '/api/Class/GetEventsTypes',
  },
  GetCoursesTypes: {
    url: '/api/Class/GetCoursesTypes',
  },
  GetCategories: {
    url: '/api/InternalArticles/LoadKnowlegdeBaseCategories',
  },
  GetArticlesByCategory: {
    url: '/api/InternalArticles/LoadKnowlegdeBaseArticlesByCategory',
  },
  SaveArticleFeedback: {
    url: '/api/InternalArticles/SaveArticleFeedback',
  },
  sendIsReceivedMsgNotification: {
    url: '/api/Messenger/UpdateReadStatus',
  },
  updateIsRead: {
    url: '/api/Messenger/UpdateIsRead',
  },
  EnrollPayments: {
    url: '/api/payment/GetEnrollmentPayment',
  },
  FeePayments: {
    url: '/api/payment/GetFeePayment',
  },
  GetBalanceDetails: {
    url: '/api/payment/GetPaymentModal',
  },
  GetCouponDetails: {
    url: '/api/payment/GetCartCoupons',
  },
  DeleteAppliedCoupon: {
    url: '/api/payment/RemoveCartCoupon',
  },
  InsertCoupon: {
    url: '/api/payment/SaveShoppingCartCouponDiscount',
  },
  CheckInCheckOutViaQR: {
    url: '/api/Kiosk/DecryptQRCode',
  },
  IsBilingInfoExist: {
    url: '/api/billing/IsBilingInfoExist',
  },
  GetCalanderEvents: {
    url: '/api/Event/GetEventsCalanderData',
  },
  GetCalanderEventDetails: {
    url: '/api/Event/GetMonthlyEventsCalanderDataByEventIDs',
  },
  UpdateStoreItemStatus: {
    url: '/api/Inventory/UpdateStoreItemStatus',
  },
  SaveAutoMobileLogin: {
    url: '/api/Inventory/SaveAutoMobileLogin',
  },
  GetStaffInfoList: {
    url: '/api/Dashboard/GetInstructorGrid',
  },
  GetAllStaffDataGrid: {
    url: '/api/StaffInfo/GetAllStaffData',
  },
  GetStaffAssignedClasses: {
    url: '/api/StaffInfo/GetStaffAssignedClasses',
  },
  GetAssignedClassStudents: {
    url: '/api/StaffInfo/GetStudentManagementGrid',
  },
  Details: {
    url: '/api/StaffInfo/GetStaffFurthurDetailByID',
  },
  staffDetail: {
    url: '/api/StaffInfo/GetStaffUserDetailById',
  },
  Skills: {
    url: '/api/StaffInfo/GetSkillSetByStaffID',
  },
  GetStaffStudentsFeedbackTab: {
    url: '/api/StaffInfo/GetStaffStudentsFeedbackTab',
  },
  GetStaffOverviewById: {
    url: '/api/StaffInfo/GetStaffOverViewById',
  },
  SendReminderNotifications: {
    url: '/api/Class/SendReminderNotifications',
  },
  AddMakeUpClassDetails: {
    url: '/api/class/AddMakeUpClassDetail',
  },
  GetZoomCloudRecording: {
    url: '/api/CoursePlayer/GetZoomCloudRecording',
  },
  AddUpdateStudentInfoDetail: {
    url: '/api/StudentInfo/AddUpdateStudentInfoDetail',
  },
  //GetStudentHomeworks
  GetStudentHomeworks: {
    url: '/api/Homework/GetStudentHomeworks',
  },
  //SubmitHomework
  SubmitHomework: {
    url: '/api/Homework/SubmitHomework',
  },
  //GetDashboardConfiguration
  GetDashboardConfiguration: {
    url: '/api/GetDashboardConfiguration',
  },
  //Group Chat
  CreateGroup: {
    url: '/api/Messenger/GroupInsert',
  },
  GetGroups: {
    url: '/api/Messenger/GroupGet',
  },
  GroupUpdate: {
    url: '/api/Messenger/GroupUpdate',
  },
  GroupDelete: {
    url: '/api/Messenger/GroupDelete',
  },
  GetPrevGroupChat: {
    url: '/api/Messenger/GetPrevGroupChat',
  },
  DeleteGroupMember: {
    url: '/api/Messenger/DeleteGroupMember',
  },
  GetNotificationMsgCounts: {
    url: '/api/GetNotificationMsgCounts',
  },
  GetInstructorClassDetails: {
    url: '/api/Class/GetInstructorClassDetails',
  },
  GetInstructorClasses: {
    url: '/api/Class/GetInstructorClasses',
  },
  RequestMakeupOrCancelClass: {
    url: '/api/Class/RequestMakeupOrCancelClass',
  },
  RequestMakeupOrCancelStatus: {
    url: '/api/Class/RequestMakeupOrCancelStatus',
  },
  GetSchedulesForMakeupClass: {
    url: '/api/Class/GetSchedulesForMakeupClass',
  },
  GetStaffTimerLogs: {
    url: '/api/Kiosk/GetStaffTimerLogs',
  },
  PauseContinueStaffTimer: {
    url: '/api/Kiosk/PauseContinueStaffTimer',
  },
  // Get User Subjects checkin/out history
  GetUserCheckinSubjectHistory: {
    url: '/api/Kiosk/GetUserCheckinSubjectHistory',
  },
  // Get User Classes checkin/out history
  GetUserCheckinClassesHistory: {
    url: '/api/Kiosk/GetUserCheckinClassesHistory',
  },
  // Get User Classes against specific course
  GetClassesAgainstCourse: {
    url: '/api/StudentInfo/GetClassesAgainstCourse',
  },
  // Get  Class Roster
  GetClassRoaster: {
    url: '/api/Class/GetClassRoaster',
  },
  // Get  Event Roster
  GetEventRoaster: {
    url: '/api/Event/GetEventRoaster',
  },
  // Get Parent QuickLinkConfiguration
  GetParentQuickLinksConfiguration: {
    url: '/api/GetQuickLinksConfiguration',
  },
  // Get ViewProgramConfiguration
  GetViewProgramConfiguration: {
    url: '/api/GetViewProgramConfiguration',
  },
  // Get ViewProgramConfiguration
  GetPinDetailByUserId: {
    url: '/api/Kiosk/GetPinDetailByUserId',
  },
};
