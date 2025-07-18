import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHoriztonal: 5,
    paddingVertical: 5,
  },
  textBox: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: whiteThemeColors.greyDark,
    fontSize: 14,
    flexGrow: 1,
    paddingVertical: 5,
    marginLeft: 5,
  },
  sendBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginLeft: 5,
  },
  enabledBtn: {
    backgroundColor: whiteThemeColors.primary,
  },
  disabledBtn: {
    backgroundColor: whiteThemeColors.greyLite,
  },
});
