import React from 'react';
import { AppState, StyleSheet } from 'react-native';
import { _Text, _View } from 'components';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';
import { useSelector } from 'react-redux';

export const EmptyHome = () => {
  const UserData: any = useSelector((state: AppState) => state.User.UserInfo);
  return (
    <_View style={styles.container}>
      <_Text style={styles.welcome}>Welcome</_Text>
      <_Text style={styles.variant}>{UserData?.fullName}</_Text>
    </_View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 500,
  },
  welcome: {
    fontFamily: CommonStyles.fonts.bold,
    fontSize: 20,
    color: whiteThemeColors.greyDark,
  },
  variant: {
    fontFamily: CommonStyles.fonts.bold,
    fontSize: 25,
    color: whiteThemeColors.primary,
    marginTop: 5,
  },
  desc: {
    fontFamily: CommonStyles.fonts.medium,

    color: whiteThemeColors.greyDark,
    textAlign: 'center',
    marginTop: 10,
  },
});
