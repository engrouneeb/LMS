import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';
export const styles = StyleSheet.create({
  modalHeader: {
    width: '100%',
    height: 80,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: whiteThemeColors.greyLite,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: whiteThemeColors.black,
    shadowRadius: 3,
    shadowOpacity: 0.05,
    backgroundColor: whiteThemeColors.primary,
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 24,
    fontFamily: CommonStyles.fonts.semiBold,
    paddingLeft: 15,
    paddingVertical: 5,
  },
  btn: {
    position: 'absolute',
    bottom: 4,
    right: 15,
    alignItems: 'flex-end',
  },
});

export const style2 = StyleSheet.create({
  addressContainer: {
    backgroundColor: whiteThemeColors.white + 90,
    padding: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  addressTitle: {
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.medium,
  },
  adressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherAddress: {
    flexDirection: 'row',
    marginTop: 5,
  },
  adressInfoText: {
    marginLeft: 10,
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
  contactInfoContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: whiteThemeColors.greyLite,
    height: 50,
    marginTop: 10,
  },
  contactTitle: {
    fontSize: 12,
    color: whiteThemeColors.greyDark,

    position: 'absolute',
    top: -10,
    left: 10,
    paddingHorizontal: 10,
    fontFamily: CommonStyles.fonts.medium,
  },
  otherInfo: {
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 20,
  },
  education: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  educationTitle: {
    fontSize: 12,

    width: 80,
    color: whiteThemeColors.primary,
    marginLeft: 8,
  },
  educationText: {
    width: '70%',
    fontSize: 12,
    color: whiteThemeColors.greyDark,
  },
  CurrentEmployment: {
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
    backgroundColor: whiteThemeColors.white,
    borderRadius: 5,
    position: 'absolute',
    paddingHorizontal: 10,
    top: -10,
    left: 10,
    maxWidth: '70%',
  },
  payRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  payRange: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: -15,
    right: 15,
  },
  discription: {
    fontSize: 12,
    color: whiteThemeColors.primary,
  },
  payRangeText: {
    marginLeft: 5,
    fontSize: 11,
  },
  backgroundInfo: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,
  },
  detailscon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: whiteThemeColors.greyLite,
    paddingVertical: 15,
  },
  keyText: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.medium,
  },
  valueText: {
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
});
