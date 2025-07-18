import { Dimensions, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: whiteThemeColors.white,
  },
  subContainer: {
    height: Dimensions.get('screen').height - 100,
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '90%',
  },
  noCourseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  noCourseContainerTxt: {
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },
  cardContainer: {
    alignSelf: 'center',
    marginTop: 6,
  },
  cardSubContainer: {
    backgroundColor: whiteThemeColors.white + 90,
    alignSelf: 'center',
    borderRadius: 20,
  },
  view: {
    backgroundColor: whiteThemeColors.white + 90,
    flexDirection: 'row',
    padding: 25,
    borderRadius: 20,
  },
  imgView: {
    borderRadius: 10,
    marginRight: 7,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 4,
    resizeMode: 'cover',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  rating: {
    fontSize: 14,
    marginTop: -3,
  },
  arrow: {
    position: 'absolute',
    bottom: 10,
    right: 8,
  },
  popupMenu: {
    position: 'absolute',
    top: 4,
    right: 2,
  },
  popup: {
    padding: 4,
    borderRadius: 20,
  },
  eclipse: {
    padding: 4,
    borderRadius: 20,
  },
  btn: {
    height: 45,
    marginVertical: 10,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 1,
    zIndex: 1,
    shadowColor: whiteThemeColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
    elevation: 2,
  },
});
