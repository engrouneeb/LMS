import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerScreenNames from '../../Drawer/DrawerScreenNames';
import { Drive, DriveStudentList, DriveHome } from '../../../screens/Drive';
import deviceInfoModule from 'react-native-device-info';
const Stack = createStackNavigator();

const DriveStack = ({ route }) => {
  const {header,goBackScreen}=route?.params;
  
  return (
    <Stack.Navigator
      initialRouteName={DrawerScreenNames.driveHome.name}
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
      <Stack.Screen name={DrawerScreenNames.drive.name} component={Drive} initialParams={{ header: header,goBackScreen:goBackScreen }} />
      <Stack.Screen
        name={DrawerScreenNames.drivestudentlist.name}
        component={DriveStudentList}
        initialParams={{ header: header,goBackScreen:goBackScreen }}
      />
      <Stack.Screen
        name={DrawerScreenNames.driveHome.name}
        component={DriveHome}
        initialParams={{ header: header,goBackScreen:goBackScreen }}
      />
    </Stack.Navigator>
  );
};

export default DriveStack;
