import { combineReducers } from 'redux';
import chatReducer from './chat';
import userReducer from './user';
import AttendenceReducer from './attendence';
import TimeTrackerReducer from './timetracker';
import MessageRuducer from './messages';
import classReducer from './class';
import ScheduleReducer from './scheduleReducer';
import SetupReducer from './setupReducer';
import StudentInfoReducer from './studentInfoReducer';
import AdminScheduleReducer from './adminScheduleReducer';
import CoverUserReducer from './CoverUserReducer';
import CoursePlayerContentReducer from './CoursePlayerContentReducer';
import CourseDetailReducer from './CourseDetailReducer';
import CourseDownloadReducer from './CourseDownloadReducer';
import CP_StudentReducer from './CP_StudentReducer';
import MS_StudentAnalyticsReducer from './ms_db_studentsAnalyticsReducer';
import MS_StudentEnrolledReducer from './ms_db_studentsEnrolledReducer';
import CourseAssignStudentsReducer from './CourseAssignStudentsReducer';
import LanguageReducer from './LanguageReducer';
import MS_AdminWagesReducer from './ms_AdminWagesReducer';
import HtmlStepReducer from './HtmlStepReducer';
import AnnouncementsReducer from './announcementReducer';
import AssignCoursesReducer from './assignCoursesReducer';
import HomeworkReducer from './homeworkReducer';
import CustomAlertReducer from './CustomAlertReducer';
import TimeOffInstructorReducer from './timeOffInstructorReducer';
import ModulePagesPermissions from './ModulePagesPermissionsReducer';
import { tabReducer } from '../screens/Store/StoreHome/helper';
import { timerReducer } from './timerReducer';
import { AppModulePermission} from "./appModulePermissionReducer"
import {web_authReducer} from "./webAuthReducer"
export interface rootInterface {
  readonly token?: {};
  readonly loading: boolean;
  readonly logoutLoading: boolean;
  readonly error: null;
  data?: any;
  Students?: any;
  readonly UserData?: {};
  readonly Message?: {};
  readonly NotificationCount: { Count: 0 };
  readonly MessagesCount: { Count: 0 };
  readonly Notification?: any;
  readonly isGetStarted: boolean;
  readonly ForgetType?: '';
  readonly CmpConfigs?: {};
  readonly Proxy?: {};
  readonly ConnectionID?: string | number;
  readonly CheckInSuccess?: {};
  readonly ChatRoomUsers?: {};
  readonly ChatContactUsers?: any;
  readonly ChatFranchiseUsers?: any;
  readonly ChatStaffUsers?: any;
  readonly AttendenceDetial?: {};
  readonly AttendenceStudentList?: any;
  readonly currentFocus?: string;
  readonly chatFor?: string;
  readonly timeOffInstructorId?: string | number;
  readonly updatedTimeOff: boolean;
  readonly socketId?: string | number;
  readonly socketIO?: any;
  readonly CountNotifications?: number;
  readonly AttachmentNavigateScreen: string;
  readonly fileFormate?: string;
  readonly fileUrl?: string;
  readonly checkInList?: [];
  readonly courseClassescheckInList?: [];
  readonly isCheckedIn?: boolean;
  readonly selectedCheckinMethod?: "PinCode"|"QRCode";
}
const INITIAL_STATE: rootInterface = {
  token: {},
  loading: false,
  logoutLoading: false,
  error: null,
  data: {},
  Students: [],
  UserData: {},
  Message: {},
  NotificationCount: { Count: 0 },
  MessagesCount: { Count: 0 },
  Notification: [],
  isGetStarted: false,
  ForgetType: '',
  CmpConfigs: {},
  Proxy: {},
  ConnectionID: '',
  CheckInSuccess: {},
  ChatRoomUsers: {},
  ChatContactUsers: [],
  ChatFranchiseUsers: [],
  ChatStaffUsers: [],
  AttendenceDetial: {},
  AttendenceStudentList: [],
  currentFocus: '',
  chatFor: '',
  timeOffInstructorId: '',
  updatedTimeOff: false,
  socketId: undefined,
  socketIO: null,
  CountNotifications: 0,
  AttachmentNavigateScreen: '',
  fileFormate: '',
  fileUrl: '',
  checkInList: [],
  courseClassescheckInList: [],
  selectedCheckinMethod:"PinCode"
};
export const rootReducer = (
  state: rootInterface = INITIAL_STATE,
  action: any,
): rootInterface => {
  switch (action.type) {
    case 'SET_SOCKET_ID':
      return { ...state, socketId: action.socketId };
    case 'SETUP_SOCKET_IO':
      return { ...state, socketIO: action.socketIO };
    case 'SET_CURRENT_FOCUS':
      return { ...state, currentFocus: action.currentFocus };
    // case 'File_FORMATE':
    //   return { ...state, fileFormate: action.fileFormate };
    // case 'File_URL':
    //   return { ...state, fileUrl: action.fileUrl };
    case 'SET_CHAT_FOR':
      return { ...state, chatFor: action.chatFor };
    case 'SET_TIMEOFF_INSTRUCTOR':
      return { ...state, timeOffInstructorId: action.timeOffInstructorId };
    case 'UPDATE_TIMEOFF':
      return { ...state, updatedTimeOff: action.updatedTimeOff };
    case 'GET_TOKEN':
      return { ...state, token: action.token };
    case 'GET_STARTED':
      return { ...state, isGetStarted: action.isStarted };
    case 'GET_FORGET_TYPE':
      return { ...state, ForgetType: action.typeName };
    case 'SAVE_TOKEN':
      return { ...state, token: action.token };
    case 'REMOVE_TOKEN':
      return { ...state, token: action.token };
    case 'LOADING':
      return { ...state, loading: action.isLoading };
    case 'SUCCESS':
      return { ...state, data: action.data };
    case 'ERROR':
      return { ...state, error: action.error };
    case 'MESSAGE':
      return { ...state, Message: action.Msg };
    case 'PROXY':
      return { ...state, Proxy: action.proxy };
    case 'CONNECTIONID':
      return { ...state, ConnectionID: action.connID };
    case 'LOGOUT_LOADING':
      return { ...state, logoutLoading: action.logout };
    case 'ATTACHMENT_NAVIGATE_SCREEN':
      return { ...state, AttachmentNavigateScreen: action.screenName };
    case 'GET_DATA':
      var CourseStu = {
        ClassName: action?.response.className,
        ClassID: action?.response?.classId,
        CourseID: action?.response.courseId,
        Students: action?.response.students ?? [],
        // GroupCheckedIn: action.user.GroupCheckedIn,
      };

      return {
        ...state,
        Students: CourseStu,
      };
    case 'IND_CHECKIN':
      var StuData: any = state.Students;
      StuData.Students[action.StudentIndex].IsCheck = action.isCheckedIn;
      state.Students = StuData;
      return {
        ...state,
        Students: StuData,
      };
    case 'Group_CHECKIN':
      var StuData = state.Students.Students.map((Obj: any) => {
        Obj.IsCheck = action.isCheckedIn;
        return Obj;
      });
      state.Students.Students = StuData;

      return {
        ...state,
        Students: state.Students,
      };
    case 'CMP_CONFIGS':
      return {
        ...state,
        CmpConfigs: action.CmpConfigs,
      };
    case 'SAVE_CHECKIN_LIST':
      return {
        ...state,
        checkInList: action.data,
      };
    case 'SAVE_COURSES_LIST':
      return {
        ...state,
        courseClassescheckInList: action.data,
      };
    case 'SAVE_CURRENT_CHECKIN_METHOD':
      return {
        ...state,
        selectedCheckinMethod: action.data,
      };

    case 'CHAT_CONTACT':
      return {
        ...state,
        ChatRoomUsers: action.ChatRoomUsers,
      };
    case 'UPDATE_CHAT_CONTACT':
      var PresentStudentUser: any = state.ChatRoomUsers;
      PresentStudentUser.push(action.ChatRoomUsers);

      return {
        ...state,
        ChatRoomUsers: PresentStudentUser,
      };

    case 'RESET':
      return {
        ...state,
        token: {},
        loading: false,
        error: null,
        data: {},
        Students: [],
        UserData: {},
        Message: {},
      };
    case 'CHECKIN_SUCCESS':
      return { ...state, CheckInSuccess: action.data };
    case 'ATTENDENCE_DETAILS':
      return { ...state, AttendenceDetial: action.data };
    case 'SAVE_NOTIFICATIONS':
      return { ...state, Notification: action.data };
    case 'SAVE_NOTIFICATIONS_COUNT':
      return Object.assign({}, state.NotificationCount, {
        Count: state.NotificationCount.Count + 1,
      });
    case 'CLEAR_NOTIFICATIONS_COUNT':
      return Object.assign({}, state, { CountNotifications: action.data });
    case 'Clas_Student_CheckIn_success':
      var teampArrayClass = state.data.students;
      let interestedItemIndex = teampArrayClass.findIndex(
        (z: any) => z.userId == action.studentId,
      );
      if (interestedItemIndex > -1) {
        let studentDetails = teampArrayClass[interestedItemIndex];
        studentDetails.isCheckedIn = action.isCheckIn;
        state.data.students[interestedItemIndex] = studentDetails;
      }
      return { ...state, Students: state.Students };
    default:
      return state;
  }
};

