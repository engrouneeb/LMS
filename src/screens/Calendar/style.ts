import { StyleSheet } from 'react-native';
import CommonStyles from '../CommonStyles';
import { whiteThemeColors } from '../../Utilities';

export const styles = StyleSheet.create({
  calendar: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 15,
    paddingVertical: 5,
  },
  months: {
    backgroundColor: 'whitesmoke',
    width: 90,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 6,
  },
  selectedMonth: {
    backgroundColor: whiteThemeColors.primary,
    width: 110,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedDay: {
    fontSize: 14,
    color: 'black',
    fontFamily: CommonStyles.fonts.semiBold,
  },
  selectedMonthText: {
    color: whiteThemeColors.white,
    fontSize: 13,
    paddingHorizontal: 5,
  },
  monthText: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.medium,
  },
  week: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayBase: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: -4,
    borderRadius: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'lightgray',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  cardsContainer: {
    backgroundColor: whiteThemeColors.white + 90,
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
    alignSelf: 'center',
  },
  innerContainer: {
    padding: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: whiteThemeColors.primary + 50,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: whiteThemeColors.white + 90,
  },
  emptyListText: {
    fontSize: 12,
    marginTop: 20,
    fontFamily: CommonStyles.fonts.regular,
  },
  listEmptyContainer: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooter: {
    marginTop: 5,
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
