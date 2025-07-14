import { Platform, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { isTablet } from '../../components';
import CommonStyles from 'screens/CommonStyles';

export default StyleSheet.create({
  cardContainer: {
    paddingVertical: 15,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardLeft: {
    position: 'absolute',
    left: 12,
    top: 10,
    transform: [{ skewY: '135deg' }],
    height: 80,
    width: 120,
    backgroundColor: 'white',
  },
  leftImage: {
    marginTop: -2,
  },
  cardRight: {
    flexDirection: 'row',
    height: 100,

    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: -12,
    width: '100%',
    paddingLeft: '30%',
    justifyContent: 'flex-start',
  },
  arabicTextIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    position: 'absolute',
  },
  englishTextIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    position: 'absolute',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 1,
    left: 60,
  },
  badge: {
    width: 5,
    height: 5,
  },
  countText: {
    fontSize: 9.5,
    fontWeight: '700',

    color: whiteThemeColors.white,
  },
  iconBadge: {
    width: 22,
    height: 22,
    backgroundColor: whiteThemeColors.red,
    borderWidth: 1.5,
    borderColor: whiteThemeColors.white,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS == 'android' ? 50 : 100,
  },
  logoImg: {
    height: 100,
    width: 100,
  },
  cardBgImg: {
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: isTablet ? 30 : 30,
  },
  svgContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: -5,
    zIndex: 10,
    top: 0,
  },
  titleView: {
    padding: 20,
    justifyContent: 'center',
    height: '100%',
  },
  enrollTxt: {
    fontSize: 14,
    color: whiteThemeColors.greyDark,
    marginLeft: -10,
    fontFamily: CommonStyles.fonts.regular,
  },
  titleTxt: {
    fontSize: 25,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  arrowIcon: {
    position: 'absolute',
    bottom: 15,
    right: 0,
  },
  btnContainer: {
    width: '90%',
    marginVertical: 30,
    alignSelf: 'center',
  },
  gradient: {
    width: '100%',
    borderRadius: 15,
  },
  button: {
    elevation: 10,
    backgroundColor: 'transparent',
    borderRadius: 15,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTxt: {
    fontSize: 18,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  textContainer: {
    padding: 20,
    justifyContent: 'center',
    height: '100%',
  },
  enrollText: {
    fontSize: 14,
    color: whiteThemeColors.greyDark,
    marginLeft: -10,
    fontFamily: CommonStyles.fonts.regular,
  },
  enrollTitle: {
    fontSize: 28,
    color: whiteThemeColors.primaryTextColor,

    fontFamily: CommonStyles.fonts.semiBold,
  },
  arrow: {
    backgroundColor: whiteThemeColors.primary + 30,
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
