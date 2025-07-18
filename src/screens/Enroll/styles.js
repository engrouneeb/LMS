import { StyleSheet } from 'react-native';
import { isTablet, whiteThemeColors } from '../../Utilities';

export default StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingVertical: 15,
    justifyContent: 'space-between',
    marginTop: isTablet ? 10 : 0,
  },
  cardLeft: {
    position: 'absolute',
    left: 12,
    top: 10,
    transform: [{ skewY: '135deg' }],
    height: 80,
    width: 120,
    backgroundColor: 'white',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -15,
    left: 40,
  },
  badge: {
    width: 5,
    height: 5,
  },
  countText: {
    fontSize: 9.5,
    fontWeight: '700',

    color: whiteThemeColors.white,
  },
  iconBadge: {
    width: 22,
    height: 22,
    backgroundColor: whiteThemeColors.red,
    borderWidth: 1.5,
    borderColor: whiteThemeColors.white,
  },
});
