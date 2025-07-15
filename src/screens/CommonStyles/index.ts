import { Dimensions } from 'react-native';
import { whiteThemeColors } from '../../Utilities';
import WhiteLabelConfig from '../../WhiteLabelConfig';

// Map for Josefin Sans font weights
const isValhallan = WhiteLabelConfig.APP_VARIANT_NAME?.toLowerCase() === 'valhallan';
console.log({"isValhallan":isValhallan});

const josefinSansFonts = {
  regular: 'JosefinSans-Regular',
  bold: 'JosefinSans-Bold',
  semiBold: 'JosefinSans-SemiBold',
  light: 'JosefinSans-Light',
  medium: 'JosefinSans-Medium',
  thin: 'JosefinSans-Thin',
};

const montserratFonts = {
  regular: 'Montserrat-Regular',
  bold: 'Montserrat-Bold',
  semiBold: 'Montserrat-SemiBold',
  light: 'Montserrat-Light',
  medium: 'Montserrat-Medium',
  thin: 'Montserrat-Thin',
};

const fontMap = isValhallan ? josefinSansFonts : montserratFonts;

const universalAppFont1 = fontMap.regular;
const universalAppFontBold = fontMap.semiBold;
const tabBarFont = fontMap.thin;
const bold = fontMap.bold;
const light = fontMap.light;
const regular = fontMap.regular;
const semiBold = fontMap.semiBold;
const medium = fontMap.medium;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const imgWidth = deviceWidth > 480 ? 330 : 230;
const imgheight = deviceWidth > 480 ? 130 : 100;
const TopHeadingFontSize = deviceWidth > 480 ? 24 : 16;


let CommonStyles = {
  imgResponsive: {
    width: imgWidth,
    height: imgheight,
  },
  bgColor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,126,255,1)',
  },
  themeClr: {
    backgroundColor: whiteThemeColors.primary,
  },
  appBackgroundColor: {
    backgroundColor: whiteThemeColors.background,
  },
  backbtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullHeight: deviceHeight,
  fullWidth: deviceWidth,
  BoxShadow: {
    shadowColor: whiteThemeColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.28,
    shadowRadius: 0.5,

    elevation: 1,
  },
  shadow: {
    shadowColor: whiteThemeColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  BtnTxt: {
    fontWeight: '500',
    fontSize: 20,
  },
  TopHeading: {
    fontSize: TopHeadingFontSize,
  },
  //MArgins
  m0: {
    margin: 0,
  },
  mL0: {
    marginLeft: 0,
  },
  mL10: {
    marginLeft: 10,
  },
  mL20: {
    marginLeft: 20,
  },
  mT5: {
    marginTop: 5,
  },
  mT20: {
    marginTop: 20,
  },
  mT10: {
    marginTop: 10,
  },
  m20: {
    margin: 20,
  },
  mh20: {
    marginLeft: 20,
    marginRight: 20,
  },

  //Colors
  LinkColor: {
    color: '#0000EE',
  },

  //Border Colors
  borderGraishBlue: {
    borderColor: whiteThemeColors.greyDark,
  },
  borderBlue: {
    borderColor: whiteThemeColors.primary,
  },
  //BG Colors
  themeBg: {
    backgroundColor: whiteThemeColors.primary,
  },
  Bgwhite: {
    backgroundColor: whiteThemeColors.white,
  },
  BgGray: {
    backgroundColor: whiteThemeColors.greyLite,
  },
  BgError: {
    color: whiteThemeColors.BgError.color,
  },
  BgWarring: {
    color: whiteThemeColors.BgWarring.color,
  },
  //Text Alingment
  textCenter: {
    textAlign: 'center',
  },
  //App Font Familay
  textFont: {
    // fontFamily: universalAppFont,
  },
  /////////////////////////
  //Padding Left 10
  pL20: {
    paddingLeft: 20,
  },
  //padding 10
  p10: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  p0: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  pv0: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  pT0: {
    paddingTop: 0,
  },
  pL0: {
    paddingLeft: 0,
  },
  pR0: {
    paddingRight: 0,
  },
  p15: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },

  //
  breadCrumb: {
    backgroundColor: whiteThemeColors.white,
    flexDirection: 'row',
    padding: 10,
  },
  breadCrumbIcon: {
    fontSize: 20,
    flex: 1,
  },
  breadCrumbText: {
    flex: 8,
    fontWeight: '400',
  },
  p5: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },

  // fontSizes
  fntS14: {
    fontSize: 14,
    // fontFamily: universalAppFont,
  },
  // Colors
  bb1Gainsboro: {
    borderBottomColor: whiteThemeColors.cyan,
    width: 1,
  },
  // Class Name User Name Standard Size
  className: {
    fontSize: 14,
    color: whiteThemeColors.primary,
    fontFamily: regular,
  },
  classNameInModal: {
    fontSize: 16,

    // fontFamily: universalAppFont,
  },
  classTime: {
    // color: "#414042",
    fontSize: 15,
    // fontFamily: universalAppFont,
  },
  userName: {
    fontWeight: '500',
    paddingBottom: 0,
    fontSize: 14,
    // fontFamily: universalAppFont,
  },
  tagStyle: {
    marginLeft: 10,
    paddingTop: 1,
    paddingBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: whiteThemeColors.green,
    alignSelf: 'flex-start',
  },
  // standard Body style
  body: {
    flex: 8,
    flexDirection: 'column',
    paddingBotton: 0,
    paddingLeft: 5,
    borderBottomWidth: 0,
    borderBottomColor: whiteThemeColors.black,
  },
  // Standard Right Style
  right: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // Standard Left Style
  left: {
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  // Card Item Style
  cardStyle: {
    borderColor: whiteThemeColors.cardColor.cardGrayBorder,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 15,
  },
  cardStyle1: {
    borderRadius: 30,
  },
  fonts: {
    universalAppFont1: universalAppFont1,
    universalAppFontBold: universalAppFontBold,
    universalAppFont2: tabBarFont,
    bold: bold,
    semiBold: semiBold,
    light: light,
    regular: regular,
    medium: medium,
  },
  changeStyles: function (fontFamily: any) {
    // this.fonts.universalAppFont = fontFamily;
    this.textFont = { ...this.textFont, ...{ fontFamily: fontFamily } };
    this.userName = { ...this.userName, ...{ fontFamily: fontFamily } };
    this.className = { ...this.className, ...{ fontFamily: fontFamily } };
    this.classTime = { ...this.classTime, ...{ fontFamily: fontFamily } };
    this.BtnTxt = { ...this.BtnTxt, ...{ fontFamily: fontFamily } };
    this.fntS14 = { ...this.fntS14, ...{ fontFamily: fontFamily } };
    this.TopHeading = { ...this.TopHeading, ...{ fontFamily: fontFamily } };
  },
};

export default CommonStyles;

export let appFont = (lan: any) => {
  if (lan === 'Arabic') {
    CommonStyles.changeStyles('DroidArabicNaskh');
  } else if (lan === 'English') {
    CommonStyles.changeStyles('poppins-Regular');
  } else {
    CommonStyles.changeStyles('poppins-Regular');
  }
};
