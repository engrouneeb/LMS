import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  CoursesClassesList,
  CheckinOutCoursesList,
  PinCodeScreen,
  GroupCheckIn,
  IndividualCheckin,
  Message,
} from '../../../../src/screens/pincode';
import ScreensNames from '../../../screenNames';
import deviceInfoModule from 'react-native-device-info';
import { CheckinOutHistory } from 'screens/pincode/CheckinOutCoursesList/CheckinOutHistory';
const Stack = createStackNavigator();

export const KioskStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Kiosk'}
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
        gestureEnabled: false,
        animationEnabled:
          Platform.OS == 'android' &&
          parseInt(deviceInfoModule.getSystemVersion()) > 9
            ? false
            : true,
      }}
    >
      <Stack.Screen name={'Kiosk'} component={PinCodeScreen} />
      <Stack.Screen
        name={'CoursesClassesList'}
        component={CoursesClassesList}
      />

      <Stack.Screen
        name={'CheckinOutCoursesList'}
        component={CheckinOutCoursesList}
      />
      <Stack.Screen
        name={ScreensNames.GroupCheckin.name}
        component={GroupCheckIn}
      />
      <Stack.Screen
        name={ScreensNames.IndividualCheckIn.name}
        component={IndividualCheckin}
      />
      <Stack.Screen
        name={ScreensNames.CheckInOutHistory.name}
        component={CheckinOutHistory}
      />
      <Stack.Screen name={ScreensNames.message.name} component={Message} />
    </Stack.Navigator>
  );
};
