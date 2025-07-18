import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 7,
    borderBottomColor: whiteThemeColors.primary,
    backgroundColor: whiteThemeColors.white,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: whiteThemeColors.black,
  },
  getBtn: {
    position: 'absolute',
    right: 15,
    bottom: 8,
  },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    color: whiteThemeColors.white,
    marginRight: 2,
  },
  itemHomeworkText: {
    color: whiteThemeColors.greyDark,
    fontWeight: '500',
    marginRight: 2,
    fontSize: 14,
  },
  noDataFoundContainer: {
    height: Dimensions.get('screen').height - 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataFoundTxt: {
    alignSelf: 'center',
    marginTop: 200,
    fontSize: 15,
    color: whiteThemeColors.primaryTextColor,
  },
  img: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 7,
  },
  nameContainer: {
    width: '60%',
    marginLeft: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  titleCounterContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    // height: 60,
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 5,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: whiteThemeColors.black,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 7,
    width: '56%',
    textAlign: 'left',
  },
  labelText: {
    fontSize: 12,
    opacity: 0.7,
    color: whiteThemeColors.greyDark,
    fontWeight: 'bold',
  },
  homeworkText: {
    fontWeight: '400',
    fontSize: 12,
    alignSelf: 'center',
    color: whiteThemeColors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderTxt: {
    fontSize: 13,

    color: whiteThemeColors.greyDark,
    marginTop: 3,
  },
  cardSubContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 4,
  },
  homeWorkIconContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeworkTitleContainer: {
    flex: 0.5,
    marginLeft: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    height: 22,
    marginLeft: 70,
    borderRadius: 5,
    padding: 3,
    paddingHorizontal: 7,
    position: 'absolute',
    right: 9,
    top: 10,
    backgroundColor: whiteThemeColors.primary + 90,
  },
  dateStatusContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // marginLeft: 30,
  },
  dateStatusSubContainer: {
    marginTop: 5,
    width: '60%',
    flexDirection: 'row',
  },
  priorityTxt: {
    alignSelf: 'center',
    marginLeft: 5,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  dateContainer: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTxt: {
    marginLeft: 5,
    fontSize: 12,
    marginVertical: 3,
  },
  correctDateTxt: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 3,
  },
  correctionDateTxt: {
    marginLeft: 5,
    fontSize: 12,
    marginVertical: 3,
    color: whiteThemeColors.primary,
  },
  correctView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginHorizontal: 15,
    marginTop: 5,
  },
  btn: {
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  datesRow: {
    flexDirection: 'column',
    width: '50%',
  },
});
