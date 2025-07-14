import { whiteThemeColors } from 'utilities';

export default {
  CheckIcon: {
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CrossIconChecked: {
    color: whiteThemeColors.red,
  },
  Checked: {
    color: whiteThemeColors.primary,
  },
  unChecked: {
    color: whiteThemeColors.greyLite,
  },
  iconSize: {
    fontSize: 15,
    color: whiteThemeColors.white,
  },
  topLeft: {
    height: 50,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderBottomColor: whiteThemeColors.cyan,
    borderWidth: 0.3,
  },
  right: {
    flexDirection: 'row',
  },
  Uncheck: {
    borderColor: whiteThemeColors.greyLite,
    marginLeft: 10,
  },
  tickcheck: {
    borderColor: whiteThemeColors.green,
    marginLeft: 10,
  },
  // crosscheck: {
  //   borderColor: whiteThemeColors.red,
  //   marginLeft: 10,
  // },
  crosscheck: {
    borderColor: whiteThemeColors.red,
    marginLeft: 10,
  },
  topBody: {
    flex: 6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  calenderIcon: {
    fontSize: 25,
    fontWeight: 'bold',
    color: whiteThemeColors.attendanceIcons.calendarIcon,
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    paddingTop: 6,
    paddingBottom: 3,
    fontSize: 16,
  },
  cardRightIcon: {
    flexDirection: 'row',
    width: '25%',
    paddingRight: 20,
    justifyContent: 'flex-end',
  },
};
