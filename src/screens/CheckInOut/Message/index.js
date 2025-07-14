import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { whiteThemeColors } from 'utilities';
import { CheckInSvg } from '../../../../assets/Icons/CheckInSvg';
import { CheckOutSvg } from '../../../../assets/Icons/CheckOutSvg';
import { CloudSvg } from '../../../../assets/Icons/cloudSvg';
import { _Screen, _Text, _View } from '../../../components';
import { hp } from '../../../Helpers/Responsiveness';
import DrawerNames from '../../../navigation/Drawer/DrawerScreenNames';
import CommonStyles from '../../CommonStyles';
import CstHeader from '../../Headers';
import { UserImg } from '../../ThumbNail';

export const Message = ({ navigation }) => {
  const token = useSelector((state) => state.token);
  const UserInfo = useSelector((state) => state.User.PinUser);
  const dispatch = useDispatch();
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const startTimer = () => {
      setTimeoutId(
        setTimeout(() => {
          navigation.pop();
          navigation.replace(DrawerNames.pinCode.name);
        }, 5000),
      );
    };
    navigation.addListener('focus', startTimer);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleBack = () => {
    clearTimeout(timeoutId);
    navigation.pop();
    // navigation.navigate(DrawerNames.pinCode.name);
    navigation.navigate(DrawerNames.pinCode.name);
    return true;
  };

  const getUserThumb = () => {
    const { isGroup, isCheckIn } = token.Message;
    const { firstName, lastName, userImageColor, userImage } = UserInfo?.user;
    if (isGroup) {
      return !isCheckIn ? <CheckOutSvg /> : <CheckInSvg />;
    } else {
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
    }
  };

  const isIndividual = () => {
    const { isGroup, MainMsg } = token.Message;
    return (
      <_View style={styles.greetingTxtContainer}>
        {Boolean(!isGroup) && getUserThumb()}
        <_Text
          style={[
            CommonStyles.TopHeading,
            { marginTop: hp(4), fontFamily: CommonStyles.fonts.semiBold },
          ]}
        >
          {MainMsg}
        </_Text>
      </_View>
    );
  };

  const { firstName, lastName } = UserInfo?.user;
  const { isGroup } = token.Message;

  return (
    <_Screen
      header={
        <CstHeader
          isBack
          GoBack={handleBack}
          Screen={isGroup ? 'Group CheckIn' : `${firstName} ${lastName}`}
        />
      }
      flex={1}
      hideTopSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={handleBack}
    >
      <_View style={styles.container}>
        {isIndividual()}
        <_View style={styles.imgContainer}>
          <CloudSvg size={'400%'} color={whiteThemeColors.purple} />
        </_View>
        <_Text style={styles.bottomMsgTxt}>{token.Message.TimeMsg}</_Text>
      </_View>
    </_Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  bottomMsgTxt: {
    padding: 20,
    textAlign: 'center',
    marginBottom: 50,
    fontFamily: CommonStyles.fonts.medium,
    color: whiteThemeColors.primaryTextColor,
  },
  greetingTxtContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
  },
});
