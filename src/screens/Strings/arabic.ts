import { AppModuleTypeEnum ,AppModuleScreenTypeEnum} from '../../constants';
import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
export const arabicSideBar = [
  {
    Text: 'الصفحة الرئيسية',
    Navigation: DrawerScreens.dashboard.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'الدورات',
    Navigation: DrawerScreens.coursePlayer.name,
    color: '#939393',
    cstmClass: '',
  },
  {
    Text: 'واجبات منزلية',
    // Navigation: "CoursePlayer",
    Navigation: DrawerScreens.HomeworkAssignment.name,
    color: '#939393',
    cstmClass: '',
  },
  {
    Text: 'الرسائل',
    Navigation: DrawerScreens.msgScr.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'الحضور',
    Navigation: DrawerScreens.attendance.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'تعقب الوقت',
    Navigation: DrawerScreens.timeTracker.name,
    color: '#939393',
    cstmClass: '',
  },
  {
    Text: 'تسجيل الدخول',
    Navigation: DrawerScreens.pinCode.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'إشعارات',
    Navigation: DrawerScreens.notificationsTab.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'التقارير',
    Navigation: DrawerScreens.reportsTab.name,
    color: '#545454',
    cstmClass: '',
  },

  {
    Text: 'تسجيل خروج',
    Navigation: 'Logout',
    color: '#939393',
    cstmClass: '',
  },
];
export const arabicCommonWords = {
  loading: 'جار التحميل...',
  close: 'أغلق',
  previous: 'السابق',
  next: 'التالى',
  markAsComplete: 'وضع علامة مكتمل',
  markAsIncomplete: 'وضع علامة غير مكتمل',
};
export const arabicStudentSideBar = [
  {
    Text: 'الصفحة الرئيسية',
    // Navigation: "dashboard",
    Navigation: DrawerScreens.dashboard.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'الدورات',
    Navigation: DrawerScreens.coursePlayer.name,
    color: '#939393',
    cstmClass: '',
  },
  {
    Text: 'معلومات الطالب',
    Navigation: DrawerScreens.studentTab.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'الرسائل',
    Navigation: DrawerScreens.msgScr.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'الحضور',
    Navigation: DrawerScreens.attendance.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'إشعارات',
    Navigation: DrawerScreens.notificationsTab.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'التقارير',
    Navigation: DrawerScreens.reportsTab.name,
    color: '#545454',
    cstmClass: '',
  },
  {
    Text: 'تسجيل خروج',
    Navigation: 'Logout',
    color: '#939393',
    cstmClass: '',
  },
];
export const arabicCompanyCodeScreen = {
  inputPlaceHolder: 'أدخل رمز مركز التعلم',
  btnText: '...استمر',
};
export const arabicGetStartedScreen = {
  btnText: 'البدء',
};
export const arabicLoginScreen = {
  userName: 'اسم المستخدم',
  password: 'كلمه السر',
  Login: 'تسجيل الدخول',
  forgotPassword: "Don't remember the password",
  reset: 'reset?',
  submit: 'Submit',
};
export const arabicCourseScreen = {
  Courses: 'الدورات',
};
export const arabicCourseContentScreen = {
  CoursesContent: 'محتوى الدورة',
  AssignStudents: 'كلف الطلاب',
  AssignInstructors: 'تعيين المدربين',
  Assign: 'تعيين',
};
export const arabicMessagesScreen = {
  Message: 'الرسائل',
  Tabs: [
    {
      TabName: 'آباء',
      Chatfor: 5,
       module:AppModuleTypeEnum.Messages,
        screen:AppModuleScreenTypeEnum.Parents
    },
    {
      TabName: 'العاملين',
      Chatfor: 6,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.Staff
    },
    {
      TabName: 'الطلاب',
      Chatfor: 4,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.Students
    },
    {
      TabName: 'أصحاب الامتياز',
      Chatfor: 7,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.FranchiseOwners
    },
    {
      TabName: 'المدربون',
      Chatfor: 9,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.Instructors
    },
    {
      TabName: 'مشرف',
      Chatfor: 8,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.Admin
    },
    {
      TabName: 'عرض الدردشة بين المعلم والطالب',
      Chatfor: 11,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.ViewInstructorStudentChat
    },
    {
      TabName: 'عرض الدردشة بين المعلم وأولياء الأمور',
      Chatfor: 12,
      module:AppModuleTypeEnum.Messages,
      screen:AppModuleScreenTypeEnum.ViewInstructorParentChat
    },
  ],
};

