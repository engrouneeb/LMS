import React, { useEffect } from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LoadLogoImage, whiteThemeColors } from '../../Utilities';
import WhiteLabelConfig from '../../WhiteLabelConfig';
import { _Button, _Text, _View } from '../../components';
import { hp } from '../../Helpers/Responsiveness';
import ScreensNames from '../../screenNames';

interface props {
  navigation: any;
}
const LoginEnroll: React.FC<props> = ({ navigation }) => {
  const handlePress = (screenName: any) => {
    navigation.navigate(screenName);
  };
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );
    return () => {
      subscription.remove();
    };
  }, []);
  const handleBack = () => {
    BackHandler.exitApp();
    return true;
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <_View style={styles.centerView}>
          <LoadLogoImage showLogo={false} />
          <_Text style={styles.AppName}>{WhiteLabelConfig.APP_NAME}</_Text>
          <_View style={styles.btnContainer}>
            <_Button
              submitting
              transparent={false}
              activeOpacity={0.8}
              loaderColor={whiteThemeColors.white}
              style={styles.loginBtn}
              borderRadius={10}
              width='80%'
              BtnTxt={styles.btnLoginTxt}
              btnText={'Login'.toUpperCase()}
              callback={() => handlePress(ScreensNames.signInScreen.name)}
            />

            <_View style={styles.horizontalLineContainer}>
              <_View style={styles.horizontalLine} />
              <_View style={styles.orTextContainer}>
                <_Text style={styles.orTxt}>OR</_Text>
              </_View>
            </_View>
            <_Button
              submitting
              transparent={false}
              activeOpacity={0.4}
              loaderColor={whiteThemeColors.white}
              style={styles.enrollBtn}
              borderRadius={10}
              width='80%'
              BtnTxt={styles.enrollBtnTxt}
              btnText={'Enroll'.toUpperCase()}
              callback={() => handlePress(ScreensNames.SecurePage.name)}
            />
          </_View>
        </_View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginEnroll;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  scrollView: {
    flexGrow: 1,
    marginTop: hp(5),
    paddingBottom: 20,
  },
  AppName: {
    fontSize: 31,
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
    color: whiteThemeColors.primary,
    marginTop: 15,
    marginBottom: 5,
  },
  btnContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  centerView: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  loginBtn: {
    width: '80%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 5,
  },
  btnLoginTxt: {
    fontSize: 14,
    color: whiteThemeColors.white,
    fontFamily: 'Montserrat-SemiBold',
  },
  enrollBtn: {
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
    borderRadius: 5,
    // borderWidth: 0.7,
    borderColor: whiteThemeColors.primary,
    backgroundColor: whiteThemeColors.white,
  },
  enrollBtnTxt: {
    fontSize: 14,
    color: whiteThemeColors.primary,
    fontFamily: 'Montserrat-SemiBold',
  },
  horizontalLineContainer: {
    height: 20,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    position: 'absolute',
    height: 0.5,
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.primaryDark,
    opacity: 0.5,
    width: '80%',
    marginVertical: 9.5,
  },
  orTextContainer: {
    backgroundColor: whiteThemeColors.background,
    paddingHorizontal: 20,
  },
  orTxt: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: whiteThemeColors.primaryDark,
  },
});
