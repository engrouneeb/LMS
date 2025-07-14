import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import deviceInfoModule from 'react-native-device-info';
import ScreensNames from '../../../screenNames';
import { Homework, SubmitChallenge } from '../../../screens/CoursePlayer';
const Stack = createStackNavigator();

const HomeWorkStack = (props) => {
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
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ScreensNames.submitChallenge.name}
        component={SubmitChallenge}
      />
    </Stack.Navigator>
  );
};

export default HomeWorkStack;
