import { Platform, StyleSheet } from 'react-native';
import { isPortrait, isTablet, whiteThemeColors } from '../../../../../../Utilities';

export const styles = StyleSheet.create({
  scheduleBodyView: {
    width: '100%',
    backgroundColor: whiteThemeColors.background,
    justifyContent: 'center',
    marginTop: 40,
    alignItems: 'center',
    flex: 1,
  },
  flatListStyles: {
    width: '100%',
    height: isTablet
      ? Platform.OS == 'ios'
        ? '95%'
        : '78%'
      : Platform.OS == 'ios'
      ? '75%'
      : Platform.OS == 'android'
      ? '74%'
      : isPortrait()
      ? '73%'
      : '50%',
    zIndex: 100,
    backgroundColor: whiteThemeColors.background,
  },
});
