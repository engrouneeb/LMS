import { _Text, _View } from '../../../../components';
import { FC } from 'react';
import { styles } from '../styles';
import CommonStyles from '../../../CommonStyles';
import { whiteThemeColors } from 'utilities/colors';

interface classTimingProps {
  timingArray: any[];
}
export const ClassTimings: FC<classTimingProps> = (timingsArray) => {
  const { timingArray } = timingsArray;
  const weekDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
  console.log('====================================');
  console.log({ timingArray });
  console.log('====================================');
  return timingArray.length > 0 ? (
    timingArray.map((classTime) => (
      <_View
        style={{
          backgroundColor: whiteThemeColors.primary + 20,
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
          height: 'auto',
        }}
      >
        <_View style={styles.fromCont}>
          <_View style={styles.fromInn}>
            <_Text style={styles.key2}>Time From </_Text>
            <_Text style={[styles.value2]}>{classTime.timeFrom}</_Text>
          </_View>
          <_View style={styles.fromInn}>
            <_Text style={styles.key2}>Time To</_Text>
            <_Text style={[styles.value2]}>{classTime.timeTo}</_Text>
          </_View>
        </_View>
        <_View style={styles.fromCont}>
          <_View style={styles.fromInn}>
            <_Text style={styles.key2}>Time Zone </_Text>
            <_Text style={[styles.value2]}>{classTime.timeZoneSelected}</_Text>
          </_View>
        </_View>
        <_Text style={styles.key2}>Staff Name(s)</_Text>
        <_View style={styles.staffCon}>
          {classTime?.instructorNames.length == 0 ? (
            <_Text
              style={{
                ...styles.valueText,
                fontSize: 10,
                marginLeft: 5,
              }}
            >
              No instructor assigned
            </_Text>
          ) : (
            classTime?.instructorNames.map((inst, index) => (
              <_View style={styles.inst}>
                <_Text
                  style={{
                    ...styles.valueText,
                    fontSize: 10,
                    marginLeft: 5,
                    color: whiteThemeColors.white,
                  }}
                >{`${inst}`}</_Text>
              </_View>
            ))
          )}
        </_View>
        <_View style={styles.week}>
          {weekDays.map((obj, index) => {
            return (
              <_View
                style={{
                  ...styles.days,
                  backgroundColor: classTime?.weekDays.includes(weekDays[index])
                    ? whiteThemeColors.primary + 90
                    : whiteThemeColors.white,
                }}
              >
                <_Text
                  style={{
                    fontSize: 10,
                    fontFamily: CommonStyles.fonts.medium,
                    color: classTime?.weekDays.includes(weekDays[index])
                      ? whiteThemeColors.white
                      : whiteThemeColors.textColor,
                  }}
                >{`${obj}`}</_Text>
              </_View>
            );
          })}
        </_View>
      </_View>
    ))
  ) : (
    <_Text
      style={{
        ...styles.valueText,
        fontSize: 10,
        marginLeft: 5,
      }}
    >
      No Timings found.
    </_Text>
  );
};
