import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerScreenNames from '../../Drawer/DrawerScreenNames';
import ScreensNames from '../../../screenNames';
import {
  ChatInterface,
  ChatUsers,
  CameraScreen,
  MsgScreen,
} from '../../../screens/Chat';
import { GroupChatInterface } from '../../../screens/GroupChat/components/GroupChatInterface';
const Stack = createStackNavigator();

const MessageStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name={DrawerScreenNames.msgScr.name}
        component={MsgScreen}
      />
      <Stack.Screen
        name={ScreensNames.chatInterface.name}
        component={ChatInterface}
      />
      <Stack.Screen name={ScreensNames.chatUsers.name} component={ChatUsers} />
      <Stack.Screen
        name={'GroupChatInterface'}
        component={GroupChatInterface}
      />
      <Stack.Screen name={ScreensNames.Camera.name} component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default MessageStack;
