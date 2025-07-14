import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  dataList: {
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 2,
    height: '98%',
    marginBottom: 2,
  },
  listItem: {
    minHeight: 120,
    paddingVertical: 5,
    width: '100%',
  },
  textSizeWeight: {
    fontSize: 11,

    color: whiteThemeColors.greyDark,
    marginLeft: 3,
    fontFamily: CommonStyles.fonts.medium,
  },
  userName: {
    textAlign: 'justify',
    fontWeight: '300',
    maxWidth: '80%',
    marginLeft: 10,
    fontFamily: CommonStyles.fonts.medium,
  },
  touchableCard: {
    flex: 1,
    minHeight: 100,
    overflow: 'hidden',
    borderRadius: 15,
    zIndex: 1,
  },
  cardConatiner: {
    borderRadius: 15,
    backgroundColor: whiteThemeColors.white + 90,
    padding: 15,
    height: '100%',
  },
  microphoneBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 30,
    width: 30,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: whiteThemeColors.primary + 30,
    zIndex: 2,
  },
  titleTxt: {
    TextAlign: 'justify',
    paddingLeft: 10,
    paddingRight: 45,
    paddingBottom: 5,

    fontFamily: CommonStyles.fonts.medium,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 10,
    alignItems: 'center',
  },
  creatorDetailContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListTxt: {
    fontFamily: CommonStyles.fonts.medium,
    fontSize: 14,

    color: whiteThemeColors.black,
    marginRight: 10,
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTxt: {
    fontSize: 18,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.medium,
  },
  download: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    margintTop: 20,
    bottom: 20,
  },
});
