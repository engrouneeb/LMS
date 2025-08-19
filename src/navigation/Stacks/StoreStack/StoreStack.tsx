import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { AttachmentView } from '../../../screens';
import { RoutesRecord } from '../../models';
import * as screens from '../../../screens';

export const StoreStack: FC = () => {
  const Stack = createNativeStackNavigator<RoutesRecord>();
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}
    >
      <Stack.Screen name={'Store'} component={screens.Store} />
        </Stack.Navigator>
  );
};
