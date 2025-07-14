import { Platform, StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { whiteThemeColors } from 'utilities';
import { hp, wp } from '../../../../Helpers/Responsiveness';
import CommonStyles from 'screens/CommonStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteThemeColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '97%',
  },
  itemContainer: {
    height: 75,
    marginLeft: 0,
    marginVertical: 5,
    paddingLeft: 10,
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: whiteThemeColors.white + 90,
  },
  activeTab: {
    backgroundColor: whiteThemeColors.primary,
    elevation: 4,
  },
  failureText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: whiteThemeColors.red,

    color: 'white',
  },
  centralizedComponent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    backgroundColor: whiteThemeColors.primary + 'b0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  avatarText: {
    fontSize: 17,
    marginBottom: Platform.OS == 'ios' ? 1 : 0,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.white,
  },
  nameText: {
    fontSize: 14,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.primaryTextColor,
    marginLeft: wp(2),
  },
  statusContainer: {
    flexDirection: 'row',
    borderRadius: 7,
    width: isTablet() ? wp(8) : wp(20),
    alignItems: 'center',
    height: hp(3),
    justifyContent: 'center',
    shadowColor: '#000',
  },
  statusText: {
    paddingLeft: 2,
    color: whiteThemeColors.white,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  emptyListContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    marginTop: isTablet() ? hp(20) : hp(24),
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,

    color: whiteThemeColors.primaryTextColor,
  },
});
