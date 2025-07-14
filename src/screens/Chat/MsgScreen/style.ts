import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
export default StyleSheet.create({
  listItem: {
    marginLeft: 22,
    marginRight: 22,
    paddingLeft: 0,
    backgroundColor: whiteThemeColors.transparent,
    marginBottom: 3,
    marginTop: 3,
    borderBottomWidth: 0,
  },
  topBadgeView: {
    position: 'absolute',
    top: -25,
    left: 32,
    width: 25,
    height: 25,
  },
  badgeText: {
    color: whiteThemeColors.white,
    fontSize: 9.5,
    fontWeight: '700',
  },
  IconBadgeStyle: {
    width: 19,
    height: 10,
    backgroundColor: whiteThemeColors.red,
    borderWidth: 1.5,
    borderColor: whiteThemeColors.white,
  },
  mainElement: {
    width: 5,
    height: 5,
  },
  instUser: {
    height: 40,
    width: 40,
    tintColor: whiteThemeColors.white,
  },
  instUserImage: {
    backgroundColor: whiteThemeColors.primary + 30,
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupAccess: {
    backgroundColor: 'whitesmoke',
    width: '95%',
    height: 80,
    paddingHorizontal: 15,
    marginTop: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
});