export const arabicReportsScreen = {
  Reports: 'Reports',
  Tabs: [
    {
      TabName: 'تقدم الطلاب',
      Navigation: 'StudentProgressList',
    },
    {
      TabName: 'التقييم ',
      Navigation: 'StudentAssessmentList',
    },
  ],
};

export const arabicStudentProgressScreen = {
  StudentProgress: 'تقدم الطالب',
};
export const arabicStudentProgressReportScreen = {
  StudentProgressReport: 'تقرير تقدم الطالب',
};
export const arabicStudentAssessmentScreen = {
  StudentAssessment: 'تقييم الطالب',
};
export const arabicStudentAssessmentReportScreen = {
  StudentAssessmentReport: 'تقرير تقييم الطالب',
};

export const arabicDashboardScreen = {
  Home: 'الصفحة الرئيسية',
  welCome: 'أهلا بك',
  activeClasses: 'فئات نشطة',
  activeStudents: 'الطلاب النشطون',
  CoursesCompleted: 'الدورات المكتملة',
  AssignedStudent: 'الطلاب المعينون',
  EnrollmentsReceived: 'تم تلقي التسجيلات',
  StudentPoints: 'نقاط الطالب',
  ChallengePoints: 'نقاط التحدي',
  BounsPoints: 'نقاط المكافأة',
  RedeemedPoints: 'النقاط المستبدلة:',
  AvailablePoints: 'النقاط المتاحة:',
  By: 'بواسطة',
  NoActiveStudentsFound: 'لم يتم العثور على طلاب نشطين',
  PointsAchieved: 'النقاط المحققة',
  QuickLinks: 'روابط سريعة',
  ShowQuickLinks: 'إظهار الروابط السريعة',
  NoEnrollmentIsFound: 'لم يتم العثور على تسجيل',
  AssignedClasses: 'الفئات المعينة:',
  StartTime: 'وقت البدء',
  EndTime: 'وقت النهاية',
  Close: 'أغلق',
  Loading: 'جار التحميل .....',
  StudentAssessments: 'التقييمات',
};

// Attendence Marking Datewise Screen
export const arabicAttendenceMarkingDateWiseScreen = {
  MarkAttendence: 'علامة الحضور',
  ViewbyClass: 'عرض حسب الفصل',
  CancelClass: 'إلغاء الفصل',
  AddMakeupClass: 'أضف فئة المكياج',
  SubmitAttendance: 'إرسال الحضور',
  NoDataFound: 'لاتوجد بيانات',
  NoStudentFound: 'لم يتم العثور على طلاب',
  Oops: 'وجه الفتاة',
  Okay: 'حسنا',
  SomethingWentWrongPleaseTryAgain: 'هناك خطأ ما. حاول مرة اخرى!',
  Success: 'نجاح',
  AttendanceMarkedSuccessfully: 'تم تمييز الحضور بنجاح',
  CannotRequestcheckNetworkTryAgain:
    'لا يمكن الطلب على الشبكة ، يرجى التحقق من الشبكة والمحاولة مرة أخرى',
};

// showing Class List
export const arabicViewbyClass = {
  Attendance: 'الحضور',
  SearchClass: 'فئة البحث...',
};

// showing Date List of Class
export const arabicDateList = {
  ClassTimings: 'أوقات الفصل',
  NoTimingisFound: 'لم يتم العثور على توقيت',
  Undo: 'الغاء التحميل',
  Cancel: 'إلغاء',
  Success: 'نجاح',
  ClassHasBeenCancelled: 'تم إلغاء الفصل',
  Error: 'خطأ',
  SomethingWentWrong: 'هناك خطأ ما....',
  Makeup: 'تجميل',
  Today: 'اليوم',
  CancelClass: 'إلغاء الفصل',
  AreYouSureYouWantToCancelTheClass: 'هل أنت متأكد أنك تريد إلغاء الفصل؟',
  Yes: 'نعم',
  No: 'لا',
  Okay: 'حسنا',
  ClassCancellationHasBeenSuccessfullyUndone: 'تم التراجع عن إلغاء الفصل بنجاح',
  ClassCancelled: 'تم إلغاء الصف',
};

