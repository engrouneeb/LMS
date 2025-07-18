import React from 'react';
import { SignInScreen } from '../Login/signIn';

const SignOut = (props: any) => {
  // Render any loading content that you like here
  return <SignInScreen navigation={props.navigation} />;
};

export default SignOut;
