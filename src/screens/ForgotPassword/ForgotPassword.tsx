import { useNavigation } from '@react-navigation/native';
import { EndpointType } from 'interfaces';
import React, { FC, useRef, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAlert, whiteThemeColors } from '../../Utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { loading } from '../../actions/AsyncStorage';
import {
  isTablet,
  _Button,
  _Screen,
  _Text,
  _VectorIcons,
  _View,
} from '../../components';
import { wp } from '../../Helpers/Responsiveness';
import { Appstate } from '../../reducers/Appstate';
import CommonStyles from '../CommonStyles';
import CstHeader from '../Headers';

const deviceWidth = Dimensions.get('window').width;

let windowWidth = Dimensions.get('window').width;
export const ForgotPassword: FC = () => {
  const passwordRef: any = useRef();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [submitting, setSubmiting] = useState(true);
  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    title: '',
    message: '',
    firstBtn: '',
  });

  const navigation = useNavigation();
  const { GetUnSecured } = DataAccess();
  const dispatch = useDispatch();
  const { loginScreen } = useSelector((state: Appstate) => state.language);
  const _showAlert = (
    showalert: boolean,
    title: string,
    msg: string,
    btn: any,
  ) => {
    setShowAlert({
      showAlert: showalert,
      title: title,
      message: msg,
      firstBtn: btn,
    });
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const submit = () => {
    if (userName != '') {
      if (validateEmail(email)) {
        setSubmiting(false);
        // call to api
        let EndPoint: EndpointType = ApiEndpoints.ForgetPassword;
        EndPoint.params = `?username=${userName}&email=${email}`;
        GetUnSecured(EndPoint)
          .then((res) => {
            setSubmiting(true);
            if (res?.key) {
              _showAlert(true, 'Success', res?.message, 'Okay');
              setError(false);
            } else {
              setError(true);
              _showAlert(true, 'Error', res?.message, 'Okay');
            }
          })
          .catch((err) => {
            dispatch(loading(false));
            setError(true);
            _showAlert(true, 'Error', err, 'Okay');
          });
      } else {
        setError(true);
        _showAlert(true, 'Error', 'Enter a valid email address', 'Okay');
      }
    } else {
      setError(true);
      _showAlert(true, 'Error', 'Please enter your user name', 'Okay');
    }
  };
  return (
    <_Screen
      header={
        <CstHeader
          isBack
          goBack={() => navigation.goBack()}
          Screen={'Forgot Passoword'}
        />
      }
      hideTopSafeArea
      topSafeAreaColor={whiteThemeColors.primary}
      bottomSafeAreaColor={whiteThemeColors.background}
      backgroundColor={whiteThemeColors.background}
      style={[{ flex: 1 }, CommonStyles.appBackgroundColor]}
    >
      <_View
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          marginTop: 50,
          backgroundColor: whiteThemeColors.primary + 30,
          width: 100,
          height: 100,
          borderRadius: 22,
          alignSelf: 'center',
        }}
      >
        <_VectorIcons
          type='MaterialCommunityIcons'
          name={'lock'}
          size={60}
          color={whiteThemeColors.white}
        />
      </_View>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior='padding'
        enabled
      >
        <_View style={styles.container}>
          <_Text
            style={{
              color: whiteThemeColors.textColor.primaryText,
              alignSelf: 'center',
              textAlign: 'center',
              marginRight: 15,
              width: '90%',

              fontFamily: CommonStyles.fonts.regular,
              marginBottom: 50,
              paddingHorizontal: 20,
            }}
          >
            Enter your username and e-mail address below to reset your password.
          </_Text>
          <_View style={[CommonStyles.mh20, styles.userNameField]}>
            <_VectorIcons
              type='MaterialCommunityIcons'
              name={'account'}
              size={20}
              color={whiteThemeColors.primary}
            />
            <TextInput
              style={{
                color: whiteThemeColors.textColor.primaryText,
                fontFamily: CommonStyles.fonts.regular,
                marginLeft: 20,
                width: '85%',
              }}
              value={userName}
              returnKeyType={'next'}
              blurOnSubmit={false}
              placeholderTextColor={whiteThemeColors.greyDark}
              placeholder={loginScreen.userName}
              onChangeText={(text) => setUserName(text)}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
          </_View>
          <_View style={[CommonStyles.mh20, styles.passwordField]}>
            <_VectorIcons
              type='MaterialCommunityIcons'
              name={'email'}
              size={20}
              color={whiteThemeColors.primary}
            />
            <TextInput
              style={[
                {
                  color: whiteThemeColors.textColor.primaryText,
                  fontFamily: CommonStyles.fonts.regular,
                  alignSelf: 'center',
                  marginLeft: 20,
                  width: '100%',
                },
              ]}
              ref={passwordRef}
              value={email}
              placeholderTextColor={whiteThemeColors.greyDark}
              placeholder={'Email'}
              onChangeText={(text) => setEmail(text)}
              returnKeyType='done'
            />
          </_View>

          <_Button
            borderRadius={13}
            submitting={submitting}
            loaderColor={whiteThemeColors.white}
            width={windowWidth - 38}
            BtnTxt={{
              fontSize: 16,
              color: whiteThemeColors.white,
              fontFamily: CommonStyles.fonts.semiBold,
            }}
            style={styles.loginButton}
            btnText={loginScreen.submit}
            callback={submit}
          />
        </_View>
        {showAlert && (
          <CustomAlert
            visible={showAlert.showAlert}
            title={showAlert.title}
            msg={showAlert.message}
            firstBtn={showAlert.firstBtn ? showAlert.firstBtn : 'Okay'}
            firstBtnFunc={() => {
              if (error) {
                setError(false);
                _showAlert(false, '', '', '');
              } else navigation.goBack();
            }}
          />
        )}
      </KeyboardAvoidingView>
    </_Screen>
  );
};

