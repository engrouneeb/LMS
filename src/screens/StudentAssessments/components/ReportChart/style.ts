import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../Utilities';

export const Style = StyleSheet.create({
  cardContainer: {
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: whiteThemeColors.white + 90,
    paddingVertical: 4,
    marginVertical: 8,
  },
  floatingIcon: {
    fontSize: 120,
    position: 'absolute',
    right: -10,
    top: -10,
    color: whiteThemeColors.primary,
    opacity: 0.1,
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
    borderRadius: 10,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
  },
  headerText: {
    fontSize: 16,
    marginTop: 10,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'capitalize',
  },
  infoContainer: {
    width: '100%',
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
  circle3: {
    position: 'absolute',
    height: 150,
    width: 150,
    borderRadius: 80,
    top: -10,
    left: -30,
    backgroundColor: whiteThemeColors.primaryDark + '08',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  circleBtn: {
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
  scrollView1: {
    width: '100%',
    margin: 0,
    marginBottom: 15,
    paddingHorizontal: 0,
  },
});
