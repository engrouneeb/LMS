import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextInput
} from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomAlert,
  LoadLogoImage,
  isPortrait,
  saveTerminologyToStorage,
  whiteThemeColors,
} from 'utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { doLogin } from '../../actions/AccountActions';
import {setModuelPagesPermissions} from "../../actions/ModuelPagesPermissionsAction"
import {
  saveToken,
  saveUserToken,
} from '../../actions/AsyncStorage';
import {
  _Button,
  _Text,
  _VectorIcons,
  _View,
  loginInterface
} from '../../components';
import DrawerScreen from '../../navigation/Drawer/DrawerScreenNames';
import { languages } from '../../reducers/languages';
import Screens from '../../screenNames';
import CommonStyles, { appFont } from '../CommonStyles';
import { styles } from "./";
import { Appstate } from 'reducers/Appstate';
import { useNavigation } from '@react-navigation/native';
const english = 'English',
  arabic = 'Arabic';

let windowWidth = Dimensions.get('window').width;
export const SignInScreen: React.FC<loginInterface> = () => {
  const passwordRef: any = useRef();
  const userNameRef: any = useRef();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isMultiLang, setIsMultiLang] = useState(false);
  const [submitting, setSubmiting] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [language, setLanguage] = useState('English');
  const [showLogo, setShowLogo] = useState(isPortrait() ? true : false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [firstBtn, setFirstBtn] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const selectedLanguage = useSelector((state: Appstate) => state.language);
  const dispatch: any = useDispatch();
  const navigation = useNavigation();

  const { Get } = DataAccess();
  const checkLanguage = async () => {
    let lang = await AsyncStorage.getItem('@LanguageSettings');
    if (lang) {
      setLanguage(lang);
    }
  };

  useEffect(() => {
    const fetchFunction = async () => {
      setMultiLang();
      checkLanguage();
    };
    fetchFunction();
  }, []);

  const resetState = () => {
    setUserName('');
    setPassword('');
    // setIsMultiLang();
    setSubmiting(true);
    setShowAlert(false);
    setShowLogo(isPortrait());
  };

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      keyboardWillShow();
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      keyboardWillHide();
      setShowLogo(isPortrait());
    });
    const orientation = Dimensions.addEventListener('change', () => {
      changeOrientation();
    });
    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
      orientation.remove();
      resetState();
    };
  }, []);

  const changeOrientation = () => setShowLogo(isPortrait());

  const setMultiLang = async () => {
    const lang = await AsyncStorage.getItem('isMultiLang');
    setIsMultiLang(lang === 'true');
  };

  const keyboardWillShow = () => setShowLogo(false);

  const keyboardWillHide = () => setShowLogo(false);

  const _reset = async () => {
    setUserName('');
    setPassword('');
    setSubmiting(true);
    setShowAlert(false);
    setShowLogo(isPortrait() ? true : false);
  };
  const checkInputs = () => {
    if (userName == '' && password == '') {
      _showAlert('Error', 'Please enter Username and Password', 'Retry');
    } else if (userName == '') {
      _showAlert('Error', 'Please Enter Your Username', 'Retry');
    } else if (password == '') {
      _showAlert('Error', 'Please Enter Your Password', 'Retry');
    } else {
      SubmitLogin();
    }
  };
  const SubmitLogin = async () => {
    setSubmiting(false);
    let deviceId = getUniqueId();
    const res = await dispatch(doLogin(userName, password, deviceId));
    if (!res?.data){
      _loginFailed();
    } 
    else _loginSuccess(res.data);
  };

  const _loginSuccess = async (response: any) => {
    AsyncStorage.getItem('isFirstTimeLogin').then((isFirstTimeLogin) => {
      // Currently hide Eula Screen for first time logged in of that user which uptill haven't accept Eula
      // if (!response.user.isAgreed && isFirstTimeLogin == 'false') {
      //   _reset().then(() => {
      //     return navigation.navigate(Screens.Eula.name, {
      //       navigation: navigation,
      //       response: response,
      //     });
      //   });
      // } else {
      let data = {
        token: response.token,
        refreshToken: response.refreshToken,
      };

      dispatch(saveUserToken(data))
        .then(() => {
          dispatch(saveToken(data));
          dispatch(getUserData());
          GetModuelPagesPermissions();
        })
        .catch(() => {
          // _loginFailed();
        });
      // }
    });
  };
  const GetModuelPagesPermissions = async () => {
    var EndPoint = ApiEndpoints.GetModuelPagesPermissions;
    Get(EndPoint).then(async (res: any) => {
      await dispatch(setModuelPagesPermissions(res.data));
    });
  };
  const getUserData = async () => {
    saveTerminologyToStorage();
    await AsyncStorage.setItem('userState', 'Dashboard');
    await AsyncStorage.setItem('isFirstTimeLogin', 'false');
    _reset().then(() => {
      return navigation.navigate(DrawerScreen.dashboard.name);
    });
  };

  const _loginFailed = () => {
    setSubmiting(true);
    _showAlert(
      'Error',
      'The entered User name or Password is incorrect',
      'Retry',
    );
  };

  const _showAlert = (title: string, msg: string, btn: any) => {
    setShowAlert(true);
    setAlertTitle(title);
    setAlertMessage(msg);
    setFirstBtn(btn);
  };

  const { loginScreen } = selectedLanguage;
  return (
    <ScrollView
      style={{ backgroundColor: whiteThemeColors.background }}
      keyboardShouldPersistTaps='handled'
    >
      <LoadLogoImage showLogo={showLogo} />
      <KeyboardAvoidingView
        style={{
          flex: 3,
          justifyContent: 'center',
        }}
        behavior='padding'
        enabled
      >
        <_View style={styles.container}>
          <TouchableOpacity
            onPress={() => userNameRef.current.focus()}
            style={[CommonStyles.mh20, styles.userNameField]}
          >
            <_VectorIcons
              type='MaterialCommunityIcons'
              name={'account'}
              size={20}
              color={whiteThemeColors.primary}
            />
            <TextInput
              style={{
                color: whiteThemeColors.textColor.primaryText,
                fontFamily: 'Montserrat-Regular',
                marginLeft: language === arabic ? -30 : 10,
                width: '80%',
              }}
              ref={userNameRef}
              value={userName}
              ref={userNameRef}
              returnKeyType={'next'}
              blurOnSubmit={false}
              placeholderTextColor={whiteThemeColors.greyDark}
              placeholder={loginScreen.userName}
              onChangeText={(text) => setUserName(text)}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => passwordRef.current.focus()}
            style={[CommonStyles.mh20, styles.passwordField]}
          >
            <_VectorIcons
              type='MaterialCommunityIcons'
              name={'lock'}
              size={20}
              color={whiteThemeColors.primary}
            />
            <TextInput
              style={[
                {
                  color: whiteThemeColors.textColor.primaryText,
                  fontFamily: 'Montserrat-Regular',
                  alignSelf: 'center',
                  marginLeft: language === arabic ? -30 : 10,
                  flex: 1,
                },
              ]}
              ref={passwordRef}
              value={password}
              placeholderTextColor={whiteThemeColors.greyDark}
              placeholder={loginScreen.password}
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
              returnKeyType='done'
              onSubmitEditing={() => checkInputs()}
            />
            <_View
              style={
                language == english
                  ? styles.englishTextIcon
                  : styles.arabicTextIcon
              }
            >
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <_VectorIcons
                  type='MaterialCommunityIcons'
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={whiteThemeColors.greyDark}
                />
              </TouchableOpacity>
            </_View>
          </TouchableOpacity>

          <_Button
            borderRadius={10}
            submitting={submitting}
            loaderColor={whiteThemeColors.white}
            width={windowWidth - 38}
            BtnTxt={{
              fontSize: 16,
              color: whiteThemeColors.white,
              fontFamily: 'Montserrat-SemiBold',
            }}
            style={styles.loginButton}
            btnText={loginScreen.Login}
            callback={() => {
              checkInputs();
            }}
          />
          <_View style={{ justifyContent: 'flex-end', marginTop: 15 }}>
            <Pressable
              style={{ marginTop: 20, alignSelf: 'center' }}
              onPress={() => {
                navigation.navigate(Screens.forgotPassword.name);
              }}
            >
              <_Text
                style={{
                  color: whiteThemeColors.primary,
                  fontFamily: CommonStyles.fonts.semiBold,
                  fontSize: 15,
                }}
              >{`Forgot Password?`}</_Text>
            </Pressable>
          </_View>
          {isMultiLang && (
            <_View style={styles.subContainer}>
              <_Button
                borderRadius={40}
                submitting={true}
                loaderColor={whiteThemeColors.white}
                BtnTxt={styles.buttonText}
                width='45%'
                style={[
                  styles.button,
                  {
                    borderColor:
                      language == 'English'
                        ? whiteThemeColors.primary
                        : whiteThemeColors.transparent,
                  },
                ]}
                btnText={'english'}
                callback={() => {
                  setLanguage(english);
                  setLanguageSettings(english);
                  selectLanguage(languages.english);
                  appFont('English');
                }}
              />
              <_Button
                borderRadius={40}
                submitting={true}
                loaderColor={whiteThemeColors.white}
                BtnTxt={styles.buttonTxt}
                width='45%'
                style={[
                  styles.button,
                  {
                    alignItems: 'center',
                    borderColor:
                      language != 'English'
                        ? whiteThemeColors.primary
                        : whiteThemeColors.transparent,
                  },
                ]}
                btnText={'العربية'}
                callback={() => {
                  setLanguageSettings(arabic);
                  dispatch(selectLanguage(languages.arabic));
                  appFont('Arabic');
                  setLanguage(arabic);
                }}
              />
            </_View>
          )}
        </_View>
        {showAlert && (
          <CustomAlert
            visible={showAlert}
            title={alertTitle}
            msg={alertMessage}
            firstBtn={firstBtn ? firstBtn : 'Okay'}
            firstBtnFunc={() => {
              setShowAlert(false);
            }}
          />
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};


