import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../../../Utilities';

export const styles = StyleSheet.create({
  innerContainer: {
    minHeight: 100,
    padding: 15,
    width: '95%',
    borderRadius: 15,
    backgroundColor: whiteThemeColors.white + 90,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  courseText: {
    borderRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 15,
    maxWidth: '60%',
    alignSelf: 'flex-start',
    fontSize: 15,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  levelContainer: {
    paddingLeft: 15,
    borderTopWidth: 0.5,
    borderColor: whiteThemeColors.black + 20,
    paddingTop: 20,
    marginVertical: 20,
  },
  levelText: {
    color: whiteThemeColors.greyDark,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: CommonStyles.fonts.medium,
  },
  starContainer: {
    marginLeft: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    right: 5,
  },
  starContainer2: {
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
    marginBottom: -1,
  },
  imgContainer: {
    alignSelf: 'flex-end',
    backgroundColor: whiteThemeColors.transparent,
    borderRadius: 8,
    marginTop: 10,
  },
  txt: {
    alignSelf: 'center',
    zIndex: 1,
    position: 'absolute',
  },
  arrowIcon: {
    width: 30,
    height: 30,
    backgroundColor: whiteThemeColors.primary + 30,
    position: 'absolute',
    right: 10,
    borderRadius: 10,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCertibtn: {
    width: 100,
    height: 25,
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 7,
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 10,
    color: whiteThemeColors.primary,
  },
});
