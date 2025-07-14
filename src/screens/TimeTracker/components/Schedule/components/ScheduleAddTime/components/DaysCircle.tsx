import { ScheduleAddTimeDayCircleInterface } from 'interfaces';
import moment from 'moment';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../components';

export const DaysCircle: React.FC<ScheduleAddTimeDayCircleInterface> = ({
  isDaySelected,
  onPress,
  day,
  date,
  index,
}) => {
  return (
    <Pressable
      style={isDaySelected ? styles.selectedDayButton : styles.weekDayButton}
      key={index}
      onPress={onPress}
    >
      <_View style={styles.dayMainContainer}>
        <_Text numberOfLines={1} style={[styles.weekDayButtonText]}>
          {day}
        </_Text>
      </_View>
      <_View style={styles.dayNameContainer}>
        <_Text
          numberOfLines={1}
          style={[
            isDaySelected
              ? styles.selectedDayButtonText
              : styles.weekDayButtonText,
          ]}
        >
          {moment(date).format('DD')}
        </_Text>
      </_View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dayMainContainer: {
    position: 'absolute',
    top: -20,
  },
  selectedDayButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  weekDayButton: {
    width: 42,
    height: 42,
    elevation: 0,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 15,
  },
  weekDayButtonText: {
    color: whiteThemeColors.greyDark,
    fontSize: 13,
    fontWeight: 'bold',
  },
  dayNameContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayButtonText: {
    color: whiteThemeColors.white,
    fontSize: 15,
  },
});
