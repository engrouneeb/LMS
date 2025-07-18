import WhiteLabelConfig from '../WhiteLabelConfig';
var BlackColor = '#000000';
var WhiteColor = '#ffffff';
var Transparent = 'transparent';
var RedColor = '#D70000';
var GreenDarkColor = '#00A72D';
var LightBlackColor = '#414042';
var theme: any = WhiteLabelConfig.COLORS;
const whiteThemeColors: any = {
  primary: theme.PRIMARY_COLOR,
  primaryDark: theme.PRIMARY_DARK,
  primaryTextColor: theme.PRIMARY_TEXT_COLOR,
  transparent: Transparent,
  black: BlackColor,
  lightBlack: LightBlackColor,
  orange: 'orange',
  cyan: theme.CYAN,
  blueLite: theme.BLUE_LITE,
  green: theme.GREEN,
  greenLite: theme.GREEN_LITE,
  greenDark: theme.GreenDarkColor,
  red: RedColor,
  purple2: theme.PURPLE2,
  purpleLite: theme.PURPLE_LITE,
  purple: theme.PURPLE,
  greyLite: theme.GREY_LITE, //FCF7F4
  greyDark: theme.GREY_DARK,
  white: WhiteColor,
  shadowColor: theme.SHADOW_COLOR,
  thumbnailBGColor: theme.THUMBNAIL_BG_COLOR,
  background: theme.BACKGROUND, //f7f7f7
  contentBg: WhiteColor,
  shadow: BlackColor,
  dashboardTopBoxBG: WhiteColor,
  modalTransparentBg: theme.MODAL_TRANSPARENT_BG,
  icons: {
    primaryIcon: theme.PRIMARY_COLOR,
    clock2Icon: theme.CLOCK2_ICON,
    clockIcon: theme.CLOCK_ICON,
    classIcon: theme.CLASS_ICON,
    purpleIcon: theme.PURPLE_ICON,
    whiteIcon: WhiteColor,
    redIcon: RedColor,
    redDarkIcon: theme.RED_DARK_ICON,
    greenDarkIcons: GreenDarkColor,
    purple2Icon: theme.PURPLE2_ICON, //same in stemBuilder
    blueIcon: theme.BLUE_ICON,
    studentOverallPointBg: theme.STUDENT_OVERALL_POINT_BG,
  },
  DashBoardCounters: {
    assignedClasses: theme.ASSIGNED_CLASSES,
    assignedClassesBg: theme.ASSIGNED_CLASSES_BG,
    coursesComplete: theme.COURSES_COMPLETE,
    coursesCompleteBg: theme.COURSES_COMPLETE_BG,
    activeStudents: theme.ACTIVE_STUDENT,
    activeStudentsBg: theme.ACTIVE_STUDENT_BG,
  },
  BarChart: {
    labelStrokeColor: WhiteColor,
  },
  QuickLinks: {
    linkOne: theme.QUICK_LINK_1,
    linkTwo: theme.QUICK_LINK_2,
    linkThree: theme.QUICK_LINK_3,
    linkFour: theme.QUICK_LINK_4,
    linkFive: theme.QUICK_LINK_5,
  },
  PieChart: {
    correct: '#84B761', // SIMILLAR IN ALL
    wrong: '#CC4748', //SIMILLAR IN ALL
    skip: '#EC737C', //SIMILLAR IN ALL
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
  attendanceIcons: {
    calendarIcon: theme.CALANDER_ICON_COLOR,
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
  assignClassIcons: {
    checkIcon: theme.PRIMARY_COLOR,
    uncheckIcon: theme.ASSIGN_CLASS_ICONS_UNCHECK_ICON,
  },
  textColor: {
    themeColorText: theme.PRIMARY_COLOR,
    primaryText: LightBlackColor, // Default text color
    darkBlackText: BlackColor,
    lightBlackText: LightBlackColor,
    whiteText: WhiteColor,
    darkGrayText: theme.GREY_DARK,
    linkText: '#2328c5',
  },
  cardColor: {
    cardGrayBorder: theme.CARD_GRAY_BORDER,
  },
  list: {
    listBg: WhiteColor,
    listBorderColor: theme.LIST_LIST_BORDER_COLOR,
  },
  chatInterface: {
    textColor: BlackColor,
    chatRight: theme.CHAT_INTERFACE_CHAT_RIGHT,
  },
  tabs: {
    tabBarBg: WhiteColor,
    tabLabelActive: theme.TAB_LABEL_ACTIVE,
    tabLabelNotActive: theme.TAB_LABEL_NOT_ACTIVE,
  },
  makeupClass: {
    inputBg: WhiteColor,
  },
  pinCode: [theme.PINCODE_FIRST, theme.PINCODE_SECOND],
  sideBar: {
    background: '#f9fafc',
  },
  timeSheet: {
    borderColor: theme.DAY_1,
  },
  BgError: {
    color: '#dc3545',
  },
  BgWarring: {
    color: '#f0ad4e',
  },
  AudioChallengeView: {
    mediaControllIconColor: '#333',
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
  farwardIcon: {
    color: theme.FARWARD_ICON_COLOR,
  },
};
const darkthemeColors = {
  primary: '#272727',
  primaryDark: '#1c1c1c',
};
export { whiteThemeColors, darkthemeColors };