const appReducer = combineReducers({
  token: rootReducer,
  chat: chatReducer,
  attendence: AttendenceReducer,
  timetracker: TimeTrackerReducer,
  User: userReducer,
  class: classReducer,
  messages: MessageRuducer,
  setupReducer: SetupReducer,
  StudentInfoReducer: StudentInfoReducer,
  scheduleReducer: ScheduleReducer,
  adminScheduleReducer: AdminScheduleReducer,
  coverUserReducer: CoverUserReducer,
  coursePlayerContentReducer: CoursePlayerContentReducer,
  courseDetailReducer: CourseDetailReducer,
  courseDownloadReducer: CourseDownloadReducer,
  cpStudentReducer: CP_StudentReducer,
  msStudentAnalyticsReducer: MS_StudentAnalyticsReducer,
  msStudentEnrolledReducer: MS_StudentEnrolledReducer,
  courseAssignStudentsReducer: CourseAssignStudentsReducer,
  language: LanguageReducer,
  msAdminWagesReducer: MS_AdminWagesReducer,
  timeOffInstructorReducer: TimeOffInstructorReducer,
  htmlStepReducer: HtmlStepReducer,
  AnnouncementsReducer: AnnouncementsReducer,
  assignCoursesReducer: AssignCoursesReducer,
  HomeworkReducer: HomeworkReducer,
  CustomAlert: CustomAlertReducer,
  ModulePagesPermissions: ModulePagesPermissions,
  tabReducer: tabReducer,
  timerReducer: timerReducer,
  AppModulePermission:AppModulePermission,
  WebAuthReducer:web_authReducer
});

const mainReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
export default mainReducer;
