import { Platform, StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from '../../../Utilities/colors';

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.6)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: whiteThemeColors.background,
    height: '90%',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: whiteThemeColors.primary,
    width: '80%',
    textAlign: 'center',
  },
  closeButton: {
    alignItems: 'flex-start',
    marginTop: 5,
    marginLeft: 5,
    borderColor: whiteThemeColors.primary,
    borderRadius: 30,
    borderWidth: 2,
    marginBottom: 10,
  },
  timeDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    height: 80,
    borderRadius: 12,
    backgroundColor: whiteThemeColors.white,
  },
  timeDateWrapper: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dateTimeTextContainer: {
    marginLeft: 10,
  },
  dateText: {
    color: whiteThemeColors.black + 90,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  timeText: {
    color: whiteThemeColors.black,
    fontSize: 24,
    fontFamily: CommonStyles.fonts.bold,
    marginTop: 5,
  },
  separator: {
    height: 3,
    marginTop: 10,
    width: '100%',
    backgroundColor: whiteThemeColors.black + 15,
  },
  contentContainer: {
    height: Platform.OS == 'android' ? '53%' : '59%',
    width: '100%',
  },
  sectionTitle: {
    margin: 20,
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  list: {
    width: '100%',
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  btnStyle: {
    backgroundColor: whiteThemeColors.primary,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnText: {
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.white,
  },
  detailContainer: {
    height: 70,
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: whiteThemeColors.primary + 30,
    width: 40,
    height: 40,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTextContainer: {
    marginLeft: 15,
    width: '40%',
  },
  row: {
    flexDirection: 'row',
  },
  labelText: {
    marginLeft: 5,
    color: whiteThemeColors.primary,
  },
  detailText: {
    color: whiteThemeColors.primary,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
    width: '80%',
    marginLeft: 25,
  },
  renderItemContainer: {
    marginTop: 5,
  },
  renderItemRow: {
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: whiteThemeColors.greyDark,
    backgroundColor: whiteThemeColors.background,
    borderWidth: 0.5,
    borderRadius: 12,
    height: 60,
    width: '95%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  renderItemIconWrapper: {
    flexDirection: 'row',
    width: '50%',
  },
  renderItemIcon: {
    backgroundColor: whiteThemeColors.primary + 30,
    width: 35,
    height: 35,
    borderRadius: 6,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderItemTextWrapper: {
    marginLeft: 5,
  },
  renderItemTimeText: {
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  logContainer: {
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: whiteThemeColors.white,
    borderColor: whiteThemeColors.greyLite,
    width: '95%',
    marginLeft: 10,
    justifyContent: 'center',
    paddingVertical: 15,
  },
  noLogsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
