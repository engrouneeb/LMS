import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
  },
  modalView: {
    height: 250,
    width: '90%',
    backgroundColor: whiteThemeColors.background,
    borderRadius: 25,
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
  headText: {
    color: whiteThemeColors.primaryTextColor,
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.primary + 40,
    borderRadius: 9,
    width: 25,
    height: 25,
    marginTop: -8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    width: '100%',
    minHeight: 60,
    maxHeight: 120,
    textAlignVertical: 'top',
    marginTop: 5,
    textAlign: 'justify',
    marginHorizontal: 8,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 25,
  },
  button: {
    borderWidth: 0.5,
    padding: 5,
    justifyContent: 'center',
    maxWidth: 150,
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 13,

    fontFamily: CommonStyles.fonts.semiBold,
  },
  textinputContainer: {
    backgroundColor: whiteThemeColors.white + 90,
    width: '100%',
    height: 120,
    marginTop: 20,
    borderRadius: 15,
  },
  keyboardContainer: { flex: 1, height: '100%' },
});
