import { Dimensions, StyleSheet } from 'react-native';
import { check } from 'react-native-permissions';
import { whiteThemeColors } from '../../../Utilities';
const deviceWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  checkInBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: whiteThemeColors.white,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  checkInOutBtn: {
    padding: 0,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  checkInOutBtnWrapper: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: whiteThemeColors.greyLite,
    borderWidth: 0.3,
  },
  groupCheckInOutBtnWrapper: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  checkInAllBtn: {
    padding: 0,
    marginRight: 10,
    width: 130,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.green,
  },
  checkOutAllBtn: {
    padding: 0,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary,
  },
  className: { marginLeft: 10, color: whiteThemeColors.primary },
});
