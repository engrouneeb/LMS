import React, { FC, useEffect, useState } from 'react';
import { Keyboard, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import {
  _Button,
  _StyledTextInput,
  _Text,
  _VectorIcons,
  _View,
} from 'components';
import { CustomAlert, whiteThemeColors } from 'utilities';

import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { UserProfileChangePasswordModalInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';

export const ChangePasswordModal: FC<
  UserProfileChangePasswordModalInterface
> = ({ modalVisible, setModalVisible, userName }) => {
  const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);
  const { PostSecured } = DataAccess();
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpened(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpened(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const onCloseModal = () => {
    setModalVisible(false);
  };
  const [OldPassword, setOldPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [currentPwdSecureEntry, setCurrentPwdSecureEntry] = useState(true);

  const [newPwdSecureEntry, setNewPwdSecureEntry] = useState(true);
  const [confirmPwdSecureEntry, setConfirmPwdSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      if (
        OldPassword.length > 0 &&
        NewPassword.length > 0 &&
        ConfirmPassword.length > 0
      ) {
        if (NewPassword !== ConfirmPassword) {
          setAlertMessage("New Password & Confirm Password doesn't match");
          setAlertTitle('Error');
          setShowAlert(true);
        } else {
          let data = {
            Username: userName,
            OldPassword: OldPassword,
            NewPassword: NewPassword,
          };

          setLoading(true);
          PostSecured({ url: ApiEndpoints.updatePassword.url }, data).then(
            (res) => {
              setLoading(false);
              if (!res.match('incorrect')) {
                setAlertMessage(res);
                setAlertTitle('Success');
                setShowAlert(true);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
              } else {
                setAlertMessage(res);
                setAlertTitle('Error');
                setShowAlert(true);
              }
            },
          );
        }
      } else {
        setShowError(true);
        return;
      }
    } catch (e) {}
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
      transparent={true}
      visible={modalVisible}
    >
      <_View style={styles.centeredView}>
        <_View
          style={[
            styles.modalView,
            {
              height: isKeyboardOpened ? '85%' : '65%',
            },
          ]}
        >
          <_View style={styles.headerContainer}>
            <_Text style={styles.headText}></_Text>
            <TouchableOpacity onPress={onCloseModal} style={styles.crossIcon}>
              <_VectorIcons
                type={'Entypo'}
                name='cross'
                size={15}
                color={whiteThemeColors.white}
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </_View>

          <_View style={styles.innerContainer}>
            <_View style={styles.formContainer}>
              <_View style={{ marginLeft: 10 }}>
                <_Text
                  style={{
                    fontFamily: CommonStyles.fonts.bold,
                    fontSize: 20,
                    color: whiteThemeColors.primary,
                  }}
                >
                  Change Password
                </_Text>
                <_Text
                  style={{
                    color: whiteThemeColors.greyDark,
                    width: '95%',
                    fontFamily: CommonStyles.fonts.regular,
                  }}
                >{`Enter your current password and your new password below.`}</_Text>
              </_View>

              <_View style={styles.form}>
                <_View style={styles.textInpContainer}>
                  <_StyledTextInput
                    width={'90%'}
                    style={[
                      styles.inputText,
                      showError &&
                        OldPassword.length == 0 &&
                        styles.inputTextErrorIndicator,
                    ]}
                    showEyeIcon
                    onChangeSecureTextEntry={() => {
                      setCurrentPwdSecureEntry(!currentPwdSecureEntry);
                    }}
                    placeholder='Current Password'
                    secureTextEntry={currentPwdSecureEntry}
                    onChangeText={(text) => {
                      setOldPassword(text);
                    }}
                    value={OldPassword}
                  />

                  {showError && OldPassword.length == 0 && (
                    <_View style={styles.errorMsgContainer}>
                      <_Text style={styles.errorMsg}>Required</_Text>
                    </_View>
                  )}
                </_View>
                <_View style={styles.textInpContainer}>
                  <_StyledTextInput
                    width={'90%'}
                    style={[
                      styles.inputText,
                      showError &&
                        NewPassword.length == 0 &&
                        styles.inputTextErrorIndicator,
                    ]}
                    placeholder='New Password'
                    secureTextEntry={newPwdSecureEntry}
                    onChangeSecureTextEntry={() => {
                      setNewPwdSecureEntry(!newPwdSecureEntry);
                    }}
                    showEyeIcon
                    value={NewPassword}
                    onChangeText={(text) => setNewPassword(text)}
                  />
                  {showError && NewPassword.length == 0 && (
                    <_View style={styles.errorMsgContainer}>
                      <_Text style={styles.errorMsg}>Required</_Text>
                    </_View>
                  )}
                </_View>
                <_View style={styles.textInpContainer}>
                  <_StyledTextInput
                    width={'90%'}
                    style={[
                      styles.inputText,
                      showError &&
                        ConfirmPassword.length == 0 &&
                        styles.inputTextErrorIndicator,
                    ]}
                    showEyeIcon
                    placeholder='Confirm Password'
                    secureTextEntry={confirmPwdSecureEntry}
                    onChangeSecureTextEntry={() => {
                      setConfirmPwdSecureEntry(!confirmPwdSecureEntry);
                    }}
                    value={ConfirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                  />
                  {showError && ConfirmPassword.length == 0 && (
                    <_View style={styles.errorMsgContainer}>
                      <_Text style={styles.errorMsg}>Required</_Text>
                    </_View>
                  )}
                </_View>
              </_View>
              <_Button
                isBlock={false}
                borderRadius={10}
                width={'95%'}
                style={styles.button}
                submitting={!loading}
                BtnTxt={{
                  color: 'white',
                  fontFamily: CommonStyles.fonts.bold,
                }}
                callback={onSubmit}
                btnText={'Update Password'}
              />
            </_View>
          </_View>
        </_View>
      </_View>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setShowAlert(false);
          }}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
  },
  modalView: {
    backgroundColor: whiteThemeColors.background,
    width: '100%',
    height: '55%',
    borderRadius: 35,
    position: 'absolute',
    bottom: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headText: {
    color: whiteThemeColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.greyDark,
    borderRadius: 10,
    zIndex: 10,
    marginRight: 15,
    marginTop: 10,
  },
  innerContainer: {
    backgroundColor: whiteThemeColors.background,
    width: '100%',
    paddingBottom: 30,
    borderRadius: 35,
  },
  formContainer: {
    height: 480,
    width: '97%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  errorMsgContainer: {
    width: '100%',
    height: 30,
  },
  form: {
    borderRadius: 15,
    paddingTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: whiteThemeColors.white,
  },
  textInpContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: whiteThemeColors.primary,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  errorMsg: {
    color: whiteThemeColors.red,
    fontSize: 12,
    marginLeft: 20,
  },
  inputTextErrorIndicator: {
    borderColor: whiteThemeColors.red,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: CommonStyles.fonts.medium,
  },
  inputText: {
    paddingLeft: 18,
    height: 45,
    borderColor: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
});
