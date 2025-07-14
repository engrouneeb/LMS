import { whiteThemeColors } from 'utilities';
import { wp } from '../../Helpers/Responsiveness';
import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: wp(4),
    marginVertical: 1,
  },
  elementView: {
    width: 5,
    height: 5,
  },
  txtView: {
    width: '90%',
    marginLeft: wp(8),
  },
  text: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.black,
    textAlign: 'left',
  },
  btnContainer: {
    flexDirection: 'row',
    width: '95%',
    height: 50,
    alignItems: 'center',
    borderBottomColor: whiteThemeColors.primary + 30,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    left: 5,
  },
  badgeText: {
    fontSize: 9.5,
    fontFamily: CommonStyles.fonts.semiBold,

    color: 'white',
  },
  iconBadge: {
    backgroundColor: whiteThemeColors.red,
  },
  notiBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    left: 3,
  },
  notiBadgeText: {
    fontSize: 9.5,
    fontFamily: CommonStyles.fonts.semiBold,
    color: 'white',
  },
  iconBadgeStyle: {
    backgroundColor: whiteThemeColors.red,
  },
  logoutContainer: {
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 10,
    alignSelf: 'center',
    width: '92%',
    marginBottom: 30,
  },
  drawerContainer: {
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 10,
    margin: 12,
  },
  singleItem: {
    backgroundColor: whiteThemeColors.primary + 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  drawerItems: {
    flexDirection: 'row',
    width: '10%',
  },
  badge: {
    width: 5,
    height: 5,
  },
  logoutBtn: {
    flexDirection: 'row',
    width: '10%',
    marginLeft: 20,
  },
  btnTextContainer: {
    width: '90%',
    marginLeft: wp(8),
  },
  btnText: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.black,
    textAlign: 'left',
  },
  usernameText: {
    fontSize: 20,
    width: 'auto',
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.primary,
    marginLeft: 10,
  },
  userRoleText: {
    fontSize: 13,
    fontFamily: CommonStyles.fonts.regular,
    width: 180,
    color: whiteThemeColors.primaryDark,
    marginLeft: 10,
  },
  BGColorContainer: {
    backgroundColor: whiteThemeColors.background,
    width: '100%',
    height: 150,
    paddingTop: 45,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    backgroundColor: whiteThemeColors.white + 60,
    height: 100,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 1,
  },
  touch: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
