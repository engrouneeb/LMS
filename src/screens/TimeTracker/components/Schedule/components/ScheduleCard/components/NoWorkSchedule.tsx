import { ScheduleCardNoWorkScheduleInterface } from '../../../../../../../interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _View } from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const NoWorkSchedule: FC<ScheduleCardNoWorkScheduleInterface> = ({
  visibility,
}) => {
  return visibility ? (
    <_View style={styles.container}>
      <_Text style={styles.dateText}>No Work Schedule</_Text>
    </_View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    backgroundColor: whiteThemeColors.white + 90,
  },
  dateText: {
    marginLeft: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
});
