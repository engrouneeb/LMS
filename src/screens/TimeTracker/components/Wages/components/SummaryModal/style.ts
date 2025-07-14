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
    backgroundColor: whiteThemeColors.background,
    width: '90%',
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  innerContainer: {
    backgroundColor: whiteThemeColors.background,
    // marginTop: 25,
    width: '100%',
    paddingBottom: 30,
    borderRadius: 35,
    paddingHorizontal: 30,
    padding: 20,
  },
});
