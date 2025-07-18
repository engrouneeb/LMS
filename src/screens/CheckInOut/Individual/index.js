import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { CustomAlert, whiteThemeColors, isStaff } from '../../../Utilities';
import CommonStyles from '../../../../src/screens/CommonStyles';
import {
  CheckInOut,
  checkInSuccess,
  message,
  UpdateUserCheckedInStatus,
} from '../../../actions/PinCodeActions';
import { _Button, _Screen, _Text, _View } from '../../../components';
import { hp, wp } from '../../../Helpers/Responsiveness';
import DrawerNames from '../../../navigation/Drawer/DrawerScreenNames';
import Screens from '../../../screenNames';
import Header from '../../Headers';
import Loader from '../../Loader/loader';
import { UserImg } from '../../ThumbNail';
import { useNavigation, useRoute } from '@react-navigation/native';

export const IndividualCheckin = () => {
  const navigation = useNavigation();
  const [checkIntime, setCheckIntime] = useState(
    new Date().toLocaleTimeString(),
  );
  const [checkInDate, setCheckInDate] = useState(new Date().toDateString());
  const [alertTitle, setAlertTitle] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState(undefined);
  const [firstBtn, setFirstBtn] = useState(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const userInfo = useSelector((state) => state.User.PinUser);
  const { UserInfo } = useSelector((state) => state.User);
  const selectedLanguage = useSelector((state) => state.language);
  const { individualCheckinScreen } = selectedLanguage;
  const { isCheckedIn } = userInfo.user;
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalID = setInterval(() => tick(), 1000);
    return () => clearInterval(intervalID);
  }, []);

  const tick = () => {
    setCheckIntime(new Date().toLocaleTimeString());
    setCheckInDate(new Date().toDateString());
    resetState();
  };

  const resetState = () => {
    setAlertTitle(undefined);
    setAlertMessage(undefined);
    setFirstBtn(undefined);
    setShowAlert(false);
  };

  const doCheckIn = async (ischk) => {
    const { individualCheckinScreen } = selectedLanguage;
    const { userId } = userInfo.user;
    setLoading(true);
    const res = await CheckInOut(ischk, userId);
    isStaff(UserInfo.roleName) &&
      userId == UserInfo.userID &&
      dispatch(UpdateUserCheckedInStatus(ischk));
    if (res.checkedInOutMsg) {
      dispatch(checkInSuccess(res));
      var dt = new Date(res.time);
      var dd = formatDate(dt);
      var chkdOut = ischk
        ? individualCheckinScreen.CheckIn
        : individualCheckinScreen.CheckOut;

      dispatch(
        message({
          MainMsg: res.checkedInOutMsg,
          TimeMsg: `${individualCheckinScreen.You} ${chkdOut} ${
            individualCheckinScreen.successfuly
          } ${individualCheckinScreen.at} ${dt.toLocaleTimeString()} ${
            individualCheckinScreen.on
          } ${dd}`,
          isGroup: false,
          isCheckIn: ischk,
        }),
      );

      setLoading(false);
      return navigation.navigate(Screens.message.name);
    } else {
      setLoading(false);
      setAlertTitle('Error');
      setAlertMessage('Something went wrong');
      setFirstBtn('Okay');
      setShowAlert(true);
    }
  };

  const formatDate = (dt) => {
    return moment(new Date(dt)).format('ddd MMM Do, YYYY');
  };

  const getUserThumb = () => {
    const { firstName, lastName, userImage, userImageColor } = userInfo.user;
    return (
      <UserImg
        UserInfo={{
          FirstName: firstName,
          LastName: lastName,
          UserImage: userImage,
          UserImageColor: userImageColor,
        }}
        size={100}
      />
    );
  };

  const handleGoBack = () => {
    navigation.pop();
    navigation.navigate(DrawerNames.pinCode.name);
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          GoBack={() => handleGoBack()}
          Screen={`${userInfo.user.firstName} ${userInfo.user.lastName}`}
        />
      }
      onAndroidBack={handleGoBack}
      hideTopSafeArea
      // flex={1}
      backgroundColor={whiteThemeColors.background}
    >
      {loading && <Loader />}
      {/* <LoadingSc /> */}
      <_View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          flex: 0.7,
          justifyContent: 'center',
        }}
      >
        {getUserThumb()}
        <_Text
          style={{
            fontSize: 16,
            fontFamily: CommonStyles.fonts.medium,
            marginTop: '4%',
          }}
        >
          {`${selectedLanguage.individualCheckinScreen.Welcome}`}
        </_Text>
        <_Text
          style={{
            fontFamily: CommonStyles.fonts.semiBold,
            fontSize: 18,
            color: whiteThemeColors.primary,
          }}
        >
          {userInfo.user.firstName} {userInfo.user.lastName}
        </_Text>

        <_Button
          width={wp(50)}
          borderRadius={15}
          submitting
          callback={() => {
            doCheckIn(true);
          }}
          style={{
            backgroundColor: whiteThemeColors.primary,
            justifyContent: 'center',
            height: 45,
            marginTop: 50,
          }}
          BtnTxt={{
            fontSize: 16,
            fontFamily: CommonStyles.fonts.semiBold,
            color: whiteThemeColors.white,
            alignSelf: 'center',
          }}
          btnText={
            Boolean(isCheckedIn)
              ? individualCheckinScreen.CheckOut
              : individualCheckinScreen.CheckIn
          }
        />
      </_View>
      <_View
        style={{
          justifyContent: 'space-between',
          alignSelf: 'stretch',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
        }}
      >
        <_View
          style={{
            flexdirection: 'coloum',
            paddingTop: '2%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <_Text
            style={{
              fontSize: 26,
              fontFamily: CommonStyles.fonts.semiBold,
              marginTop: '2%',
              color: whiteThemeColors.primary,
            }}
          >
            {checkIntime}
          </_Text>
          <_Text
            style={{
              marginBottom: 20,
              fontFamily: CommonStyles.fonts.light,
              color: whiteThemeColors.primaryTextColor,
            }}
          >
            {formatDate(checkInDate)}
          </_Text>
        </_View>
      </_View>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={firstBtn}
          firstBtnFunc={() => setShowAlert(false)}
        />
      )}
    </_Screen>
  );
};
