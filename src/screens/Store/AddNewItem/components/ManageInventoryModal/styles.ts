import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.6)',
  },
  inventoryInput: {
    backgroundColor: whiteThemeColors.primary + 20,
    color: whiteThemeColors.greyDark,
    borderRadius: 10,
    fontSize: 10,
    height: 40,
    padding: 5,
    paddingLeft: 10,
    fontFamily: CommonStyles.fonts.regular,
  },
  modalView: {
    position: 'absolute',
    width: '97%',
    height: '80%',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    alignItems: 'center',

    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    width: '85%',
    height: 55,
    // right: 20,
    // top: 15,
    zIndex: 1,
    // backgroundColor: whiteThemeColors.primary,
    padding: 10,
    borderBottomEndRadius: 30,
    borderTopStartRadius: 25,
  },
  crossIcon: {
    borderRadius: 10,
  },
  modalInsideView: {
    alignItems: 'center',
    justifyContent: 'space-around',

    flex: 1,
  },

  webViewContainer: {
    flex: 1,
    width: '100%',
  },
  itemCard: {
    backgroundColor: whiteThemeColors.white,
    flexDirection: 'row',
    borderRadius: 20,
    height: 95,

    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    zIndex: 30,
    // top: 5,
  },
  inventoryText: {
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 10,
  },
  itemView1: {
    flex: 8,
    justifyContent: 'center',
    marginLeft: 15,
    zIndex: 1,
  },
  headText: {
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 16,
    marginLeft: 20,
  },
  saveIcon: {
    backgroundColor: whiteThemeColors.green,
    width: 26,
    height: 26,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginRight: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 30,
    height: 30,
    backgroundColor: whiteThemeColors.primary + 30,
    marginLeft: 10,
    borderRadius: 8,
  },
});
