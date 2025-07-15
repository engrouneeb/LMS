import { wp } from "../../Helpers/Responsiveness";
import { StyleSheet, Platform, Dimensions } from "react-native";
import { isTablet } from "react-native-device-info";
import CommonStyles from "../CommonStyles";
import { whiteThemeColors } from '../../Utilities/colors';
const deviceWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    bgColor: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: whiteThemeColors.white,
    },
    pageContainer: {
      flex: 1,
      width: deviceWidth,
      // height: null,
      alignItems: 'center',
    },
    LogoContainer: {
      height: 100,
      alignItems: 'stretch',
      justifyContent: 'center',
      marginTop: 50,
      width: deviceWidth - 50,
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 30,
    },
    formContainer: {
      backgroundColor: whiteThemeColors.contentBg,
      padding: 20,
    },
    imgResponsive: {
      width: deviceWidth - 120,
      height: 100,
    },
    fields: {
      marginTop: 20,
      backgroundColor: whiteThemeColors.white,
      borderColor: whiteThemeColors.white,
    },
    backbtn: {
      backgroundColor: whiteThemeColors.white,
      height: 45,
      width: 45,
      margin: 5,
      borderRadius: 45 / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Footer: {
      marginBottom: 20,
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'flex-end',
    },
    footerTxt: {
      textAlign: 'center',
      fontSize: 13,
    },
    arabicTextIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      left: 10,
      position: 'absolute',
    },
    englishTextIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      right: 10,
      position: 'absolute',
    },
    container: {
      justifyContent: 'space-around',
      flex: 1,
      paddingTop: 20,
    },
    userNameField: {
      borderColor: CommonStyles.borderGraishBlue.borderColor,
      height: isTablet() ? wp(8) : wp(14),
      marginTop: wp(7),
      paddingLeft: wp(4),
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: whiteThemeColors.white + 90,
      flexDirection: 'row',
      paddingRight: 20,
    },
    passwordField: {
      borderColor: CommonStyles.borderGraishBlue.borderColor,
      height: isTablet() ? wp(8) : wp(14),
      marginTop: wp(3),
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: whiteThemeColors.white + 90,
      paddingLeft: wp(4),
      flexDirection: 'row',
      paddingRight: 70,
    },
    loginButton: {
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginTop: wp(6),
      height: Platform.OS == 'ios' ? 50 : 54,
      // backgroundColor: whiteThemeColors.primary,
      backgroundColor: "#004BC0",
    },
    subContainer: {
      flexDirection: 'row',
      borderRadius: 25,
      marginTop: 30,
      width: '75%',
      paddingVertical: 5,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    button: {
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      borderBottomWidth: 1,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: '800',
      // color: whiteThemeColors.primary,
      color: "#004BC0",
  
      textAlign: 'justify',
      alignSelf: 'center',
      textTransform: 'capitalize',
    },
    buttonTxt: {
      fontSize: 18,
      fontWeight: '800',
      fontFamily: 'DroidArabicNaskh',
      // color: whiteThemeColors.primary,
      color: "#004BC0",
      textAlign: 'justify',
    },
  });