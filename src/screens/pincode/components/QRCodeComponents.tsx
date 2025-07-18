import { _Text, _VectorIcons, _View } from '../../../components';
import moment from 'moment';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import CommonStyles from '../../../screens/CommonStyles';
import { whiteThemeColors } from 'utilities/colors';
import { DetailSingleRow, FooterNote } from '.';

interface QRDetails {
  status: any;
}

const DetailsError = ({ msg }: any) => {
  return (
    <_View justifyContent='center' alignItems='center'>
      <_View style={styles.errorContainer}>
        <_VectorIcons
          name={'closecircleo'}
          size={25}
          type={'AntDesign'}
          color={whiteThemeColors.red}
        />
      </_View>
      <_Text style={styles.errorTitle}>Error</_Text>
      <_View style={styles.errorMsgContainer}>
        <_Text style={styles.errorMsgText} numberOfLines={3}>
          {msg}
        </_Text>
      </_View>
    </_View>
  );
};

export const QRDetails: FC<QRDetails> = ({ status }) => {
  let userName;
  if (status?.checkInOut) {
    let str = status?.checkInOut?.checkedInOutMsg;
    let splittedArray;
    if (str) splittedArray = str.split(',');
    userName = splittedArray[splittedArray.length - 1];
  }
  return (
    <_View style={styles.qrDetailsContainer}>
      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name={'qrcode-scan'}
        size={65}
        color={whiteThemeColors.primary}
      />

      <_View style={styles.qrDetailsUpperContainer}>
        <_View style={styles.qrDetailsHeaderContainer}>
          <_Text style={styles.todayDateTxt}>
            {moment(new Date()).format('ddd, MMM Do YYYY')}
          </_Text>
        </_View>
        <_View style={styles.checkInOutContainer}>
          {status?.checkInOut != null ? (
            <DetailsComponent
              flag={status?.checkInOut?.isCheckedIn}
              time={status?.checkInOut?.time}
              msg={status?.msg}
              user={userName}
            />
          ) : (
            <DetailsError msg={status?.msg} />
          )}
        </_View>
      </_View>
      <FooterNote />
    </_View>
  );
};

export const DetailsComponent = ({ flag, time, msg, user }: any) => {
  return (
    <>
      <DetailSingleRow
        icontype='AntDesign'
        icon='user'
        label='user'
        msg={user}
      />
      <DetailSingleRow
        icon='progress-check'
        label='Status'
        msg={flag ? 'Checked In' : 'Checked Out'}
      />
      <DetailSingleRow
        icon='clock-outline'
        label='Time'
        msg={moment(time).format('h:mm:ss A')}
      />
      <DetailSingleRow icon='comment-text' label='Msg' msg={msg} />
    </>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: '70%',
    height: 45,
    // backgroundColor: whiteThemeColors.primary + 90,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: whiteThemeColors.greyDark,
  },

  qrDetailsHeaderContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  qrDetailsUpperContainer: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 20,
    padding: 10,
    shadowColor: whiteThemeColors.greyDark,
  },
  qrDetailsContainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },

  checkInOutContainer: {
    width: '100%',
    height: '80%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: whiteThemeColors.primary + 10,
  },
  todayDateTxt: {
    fontSize: 16,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
  errorContainer: {
    backgroundColor: whiteThemeColors.white + 90,
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
    paddingVertical: 8,
    color: whiteThemeColors.red,
  },
  errorMsgContainer: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMsgText: {
    paddingHorizontal: 5,
    alignSelf: 'center',
    color: whiteThemeColors.black,
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
  },
});
