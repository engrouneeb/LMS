import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
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
    borderRadius: 35,
    backgroundColor: whiteThemeColors.background,
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
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },

  headerContainer: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.primary + 30,

    borderRadius: 10,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  modalInsideView: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: CommonStyles.fonts.semiBold,
    marginTop: 15,
  },
  sureText: {
    fontFamily: CommonStyles.fonts.light,
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
  totalText: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: CommonStyles.fonts.medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 8,
    backgroundColor: 'gray',
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    // paddingVertical:10
  },
  cancelText: {
    color: whiteThemeColors.white,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
    textAlign: 'center',
  },
  confirmButton: {
    marginTop: 8,
    backgroundColor: whiteThemeColors.primary,
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    height: 40,
    alignItems: 'center',
  },
  confirmText: {
    color: whiteThemeColors.white,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
