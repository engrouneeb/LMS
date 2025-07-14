import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainView: {
    padding: 4,
    flex: 1,
    paddingHorizontal: 7,
    height: 110,
  },
  leftView: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 15,
    marginLeft: 10,
  },
  touchView: {
    borderRadius: 15,
    paddingVertical: 10,
    width: '97%',
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.white + 90,
    marginTop: 3,
  },
  midView: {
    marginLeft: -100,
    paddingLeft: 110,
    paddingRight: 20,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  mainText: {
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.primaryTextColor,
    textTransform: 'capitalize',
  },
  reportView: {
    position: 'absolute',
    bottom: -3,
    right: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: whiteThemeColors.primary + 30,
  },
  list: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: whiteThemeColors.list.listBorderColor,
    width: '96%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataTxt: {
    fontSize: 13,
    marginTop: 20,
    color: whiteThemeColors.greyDark,
  },

  renderItemSubContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  viewReportTxt: {
    fontSize: 9,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
