import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { whiteThemeColors } from 'utilities';
export const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    backgroundColor: whiteThemeColors.white,
  },
  stripeModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 120,
    backgroundColor: whiteThemeColors.greyDark + '80',
  },
  mainStripeView: {
    paddingVertical: 50,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
    paddingBottom: 60,
    minHeight: 450,
    marginTop: -70,
  },
  stretchedView: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 9,
    color: whiteThemeColors.red,
    alignSelf: 'flex-end',
    marginRight: 5,
    marginTop: 5,
  },
  paymentText: {
    fontSize: 13,
    marginHorizontal: 10,
    color: whiteThemeColors.greyDark,
  },
  paymentMethodContainer: {
    marginTop: 35,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: whiteThemeColors.white,
    ...CommonStyles.shadow,
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: whiteThemeColors.greyDark,
  },
  selectedRadioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: whiteThemeColors.primary,
  },

  radioInnerContainer: {
    height: 8.5,
    width: 8.5,
    borderRadius: 4.25,
    backgroundColor: whiteThemeColors.greyDark,
  },
  selectedRadioInnerContainer: {
    height: 8.5,
    width: 8.5,
    borderRadius: 4.25,
    backgroundColor: whiteThemeColors.primary,
  },
  heading: {
    fontSize: 25,
    marginBottom: 5,

    color: whiteThemeColors.primaryTextColor,
  },
  inputContainer: {
    paddingTop: 15,
  },
  headText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: whiteThemeColors.primaryTextColor,
  },
  inputStyle: {
    marginTop: 5,
    height: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    color: whiteThemeColors.greyDark,
    paddingHorizontal: 10,
    borderColor: whiteThemeColors.greyDark,
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
  scrollviewContainer: {
    flexGrow: 1,
    paddingVertical: 50,
  },
  btnWithIcon: {
    flexDirection: 'row',
    marginTop: 10,
  },
  arrowRight: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    margin: 10,
    right: 0,
  },
  container: {
    minHeight: 280,
    paddingHorizontal: 10,
  },
  debitCard: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  debitCardIcon: {
    width: 250,
    height: 200,
  },
  cardField: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
  },
  inputCon: {
    marginTop: 20,
    borderWidth: 0,
  },
  input: {
    marginTop: 2,
    borderRadius: 7,
    height: 38,
    borderWidth: 0.5,
    borderColor: whiteThemeColors.greyDark,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 10,
    paddingLeft: 5,
    color: whiteThemeColors.greyDark,
  },
  errorStatement: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 11,
    color: whiteThemeColors.red,
  },
  btn: {
    marginTop: 40,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backgroundColor: whiteThemeColors.primary,
  },
  btnText: {
    color: whiteThemeColors.white,
    fontSize: 15,
  },
  loaderContainer: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flex: 1,
  },
  infoTabCon: {
    width: 70,
    height: Platform.OS === 'ios' ? 80 : 67,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
  },
  titleTxt: {
    fontSize: 10,
    lineHeight: 10,
    fontFamily: CommonStyles.fonts.medium,
  },
});