// Pin Code Screen
export const arabicPincodeScreen = {
  EnterYourPIN: 'أدخل الكود الشخصي التعريفي',
  InvalidPIN: 'رقم التعريف الشخصي غير صالح',
  keyMeta: [
    [
      [
        {
          Text: 'واحد',
          value: 1,
          cstmClass: '',
        },
        {
          Text: 'إثنان',
          value: 2,
          cstmClass: '',
        },
        {
          Text: 'ثلاثة',
          value: 3,
          cstmClass: '',
        },
      ],
      [
        {
          Text: 'أربعة',
          value: 4,
          cstmClass: '',
        },
        {
          Text: 'خمسة',
          value: 5,
          cstmClass: '',
        },
        {
          Text: 'ستة',
          value: 6,
          cstmClass: '',
        },
      ],
      [
        {
          Text: 'سبعة',
          value: 7,
          cstmClass: '',
        },
        {
          Text: 'ثمانية',
          value: 8,
          cstmClass: '',
        },
        {
          Text: 'تسعة',
          value: 9,
          cstmClass: '',
        },
      ],
      [
        {
          Text: 'بجلاء',
          value: -1,
          cstmClass: '',
        },
        {
          Text: 'صفر',
          value: 0,
          cstmClass: '',
        },
        {
          Text: 'حذف',
          value: -2,
          cstmClass: '',
        },
      ],
    ],
  ],
};

// individual Checkin screen
export const arabicIndividualScreen = {
  Welcome: 'أهلا بك',
  CheckOut: 'تسجيل الخروج',
  CheckIn: ' تسجيل الوصول',
  You: 'لقد نجحت ',
  successfuly: 'بنجاح',
  at: 'في الساعة',
  on: 'بتاريخ',
};

// Group Checkin screen
export const arabicGroupScreen = {
  HaveAGreatDay: 'أتمنى لك يوما عظيما!',
  StudentsChecked: 'فحص الطلاب ',
  CheckOut: 'تسجيل الخروج',
  CheckIn: ' تسجيل الوصول',
  successfuly: 'بنجاح',
  at: 'في الساعة',
  on: 'بتاريخ',
};

// Notifications Screen
export const arabicNotificationScreen = {
  Notification: 'إشعارات',
  ClearAll: 'امسح الكل',
  NoNotificationisFound: 'لم يتم العثور على إشعار',
};

// Time Tracker Screen
export const arabicTrackerScreen = {
  timeTracker: 'تعقب الوقت',
  Schedule: 'جدول',
  Timesheet: 'ورقة التوقيت',
  TimeOff: 'انتهى الوقت',
  Wages: 'الأجور',
  Approvals: 'الموافقات',
  Setup: 'دسيسة',
  ViewSummary: 'ملخص رأي',
  menuList: [
    { title: 'الأجور' },
    { title: 'جدول' },
    { title: 'ورقة التوقيت' },
    { title: 'انتهى الوقت' },
    { title: 'الموافقات' },
  ],
  adminList: [
    { title: 'دسيسة' },
    { title: 'الأجور' },
    { title: 'جدول' },
    { title: 'ورقة التوقيت' },
    { title: 'انتهى الوقت' },
    { title: 'الموافقات' },
  ],
};

// Add Wages Screen
export const arabicAddWages = {
  Wages: 'الأجور',
  ItemName: 'اسم العنصر',
  EnterItemName: 'أدخل اسم العنصر',
  WageFrom: 'الأجر من',
  SelectWageFrom: 'حدد الأجور من',
  WageType: 'نوع الأجور',
  SelectWageType: 'حدد نوع الأجور',
  EffectiveDate: 'تاريخ النفاذ',
  EnterWageRate: 'أدخل معدل الأجور',
  Select: 'انتخب',
  SelectEffectiveDate: 'حدد تاريخ السريان',
  WageRate: 'معدل الأجور',
  AddWage: 'أضف أجرًا',
  UpdateWage: 'تحديث الأجر',
  Error: 'غلطة',
  Okay: 'حسنا',
  PleaseEnterItemName: 'يرجى إدخال اسم العنصر',
  PleaseSelectWageFrom: 'الرجاء تحديد الأجر من',
  PleaseSelectWageType: 'يرجى تحديد نوع الأجور',
  PleaseSelectEffectiveDate: 'يرجى تحديد تاريخ السريان',
  PleaseEnterWageRate: 'الرجاء إدخال معدل الأجور',
  AlreadyExists: 'موجود مسبقا!',
  PleaseEnterDifferentEffectiveDate: 'يرجى إدخال تاريخ سريان مختلف',
  Success: 'نجاح',
  SomeThingWentWrong: 'هناك خطأ ما. حاول مرة اخرى!',
  WageAddedSuccessfully: 'تمت إضافة الأجر بنجاح',
  WageUpdatedSuccessfully: 'تم تحديث الأجر بنجاح',
};

// wages Detial
export const arabicWagesDetial = {
  WagesDetial: 'فصل الأجور',
  TotalHour: 'مجموع الساعة:',
  TotalWage: 'إجمالي الأجر',
  Detial: 'التفاصيل',
};

