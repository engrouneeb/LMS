import { Dimensions, Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../CommonStyles';
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
  },
  leftView: {
    width: 100,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchView: {
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: whiteThemeColors.white,
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
    fontSize: 16,

    color: whiteThemeColors.primaryTextColor,
    textTransform: 'capitalize',
  },
  reportView: {
    position: 'absolute',
    bottom: -5,
    right: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    zIndex: 100,
    backgroundColor: whiteThemeColors.background,
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
    width: '100%',
    height: Dimensions.get('window').height - 300,
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
    fontWeight: Platform.OS === 'android' ? 'bold' : '900',
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.universalAppFont1,
  },
});
