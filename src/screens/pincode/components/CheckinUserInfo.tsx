import React from 'react';
import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { _Text, _VectorIcons, _View } from '../../../components';
import { whiteThemeColors } from '../../../Utilities/colors';

export const CheckinUserInfo = (Props: any) => {
  const { UserData } = Props;
  return (
    <_View style={styles.card}>
      <_View style={styles.iconBackground}>
        <_VectorIcons
          size={25}
          type={'Ionicons'}
          name={'person'}
          color={`${whiteThemeColors.primary}90`}
        />
      </_View>
      <_View width='60%'>
        <_Text style={styles.courseNameText}>{'Check-in User'}</_Text>
        <_Text
          style={styles.courseName}
        >{`${UserData?.firstName} ${UserData?.lastName}`}</_Text>
      </_View>
    </_View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 10,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: whiteThemeColors.primary,
    backgroundColor: whiteThemeColors.white,
    width: '94%',
    alignSelf: 'center',
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${whiteThemeColors.primary}30`,
    borderWidth: 1,
    borderColor: `${whiteThemeColors.primary}90`,
    marginRight: 10,
  },
  courseNameText: {
    fontSize: 12,
    color: 'gray',
    fontFamily: CommonStyles.fonts.regular,
    marginBottom: 5,
  },
  courseName: {
    width: '95%',
    fontSize: 14,
    marginBottom: 5,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
