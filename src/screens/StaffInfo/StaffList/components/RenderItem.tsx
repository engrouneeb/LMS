import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../components';
import ScreensNames from '../../../../screenNames';
import CommonStyles from '../../../CommonStyles';
interface props {
  user: any;
  index: number;
}
export const RenderItem: React.FC<props> = ({ user, index }) => {
  const navigation: any = useNavigation();
  const onCardTapped = (userId: any) => {
    navigation.navigate(ScreensNames.StaffDetails.name, {
      userId,
    });
  };
  return (
    <TouchableOpacity
      key={index}
      onPress={() => onCardTapped(user.instructorId)}
      style={styles.cardItemContainer}
    >
      <_View
        style={{
          width: '20%',
          height: '100%',
          backgroundColor: whiteThemeColors.primary + 20,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <_VectorIcons
          type={'FontAwesome'}
          name={'user-o'}
          size={33}
          color={whiteThemeColors.primaryDark}
        />
        <_Text
          style={{
            fontFamily: CommonStyles.fonts.bold,
            color: whiteThemeColors.primary,
            fontSize: 16,
            marginTop: 4,
          }}
        >
          {`${user?.instructorFirstName[0]}${user?.instructorLastName[0]}`}
        </_Text>
      </_View>
      <_View>
        <_View style={styles.cardTopContainer}>
          <_View style={{ width: '80%' }}>
            <_Text style={styles.fullNameTxt}>
              {user.instructorFirstName + ' ' + user.instructorLastName}
            </_Text>
            {user.instructorName && (
              <_Text style={styles.userNameTxt}>@{user.instructorName}</_Text>
            )}
          </_View>
          <_View
            style={[
              {
                backgroundColor:
                  user.instructorStatus === 'Active'
                    ? whiteThemeColors.green
                    : whiteThemeColors.red,
              },
              styles.statusContainer,
              styles.shadow,
            ]}
          >
            <_Text style={styles.statusTxt}>{user.instructorStatus}</_Text>
          </_View>
        </_View>
        <_View style={styles.cardBottomContainer}>
          <_View style={styles.emailContainer}>
            <_VectorIcons
              type={'Zocial'}
              name={'email'}
              size={13}
              color={whiteThemeColors.primaryDark}
            />
            <_Text style={styles.emailTxt}>{user.email}</_Text>
          </_View>
          {user?.phone && (
            <_View style={styles.phoneContainer}>
              <_VectorIcons
                type={'FontAwesome5'}
                name={'phone-alt'}
                size={13}
                color={whiteThemeColors.primaryDark}
              />
              <_Text style={styles.phoneTxt}>{user?.phone}</_Text>
            </_View>
          )}
          <_View style={styles.roleTagContainer}>
            <_Text numberOfLines={2} style={styles.departmentTxt}>
              {user?.roleName?.split(' ')[1]}
            </_Text>
          </_View>
        </_View>
      </_View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardItemContainer: {
    width: '95%',
    height: 105,
    backgroundColor: whiteThemeColors.white + 90,
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: 7,
    padding: 5,
    flexDirection: 'row',
  },
  cardTopContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  fullNameTxt: {
    fontSize: 16,
    color: whiteThemeColors.primaryDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  userNameTxt: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    textTransform: 'lowercase',
    fontFamily: CommonStyles.fonts.regular,
  },
  statusContainer: {
    width: 53,
    height: 16,
    position: 'absolute',
    right: 18,
    top: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTxt: {
    fontSize: 8,
    color: whiteThemeColors.white,
    textTransform: 'uppercase',
    fontFamily: CommonStyles.fonts.semiBold,
  },
  cardBottomContainer: {
    width: '100%',
    height: '60%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    // justifyContent: 'space-evenly',
  },
  emailContainer: {
    flexDirection: 'row',
    aligItem: 'center',
  },
  emailTxt: {
    fontSize: 12,
    color: whiteThemeColors.black + 80,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.medium,
  },
  phoneContainer: {
    flexDirection: 'row',
    aligItem: 'center',
    marginTop: 5,
  },
  phoneTxt: {
    fontSize: 12,
    color: whiteThemeColors.black + 80,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.regular,
  },
  roleTagContainer: {
    width: 65,
    height: 20,
    backgroundColor: whiteThemeColors.white,
    position: 'absolute',
    right: 10,
    top: 22,
    borderRadius: 5,
    justifyContent: 'center',
  },
  departmentTxt: {
    fontSize: 9,
    color: whiteThemeColors.primary,
    alignSelf: 'center',
    fontFamily: CommonStyles.fonts.semiBold,
  },

  shadow: {
    shadowColor: whiteThemeColors.white + 40,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
