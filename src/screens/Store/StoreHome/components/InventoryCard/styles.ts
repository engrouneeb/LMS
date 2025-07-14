import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  redeemCodeContainer: {
    backgroundColor: '#d4af37',
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 3,
    marginTop: 3,
    width: '90%',
  },
  redeemCodeSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  redeemCodeTitle: {
    color: whiteThemeColors.white,
    fontWeight: '500',
    marginLeft: 5,
    fontSize: 11,
    marginTop: 2,
  },
  redeemCode: {
    color: whiteThemeColors.white,
    fontWeight: '700',
    marginTop: 1.2,
    fontSize: 12,
  },
  actionBtn: {
    marginTop: -18,
    marginRight: -20,
    elevation: 10,
    zIndex: 10,
  },
  parentContainer: {
    justifyContent: 'center',
    paddingBottom: 10,
    flex: 1,
  },
  idView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redeemCodeBtn: {
    backgroundColor: whiteThemeColors.primary + 20,
    width: 120,
    height: 25,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: whiteThemeColors.white + 90,
    marginHorizontal: 10,
    borderRadius: 20,

    flex: 0.4,
  },
  titleText: {
    fontSize: 10,
    color: 'gray',
    fontFamily: CommonStyles.fonts.regular,
  },
  valueText: {
    fontSize: 10,
    fontFamily: CommonStyles.fonts.medium,
  },
  totalPaymentCost: {
    color: whiteThemeColors.white,
    textAlign: 'center',
    marginLeft: 5,
    fontSize: 10,
    fontFamily: CommonStyles.fonts.regular,
  },
  achievementPoints: {
    color: whiteThemeColors.white,
    textAlign: 'center',
    fontSize: 10,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.regular,
  },
  quantityWithPayment: {
    color: whiteThemeColors.white,
    textAlign: 'center',
    marginLeft: 6,
    fontSize: 10,
  },
  nameText: {
    fontSize: 15,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.primary,
  },
  costContainer: {
    height: '80%',

    borderRadius: 15,
    backgroundColor: whiteThemeColors.primary + 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 10,
    flex: 0.4,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  cartIconContainer: {
    backgroundColor: '#08a6a3',
    borderRadius: 16,
    position: 'absolute',
    zIndex: 5,
    right: 10,
    bottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inCartView: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: whiteThemeColors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    // borderTopRightRadius: 15,
    // borderBottomRightRadius: 15,
  },
  adminCard: {
    justifyContent: 'center',
    padding: 15,
    flex: 0.6,
  },
});
