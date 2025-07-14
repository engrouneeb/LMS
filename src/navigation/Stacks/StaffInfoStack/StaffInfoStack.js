import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerScreenNames from '../../Drawer/DrawerScreenNames';
import {
  StaffMenu,
  StaffInfo,
  StaffDetails,
  StaffList,
  ClassOverview,
} from '../../../screens/StaffInfo';
import deviceInfoModule from 'react-native-device-info';
import { Dashboard } from '../../../screens/Dashboard';
const Stack = createStackNavigator();

const StaffInfoStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={DrawerScreenNames.StaffMenu.name}
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
      <Stack.Screen
        name={DrawerScreenNames.StaffMenu.name}
        component={StaffMenu}
      />
      <Stack.Screen
        name={DrawerScreenNames.StaffInfo.name}
        component={StaffInfo}
      />
      <Stack.Screen
        name={DrawerScreenNames.StaffList.name}
        component={StaffList}
      />
      <Stack.Screen
        name={DrawerScreenNames.StaffDetails.name}
        component={StaffDetails}
      />
      <Stack.Screen
        name={DrawerScreenNames.ClassOverview.name}
        component={ClassOverview}
      />
      <Stack.Screen
        name={DrawerScreenNames.ClassOverviewEdit.name}
        component={StaffDetails}
      />
    </Stack.Navigator>
  );
};

export default StaffInfoStack;
