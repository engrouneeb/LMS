import { StyleSheet, Platform } from 'react-native';
import { whiteThemeColors } from 'utilities';
import CommonStyles from '../../../../src/screens/CommonStyles';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    flex: 0.7,
    justifyContent: 'center',
  },
  timefontSize: {
    fontSize: 26,
    fontFamily: CommonStyles.fonts.semiBold,
    marginTop: '2%',
    color: whiteThemeColors.primary,
  },
  fontSize: {
    marginBottom: 20,
    fontFamily: CommonStyles.fonts.light,
    color: whiteThemeColors.primaryTextColor,
  },
  greetingTxt: {
    fontSize: 16,
    fontFamily: CommonStyles.fonts.medium,
    marginTop: '4%',
  },
  dateTimeMainContainer: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  dateTimeContainer: {
    flexdirection: 'coloum',
    paddingTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    height: 45,
    marginTop: hp(5),
  },
  btnTxt: {
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.white,
    alignSelf: 'center',
  },
});