// wages DetialIndividualsUser
export const arabicWagesDetialIndividualUSer = {};
// wages DetialIndividualsUser
export const arabicAdminSchedule = {
  Today: 'اليوم',
  NoSchedule: 'لا يوجد جدول زمني',
  Success: 'نجاح',
  ScheduleHasBeenPublished: 'تم نشر الجدول الزمني!',
  Error: 'خطأ',
  SomethingWentWrong: 'هناك شئ خاطئ، يرجى المحاولة فى وقت لاحق.',
  NoData: 'لايوجد بيانات',
  Schedule: 'جدول',
  Summary: 'ملخص',
  Saving: 'إنقاذ...',
  Loading: 'جار التحميل...',
  Publish: 'نشر ',
  Notify: 'أبلغ',
  notificationTypes: [
    { Value: 1, Text: 'أبلغ الجميع في الفريق' },
    { Value: 2, Text: 'إبلاغ أعضاء الفريق بالتغييرات فقط' },
    { Value: 3, Text: 'لا تخطر أحدا' },
  ],
};

// ScheduleWeekView
export const arabicScheduleWeekView = {
  Schedule: 'جدول',
  NoScheduleAvailable: 'لا يوجد جدول متاح',
  Timings: 'المواعيد',
  Warning: 'تحذير !',
  YouMustAddedWageForYourSchedule:
    'يجب عليك إضافة أجر لجدولك ، يوجد حاليًا 0 أجر',
  Error: 'خطأ',
  CannotGetWagesAtMoment:
    'لا يمكن الحصول على أجور في الوقت الحالي ، يرجى المحاولة مرة أخرى في وقت لاحق',
  Loading: 'جار التحميل...',
  ShowAvailability: 'إظهار التوفر',
  UpdateAvailability: 'توفر التحديث',
  ApplyForItem: 'قدم على البند',
  UseDateRange: 'استخدم النطاق الزمني',
  StartDate: 'تاريخ البدء *',
  SelectedDate: 'التاريخ المحدد *',
  EndDate: 'تاريخ الانتهاء *',
  SelectedDays: 'أيام مختارة *',
  Description: 'وصف',
  PleaseWait: 'Please wait...',
  UpdateSchedule: 'تحديث الجدول',
  AddSchedule: 'إضافة جدول',
  ScheduleHasBeenAdded: 'تمت إضافة الجدول الزمني',
  PleaseSelectItem: 'يرجى تحديد البند',
  SomethingWentWrong: 'هناك شئ خاطئ، يرجى المحاولة فى وقت لاحق.',
  PleaseSelectTimeMissingStarttimeEndtime:
    'يُرجى تحديد الوقت ، فاتك وقت البدء أو ربما وقت الانتهاء',
  PleaseSelectDateMissingStartdateEnddate:
    'يرجى تحديد التاريخ ، فأنت تفتقد إلى تاريخ البدء أو ربما تاريخ الانتهاء',
  PleaseSelectYourScheduleDays: 'يرجى تحديد أيام الجدول الزمني الخاص بك',
  Cancel: 'إلغاء',
};

// Time Sheet
export const arabicTimesheet = {
  Timesheet: 'ورقة التوقيت',
  Approvers: 'الموافقون',
  NoApproversAssigned: 'لم يتم تعيين جهات اعتماد',
  NoTimesheetFound: 'لم يتم العثور على جدول زمني',
  Close: 'غلق',
  Status: 'الحالة',
  TotelHrs: 'مجموع ساعات',
  Error: 'خطأ',
  Okay: 'حسنا',
  Success: 'نجاح',
};

// Time Sheet Detial
export const arabicTimeSheetDetial = {
  TimeSheetDetial: 'تفاصيل ورقة الوقت',
  Submit: 'قدم',
  AddHr: 'إضافة ساعة',
  AddCommentsHere: 'أضف التعليقات هنا',
  TotelHr: 'توتيل ساعة',
  Success: 'نجاح',
  TimeSheetHoursIsLogedSuccessfully: 'تم تسجيل ساعات الجدول الزمني بنجاح',
  Okay: 'حسنا',
  Error: 'خطأ',
  PleaseEnterSomeDataPleaseTryAgain:
    'الرجاء إدخال بعض البيانات الرجاء المحاولة مرة أخرى',
  Retry: 'أعد المحاولة',
};

// Time Off Screen
export const arabicTimeOffScreen = {
  TimeOff: 'انتهى الوقت',
  TODAY: 'اليوم',
  NoTimeOff: 'لا يوجد إجازة',
  Success: 'نجاح',
  Okay: 'حسنا',
  IncorrectTimeInterval: 'الفاصل الزمني غير صحيح',
  PleaseSelectProperTimeInterval: 'يرجى تحديد فاصل زمني مناسب',
  IncompleteFields: 'الحقول غير المكتملة',
  TryAgain: 'حاول ثانية',
  Delete: 'حذف',
  DoYouWantToDeleteTimeOffFor: 'هل تريد حذف وقت الاجازة',
  Yes: 'نعم',
  NO: 'لا',
};

