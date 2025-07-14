import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerNames from '../../Drawer/DrawerScreenNames';
import { Dashboard ,PendingPayments,StudentKioskPins} from '../../../screens/Dashboard';
import {AddBillings,BillingInfo} from "../../../screens/Billings";
import {Programs} from "../../../screens/Programs"
import {
  AttachmentView,
  AudioChallenge,
  VideoPlayer,
} from '../../../screens/CoursePlayer';
import {SocailLogin} from "../../../screens/SocailLogin"
import deviceInfoModule from 'react-native-device-info';
import ScreensNames from '../../../screenNames';
const Stack = createStackNavigator();

const HomeStack = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
        animationEnabled:
          Platform.OS == 'android' &&
          parseInt(deviceInfoModule.getSystemVersion()) > 9
            ? false
            : true,
      }}
    >
      <Stack.Screen component={Dashboard} name={DrawerNames.dashboard.name} />
      <Stack.Screen
        component={VideoPlayer}
        name={ScreensNames.videoPlayer.name}
      />
      <Stack.Screen
        component={AudioChallenge}
        name={ScreensNames.audioChallenge.name}
      />
      <Stack.Screen
        component={AttachmentView}
        name={'OnlineNotesAttachmentView'}
      />
      <Stack.Screen
        component={AddBillings}
        name={'AddBillings'}
      />
      <Stack.Screen
        component={BillingInfo}
        name={'BillingInfo'}
      />
      <Stack.Screen
        component={PendingPayments}
        name={'Pending Payments'}
      />
      <Stack.Screen
        component={Programs}
        name={'Programs'}
      />
      <Stack.Screen
        component={SocailLogin}
        name={'SocailLogin'}
      />
      <Stack.Screen
        component={StudentKioskPins}
        name={DrawerNames.StudentKioskPins.name}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
