import { TimeSheetWeekAndDayTotalHoursInterfaces } from 'interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

export const WeekDaysAndTotalHours: FC<
  TimeSheetWeekAndDayTotalHoursInterfaces
> = ({ Obj }) => {
  return (
    <_View style={styles.weekView}>
      {Obj.week.map((obj: any) => {
        return (
          <_View style={styles.fullWeekTop}>
            <_View style={styles.weekContainer}>
              <_Text
                style={[
                  styles.dayLabelTxt,
                  {
                    color: obj.color,
                  },
                ]}
              >
                {obj?.day?.substring(0, 3)}
              </_Text>
              <_View style={styles.weekDayView}>
                <_Text style={styles.totalHrsAgainstDayTxt}>{obj.time}</_Text>
              </_View>
            </_View>
          </_View>
        );
      })}
    </_View>
  );
};
const styles = StyleSheet.create({
  weekView: {
    width: '95%',
    marginHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.primary + 20,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  fullWeekTop: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
  },
  weekContainer: {
    minWidth: 45,
    maxWidth: 70,
    paddingHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 1,
    paddingVertical: 5,
    borderRadius: 15,
  },
  dayLabelTxt: {
    fontSize: 13,
    fontFamily: CommonStyles.fonts.semiBold,
    marginTop: 5,
  },
  weekDayView: {
    flex: 1,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  totalHrsAgainstDayTxt: {
    fontSize: 12,
    textAlign: 'center',
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
