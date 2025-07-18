import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.6)',
  },
  modalView: {
    position: 'absolute',
    width: '90%',
    height: '27%',
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 20,
    top: 15,
    zIndex: 1,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.greyLite,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
