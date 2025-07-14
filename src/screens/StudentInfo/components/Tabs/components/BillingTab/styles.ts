import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../../CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  scrollContentView: {
    flexGrow: 1,
    zIndex: -1,
  },
  stretchedView: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingView: {
    width: '102%',
    backgroundColor: whiteThemeColors.background,
    marginLeft: '-1%',
    height: 60,
    marginTop: -5,
    justifyContent: 'flex-end',
    paddingHorizontal: '3%',
  },
  heading: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.primaryTextColor,
  },
  itemContainer: {
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: whiteThemeColors.primary + 30,
    minHeight: 70,
    padding: 20,
  },
  textContainer: {
    paddingTop: 5,
  },
  headText: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  valueText: {
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.medium,
  },
  rowView: {
    flexDirection: 'row',
    width: '100%',
  },
  icon: {
    fontSize: 20,
    marginLeft: 10,
    color: whiteThemeColors.primaryDark,
  },
  paymentContainer: {
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: whiteThemeColors.greyLite,
  },
  removeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    height: 35,
    width: 55,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: whiteThemeColors.white + 90,
    borderColor: whiteThemeColors.red,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: whiteThemeColors.primary,
  },
  paymentView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
