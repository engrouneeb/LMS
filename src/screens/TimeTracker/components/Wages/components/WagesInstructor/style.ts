import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../Utilities';

export const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.background,
  },
  flatList: {
    backgroundColor: whiteThemeColors.background,
    width: '100%',
    height: '100%',
  },
});
