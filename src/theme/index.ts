import WhiteLabelConfig from '../WhiteLabelConfig';
var BlackColor = '#000000';
var WhiteColor = '#ffffff';
var Transparent = 'transparent';
var RedColor = '#D70000';
var GreenDarkColor = '#00A72D';
var AttandenceUnCheckIcon = '#ccc5c5';
var LightBlackColor = '#414042';
var theme: any = WhiteLabelConfig.COLORS;
export const whiteThemeColors = {
  primary: theme.PRIMARY_COLOR,
  primaryDark: theme.PRIMARY_DARK,
  primaryTextColor: theme.PRIMARY_TEXT_COLOR,
  transparent: Transparent,
  black: BlackColor,
  lightBlack: LightBlackColor,
  orange: 'orange',
  cyan: theme.CYAN,
  blue: theme.BLUE_ICON,
  blueLite: theme.BLUE_LITE,
  green: theme.GREEN,
  greenLite: theme.GREEN_LITE,
  greenDark: GreenDarkColor,
  red: RedColor,
  redDark: theme.RED_DARK,
  purple2: theme.PURPLE2,
  purpleLite: theme.PURPLE_LITE,
  purple: theme.PURPLE,
  pinkLite: theme.F500E9,
  title: theme.TITLE,
  greyLite: theme.GREY_LITE, //FCF7F4
  greyDark: theme.GREY_DARK,
  white: WhiteColor,
  success: theme.GREEN,
  shadowColor: theme.SHADOW_COLOR,
  THUMBNAIL_BG_COLOR: theme.THUMBNAIL_BG_COLOR,
  background: theme.BACKGROUND, //f7f7f7
  contentBg: WhiteColor,
  shadow: BlackColor,
  dashboardTopBoxBG: WhiteColor,
  gradientFirstColor: theme.PRIMARY_DARK,
  studentOverallPointBg: theme.STUDENT_OVERALL_POINT_BG,
  icons: {
    primaryIcon: theme.PRIMARY_COLOR,
    scheduleIcon: theme.SCHEDULE_ICON,
    clock2Icon: theme.CLOCK2_ICON,
    clockIcon: theme.CLOCK_ICON,
    wageIcon: theme.WAGE_ICON,
    approvalsIcon: theme.APPROVELS_ICON,
    setupIcon: theme.SETUP_ICON,
    classIcon: theme.CLASS_ICON,
    calenderIcon: theme.CALENDER_ICON,
    purpleIcon: theme.PURPLE_ICON,
    whiteIcon: WhiteColor,
    redIcon: RedColor,
    pinkLiteIcon: theme.PINK_LITE_ICON,
    redDarkIcon: theme.RED_DARK_ICON,
    greenDarkIcons: GreenDarkColor,
    purple2Icon: theme.PURPLE2_ICON, //same in stemBuilder
    blueIcon: theme.BLUE_ICON,
    selectedIcon: theme.SELECTED_ICON,
    unselectedIcon: theme.UNSLECTED_ICON,
    todayTextColor: theme.TODAY_TEXT_COLOR,
    disableTextArrowColor: theme.DISABLE_TEXT_ARROW_COLOR,
    dayTextColor: theme.DAY_TEXT_COLOR,
  },
  DashBoardCounters: {
    assignedClasses: theme.ASSIGNED_CLASSES,
    assignedClassesBg: theme.ASSIGNED_CLASSES_BG,
    coursesComplete: theme.COURSES_COMPLETE,
    coursesCompleteBg: theme.COURSES_COMPLETE_BG,
    activeStudents: theme.ACTIVE_STUDENT,
    activeStudentsBg: theme.ACTIVE_STUDENT_BG,
  },
  LineChart: {
    backgroundColor: theme.PRIMARY_COLOR,
    backgroundLinesStrokeColor: WhiteColor,
    lineColor: theme.LINE_COLOR,
    backgroundGradientFromColor: theme.PRIMARY_COLOR,
    backgroundGradientToColor: theme.PRIMARY_COLOR,
    labelStrokeColor: WhiteColor,
    barColor: theme.BAR_COLOR,
    progressBarColor: theme.PROGRESS_BAR_COLOR,
  },
  BarChart: {
    fillShadowGradientColor: WhiteColor,
    backgroundColor: theme.PRIMARY_COLOR,
    backgroundGradientFromColor: theme.PRIMARY_COLOR,
    backgroundGradientToColor: theme.PRIMARY_COLOR,
    labelStrokeColor: WhiteColor,
    barColor: 'rgba(255, 255, 255, 1)',
    progressBarColor: theme.PROGRESS_BAR_COLOR,
  },
  PieChart: {
    correct: '#84B761', // SIMILLAR IN ALL
    wrong: '#CC4748', //SIMILLAR IN ALL
    skip: '#EC737C', //SIMILLAR IN ALL
  },
  Calender: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  calenderDayColors: {
    day1: theme.DAY_1,
    day2: theme.DAY_2,
    day3: theme.DAY_3,
    day4: theme.DAY_4,
    day5: theme.DAY_5,
    day6: theme.DAY_6,
    day7: theme.DAY_7,
    default: theme.DAY_1,
  },
  msgScreenIcons: {
    contactIcon: theme.CONTACT_ICON,
    staffIcon: theme.STAFF_ICON,
    studentIcon: theme.STUDENT_ICON,
    franchiseIcon: theme.FRANCHISE_ICON,
    adminDiscIcon: theme.ADMIN_ICON,
    instructorDiscIcon: theme.INSTRUCTOR_ICON,
  },
  attendanceIcons: {
    calendarIcon: theme.CALANDER_ICON_COLOR,
    checkIcon: theme.CHECK_ICON,
    unCheckIcon: AttandenceUnCheckIcon,
  },
  makeupClassIcons: {
    calendarIcon: theme.CALANDER_ICON_COLOR,
    clockIcon: theme.CALANDER_ICON_COLOR,
  },
  notificationIcons: {
    courseCompleteIcon: theme.PRIMARY_COLOR,
    challengeCompletionIcon: theme.PRIMARY_COLOR,
    levelCompletionIcon: theme.PRIMARY_COLOR,
    markAttendanceIcon: theme.PRIMARY_COLOR,
    defaultIcon: theme.PRIMARY_COLOR,
  },
  wageInstructorIcon: {
    background: theme.WAGE_INSTRUCTOR_ICON_BACKGROUND,
    icon: WhiteColor,
    right: WhiteColor,
  },
  scheduleWeekIcon: [
    theme.DAY_1,
    theme.DAY_2,
    theme.DAY_3,
    theme.DAY_4,
    theme.DAY_5,
    theme.DAY_6,
    theme.DAY_7,
  ],
  scheduleUserListIcons: {
    background: theme.SCHEDULE_USERLIST_ICON_BACKGROUND,
  },
  timeOffInstructorListThumnail: {
    background: theme.TIME_OFF_INSTRUCTOR_LIST_THUMNAIL_BACKGROUND,
  },
  approvalsIcons: {
    checkIcon: theme.APPROVALS_ICONS_CHECK_ICON,
    uncheckIcon: AttandenceUnCheckIcon,
  },
  assignClassIcons: {
    background: theme.THUMBNAIL_BG_COLOR,
    checkIcon: theme.PRIMARY_COLOR,
    uncheckIcon: theme.ASSIGN_CLASS_ICONS_UNCHECK_ICON,
  },
  txtColor: {
    note: '#a7a7a7',
    themeColorText: theme.PRIMARY_COLOR,
    primaryText: LightBlackColor, // Default text color
    darkBlackText: BlackColor,
    lightBlackText: LightBlackColor,
    whiteText: WhiteColor,
    yellowText: 'yellow',
    grayText: theme.GREY_LITE,
    darkGrayText: theme.GREY_DARK,
    linkText: '#2328c5',
    redText: RedColor,
    purpleText: '',
  },
  cardColor: {
    cardDefaultBg: WhiteColor,
    cardBorderColor: theme.CARD_BORDER_COLOR,
    cardGrayBorder: theme.CARD_GRAY_BORDER,
  },
  listItem: {
    listBg: Transparent,
    listBorderColor: theme.LISTITEM_LIST_BORDER_COLOR,
    listDividerBg: theme.LISTITEM_LIST_DIVIDER_BG,
    listBtnUnderlayColor: theme.LISTITEM_LIST_BTN_UNDER_LAY_COLOR,
    listNoteColor: theme.LISTITEM_LIST_NOTE_COLOR,
    listItemSelected: theme.LISTITEM_LIST_ITEM_SELECTED,
  },
  list: {
    listBg: WhiteColor,
    listBorderColor: theme.LIST_LIST_BORDER_COLOR,
  },
  chatInterface: {
    backgroundColor: '',
    borderColor: theme.CHAT_INTERFACE_BORDER_COLOR,
    iconColo: theme.CHAT_INTERFACE_ICON_COLOR,
    textColor: BlackColor,
    chatLeft: theme.CHAT_INTERFACE_CHAT_LEFT,
    chatRight: theme.CHAT_INTERFACE_CHAT_RIGHT,
  },
  tabs: {
    tabBarBg: WhiteColor,
    tabLabel: BlackColor,
    tabLabelActive: theme.TAB_LABEL_ACTIVE,
    tabLabelNotActive: theme.TAB_LABEL_NOT_ACTIVE,
  },
  makeupClass: {
    inputBorder: BlackColor,
    inputBg: WhiteColor,
  },
  pinCode: [theme.PINCODE_FIRST, theme.PINCODE_SECOND], // reh rahy hy
  modalTransparentBg: theme.MODAL_TRANSPARENT_BG,
  downloads: {
    downloadIconcolor: theme.DOWNLOAD_ICON_COLOR,
  },
  sideBar: {
    badgeBackground: '#ec3143',
    background: '#f9fafc',
  },
  timeSheet: {
    borderColor: theme.DAY_1,
  },
  BgError: {
    color: '#dc3545', // SIMILLAR
  },
  BgWarring: {
    color: '#ffc107', // SIMILLAR
  },
  AudioChallengeView: {
    mediaControllIconColor: '#333', // SIMILLAR
  },
  NavigationDrawer: {
    Home: theme.NAVIGATION_DRAWER_HOME,
    Courses: theme.NAVIGATION_DRAWER_COURSES,
    Messages: theme.NAVIGATION_DRAWER_MESSAGES,
    Attendance: theme.NAVIGATION_DRAWER_ATTENDANCE,
    Kiosk: theme.NAVIGATION_DRAWER_KIOSK,
    Notifications: theme.NAVIGATION_DRAWER_NOTIFICATION,
    Articles: theme.NAVIGATION_DRAWER_ARTICLES,
    Reports: theme.NAVIGATION_DRAWER_REPORTS,
    TimeTracker: theme.NAVIGATION_DRAWER_TIME_TRACKER,
    Logout: theme.NAVIGATION_DRAWER_LOGOUT,
  },
  uploadAttachment: {
    uploadbtn: theme.UPLOAD_BTN,
  },
  farwardIcon: {
    color: theme.FARWARD_ICON_COLOR,
  },
};
