import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../Utilities';
const styles = StyleSheet.create({
  cardContainer: {
    width: '94%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: whiteThemeColors.white + 90,
    paddingVertical: 7,
    marginTop: 8,
  },
  floatingIcon: {
    fontSize: 120,
    position: 'absolute',
    right: -10,
    top: -10,
    color: whiteThemeColors.primaryDark,
    opacity: 0.1,
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
    borderRadius: 15,

    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
  },
  headerText: {
    fontSize: 16,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'capitalize',

    marginBottom: 15,
    marginTop: 10,
  },
  labelText: {
    fontSize: 12,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  text: {
    paddingLeft: 2,
    paddingRight: 10,
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    marginBottom: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  circle1: {
    position: 'absolute',
    height: 170,
    width: 170,
    borderRadius: 90,
    bottom: -30,
    right: -30,

    backgroundColor: whiteThemeColors.primary + '07',
  },
  circle2: {
    position: 'absolute',
    height: 100,
    width: 100,
    borderRadius: 50,
    bottom: 10,
    left: '7%',
    backgroundColor: whiteThemeColors.greyDark + '06',
  },
  CardToggleIconContainer: {
    position: 'absolute',
    right: 25,
    zIndex: 1,
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 12,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
});

export { styles };
