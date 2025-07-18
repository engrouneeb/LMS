import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../../../Utilities';

export const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: whiteThemeColors.background,
    paddingVertical: 20,
  },
  innerContainer: {
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '90%',
    borderRadius: 15,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
    backgroundColor: whiteThemeColors.white,
  },
  headerText: {
    fontSize: 21,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'capitalize',
  },
  detailscon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: whiteThemeColors.greyLite,
    paddingVertical: 15,
  },
  keyText: {
    fontSize: 12,
    maxWidth: '40%',
  },
  valueText: {
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    maxWidth: '60%',
  },
  updateFamilyInfo: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 15,
  },
  updateFamilyText: {
    color: whiteThemeColors.greyDark,
    marginRight: 5,
    fontSize: 12,
  },
  updateIcon: {
    backgroundColor: whiteThemeColors.primary,
    height: 20,
    justifyContent: 'center',
    width: 20,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
});
