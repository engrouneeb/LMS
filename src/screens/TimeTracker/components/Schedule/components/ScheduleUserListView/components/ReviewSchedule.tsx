import { ScheduleUserListViewReviewScheduleInterface } from 'interfaces';
import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../components';

export const ReviewSchedule: FC<
  ScheduleUserListViewReviewScheduleInterface
> = ({ visibility, onPress, numberOfSchedules }) => {
  return (
    <_View
      style={[
        styles.floatingBtnContainer,
        { display: visibility ? 'flex' : 'none' },
      ]}
    >
      <Pressable style={styles.floatingBtn} onPress={onPress}>
        <_Text style={styles.floatingBtnText}>
          {`Review Schedule (${numberOfSchedules})`}
        </_Text>
      </Pressable>
    </_View>
  );
};

const styles = StyleSheet.create({
  floatingBtnContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 10,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  floatingBtn: {
    width: 160,
    height: 40,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingBtnText: {
    fontSize: 13,
    color: whiteThemeColors.white,
  },
});
