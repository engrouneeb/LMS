import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.6)',
  },
  modalView: {
    position: 'absolute',
    width: '90%',
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.greyDark,
    borderRadius: 5,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
