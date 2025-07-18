import { ScheduleAddTimeDayBadgeInterface } from '../../../../../../../interfaces';
import moment from 'moment';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _View } from '../../../../../../../components';

export const DayBadge: React.FC<ScheduleAddTimeDayBadgeInterface> = ({
  selectedDay,
}) => {
  const daysOfWeek = moment.weekdays();
  return (
    <_View style={styles.container}>
      <_Text style={styles.txt}>{daysOfWeek[selectedDay]}</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 40,
    backgroundColor: whiteThemeColors.primary + 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    color: whiteThemeColors.primary,
  },
});
