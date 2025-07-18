import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../../Utilities';

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
    fontFamily: CommonStyles.fonts.semiBold,
  },
  details: {
    fontSize: 11,
    paddingLeft: 10,
    color: whiteThemeColors.greyDark,
    width: '63%',
    fontFamily: CommonStyles.fonts.regular,
  },
  reciverName: {
    fontSize: 12,
    overflow: 'hidden',
    width: '38%',
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  avatarText: {
    color: whiteThemeColors.white,
    fontSize: 15,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  cardContainer: {
    width: '95%',
    backgroundColor: whiteThemeColors.white + 90,
    marginTop: 10,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.red + 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    backgroundColor: whiteThemeColors.green + 20,
  },
  tag: {
    width: 80,
    height: 15,
    marginBottom: 3,
    borderRadius: 5,
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
