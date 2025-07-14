import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../../CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 0,
    width: '100%',
  },
  subContainer: { width: '100%', paddingVertical: 14, marginTop: 3 },
  flexDirectionRow: { flexDirection: 'row' },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  cardCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  arrowIcon: {
    padding: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
  },
  userNameTitle: {
    marginTop: -5,
    paddingBottom: 0,

    marginLeft: 15,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.primaryTextColor,
  },
  roleText: {
    fontSize: 10,
    marginLeft: 16,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
    marginTop: Platform.OS == 'ios' ? -1 : -5,
  },
  summaryContainer: {
    position: 'absolute',
    top: 0,
    paddingTop: 2,
    right: 5,
    flexDirection: 'row',
    paddingRight: 2,
  },
  summaryBtn: {
    alignItems: 'center',
    marginRight: 4,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    backgroundColor: whiteThemeColors.primary + '10',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  summaryText: {
    fontSize: 10,
    marginRight: 5,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  eyeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBtnContainer: {
    position: 'absolute',
    bottom: 10,
    right: 7,
    borderRadius: 10,
    backgroundColor: whiteThemeColors.primary + 30,
  },
});
