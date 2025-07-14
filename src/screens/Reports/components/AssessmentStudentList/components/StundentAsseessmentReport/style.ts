import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../../CommonStyles';
import { isTablet, whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  ContentStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  dropDownStyle: {
    height: 40,
    width: '90%',
    marginTop: 2,
    borderRadius: 5,
    backgroundColor: whiteThemeColors.white,
    alignSelf: 'center',
  },
  dropdownLabel: {
    fontSize: 14,
    color: whiteThemeColors.primaryTextColor,
    marginLeft: '5%',
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
  },
  challengeAssessmentView: {
    marginTop: 15,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  challengeDDContainer: {
    height: 40,
    padding: 10,
  },
  challengeDDStyle: {
    // marginTop: Platform.OS === 'android' ? 0 : 20,
    // width: isTablet ? '85%' : '80%',
    // marginLeft: -10,
    // borderRadius: 10,
    // ...CommonStyles.shadow,

    width: '83%',
    marginTop: 10,
    borderRadius: 10,
    numberOfLines: 1,
  },
  challengeDDTxt: {
    fontSize: 13,
    color: whiteThemeColors.greyDark,
  },
  challengeDDItemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  challengeDDItemTxt: {
    color: whiteThemeColors.black,
    paddingLeft: 5,
    fontSize: 14,
  },
  assessmentDDStyle: {
    // marginTop: Platform.OS === 'android' ? 0 : 20,
    width: isTablet ? '85%' : '85%',
    marginLeft: -10,
    borderRadius: 10,
    ...CommonStyles.shadow,
  },
  assessmentDDContainer: {
    height: 40,
    padding: 10,
  },
  assessmentDDTxt: {
    fontSize: 13,
    color: whiteThemeColors.greyDark,
  },
  assementDDItemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  assessmentDDItemTxt: {
    color: whiteThemeColors.black,
    paddingLeft: 5,
    fontSize: 16,
  },
  assessmentName: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: whiteThemeColors.primaryTextColor,
    marginVertical: 15,
  },
});
