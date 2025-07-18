import { WeekButtonsInterface } from '../../../../../../../interfaces';
import React from 'react';
import { Pressable } from 'react-native';
import { _Text, _View } from '../../../../../../../components';
import { styles } from '../style';

export const WeekButtons: React.FC<WeekButtonsInterface> = ({
  _existingDay,
  day,
  index,
  handleDaySelection,
}) => {
  return (
    <Pressable
      style={
        _existingDay === day.day
          ? styles.selectedDayButton
          : styles.weekDayButton
      }
      key={index}
      onPress={() => {
        handleDaySelection(index, day);
      }}
    >
      <_View style={styles.singleDayCircleContainer}>
        <_Text
          numberOfLines={1}
          style={[
            _existingDay === day.day
              ? styles.selectedDayButtonText
              : styles.weekDayButtonText,
          ]}
        >
          {day.day.slice(0, 3)}
        </_Text>
      </_View>
    </Pressable>
  );
};
