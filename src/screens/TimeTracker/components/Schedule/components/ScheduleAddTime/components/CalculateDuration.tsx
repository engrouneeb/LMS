import moment from 'moment';
import React from 'react';
import { StyleSheet } from 'react-native';
import { _Text, _View } from '../../../../../../../components';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { ScheduleAddTimeCalculateDurationInterfaces } from '../../../../../../../interfaces';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const CalculateDuration: React.FC<
  ScheduleAddTimeCalculateDurationInterfaces
> = ({ label, startTime, endTime }) => {
  const getDuration = (_startTime: string, _endTime: string) => {
    let duration: any = moment.duration(
      moment(_endTime, 'HH:mm A').diff(moment(_startTime, 'HH:mm A'))
    );
    let hours = parseInt(duration.asHours());
    let minutes = parseInt(duration.asMinutes()) % 60;
    return `${hours} hr ${minutes} min`;
  };

  return (
    <_View>
      <_Text style={styles.headText}>{label}</_Text>
      {startTime && endTime ? (
        <_Text style={styles.timeText}>{getDuration(startTime, endTime)}</_Text>
      ) : null}
    </_View>
  );
};

const styles = StyleSheet.create({
  headText: {
    color: whiteThemeColors.primary,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  timeText: {
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.greyDark,
  },
});
