import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.background,
    width: '100%',
  },
  flatListContainer: {
    width: '95%',
    flex: 1,
  },
  btnContainer: {
    backgroundColor: whiteThemeColors.primary,
    height: 45,
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    position: 'absolute',
  },
  btnText: {
    color: whiteThemeColors.textColor.whiteText,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
