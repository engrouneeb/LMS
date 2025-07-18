import { StyleSheet } from 'react-native';
import CommonStyles from '../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    flex: 1,
  },
  messageContianer: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
  },
  descriptionText: {
    fontFamily: CommonStyles.fonts.regular,
    size: 10,
    color: '#555555',
    textAlign: 'left',
  },
  card: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 10,
  },

  iconBackground: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${whiteThemeColors.primary}30`,

    borderColor: `${whiteThemeColors.primary}90`,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  classesWrapper: {
    padding: 15,
    paddingTop: 0,
  },
  courseName: {
    width: '100%',
    fontSize: 13,
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.black + 90,
  },
  courseNameText: {
    fontSize: 12,
    color: 'black',
    fontFamily: CommonStyles.fonts.semiBold,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    width: '100%',
    fontFamily: CommonStyles.fonts.semiBold,
    marginLeft: 5,
  },
  timeText: {
    fontSize: 16,
    width: '100%',
    fontFamily: CommonStyles.fonts.semiBold,
    marginLeft: 8,
  },
  checkText: {
    fontSize: 13,

    fontFamily: CommonStyles.fonts.medium,
  },
  checkTextKey: {
    fontSize: 13,
    color: 'gray',
    fontFamily: CommonStyles.fonts.medium,
  },
  cardContainer: {
    width: '98%',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  containertwo: {
    width: '95%',
    backgroundColor: whiteThemeColors.primary + 20,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
  classContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  checkinContainer: {
    justifyContent: 'space-between',
    width: '50%',
    padding: 10,
    paddingLeft: 20,
  },
  historyContainer: {
    width: 35,
    height: 35,
    backgroundColor: whiteThemeColors.primary + 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 5,
  },
});
