import { StyleSheet } from 'react-native';
import { hp, wp } from '../../../../../../../../Helpers/Responsiveness';
import CommonStyles from '../../../../../../../CommonStyles';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.7)',
  },
  modalView: {
    backgroundColor: whiteThemeColors.primary,
    width: '95%',
    minHeight: '10%',
    maxHeight: '60%',
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headText: {
    color: whiteThemeColors.white,
    fontSize: 18,
    fontFamily: CommonStyles.fonts.semiBold,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
    zIndex: 10,
    marginRight: 15,
    marginTop: 10,
    position: 'absolute',
    right: 10,
  },
  innerContainer: {
    backgroundColor: whiteThemeColors.background,
    marginTop: 25,
    width: '100%',
    paddingBottom: 30,
    borderRadius: 35,
    paddingHorizontal: 30,
    padding: 20,
  },
  list: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: whiteThemeColors.white + 90,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  flatList: {
    width: '100%',
    marginHorizontal: 4,
    marginTop: 5,
    paddingHorizontal: 5,
  },
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListItem: {
    flexDirection: 'row',
    height: hp(9),
    paddingHorizontal: wp(2),
    alignItems: 'center',
    marginLeft: 10,
  },
  nameText: {
    marginLeft: 10,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.medium,
  },
});
