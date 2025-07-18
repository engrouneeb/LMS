import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.white + 90,

    height: 120,
    width: '96%',
    borderRadius: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  cardItemKeyText: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
    marginTop: 2,
  },
  succeed: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 8,
  },
  receiptIcon: {
    backgroundColor: whiteThemeColors.white,
    alignItems: 'center',
    position: 'absolute',
    bottom: 27,
    right: 28,
  },
  dateText: {
    fontSize: 8,
    color: whiteThemeColors.greyDark + 90,
    fontFamily: CommonStyles.fonts.regular,
    position: 'absolute',
    bottom: 5,
  },
  cardItemValueText: {
    fontSize: 10,
    fontFamily: CommonStyles.fonts.semiBold,
    marginLeft: 5,
    marginTop: 2,
  },

  cardActiveValueText: {
    fontSize: 18,
    fontFamily: CommonStyles.fonts.semiBold,
    marginLeft: 5,

    color: whiteThemeColors.black,
  },
  cardRightText: {
    fontSize: 10,
    fontFamily: CommonStyles.fonts.medium,
    marginLeft: 5,

    color: whiteThemeColors.black,
  },
  transactionStatusText: {
    fontSize: 10,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
    padding: 4,
  },
  costContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  detailsContainer: {
    flex: 4,
    // justifyContent: 'center',
    marginLeft: 10,
    paddingVertical: 7,
  },
  statusContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusView: {
    backgroundColor: whiteThemeColors.green,
    borderRadius: 5,
    paddingHorizontal: 2,
  },
  statusView2: {
    backgroundColor: whiteThemeColors.green,
    borderRadius: 5,
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
});
