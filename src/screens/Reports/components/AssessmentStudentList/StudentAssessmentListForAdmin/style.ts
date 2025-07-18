import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../Utilities';

export const Styles = StyleSheet.create({
  flatelist: {
    width: '100%',
    marginTop: 5,
  },
  List: {
    flex: 1,
    zIndex: 10,
    paddingVertical: 0,
    margin: 0,
  },
  cardContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: whiteThemeColors?.backgroundColor,
    paddingVertical: 5,
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 15,
    width: '92%',
    borderRadius: 15,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
    backgroundColor: whiteThemeColors.white + 90,
  },
  headerContainer: {
    paddingBottom: 5,
    marginHorizontal: 15,
    marginLeft: '8%',
    borderBottomWidth: 1,
    borderBottomColor: whiteThemeColors.primary,
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 16,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'capitalize',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },

  text: {
    paddingLeft: 5,
    fontSize: 13,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.bold,
  },
  noDataFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noDataFoundTxt: {
    fontSize: 20,

    color: whiteThemeColors.greyDark,
    marginTop: 20,
  },
  viewBtn: {
    borderRadius: 3,
    alignSelf: 'flex-start',
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingVertical: 6,
  },
  viewBtnTxt: {
    textTransform: 'capitalize',
    fontSize: 10,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts?.semiBold,
    alignSelf: 'center',
  },
});
