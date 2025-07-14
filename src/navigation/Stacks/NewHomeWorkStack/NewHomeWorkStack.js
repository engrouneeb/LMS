import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import deviceInfoModule from 'react-native-device-info';
import ScreensNames from '../../../screenNames';
import {
  Homework,
  StudentList,
  SubmittHomeWork,
} from '../../../screens/HomeWorks';
import { NewSubmittHomeWork } from '../../../screens/HomeWorks/SubmittHomeWork';
import { ProgressStudentList } from '../../../screens/Reports';
const Stack = createStackNavigator();

export const NewHomeWorkStack = ({ route }) => {
  // const { isStudent } = route.params;
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
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ScreensNames.homeWork.name}
        component={Homework}
        initialParams={{ ...route.params }}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={'SubmitHomeWork'}
        component={SubmittHomeWork}
      />
    </Stack.Navigator>
  );
};
