import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  innerContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: whiteThemeColors.primary,
    marginLeft: -10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 15,
    marginLeft: 10,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
  },
  details: {
    fontSize: 11,
    marginLeft: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
  avatarText: {
    color: whiteThemeColors.white,
    fontSize: 15,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'uppercase',
  },
  cardContainer: {
    width: '95%',
    backgroundColor: whiteThemeColors.white + 90,
    marginTop: 10,
    borderRadius: 20,
    alignSelf: 'center',

    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  innerCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginTop: 5,
  },
  declineBtn: {
    height: 20,
    width: 70,
    borderRadius: 7,
    backgroundColor: whiteThemeColors.red + 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 10,
    color: whiteThemeColors.red,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  approveBtn: {
    height: 20,
    width: 70,
    borderRadius: 7,

    backgroundColor: whiteThemeColors.green + 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  tag: {
    width: 80,
    height: 20,
    marginBottom: 3,
    borderRadius: 8,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  tagText: {
    color: 'white',
    fontSize: 9,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  viewIn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
