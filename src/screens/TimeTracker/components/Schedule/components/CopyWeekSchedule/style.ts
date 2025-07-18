import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../../CommonStyles';
import { isTablet, whiteThemeColors } from '../../../../../../Utilities';

export const styles = StyleSheet.create({
  listViewLeftSide: {
    flex: 0.33,
  },
  leftListItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: whiteThemeColors.primary,
  },
  listViewRightSide: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    display: 'flex',
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: whiteThemeColors.white + 90,
    marginTop: 10,
    marginHorizontal: 0,
    padding: 15,
    borderRadius: 20,
  },
  cardTitleTxt: {
    fontSize: 16,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.medium,
  },
  monthText: {
    fontSize: 18,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.white,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  datesText: {
    fontSize: 12,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.medium,
  },
  copyToText: {
    color: whiteThemeColors.black,
    paddingHorizontal: 20,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  timeText: {
    color: whiteThemeColors.primaryTextColor,
    fontSize: 16,
  },
  yearText: {
    color: whiteThemeColors.black,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  yearNameText: {
    color: whiteThemeColors.primaryTextColor,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  dropDownStyle: {
    marginTop: 10,
    width: '48%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  ddContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 2,
    borderColor: whiteThemeColors.greyDark,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  ddSubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

    width: 160,
  },
  dropDownItemContainer: {
    flexDirection: 'row',
    height: 35,
    alignItems: 'center',
    backgroundColor: whiteThemeColors.background,
    borderRadius: 5,
    paddingVertical: 5,
  },
  dropDownItemTxt: {
    color: whiteThemeColors.black,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.regular,
  },
  copyButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitleContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  yeadMonthsDDContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  monthContainer: {
    flex: 1,
    left: 15,
    marginTop: 20,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: whiteThemeColors.background,
  },
  flatListStyle: {
    width: '100%',
    height: isTablet ? '95%' : Platform.OS === 'ios' ? '81%' : '80%',
    zIndex: 100,
    marginBottom: 60,
  },
});
