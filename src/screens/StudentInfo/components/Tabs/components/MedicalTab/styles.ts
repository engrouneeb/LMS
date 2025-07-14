import { Platform, StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: whiteThemeColors.background,
    paddingVertical: 10,
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '93%',
    minHeight: 150,
    borderRadius: 15,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
    backgroundColor: whiteThemeColors.white + 90,
  },
  textContainer: {
    width: '90%',
  },
  headerContainer: {
    marginLeft: '10%',
    paddingBottom: 5,
    marginHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: whiteThemeColors.primaryDark,
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 20,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.bold,
  },
  text: {
    paddingRight: 15,
    fontSize: 12,
    textAlign: 'justify',
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
  noInfo: {
    color: whiteThemeColors.lightBlack,
    fontFamily: CommonStyles.fonts.regular,
    marginTop: 10,
  },
  noInfoView: {
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
});
