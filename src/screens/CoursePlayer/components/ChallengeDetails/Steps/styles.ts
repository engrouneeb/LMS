import { Dimensions, Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { getHeight, whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  courseList: {
    width: '100%',
    height: '90%',
  },
  listLeftSide: {
    flex: 0.15,
    height: Platform.OS == 'ios' ? getHeight(4) : getHeight(6),
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: 15,
  },
  loaderContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.background,
  },
  courseItem: {
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.white + 90,
    minHeight: 75,
    paddingBottom: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  courseItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completed: {
    marginLeft: 20,
  },
  courseName: {
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.primaryTextColor,
  },
  courseListEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height - 100,
  },
  listEmptyText: {
    fontSize: 17,
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.primaryTextColor,
  },
  svg: { justifyContent: 'center', alignSelf: 'center' },
});
