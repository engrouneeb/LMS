import { StyleSheet } from 'react-native';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from '../../../Utilities';

export const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    alignSelf: 'center',
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.greyDark,
    fontSize: 10,
  },
  codeText: {
    alignSelf: 'center',
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 30,
  },
  redemCodeText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.96,
    marginTop: 5,
  },
  RedeemText: {
    width: '100%',
    color: whiteThemeColors.white,
    fontSize: 13,
    fontFamily: CommonStyles.fonts.regular,
    transform: [{ rotate: '-90deg' }],
  },
  cardInner: {
    backgroundColor: whiteThemeColors.primary,
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: whiteThemeColors.white,
    width: '90%',
    height: 120,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 8,

    flexDirection: 'row',
  },
  addText: {
    textAlign: 'center',
    color: whiteThemeColors.white,
  },
  addContainer: {
    backgroundColor: whiteThemeColors.primary,
    width: 60,
    height: 60,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 5,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  codeContainer: {
    paddingHorizontal: 25,
    zIndex: -1,
  },
});
