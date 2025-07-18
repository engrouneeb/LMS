import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../components';
import { whiteThemeColors } from '../../../Utilities';
import { HeaderProps } from '../../../interfaces';
import CommonStyles from '../../CommonStyles';

const CalendarHeader: FC<HeaderProps> = ({ headerProps }) => {
  const nextMonth = () => headerProps.addMonth(1);
  const prevMonth = () => headerProps.addMonth(-1);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let months = [
    { name: 'January' },
    { name: 'February' },
    { name: 'March' },
    { name: 'April' },
    { name: 'May' },
    { name: 'June' },
    { name: 'July' },
    { name: 'August' },
    { name: 'September' },
    { name: 'October' },
    { name: 'November' },
    { name: 'December' },
  ];
  return (
    <>
      <_View style={styles.headerContainer}>
        <TouchableOpacity onPress={prevMonth} style={styles.icon}>
          <_VectorIcons
            type={'MaterialIcons'}
            name='keyboard-arrow-left'
            size={20}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
        <_View style={styles.selectedMonth}>
          <_Text style={styles.selectedMonthText}>
            {`${
              months[new Date(headerProps.month).getMonth()].name
            }, ${new Date(headerProps.month).getFullYear()}`}
          </_Text>
        </_View>
        <TouchableOpacity onPress={nextMonth} style={styles.icon}>
          <_VectorIcons
            type={'MaterialIcons'}
            name='keyboard-arrow-right'
            size={20}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
      </_View>
      <_View style={styles.textContainer}>
        {days.map((item) => (
          <_Text style={styles.monthText}>{item}</_Text>
        ))}
      </_View>
    </>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginTop: -10,
    //   paddingLeft: 10,
    backgroundColor: whiteThemeColors.background,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 15,
  },
  months: {
    backgroundColor: 'whitesmoke',
    width: 90,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 6,
  },
  selectedMonth: {
    backgroundColor: whiteThemeColors.primary,
    width: 130,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  selectedMonthText: {
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.regular,

    fontSize: 13,
    paddingHorizontal: 5,
  },
  monthText: {
    fontSize: 12,
    color: whiteThemeColors.greyDark,
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
export default CalendarHeader;
