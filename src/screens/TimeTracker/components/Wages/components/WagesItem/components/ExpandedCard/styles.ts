import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../../../Utilities';

export const styles = StyleSheet.create({
  mainContainer: {
    overflow: 'hidden',
    width: '100%',
  },
  cardContainer: {
    // width: '100%',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // overflow: 'hidden',
    // borderRadius: 10,
    // // backgroundColor: whiteThemeColors.white,
    // paddingVertical: 2,
    // marginVertical: 8,
  },
  inner2Container: {
    alignItems: 'center',
    paddingVertical: 15,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
    backgroundColor: whiteThemeColors.primary + 20,
    width: '100%',
    paddingTop: 0,

    borderRadius: 20,
    paddingHorizontal: 0,
    marginBottom: 15,
  },
  cardHeader: {
    // backgroundColor: whiteThemeColors.primary,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
    // height: 25,
  },
  cardHeaderText: {
    textTransform: 'capitalize',
    fontSize: 16,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
    marginLeft: 20,
    marginTop: 15,
    // padding: 10,
    // textAlign: 'center',
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoRowLeftView: {
    width: '50%',
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 12,
    opacity: 0.7,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  text_card: {
    paddingLeft: 2,
    paddingRight: 10,
    fontSize: 12,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.medium,
    marginBottom: 5,
  },
  detailbtn: {
    height: 20,
    borderRadius: 10,
    alignSelf: 'flex-end',
    elevation: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary,
    position: 'absolute',
    right: 10,
    top: 40,
  },
  detailbtnText: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
    alignSelf: 'center',
    color: whiteThemeColors.white,
  },
});