const styles = StyleSheet.create({
  bgColor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: whiteThemeColors.white,
  },
  pageContainer: {
    flex: 1,
    width: deviceWidth,
    // height: null,
    alignItems: 'center',
  },
  LogoContainer: {
    height: 100,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 50,
    width: deviceWidth - 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: whiteThemeColors.contentBg,
    padding: 20,
  },
  imgResponsive: {
    width: deviceWidth - 120,
    height: 100,
  },
  fields: {
    marginTop: 20,
    backgroundColor: whiteThemeColors.white,
    borderColor: whiteThemeColors.white,
  },
  backbtn: {
    backgroundColor: whiteThemeColors.white,
    height: 45,
    width: 45,
    margin: 5,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Footer: {
    marginBottom: 20,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  footerTxt: {
    textAlign: 'center',
    fontSize: 13,
  },
  arabicTextIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    position: 'absolute',
  },
  englishTextIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    position: 'absolute',
  },
  container: {
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  userNameField: {
    borderColor: CommonStyles.borderGraishBlue.borderColor,
    height: isTablet ? wp(8) : wp(13),
    marginTop: wp(7),
    paddingLeft: wp(4),
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: whiteThemeColors.white + 90,
    flexDirection: 'row',
    paddingRight: 20,
  },
  passwordField: {
    borderColor: CommonStyles.borderGraishBlue.borderColor,
    height: isTablet ? wp(8) : wp(13),
    marginTop: wp(3),
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: whiteThemeColors.white + 90,
    paddingLeft: wp(4),
    flexDirection: 'row',
    paddingRight: 70,
  },
  loginButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',

    marginTop: wp(6),
    height: Platform.OS == 'ios' ? 45 : 50,
    backgroundColor: whiteThemeColors.primary,
  },
  subContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    marginTop: 30,
    width: '75%',
    paddingVertical: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: whiteThemeColors.primary,

    textAlign: 'justify',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  buttonTxt: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'DroidArabicNaskh',
    color: whiteThemeColors.primary,
    textAlign: 'justify',
  },
});
