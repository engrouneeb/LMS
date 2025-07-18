import React, { FC } from 'react';
import { Calendar } from 'react-native-calendars';
import { Theme } from 'react-native-calendars/src/types';
import CommonStyles from '../../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../../Utilities';
import { RequestTimeOffCalendarInterface } from '../../../../../../interfaces';
import { _View, _VectorIcons } from '../../../../../../components';
import { StyleSheet } from 'react-native';

const calenderTheme: Theme = {
  backgroundColor: whiteThemeColors.background,
  calendarBackground: whiteThemeColors.background,
  textSectionTitleColor: whiteThemeColors.black,
  selectedDayTextColor: whiteThemeColors.white,
  todayTextColor: whiteThemeColors.black,
  todayButtonFontSize: 18,
  dayTextColor: whiteThemeColors.black,
  textDisabledColor: whiteThemeColors.greyDark,
  dotColor: whiteThemeColors.primary,
  selectedDotColor: whiteThemeColors.orange,
  arrowColor: whiteThemeColors.primary,
  disabledArrowColor: whiteThemeColors.greyLite,

  monthTextColor: whiteThemeColors.primary,
  indicatorColor: whiteThemeColors.red,

  textMonthFontFamily: CommonStyles.fonts.bold,
  textDayFontFamily: CommonStyles.fonts.semiBold,
  textDayHeaderFontFamily: CommonStyles.fonts.semiBold,
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '700',
  textDayFontSize: 17,
  textMonthFontSize: 18,
  textDayHeaderFontSize: 13,

  'stylesheet.day.basic': {
    today: {
      borderWidth: 2,
      borderRadius: 5,
      height: 35,
      width: 35,
      borderColor: whiteThemeColors.primaryDark,
    },
    todayText: {
      fontFamily: CommonStyles.fonts.bold,
      color: whiteThemeColors.primaryDark,
      fontSize: 19,
    },
    text: {
      borderRadius: 20,
      fontFamily: CommonStyles.fonts.semiBold,
      color: whiteThemeColors.black,
      fontSize: 16,
    },
    selected: {
      borderRadius: 10,
    },

    base: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      margin: -2,
      borderRadius: 5,
    },
  },
};

export const _Calendar: FC<RequestTimeOffCalendarInterface> = ({
  current,
  onDayPress,
  onDayLongPress,
  markedDates,
  onMonthChange,
}) => {
  return (
    <Calendar
      hideExtraDays
      current={current}
      style={styles.calender}
      onDayPress={onDayPress}
      onDayLongPress={onDayLongPress}
      markedDates={markedDates}
      markingType={'multi-dot'}
      onMonthChange={onMonthChange}
      renderArrow={(direction) =>
        direction === 'left' ? (
          <_View style={styles.arrowContainer}>
            <_VectorIcons
              type='MaterialIcons'
              name='chevron-left'
              size={33}
              color={whiteThemeColors.primary}
            />
          </_View>
        ) : (
          <_View style={styles.arrowContainer}>
            <_VectorIcons
              type='MaterialIcons'
              name='chevron-right'
              size={33}
              color={whiteThemeColors.primary}
            />
          </_View>
        )
      }
      theme={calenderTheme}
    />
  );
};

const styles = StyleSheet.create({
  calender: {
    flex: 1,
  },
  arrowContainer: {
    width: 38,
    height: 35,
    backgroundColor: whiteThemeColors.primary + 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
