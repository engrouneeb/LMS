import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../Utilities';
export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
  },
  modalView: {
    backgroundColor: whiteThemeColors.background,
    position: 'absolute',
    bottom: 1,
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  section: {
    marginTop: 10,
  },
});
