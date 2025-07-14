import { ReviewScheduleModalTotalShiftInterface } from 'interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

export const SummaryTotalShift: React.FC<
  ReviewScheduleModalTotalShiftInterface
> = ({ totalShifts }) => {
  return (
    <>
      <_Text style={styles.titleText}>Summary</_Text>
      <_View style={styles.summaryContainer}>
        <_View style={styles.summaryTextContainer}>
          <_Text style={styles.summaryText}>Total Shifts</_Text>
          <_Text style={styles.summaryText}>{totalShifts}</_Text>
        </_View>
      </_View>
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.bold,
    marginVertical: 10,
    marginLeft: 5,
  },
  summaryContainer: {
    width: '100%',
    backgroundColor: whiteThemeColors.greyDark + 20,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  summaryTextContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  summaryText: {
    color: whiteThemeColors.greyDark,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,
  },
});
