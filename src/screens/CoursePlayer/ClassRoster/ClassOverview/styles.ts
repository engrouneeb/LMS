import { Platform, StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteThemeColors.background,
    flex: 1,
    flexGrow: 1,
  },
  cardContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: whiteThemeColors.background,
    paddingVertical: 20,
    marginVertical: 8,
  },
  courseName: {
    fontFamily: CommonStyles.fonts.medium,
    fontSize: 14,
  },
  classTime: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.black,
    marginVertical: 5,
    textAlign: "center"
  },
  innerContainer: {
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '90%',
    borderRadius: 20,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
    backgroundColor: whiteThemeColors.white + 90,
  },
  instructorViewBg: {
    backgroundColor: whiteThemeColors.primary + 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 10,
    width: "95%",
    alignSelf: "center"
  },
  instructorName:
  {
    fontSize: 10,
    marginLeft: 5,
    color: whiteThemeColors.white,
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
  inner: {
    width: '100%',
    backgroundColor: whiteThemeColors.white + 90,
    padding: 10,
    borderRadius: 10,
  },
  key: {
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  key2: {
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 10,
    color: 'gray',
    marginTop: 10,
  },
  value: {
    fontFamily: CommonStyles.fonts.medium,
    fontSize: 14,
  },
  week: {
    // width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: whiteThemeColors.greyLite,
    marginTop: 10,
    backgroundColor: whiteThemeColors.primary + 20,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 5,
  },
  fromInn: {
    width: '50%',
    justifyContent: 'flex-start',
  },
  inst: {
    borderRadius: 5,
    backgroundColor: whiteThemeColors.primary + 90,
    padding: 3,
    marginTop: 5,
    marginLeft: 2,
  },
  staffCon: {
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 10,
    marginTop: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  days: {
    flexDirection: "row",
    height: 30,
    width: 30,
    borderRadius: 8,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rosterBtnWrapper: { position: "absolute", top: 20, right: 20, zIndex: 10, backgroundColor: whiteThemeColors.primary + 90, height: 30, width: 100, borderRadius: 8 },
  rosterBtn: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.white,
    marginVertical: 5,
    textAlign: "center"
  }
});
