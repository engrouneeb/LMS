import { StyleSheet } from 'react-native';
import { verticalScale, whiteThemeColors } from '../../Utilities';
import { hp } from '../../Helpers/Responsiveness';
import CommonStyles from '../../screens/CommonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  clearBtn: {
    alignSelf: 'flex-end',
    marginRight: 15,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  leftActionContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: whiteThemeColors.white + 90,
    maxHeight: hp(30),
    borderColor: whiteThemeColors.greyDark + 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(10),
  },
  listItemSubContainer: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
  },
  listItemIconContainer: {
    width: '17%',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    height: hp(7),
    borderRadius: 15,
    marginLeft: 12,
    justifyContent: 'center',
  },
  listItemTitleNameContainer: {
    flexDirection: 'column',
    width: '70%',
    borderBottomWidth: 0,
    borderBottomColor: whiteThemeColors.black,
    marginLeft: 10,
  },
  notificationTitleTxt: {
    fontFamily: CommonStyles.fonts.medium,
    color: whiteThemeColors.primaryTextColor,
    fontSize: 13,
    lineHeight: 15,
  },
  notificationDetailTxt: {
    fontSize: 11,
    fontFamily: CommonStyles.fonts.light,
    color: whiteThemeColors.greyDark,
    marginTop: 5,
  },
  emptyListContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: whiteThemeColors.background,
    justifyContent: 'center',
  },
  noDataFoundTxt: {
    fontSize: 14,
    color: whiteThemeColors.primaryTextColor,
    marginTop: 30,
    fontFamily: CommonStyles.fonts.regular,
  },
  timeElapsedContainer: { position: 'absolute', right: 10, bottom: 5 },
  timeElapsedTxt: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
});
