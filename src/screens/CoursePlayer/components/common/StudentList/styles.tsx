import { Platform, StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingTxt: {
    // fontFamily: CommonStyles.fonts.universalAppFont,
    color: whiteThemeColors.primaryTextColor,
  },
  failureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  failureMsgTxt: {
    fontSize: 16,
    // fontFamily: CommonStyles.fonts.universalAppFont,
    color: whiteThemeColors.primaryTextColor,
    textTransform: 'capitalize',
  },
  itemContainer: {
    marginHorizontal: 10,
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 15,
    marginTop: 5,
  },
  itemBtn: {
    height: 75,
    marginLeft: 0,
    borderBottomColor: whiteThemeColors.primary,
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    paddingRight: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameAvatarContainer: {
    backgroundColor: whiteThemeColors.primary,
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
  },
  nameAvatarTxt: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: Platform.OS == 'ios' ? 1 : 0,
    // fontFamily: CommonStyles.fonts.universalAppFont,
    color: whiteThemeColors.white,
  },
  nameTxt: {
    fontSize: 14,
    textTransform: 'capitalize',
    // fontFamily: CommonStyles.fonts.universalAppFont,
    color: whiteThemeColors.lightBlack,
    marginLeft: 15,
    fontFamily: CommonStyles.fonts.medium,
  },
  noStdFoundTxt: {
    alignSelf: 'flex-end',
    marginTop: 200,
    fontSize: 14,

    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
});
