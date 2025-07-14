import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerScreenNames from '../../Drawer/DrawerScreenNames';
import {
  Payments,
  AdminPayments,
  Transactions,
} from '../../../screens/Payments';
import ScreensNames from '../../../screenNames';
import { AddPaymentMethod } from '../../../screens/StudentInfo';
const Stack = createStackNavigator();

const PaymentsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={DrawerScreenNames.adminPayments.name}
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name={DrawerScreenNames.payments.name}
        component={Payments}
      />
      <Stack.Screen
        name={DrawerScreenNames.adminPayments.name}
        component={AdminPayments}
      />
      <Stack.Screen
        name={DrawerScreenNames.transactions.name}
        component={Transactions}
      />
      <Stack.Screen
        name={ScreensNames.addPaymentMethod.name}
        component={AddPaymentMethod}
      />
    </Stack.Navigator>
  );
};

export default PaymentsStack;
