import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.white + 90,
  },
  touchableBtn: {
    width: '100%',
    borderBottomWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  singleItem: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  picContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemTxt: {
    textAlign: 'left',
    textTransform: 'capitalize',
    color: whiteThemeColors.lightBlack,
    fontFamily: CommonStyles.fonts.regular,
  },
});
