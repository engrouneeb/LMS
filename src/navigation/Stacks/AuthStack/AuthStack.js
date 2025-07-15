import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ScreensNames from '../../../screenNames';
import * as Screens from '../../../screens';
import { ForgotPassword } from '../../../screens/ForgotPassword';

const Stack = createStackNavigator();
const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}
    >
      {/* <Stack.Screen component={auth} name={ScreensNames.authLoading.name} />
      {WhiteLabelConfig.APP_VARIANT_NAME != 'rakanCode' && (
        <Fragment>
          <Stack.Screen
            component={Screens.SplashScreen}
            name={ScreensNames.splashScreen.name}
          />
          <Stack.Screen
            component={Screens.SplashVideo}
            name={ScreensNames.SplashVideo.name}
          />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            component={Screens.GetStarted}
            name={ScreensNames.getStarted.name}
          />
        </Fragment>
      )} */}
      {/* <Stack.Screen
        options={{ gestureEnabled: false }}
        component={loginEnrollSelection}
        name={ScreensNames.loginEnroll.name}
      /> */}
      <Stack.Screen
        component={Screens.SignInScreen}
        name={ScreensNames.signInScreen.name}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        component={ForgotPassword}
        name={ScreensNames.forgotPassword.name}
      />
      

      {/* <Stack.Screen component={Screens.Eula} name={ScreensNames.Eula.name} />
      <Stack.Screen
        component={SecurePage}
        name={ScreensNames.SecurePage.name}
      />
      <Stack.Screen
        component={FranchiseSelection}
        name={ScreensNames.franchiseSelection.name}
      />
      <Stack.Screen
        component={FranchiseSecure}
        name={ScreensNames.franchiseSecure.name}
      />
      <Stack.Screen component={Logout} name={ScreensNames.logout.name} /> */}
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
