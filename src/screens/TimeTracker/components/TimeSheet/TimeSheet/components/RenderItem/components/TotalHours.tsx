import { TimeSheetTotalHoursInterface } from '../../../../../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../../components';
import CommonStyles from '../../../../../../../../screens/CommonStyles';

export const TotalHours: React.FC<TimeSheetTotalHoursInterface> = ({
  totalWeekHours,
}) => {
  return (
    <_View style={styles.totalHrsContainer}>
      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name={'calendar-clock-outline'}
        size={18}
        color={whiteThemeColors.greyDark}
      />
      <_View style={styles.totalHrsTxtContainer}>
        <_Text style={styles.detailsHeadValue}>
          {totalWeekHours > 1
            ? `${totalWeekHours} hours`
            : `${totalWeekHours} hour`}
        </_Text>
      </_View>
    </_View>
  );
};
const styles = StyleSheet.create({
  totalHrsContainer: {
    flexDirection: 'row',
  },
  totalHrsTxtContainer: {
    marginLeft: 5,
  },
  detailsHeadValue: {
    color: whiteThemeColors.black,
    fontSize: 12,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.medium,
  },
});
