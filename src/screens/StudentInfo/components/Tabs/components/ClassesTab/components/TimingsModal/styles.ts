import { Platform, StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../../../../Utilities';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.8)',
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
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
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
  timingContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    position: 'absolute',
    left: 10,
    alignSelf: 'center',
    overflow: 'hidden',
    top: -40,
  },
  headerText: {
    marginLeft: Platform.OS == 'android' ? 20 : 0,

    textAlign: 'center',
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 5,
  },
  timeView: {
    paddingVertical: 2,
    paddingHorizontal: 15,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 7,
    marginHorizontal: 5,
  },

  selectedDay: {
    backgroundColor: whiteThemeColors.primary,

    height: 20,
    width: 20,
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 8,
  },
  normalDay: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  timeText: {
    color: whiteThemeColors.white,

    fontSize: 11,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  startDateView: {
    width: '100%',
    borderRadius: 26,
    justifyContent: 'center',
  },
  card: {
    marginVertical: 10,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: whiteThemeColors.white + 90,
    paddingVertical: 10,
    width: '100%',
  },
  scroll: {
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
  },
  mapItems: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.white,
    paddingHorizontal: 15,
    borderRadius: 17,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  valueTxt: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: CommonStyles.fonts.medium,
  },
  days: {
    flexDirection: "row",
    height: 30,
    width: 30,
    borderRadius: 8,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
