import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';

export const style = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previousBtn: {
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
  arrowLeft: {
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
  completeBtn: {
    width: '40%',
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
  completeText: {
    fontSize: 14,
    color: whiteThemeColors.textColor.darkGrayText,
    margin: 0,
    paddingRight: 0,
    color: 'white',
  },
  nextBtn: {
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
  btnText: {
    color: whiteThemeColors.textColor.darkGrayText,
    margin: 0,
    paddingRight: 0,
  },
  arrowRight: {
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
});