// Add TimeOff For
export const arabicAddTimeOff = {
  AddTimeFor: 'أضف الوقت ل',
  Name: 'عنوان *',
  ApplyForItem: 'قدم على البند',
  Date: 'تاريخ',
  StartTime: 'وقت البدء',
  SelectStartTime: 'حدد وقت البدء *',
  EndTime: 'وقت النهاية',
  SelectEndTime: 'حدد وقت الانتهاء *',
  Description: 'وصف',
  Comment: 'تعليق',
  EnterComments: 'أدخل التعليقات.....',
  Add: 'ضم',
  Update: 'تحديث',
};

// Approvels Screen
export const arabicApprovel = {
  From: 'من عند',
  To: 'إلى',
  ItemType: 'نوع العنصر :',
  StartDate: 'تاريخ البدء :',
  EndDate: 'تاريخ الانتهاء :',
  Type: 'نوع :',
  TotelHours: 'مجموع الساعات :',
  Status: 'الحالة',
  NoApprovelsFound: 'لم يتم العثور على الموافقات',
};

// Course Contents
export const arabicCourseContent = {
  setup: 'دسيسة',
  CourseContent: 'محتوى الدورة',
  EnterUrl: 'إدخال عنوان الموقع',
  PleaseEnterYourHangoutUrl: 'يرجى إدخال عنوان url الخاص بجلسة Hangout',
  Loading: 'جار التحميل...',
  FailedToLoadData: 'فشل تحميل البيانات',
  NoMore: 'لا أكثر',
  Error: 'خطأ',
  GoToCourse: 'انتقل إلى الدورة',
  CannotGetStudentData: 'لا يمكن الحصول على بيانات الطالب',
  StudentProgress: 'تقدم الطالب',
  WhiteBoardFor: 'السبورة البيضاء لـ ،',
};

// Class Notes Screen
export const arabicNoteScreen = {
  ClassNotes: 'ملاحظات الصف',
  NoAttachmentsFound: 'لم يتم العثور على مرفقات',
  Close: 'أغلق',
  fileName: 'اسم الملف',
  viewFile: 'استعراض الملف',
  download: 'تحميل',
};

// Online Class  Screen
export const arabicOnlineClassScreen = {
  StartOnlineClass: 'بدء الفصل الدراسي عبر الإنترنت',
  EnterUrl: 'إدخال عنوان الموقع :',
  Save: 'حفظ',
  StartClass: 'أبدا الدرس',
};

//  Class detials Screen
export const arabicClassDetialScreen = {
  Details: 'تفاصيل',
  NA: 'لا يوجد',
};

//  Class Tabs Screen
export const arabicClassTabScreen = {
  NoData: 'لايوجد بيانات',
};
//  Loader Screen
export const arabicLoaderScreen = {
  Loading: 'جار التحميل .....',
};

//  Submitting Button
export const arabicSubmittingButton = {
  Submitting: 'تقديم',
};

//  Classes List Heading
export const arabicClassHeading = {
  ClassNotificationFor: 'إخطار الفئة لـ ،',
  CheckAssignedStudent: 'تحقق من الطالب المعين',
  WhiteBoardFor: 'السبورة البيضاء لـ ،',
  onlineNotesFor: 'ملاحظات على الإنترنت لـ',
  onlineClassFor: 'فصل عبر الإنترنت لـ',
};

//  Class option Menu
export const arabicClassMenu = [
  { value: 'الطلاب المعينين', AssignedStudents: 'الطلاب المعينين' },
  { value: 'إخطار الفئة', ClassNotification: 'إخطار الفئة' },
  { value: 'فصول الدورة', ClassOverview: 'نظرة عامة على الفصل '},
];

// Add or Edit Approvels
export const arabicAddorEdit = {
  EditApprovals: 'تحرير الموافقات',
  SelectedApprovals: 'الموافقات المختارة',
  AddApprovals: 'أضف الموافقات',
  SaveApprovals: 'حفظ الموافقات',
  PleaseWait: 'ارجوك انتظر',
  Failed: 'فشل',
  Success: 'نجاح',
  SomethingWentWrong: 'هناك شئ خاطئ، يرجى المحاولة فى وقت لاحق',
  ApproversHasBeenSaved: 'تم حفظ جهات الاعتماد',
};
