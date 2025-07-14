import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.5)',
  },
  modalView: {
    position: 'absolute',
    bottom: 1,
    width: '100%',
    height: '85%',
    backgroundColor: whiteThemeColors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
