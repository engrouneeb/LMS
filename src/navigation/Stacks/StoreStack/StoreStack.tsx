import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { AttachmentView } from '../../../screens';
import { RoutesRecord } from '../../models';
import * as screens from 'screens';

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
      <Stack.Screen
        name={'store-add-new-item'}
        component={screens.AddNewItem}
      />
      <Stack.Screen name={'shipment-screen'} component={screens.Shipment} />
      <Stack.Screen name={'store-home-screen'} component={screens.StoreHome} />
      <Stack.Screen
        name={'store-transaction-screen'}
        component={screens.Transactions}
      />
      <Stack.Screen
        component={AttachmentView}
        name={'OnlineNotesAttachmentView'}
      />
      <Stack.Screen
        component={screens.AddRedeemCode}
        name={'add-redeem-code-screen'}
      />
    </Stack.Navigator>
  );
};
