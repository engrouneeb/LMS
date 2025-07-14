import { ScheduleWeekViewEmptyWeekInterface } from 'interfaces';
import React, { FC, Fragment } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text } from '../../../../../../../components';

export const EmptyWeek: FC<ScheduleWeekViewEmptyWeekInterface> = ({
  handleOnCopyPreviousWeek,
  handleOnCreateNewSchedule,
}) => {
  return (
    <Fragment>
      <Pressable style={styles.buttonStyle} onPress={handleOnCopyPreviousWeek}>
        <_Text style={styles.buttonText}>{`Copy Previous Week Schedule`}</_Text>
      </Pressable>
      <Pressable onPress={handleOnCreateNewSchedule}>
        <_Text style={[styles.buttonText, styles.secondBtnTxt]}>
          or continue building a schedule
        </_Text>
      </Pressable>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '90%',
    height: 55,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: whiteThemeColors.white,
  },
  secondBtnTxt: {
    color: whiteThemeColors.primary,
    marginTop: 20,
  },
});
