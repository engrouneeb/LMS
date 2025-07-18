import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  lefChevron: {
    marginRight: 5,
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.greyLite,
    shadowColor: whiteThemeColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  chevron: {
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
  nextText: {
    color: whiteThemeColors.textColor.darkGrayText,
    margin: 0,
    paddingRight: 0,
  },
  nextStep: {
    marginRight: 5,
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.greyLite,
    shadowColor: whiteThemeColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  previousStepText: {
    color: whiteThemeColors.textColor.darkGrayText,
    margin: 0,
    paddingRight: 0,
  },
  markAsComplete: {
    width: '35%',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.greyLite,
    shadowColor: whiteThemeColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
  },
  BtnTxt: {
    color: whiteThemeColors.textColor.darkGrayText,
    alignSelf: 'center',
  },
});
