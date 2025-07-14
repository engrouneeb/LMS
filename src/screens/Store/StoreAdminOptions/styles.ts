import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: whiteThemeColors.white + 90,
    height: 160,
    marginTop: 20,
    borderRadius: 30,
    padding: 0.2,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 2,
    //   height: 5,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    marginHorizontal: 5,
  },
  iconView: {
    backgroundColor: whiteThemeColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 120,
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInnerView: {
    flex: 1,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: whiteThemeColors.primary,
    marginTop: 10,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 14,
  },
  flatlistContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: whiteThemeColors.white + 40,
    width: '100%',
  },
});
