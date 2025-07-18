import { Platform, StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { getWidth, whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    alignSelf: 'center',
    color: whiteThemeColors.primaryTextColor,
  },
  webView: {
    flex: 1,
    width: getWidth('100%'),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Platform.OS == 'android' ? 5 : isTablet() ? 5 : -15,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  leftChevron: {
    marginRight: 5,
    width: '45%',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
  },
  chevron: {
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
  previousStepText: {
    color: whiteThemeColors.textColor.darkGrayText,
    margin: 0,
    paddingRight: 0,
  },
  rightChevron: {
    marginRight: 5,
    width: '45%',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
  },
  nextStepText: {
    color: whiteThemeColors.textColor.darkGrayText,
    margin: 0,
    paddingRight: 0,
  },
});
