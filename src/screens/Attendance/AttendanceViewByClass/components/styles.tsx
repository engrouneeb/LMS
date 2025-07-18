import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';
export const styles = StyleSheet.create({
  cardComponet: {
    paddingVertical: 15,
    backgroundColor: whiteThemeColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: whiteThemeColors.cardColor.cardGrayBorder,
    borderRadius: 15,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  leftIcon: {
    width: '30%',
    alignItems: 'center',
  },
  cardIcon: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  cardBody: {
    width: '50%',
    paddingLeft: 5,
  },
});
