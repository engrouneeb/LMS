import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ClassRosterStackParamList } from './ClassRosterStack.types';
import { ClassRoster, CourseClass } from '../../../screens/CoursePlayer/ClassRoster';
import deviceInfoModule from 'react-native-device-info';
import { Platform } from 'react-native';

const RosterStack = createStackNavigator<ClassRosterStackParamList>();

export const ClassRosterStack: FC = () => {
  const user = { id: '12345' }; // Replace this with actual user data
  
  return (
    <RosterStack.Navigator  screenOptions={{
      animationTypeForReplace: 'pop',
      headerShown: false,
      animationEnabled:
        Platform.OS == 'android' &&
        parseInt(deviceInfoModule.getSystemVersion()) > 9
          ? false
          : true,
    }} initialRouteName="CourseClass">
      <RosterStack.Screen name="CourseClass" component={CourseClass} />
      <RosterStack.Screen
        name="ClassRoster"
        component={ClassRoster}
        initialParams={{ classId: user.id }} // Pass the parameter here
      />
    </RosterStack.Navigator>
  );
};
