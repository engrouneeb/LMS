import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {DrawerArray} from '../../DrawerScreens';
import ScreensNames from '../../screenNames';
import {NotificationsTab} from '../../screens/Notifications';
import {
  ProgressStudentList,
  SingleStudent,
  StudentAssessmentListForAdmin,
  StudentProgressReport,
} from '../../screens/Reports';
import {StudentListForAssessment} from '../../screens/StudentAssessments/StudentListForAssessment';
import SideBar from '../../screens/Sidebar';
import Logout from '../../screens/Signout';
import {StudentInfoDetials} from '../../screens/StudentInfo';
import AttendanceStack from '../Stacks/AttendanceStack/AttendanceStack';
import CourseStack from '../Stacks/CourseStack/CourseStack';
import HomeStack from '../Stacks/HomeStack/HomeStack';
import MessageStack from '../Stacks/MessageStack/MessageStack';
import ReportStack from '../Stacks/ReportStack/ReportStack';
import {Store} from '../../screens/Store';
import {KioskStack} from '../Stacks';
import StudentStack from '../Stacks/StudentStack/StudentStack';
import TimeTrackerStack from '../Stacks/TimeTrackerStack/TimeTrackerStack';
import DriveStack from '../Stacks/DriveStack/DriveStack';
import StaffInfo from '../Stacks/StaffInfoStack/StaffInfoStack';
import {StaffMenu} from '../../screens/StaffInfo';
import PaymentsStack from '../Stacks/PaymentsStack/PaymentsStack';
import {AdminPayments} from '../../screens/Payments';
import CalendarStack from '../Stacks/CalendarStack/CalendarStack';
import DrawerNames from './DrawerScreenNames';
import EnrollmentScreen from '../../screens/Enroll';
import {EnrollmentsToClass} from '../../screens/Enroll/AdminEnrollnments';
import Articles from '../../screens/Articles';
import {NewHomeWorkStack} from 'navigation/Stacks/NewHomeWorkStack';
import {StudentList} from '../../screens/HomeWorks';
import StaffInfoStack from '../Stacks/StaffInfoStack/StaffInfoStack';
const drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <drawer.Navigator
      drawerContent={props => <SideBar {...props} />}
      initialRouteName={DrawerNames.dashboard.name}
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerType: 'front',
      }}
      useLegacyImplementation={false}
      backBehavior={'none'}>
      <drawer.Screen name={DrawerNames.dashboard.name} component={HomeStack} />
      <drawer.Screen
        name={DrawerNames.coursePlayer.name}
        component={CourseStack}
        options={{unmountOnBlur: true}}
      />
      <drawer.Screen
        name={DrawerNames.drive.name}
        component={DriveStack}
        options={{unmountOnBlur: true}}
      />
      <drawer.Screen
        name={DrawerNames.StaffMenu.name}
        component={StaffInfoStack}
        options={{unmountOnBlur: true}}
      />
      <drawer.Screen
        name={DrawerNames.payments.name}
        component={PaymentsStack}
        options={{unmountOnBlur: true}}
      />
      <drawer.Screen
        name={DrawerNames.adminPayments.name}
        component={AdminPayments}
        options={{unmountOnBlur: true}}
      />
      <drawer.Screen
        component={NotificationsTab}
        name={DrawerNames.notificationsTab.name}
      />
      <drawer.Screen
        component={TimeTrackerStack}
        name={DrawerNames.timeTracker.name}
      />
      <drawer.Screen component={MessageStack} name={DrawerNames.msgScr.name} />
      <drawer.Screen
        component={ReportStack}
        name={DrawerNames.reportsTab.name}
      />
      <drawer.Screen
        component={EnrollmentScreen}
        name={DrawerNames.enrollmentScreen.name}
      />
      <drawer.Screen
        component={EnrollmentsToClass}
        name={DrawerNames.EnrollmentsToClass.name}
      />

      <drawer.Screen
        // options={{ gestureEnabled: false, unmountOnBlur: true }}
        name={DrawerNames.articles.name}
        component={Articles}
      />
      <drawer.Screen
        component={StudentStack}
        name={DrawerNames.studentTab.name}
      />
      <drawer.Screen
        name={'StudentInfoDetials'}
        component={StudentInfoDetials}
      />
      <drawer.Screen
        name={DrawerNames.attendance.name}
        component={AttendanceStack}
      />
      <drawer.Screen name={'Store'} component={Store} />
      <drawer.Screen
        options={{gestureEnabled: false}}
        name={ScreensNames.StudentProgressList.name}
        component={ProgressStudentList}
      />
      <drawer.Screen
        options={{gestureEnabled: false}}
        name={ScreensNames.StudentAssessmentList.name}
        component={StudentAssessmentListForAdmin}
      />
      <drawer.Screen
        options={{gestureEnabled: false}}
        name={ScreensNames.StudentListForAssessment.name}
        component={StudentListForAssessment}
      />
      <drawer.Screen
        options={{gestureEnabled: false}}
        name={ScreensNames.StudentProgress.name}
        component={StudentProgressReport}
      />
      <drawer.Screen
        options={{gestureEnabled: false}}
        name={ScreensNames.SingleStudentProgress.name}
        component={SingleStudent}
      />
      <drawer.Screen
        options={{gestureEnabled: false, unmountOnBlur: true}}
        name={ScreensNames.Calendar.name}
        component={CalendarStack}
      />
      <drawer.Screen
        options={{gestureEnabled: false, unmountOnBlur: true}}
        name={ScreensNames.HomeWorks.name}
        component={NewHomeWorkStack}
      />
      <drawer.Screen
        options={{gestureEnabled: true, animationEnabled: false}}
        name={ScreensNames.StudentListForHomework.name}
        component={StudentList}
      />
      <drawer.Screen
        options={{gestureEnabled: true, animationEnabled: false}}
        name={'pinCode'}
        component={KioskStack}
      />
      <drawer.Screen name={'Logout'} component={Logout} />
      {DrawerArray.map(val1 => {
        return val1.map(val => {
          return (
            <drawer.Screen
              name={val.name}
              component={val.component}
              options={val.navigationOptions}
            />
          );
        });
      })}
    </drawer.Navigator>
  );
}

export default React.memo(DrawerNavigator);
