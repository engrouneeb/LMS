//region References
import ScreensNames from './screenNames';
import { GroupCheckIn } from './screens/CheckInOut/group';
import { IndividualCheckin } from './screens/CheckInOut';
import { Message } from './screens/CheckInOut/Message';
import { AttachmentView } from './screens/CoursePlayer';
import StudentOnlineClassesList from './screens/Dashboard/Components/StudentOnlineClassesList';
import HomeWorks from './screens/HomeworkAssignment/Homeworks';
import { Homework } from './screens/HomeWorks';
import WebView from './screens/OnlineClass';
import StudentAssessmentDetials from './screens/StudentAssessments/StudentAssessmentDetials';
const Screens = {
  webView: {
    name: ScreensNames.webView.name,
    component: WebView,
    navigationOptions: {
      headerShown: false,
      title: 'Web View',
      gestureEnabled: false,
    },
  },
  message: {
    name: ScreensNames.message.name,
    component: Message,
    navigationOptions: {
      headerShown: false,
      title: 'Message',
    },
  },
  IndividualCheckIn: {
    name: ScreensNames.IndividualCheckIn.name,
    component: IndividualCheckin,
    navigationOptions: {
      headerShown: false,
      title: 'Dashboard',
    },
  },
  GroupCheckin: {
    name: ScreensNames.GroupCheckin.name,
    component: GroupCheckIn,
    navigationOptions: {
      headerShown: false,
      title: 'Group Check-In',
    },
  },
  StudentOnlineClassesList: {
    name: ScreensNames.StudentOnlineClassesList.name,
    component: StudentOnlineClassesList,
    navigationOptions: {
      headerShown: false,
      title: 'StudentOnlineClassesList',
    },
  },
  HomeWorks: {
    name: ScreensNames.HomeWorks.name,
    component: Homework,
    // component: HomeWorks,
    navigationOptions: {
      headerShown: false,
      title: 'HomeWorks',
    },
  },
  StudentAssessmentDetials: {
    name: ScreensNames.StudentAssessmentDetials.name,
    component: StudentAssessmentDetials,
    navigationOptions: {
      headerShown: false,
      title: 'StudentAssessmentDetials',
    },
  },
  OnlineNotesAttachmentView: {
    name: 'OnlineNotesAttachmentView',
    component: AttachmentView,
  },
};

export const screenArray = Object.keys(Screens).map((key) => [Screens[key]]);
