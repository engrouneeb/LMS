import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../Utilities';

export const styles = StyleSheet.create({
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
    paddingTop: 10,
    marginBottom: 15,
  },
  infoContainer: {
    width: '100%',
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
