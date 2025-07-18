import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../../Utilities';

export const styles = StyleSheet.create({
  miniTab: {
    width: '90%',
    height: 40,
    backgroundColor: whiteThemeColors.white + 90,
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  activeMiniTab: {
    width: '50%',
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nonActiveMiniTab: {
    width: '50%',
    // backgroundColor: whiteThemeColors.white + 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
  },
  nonActiveMiniTabText: {
    color: whiteThemeColors.primary,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,
  },
  activeMiniTabText: {
    color: whiteThemeColors.white,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  badgeText: {
    fontSize: 10,
    color: whiteThemeColors.white,
  },
  badgeContainer: {
    width: 18,
    height: 19,
    borderRadius: 9,
    backgroundColor: whiteThemeColors.red,
    marginLeft: -30,
    position: 'absolute',
    right: 20,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
