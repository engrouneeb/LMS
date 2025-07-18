import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: whiteThemeColors.white + 90,
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 20,
    height: 95,

    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inventoryText: {
    color: whiteThemeColors.greyDark,

    fontSize: 10,
  },
  itemView1: {
    flex: 8,
    justifyContent: 'center',
    marginLeft: 15,
    zIndex: 1,
  },
  itemView2: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveIcon: {
    backgroundColor: whiteThemeColors.green,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cardDesign: {
    backgroundColor: whiteThemeColors.primary + 20,
    position: 'absolute',
    width: '80%',
    height: '100%',
    left: 0,

    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,

    zIndex: -10,
  },
  textInputInCard: {
    borderBottomWidth: 2,
    borderRadius: 5,
    borderBottomColor: whiteThemeColors.green,
    color: whiteThemeColors.black,
    paddingHorizontal: 5,
    backgroundColor: whiteThemeColors.greyLite,
  },
});
