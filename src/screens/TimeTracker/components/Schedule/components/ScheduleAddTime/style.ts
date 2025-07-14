import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: whiteThemeColors.background,
  },
  rowDirection: {
    flexDirection: 'row',
  },
  txtInpContainer: {
    borderBottomWidth: 0,
    width: '100%',
    height: 100,
    marginTop: 10,
  },

  fieldContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  fieldTextContainer: {
    width: '90%',
    marginLeft: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headText: {
    color: whiteThemeColors.primary,
    fontSize: 14,
    letterSpacing: 2,
  },

  descriptionText: {
    width: '96%',

    fontFamily: CommonStyles.fonts.regular,

    borderRadius: 6,
    height: 90,
    paddingLeft: 10,
    textAlignVertical: 'top',
    backgroundColor: whiteThemeColors.white + 90,
  },

  timeCo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  topCalender: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.modalWhiteBG,
  },
});
