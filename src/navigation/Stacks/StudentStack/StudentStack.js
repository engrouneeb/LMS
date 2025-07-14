import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ScreensNames from '../../../screenNames';
import {
    AddPaymentMethod,
    AddToClass, StudentInfo, StudentInfoDetials
} from '../../../screens/StudentInfo';
import DrawerScreenNames from '../../Drawer/DrawerScreenNames';
const Stack = createStackNavigator();

const StudentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
        gestureEnabled: false,
      }}
    >
       <Stack.Screen
        name={DrawerScreenNames.studentTab.name}
        component={StudentInfo}
      />
      <Stack.Screen
        name={ScreensNames.StudentInfoDetials.name}
        component={StudentInfoDetials}
      />
      <Stack.Screen name={ScreensNames.addPaymentMethod.name} component={AddPaymentMethod} />
      <Stack.Screen name={ScreensNames.addToClass.name} component={AddToClass} />
    </Stack.Navigator>
  );
};

export default StudentStack;
