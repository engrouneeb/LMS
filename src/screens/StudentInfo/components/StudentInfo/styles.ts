import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { hp } from '../../../../Helpers/Responsiveness';
import CommonStyles from 'screens/CommonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
  },
  card: {
    flexDirection: 'row',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    borderRadius: 10,
    borderColor: whiteThemeColors.list.listBorderColor,
    width: '100%',
    marginVertical: 5,
  },
  noStdFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noStdFoundTxt: {
    fontSize: 17,
    color: whiteThemeColors.greyDark,
    marginTop: 10,
    fontFamily: CommonStyles.fonts.regular,
  },
  ListItem: {
    width: '99%',
    height: hp(11),
    borderColor: whiteThemeColors.greyDark,
    borderRadius: 15,
    justifyContent: 'center',
    paddingLeft: 20,
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.white + 90,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    width: '100%',
  },
  stdName: {
    textAlign: 'left',
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.primary,
    width: '70%',
    fontSize: 16,
  },
  stdFamilyName: {
    textAlign: 'left',
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.greyDark,
    fontSize: 12,
  },
  badge: {
    height: 18,
    width: 60,
    paddingTop: 1,
    borderRadius: 5,
    marginLeft: 10,
    textAlign: 'center',
    borderWidth: 1,
    fontSize: 11,
    fontFamily: CommonStyles.fonts.regular,
    overflow: 'hidden',
  },
  active: {
    borderColor: whiteThemeColors.green,
    backgroundColor: whiteThemeColors.green + 10,
    color: whiteThemeColors.green,
  },
  inActive: {
    borderColor: whiteThemeColors.greyDark,
    backgroundColor: whiteThemeColors.greyDark + 10,
    color: whiteThemeColors.greyDark,
  },
  iconContainer: {
    width: 25,
    height: 25,
    borderRadius: 8,
    backgroundColor: whiteThemeColors.primary + 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 15,
  },
});
