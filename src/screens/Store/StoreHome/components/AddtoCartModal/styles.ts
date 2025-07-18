import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
  },
  modalView: {
    position: 'absolute',
    bottom: 1,
    width: '100%',
    backgroundColor: whiteThemeColors.background,
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
  headText: {
    color: whiteThemeColors.primaryTextColor,
    fontSize: 20,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  titleText: {
    fontSize: 10,
    color: 'gray',
    fontFamily: CommonStyles.fonts.medium,
  },
  valueText: {
    fontSize: 10,
    fontFamily: CommonStyles.fonts.bold,
  },
  input: {
    marginBottom: 10,
    height: 35,

    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 10,
    justifyContent: 'center',
  },
  textboxTitle: {
    paddingVertical: 5,
    fontSize: 12,

    fontFamily: CommonStyles.fonts.semiBold,
    marginLeft: 5,
    color: whiteThemeColors.primaryTextColor,
    marginTop: 5,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: whiteThemeColors.white,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    paddingLeft: 15,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,
  },
  section: {
    marginTop: 10,
    marginLeft: 5,
  },
});
