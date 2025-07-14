import { StyleSheet } from 'react-native';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.6)',
  },
  modalView: {
    position: 'absolute',
    width: '90%',
    height: '35%',
    borderRadius: 25,
    backgroundColor: 'white',
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  cartContainer: {
    backgroundColor: whiteThemeColors.primaryDark,
    position: 'absolute',
    bottom: 15,
    zIndex: 10,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  totalBalanceView: {
    backgroundColor: whiteThemeColors.primaryDark,
    position: 'absolute',
    bottom: 15,
    zIndex: 10,
    right: 0,
    borderTopLeftRadius: 8,
    borderBottomStartRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 150,
    justifyContent: 'space-around',
  },
  cartView: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartView2: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    width: 150,
    borderRadius: 10,
    alignSelf: 'center',
    // marginBottom: 5,
  },
  cartText: {
    color: whiteThemeColors.white,

    fontSize: 10,
    paddingVertical: 3,
    marginLeft: 3,
  },
  balanceText: {
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 10,
    marginLeft: 5,
  },
  headerContainer: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  crossIcon: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  modalInsideView: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '800',
    marginTop: 15,
  },
  sureText: {
    fontFamily: CommonStyles.fonts.universalAppFont1,
    textAlign: 'center',
    marginTop: 10,
  },
  totalText: {
    fontSize: 20,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 8,
    backgroundColor: 'gray',
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    // paddingVertical:10
  },
  cancelText: {
    color: whiteThemeColors.white,
    fontSize: 14,
  },
  confirmButton: {
    marginTop: 8,
    backgroundColor: whiteThemeColors.primary,
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  confirmText: {
    color: whiteThemeColors.white,
    fontSize: 14,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    alignSelf: 'center',

    marginTop: 30,
  },
  dropdownText: {
    color: whiteThemeColors.primary,
    fontSize: 14,
  },
  dropdownStyle: {
    backgroundColor: whiteThemeColors.white,
    borderRadius: 5,
    marginVertical: 2,
    width: 130,
  },
  dropDown: {
    width: 105,
  },
  dropContainer: {
    backgroundColor: whiteThemeColors.primary + 50,
    width: 130,
    borderRadius: 10,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  flatlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 10,
  },
  dropHead: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },

  dropdownContainer: {
    width: '100%',
  },
  dropdownTextStyle: {
    color: whiteThemeColors.primary,
    fontSize: 14,
  },
  dropdownTextHighlightStyle: {
    width: '100%',
    color: whiteThemeColors.primary,
  },
  _dropdownStyle: {
    height: -1,
    width: '40%',
    marginTop: 5,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  defaultTextStyle: {
    width: '80%',
  },
  _textStyle: {
    width: '80%',
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.primary,
  },
  rowContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  rowTxt: {
    fontSize: 12,
    color: whiteThemeColors.black,
    fontWeight: '500',
    fontFamily: CommonStyles.fonts.regular,
  },
});
