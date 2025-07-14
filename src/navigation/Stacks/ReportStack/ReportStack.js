import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerScreenNames from '../../Drawer/DrawerScreenNames';
import ScreensNames from '../../../screenNames';
import {
  Reports,
  StudentAssessmentListForStudent,
  StudentAssessmentReport,
  ProgressStudentList,
  StudentAssessmentListForAdmin,
  StudentProgressReport,
  SingleStudent,
  SystemReports,
} from '../../../screens/Reports';
const Stack = createStackNavigator();

const ReportStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={DrawerScreenNames.reportsTab.name}
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name={DrawerScreenNames.reportsTab.name}
        component={Reports}
      />
      <Stack.Screen
        name={ScreensNames.SingleStudentAssessmentList.name}
        component={StudentAssessmentListForStudent}
      />
      <Stack.Screen
        name={ScreensNames.StudentAssessment.name}
        component={StudentAssessmentReport}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ScreensNames.StudentProgressList.name}
        component={ProgressStudentList}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ScreensNames.StudentAssessmentList.name}
        component={StudentAssessmentListForAdmin}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ScreensNames.StudentProgress.name}
        component={StudentProgressReport}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ScreensNames.SingleStudentProgress.name}
        component={SingleStudent}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ScreensNames.SystemReports.name}
        component={SystemReports}
      />
    </Stack.Navigator>
  );
};

export default ReportStack;
