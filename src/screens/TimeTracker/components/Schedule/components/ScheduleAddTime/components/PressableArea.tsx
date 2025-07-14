import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _Text } from '../../../../../../../components';
import { whiteThemeColors } from 'utilities';
import { ScheduleAddTimePressableInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';

export const PressableArea: React.FC<ScheduleAddTimePressableInterface> = ({
  onPressVal,
  label,
  value,
}) => {
  return (
    <TouchableOpacity onPress={onPressVal}>
      <_Text style={styles.headText}>{label}</_Text>
      <_Text style={styles.timeText}>{value}</_Text>
    </TouchableOpacity>
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
