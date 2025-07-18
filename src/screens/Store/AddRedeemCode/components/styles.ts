import { StyleSheet } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { whiteThemeColors } from '../../../../Utilities';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
  },
  modalView: {
    height: 160,
    width: '90%',
    backgroundColor: whiteThemeColors.background,
    borderRadius: 10,
    padding: 25,
  },
  headText: {
    color: whiteThemeColors.primaryTextColor,
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  button: {
    justifyContent: 'center',
    height: 30,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.white,
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    fontSize: 13,
    fontFamily: CommonStyles.fonts.regular,
    height: 50,
    paddingLeft: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 8,
    alignItems: 'flex-end',
  },

  textInputContainer: {
    backgroundColor: whiteThemeColors.primary + 20,
    width: '100%',
    height: 50,
    marginTop: 10,
    borderRadius: 5,
  },
});
