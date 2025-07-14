import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { getHeight, whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: whiteThemeColors.background,
  },
  bottomBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 5,
    backgroundColor: whiteThemeColors.background,
    width: '100%',

    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: whiteThemeColors.primary + 30,
    marginRight: 5,
    width: '45%',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    fontFamily: CommonStyles.fonts.regular,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: getHeight(6),
    width: getHeight(6),
  },
  tabBarContainer: {
    height: getHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: whiteThemeColors.primary + 30,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 0,
  },
  tabBarView: {
    height: getHeight(8),
    borderRadius: 20,
    width: '95%',
    alignSelf: 'center',
  },
  btnText: {
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.medium,
  },
});
