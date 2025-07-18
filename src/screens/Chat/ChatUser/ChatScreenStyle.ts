import { StyleSheet } from 'react-native';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from '../../../Utilities';
const styles = StyleSheet.create({
  userMetaWrapper: {
    flexDirection: 'row',
    paddingLeft: 0,

    marginTop: 10,
    height: 80,
    width: '97%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.white + 90,
    alignItems: 'center',
    borderRadius: 15,
  },
  useStatus: {
    position: 'absolute',
    height: 15,
    width: 15,
    borderRadius: 9,
    top: 30,
    left: 50,
    borderColor: whiteThemeColors.white,
    borderWidth: 1,
  },
  userName: {
    fontFamily: CommonStyles.fonts.regular,
    paddingHorizontal: 10,
    color: whiteThemeColors.black,
  },
  lastMessage: {
    color: '#848383',
    fontSize: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    fontFamily: CommonStyles.fonts.regular,
  },
  lastMessageDateTime: {
    fontSize: 10,
    top: -16,
    color: whiteThemeColors.shadow,
    fontFamily: CommonStyles.fonts.light,
    position: 'absolute',
  },
  noData: {
    flex: 1,
    height: '98%',
    width: '98%',
    alignSelf: 'center',
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastMessageContainer: {
    width: '30%',
    alignItems: 'flex-end',
  },
});
export default styles;
