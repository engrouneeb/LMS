//region References
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { whiteThemeColors } from 'utilities';
import WhiteLabelConfig from '../../WhiteLabelConfig';
import { isPortrait, isTablet, _Button, _View } from '../../components';
import { useMeetingLogoutHook } from '../../customHooks';
import CommonStyles from '../CommonStyles';
//endregion

export const GetStarted = () => {
  const [submitting, setSubmitting] = useState(true);
  const [showLogo, setShowLogo] = useState(isPortrait());
  const { handleSecureSettings } = useMeetingLogoutHook();
  const [isTab, setIsTab] = useState(isTablet);

  let mobileLogin =
    Platform.OS == 'android' ? 'asset:/images/mobileLogin.png' : 'mobileLogin';
  let tabLogin =
    Platform.OS == 'android' ? 'asset:/images/tabLogin.png' : 'tabLogin';
  let loginImgUri = isTab ? tabLogin : mobileLogin;

  let getStartedImage =
    Platform.OS == 'android' ? 'asset:/images/getStarted.png' : 'getStarted';

  const selectedLanguage = useSelector((state) => state.language);
  const { getStartedScreen } = selectedLanguage;
  handleBack = () => {
    BackHandler.exitApp();
  };

  useEffect(() => {
    const subscribe = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );
    return () => subscribe.remove();
  }, []);

  useEffect(() => {
    const subscribe = Dimensions.addEventListener('change', changeOrientation);
    return () => subscribe?.remove();
  }, []);

  const changeOrientation = (result) => {
    setShowLogo(result.window.height > result.window.width);
  };

  const _getStarted = async () => {
    setSubmitting(false);
    await AsyncStorage.setItem('userState', 'Auth');
    await handleSecureSettings();
    await AsyncStorage.setItem('isFirstTimeLogin', 'true');
    setSubmitting(true);
  };

  return (
    <_View style={{ flex: 1 }}>
      {showLogo ? (
        <Image
          style={{
            width: '100%',
            height: isTab ? 400 : 350,
          }}
          source={{ uri: loginImgUri }}
        />
      ) : null}
      <_View
        style={[
          style.logoContainer,
          WhiteLabelConfig.APP_VARIANT_NAME == 'compuchlid' && {
            backgroundColor: whiteThemeColors.white,
          },
        ]}
      >
        <Image
          style={{
            width:
              Platform.OS == 'android'
                ? '70%'
                : isTab
                ? parseInt(WhiteLabelConfig.GET_STARTED_IMAGE_SIZE)
                : '80%',
            height: isTab ? 400 : Platform.OS == 'android' ? 250 : 310,
          }}
          resizeMode='contain'
          source={{ uri: getStartedImage }}
        />
      </_View>
      <_Button
        borderRadius={15}
        transparent={false}
        submitting={submitting}
        loaderColor={whiteThemeColors.white}
        BtnTxt={style.buttonText}
        style={[style.buttonStyle, CommonStyles.themeClr]}
        btnText={getStartedScreen.btnText}
        callback={() => _getStarted()}
      />
    </_View>
  );
};

const style = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    width: '100%'},
  buttonText: {
    color: whiteThemeColors.white,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    marginBottom: 20,
  },
});
