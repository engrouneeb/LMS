import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  bottomBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    width: '100%',
    paddingHorizontal: 10,
  },
  btn: {
    marginRight: 5,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
  },
  btnComplete: {
    marginRight: 5,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    color: whiteThemeColors.textColor.darkGrayText,
    margin: 0,
    paddingRight: 0,
  },
});
