import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.6)',
  },
  modalView: {
    position: 'absolute',
    borderRadius: 35,
    backgroundColor: whiteThemeColors.background,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    flex: 1,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 10,
    shadowColor: '#000',
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  modalInsideView: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: CommonStyles.fonts.semiBold,
    marginTop: 20,
    marginBottom: 20,
  },
  innerText: {
    fontSize: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 20,
    top: 15,
    zIndex: 1,
  },
  parentView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  card: {
    backgroundColor: whiteThemeColors.white + 90,
    padding: 10,

    borderRadius: 15,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 15,
  },
  iconView: {
    borderRadius: 10,
    backgroundColor: whiteThemeColors.primary,
  },
  iconStyle: {
    padding: 10,
    borderRadius: 10,
  },
  mainIcon: {
    borderRadius: 15,
    backgroundColor: whiteThemeColors.primary,
  },
});
