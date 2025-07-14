import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerNames from '../../Drawer/DrawerScreenNames';
import { CalendarScreen } from '../../../screens/Calendar';
import {ClassRoster} from "../../../screens/CoursePlayer/ClassRoster"

const Stack = createStackNavigator();

const CalenderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={DrawerNames.coursePlayer.name}
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}
    >
      <Stack.Screen
        component={CalendarScreen}
        name={DrawerNames.Calendar.name}
      />
        <Stack.Screen
        name="ClassRoster"
        component={ClassRoster}
      />
    </Stack.Navigator>
  );
};

export default CalenderStack;
