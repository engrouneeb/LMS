import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../../CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    backgroundColor: whiteThemeColors.transparent,
    width: '95%',
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    minHeight: 150,
    flex: 0.7,
    width: '96%',
    borderRadius: 10,
    backgroundColor: whiteThemeColors.white + 90,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
    padding: 20,
  },
  btn: {
    height: 45,
    marginVertical: 10,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 1,
    zIndex: 1,
    shadowColor: whiteThemeColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
    elevation: 2,
  },
  keyText: {
    fontSize: 12,
    color: whiteThemeColors.black,
    marginTop: 4,
    fontFamily: CommonStyles.fonts.medium,
  },
  valueText: {
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    marginTop: 4,
    fontFamily: CommonStyles.fonts.medium,
    width: 'auto',
  },
  iconsStyles: {
    // position: 'absolute',
    // right: 0,
    // bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: whiteThemeColors.primary + 40,
    width: 35,
    height: 35,
    borderRadius: 8,
  },
  nameView: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    justifyContent: 'space-between',
  },
  calenderIcon: {
    // position: 'absolute',
    right: 0,
    // top: -100,

    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary + 40,
    width: 35,
    height: 35,
    borderRadius: 8,

    alignItems: 'center',
  },
  timingTxt: {
    fontSize: 10,
    marginTop: 3,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
