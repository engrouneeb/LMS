import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ScreensNames from '../../../screenNames';
import {
  AttendanceClassTimings,
  AttendanceHomeScreen,
  AttendanceViewByClass,
  MakeUpClass,
  MarkClassAttendance,
} from '../../../screens/Attendance';
import DrawerScreenNames from '../../Drawer/DrawerScreenNames';
import { CancelledClassTimings } from 'screens/Attendance/CancelledClassTimings/CancelledClassTimings';

const Stack = createStackNavigator();

const AttendanceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name={DrawerScreenNames.attendance.name}
        component={AttendanceHomeScreen}
      />
      <Stack.Screen
        name={ScreensNames.attendanceClassTimings.name}
        component={AttendanceClassTimings}
      />
      <Stack.Screen
        name={ScreensNames.cancelledClassTimings.name}
        component={CancelledClassTimings}
      />
      <Stack.Screen
        name={ScreensNames.attendanceViewByClass.name}
        component={AttendanceViewByClass}
      />
      <Stack.Screen
        name={ScreensNames.markClassAttendance.name}
        component={MarkClassAttendance}
      />
      <Stack.Screen
        name={ScreensNames.addMakeupClass.name}
        component={MakeUpClass}
      />
    </Stack.Navigator>
  );
};

export default AttendanceStack;
