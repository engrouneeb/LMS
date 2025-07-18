import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    justifyContent: 'center',
  },
  effectTimeContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  card: {
    width: '92%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 15,
    paddingRight: 10,
    paddingVertical: 15,
  },
  cardinner: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 65,
    width: 65,
    borderRadius: 15,
    backgroundColor: whiteThemeColors.primary + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 10,
    textAlign: 'center',

    color: whiteThemeColors.greyDark,
  },
  dateValue: {
    fontSize: 10,
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.greyDark,
    justifyContent: 'center',
  },
  infoContainer: {
    width: '75%',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.black,

    ellipsizeMode: 'tail',
    marginTop: 5,
  },
  fromContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  fromSubContainer: {
    width: '44%',
  },
  wageTypeContainer: {
    width: '44%',
  },
  fromText: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
  fromTextValue: {
    fontSize: 12,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.medium,
  },
  typeKey: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
  typeValue: {
    fontSize: 12,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.medium,
  },
});
