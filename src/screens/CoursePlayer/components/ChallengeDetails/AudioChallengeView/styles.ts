import { whiteThemeColors } from '../../../../../Utilities';
import { hasNotch } from 'react-native-device-info';
import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.primary + 30,
    paddingVertical: hasNotch() ? 60 : 20,
  },
  headerContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.bold,
    textTransform: 'capitalize',
    marginLeft: 15,
  },
  closeIcon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: whiteThemeColors.white,
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: whiteThemeColors.black,
    justifyContent: 'center',
  },
  chevronContainer: {
    width: '98%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
  },
  chevronButton: {
    backgroundColor: whiteThemeColors.primary + 30,
    shadowColor: whiteThemeColors.black,
    justifyContent: 'center',

    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 10,
    height: 45,
  },
  chevronLeft: {
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    color: whiteThemeColors.black,
  },
  previousText: {
    color: whiteThemeColors.black,
    margin: 0,
    paddingRight: 0,
    fontFamily: CommonStyles.fonts.medium,
  },
  markCompletedBtn: {
    width: '40%',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary + 30,

    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    marginRight: 5,
    borderRadius: 10,
  },
  markText: {
    fontSize: 14,
    color: whiteThemeColors.black,
    margin: 0,
    paddingRight: 0,
    fontFamily: CommonStyles.fonts.medium,
  },
  nextBtn: {
    backgroundColor: whiteThemeColors.primary + 30,
    shadowColor: whiteThemeColors.black,
    justifyContent: 'center',

    flexDirection: 'row',
    alignItems: 'center',

    height: 45,
    borderRadius: 10,
  },
  nextBtnText: {
    color: whiteThemeColors.black,
    margin: 0,
    paddingRight: 0,
    fontFamily: CommonStyles.fonts.medium,
  },
  chevronRight: {
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    color: 'black',
  },
});
