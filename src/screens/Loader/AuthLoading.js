import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { whiteThemeColors, saveTerminologyToStorage } from '../../Utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import WhiteLabelConfig from '../../WhiteLabelConfig';
import { selectLanguage } from '../../actions/LanguageAction';
import { setModuelPagesPermissions } from '../../actions/ModuelPagesPermissionsAction';
import { _View } from '../../components';
import { useMeetingLogoutHook } from '../../customHooks';
import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import Screens from '../../screenNames';
import { appFont } from '../CommonStyles';
import { languages } from './../../reducers/languages';

import { GetUserData, UserInfo, error } from '../../actions/PinCodeActions';
const english = 'English',
  arabic = 'Arabic';

const AuthLoadingScreen = (props) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false);
  const { handleSecureSettings, LogoutFunction } = useMeetingLogoutHook();
  const { CheckIsTokenValid, RefreshToken, Get } = DataAccess();
  const userdata = useSelector((state) => state.User.UserInfo);
  const Function = async () => {
    loading(true);
    const userState = await AsyncStorage.getItem('userState');
    if (userState === 'GetStarted') {
      loading(false);
      await languageAndInternetConfiguration();
      props.navigation.navigate(Screens.getStarted.name);
    } else if (userState === 'Auth') {
      loading(false);
      await languageAndInternetConfiguration();
      handleSecureSettings(props);
    } else if (userState === 'Dashboard') {
      if (!userdata?.businessCompanyGuid) {
        dispatch(GetUserData());
      }
      handleNavigateOnDashboard();
    } else {
      loading(false);
      if (WhiteLabelConfig.APP_VARIANT_NAME == 'steamInventors')
        props.navigation.navigate(Screens.SplashVideo.name);
      else if (WhiteLabelConfig.APP_VARIANT_NAME == 'rakancode')
        props.navigation.navigate(Screens.signInScreen.name);
      else props.navigation.navigate(Screens.splashScreen.name);
    }
  };

  useEffect(() => {
    Function();
  }, []);

  const handleNavigateOnDashboard = () => {
    CheckIsTokenValid().then((res) => {
      if (res) {
        loading(false);
        GetModulePagesPermissions();
        handleCompanyTerminologies();
        props.navigation.navigate(DrawerScreens.dashboard.name);
      } else {
        RefreshToken().then((res) => {
          if (res) {
            handleCompanyTerminologies();
            props.navigation.navigate(DrawerScreens.dashboard.name);
          } else {
            LogoutFunction();
          }
        });
        loading(false);
      }
    });
  };

  const GetModulePagesPermissions = async () => {
    var EndPoint = ApiEndpoints.GetModuelPagesPermissions;
    Get(EndPoint).then(async (res) => {
      if (res.error) {
        return;
      } else {
        dispatch(setModuelPagesPermissions(res.data));
      }
    });
  };
  const handleCompanyTerminologies = async () => {
    saveTerminologyToStorage();
  };

  const languageAndInternetConfiguration = async () => {
    const language = await AsyncStorage.getItem('@LanguageSettings');
    appFont(language);
    if (language == arabic) {
      dispatch(selectLanguage(languages.arabic));
    } else {
      dispatch(selectLanguage(languages.english));
    }
  };

  const loading = (isLoading) => {
    setProgress(isLoading);
  };

  const logoDimension = parseInt(WhiteLabelConfig.SPLASH_LOGO_SIZE);
  const circleLoadLogo =
    Platform.OS == 'android'
      ? 'asset:/images/circleLoadLogo.png'
      : 'circleLoadLogo';
  return (
    <_View style={styles.container}>
      <Modal
        visible={progress}
        transparent={true}
        animationType={'fade'}
        animated={true}
        supportedOrientations={['portrait', 'landscape']}
      >
        <_View style={styles.subContainer}>
          <ActivityIndicator
            color={whiteThemeColors.white}
            size='large'
            showText={false}
          />
        </_View>
      </Modal>
      <Image
        source={{ uri: circleLoadLogo }}
        style={[
          {
            paddingTop: 10,
            width:
              WhiteLabelConfig.APP_VARIANT_NAME == 'compuchild'
                ? '100%'
                : logoDimension,
            height:
              WhiteLabelConfig.APP_VARIANT_NAME == 'compuchild'
                ? 150
                : logoDimension,
          },
          WhiteLabelConfig.APP_VARIANT_NAME == 'compuchild' && {
            resizeMode: 'contain',
          },
        ]}
      />
    </_View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor:
      WhiteLabelConfig.APP_VARIANT_NAME == 'rakancode'
        ? '#444858'
        : WhiteLabelConfig.PRIMARY_COLOR,
    flex: 1,
    flexDirection: 'column',
  },
  subContainer: {
    flex: 1,
    backgroundColor:
      WhiteLabelConfig.APP_VARIANT_NAME == 'rakancode'
        ? '#444858'
        : WhiteLabelConfig.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
