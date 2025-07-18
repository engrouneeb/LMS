import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../Utilities';

export const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: whiteThemeColors.background,
    paddingVertical: 10,
    marginVertical: 8,
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '95%',
    borderRadius: 15,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',

    backgroundColor: whiteThemeColors.white + 90,
  },
  infoContainer: {
    width: '100%',
  },
  labelText: {
    fontSize: 13,
    opacity: 0.7,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.medium,
  },
  text: {
    paddingLeft: 2,
    paddingRight: 10,
    fontSize: 13,
    color: whiteThemeColors.greyDark,
    marginBottom: 10,
    fontFamily: CommonStyles.fonts.regular,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoRowLeftView: {
    minWidth: '50%',
    maxWidth: '75%',
  },
  infoRowRightView: {
    maxWidth: '25%',
  },
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
    paddingLeft: 15,
    paddingVertical: 5,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  btn: {
    position: 'absolute',
    bottom: 4,
    right: 15,
    alignItems: 'flex-end',
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
  editInfo: {
    borderColor: whiteThemeColors.primary,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    width: 20,
    marginHorizontal: 3,
    marginBottom: 3,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});
