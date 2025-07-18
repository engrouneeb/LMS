import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../Utilities';
export const styles = StyleSheet.create({
  card: {
    width: '95%',
    marginTop: 10,
    backgroundColor: whiteThemeColors.white + 90,
    height: 90,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pressableStyle: {
    width: '100%',
    borderBottomWidth: 0,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    marginHorizontal: 10,
  },

  nameText: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
    marginBottom: -1,
    color: whiteThemeColors.primaryTextColor,
  },
  bodyText: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.medium,
    color: whiteThemeColors.black,
  },
  weekDays: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },

  coloredDayNameTxt: {
    fontSize: 8,
    paddingTop: 5,
    textAlign: 'center',
    marginHorizontal: 5,
    height: 25,
    width: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    overflow: 'hidden',
    fontFamily: CommonStyles.fonts.medium,
    color: whiteThemeColors.white,
  },
  cardDetailsContainer: { marginHorizontal: 10 },
  savingScheduleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  savingScheduleSubContainer: {
    height: 120,
    width: 120,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: whiteThemeColors.background,
    paddingVertical: 10,
  },
  savingScheduleTxt: {
    fontSize: 17,
    color: whiteThemeColors.greyDark,
  },
});
