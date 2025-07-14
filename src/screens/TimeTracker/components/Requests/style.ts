import { StyleSheet } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { whiteThemeColors } from 'utilities';
export const styles = StyleSheet.create({
  cardContainer: {
    width: '92%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: {
    paddingVertical: 35,
    fontSize: 16,
    marginLeft: 30,
  },
  badgeText: {
    fontSize: 12,
    color: whiteThemeColors.white,
  },
  badgeContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: whiteThemeColors.red,
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    alignItem: 'center',
    paddingLeft: 30,
  },
});
