import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  addNewBtn: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: whiteThemeColors.white,
    borderRadius: 30,
    shadowColor: whiteThemeColors.black,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
    borderColor: whiteThemeColors.white,
  },
});
