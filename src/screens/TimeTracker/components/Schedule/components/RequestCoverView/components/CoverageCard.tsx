import { CoverageCardInterface } from '../../../../../../../interfaces';
import moment from 'moment';
import React from 'react';
import { StyleSheet } from 'react-native';
import { dateStringFormatToDisplay, whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _View } from '../../../../../../../components';

interface FullDayNameInterface {
  [key: string]: string;
}

const CoverageCard: React.FC<CoverageCardInterface> = ({
  date,
  checkIn,
  checkOut,
  day,
  loading,
}) => {
  const fullDayName: FullDayNameInterface = {
    ['Mon']: 'Monday',
    ['Tue']: 'Tuesday',
    ['Wed']: 'Wednesday',
    ['Thu']: 'Thursday',
    ['Fri']: 'Friday',
    ['Sat']: 'Saturday',
    ['Sun']: 'Sunday',
  };
  return loading ? null : (
    <_View style={styles.TopViewCard}>
      <_View style={styles.cardBody}>
        <_Text style={styles.dateText}>
          {moment(date).format(dateStringFormatToDisplay()).split(' ')[0]}
        </_Text>
        <_Text style={[styles.dateText, { fontSize: 20, fontWeight: 'bold' }]}>
          {
            moment(date)
              .format(dateStringFormatToDisplay())
              .split(' ')[1]
              .split(',')[0]
          }
        </_Text>
        <_Text style={styles.dateText}>
          {moment(date).format(dateStringFormatToDisplay()).split(',')[1]}
        </_Text>
      </_View>
      <_View>
        <_Text style={styles.cardText}>Can't work? Ask for Coverage</_Text>
        <_Text style={styles.date}>
          {fullDayName[day] || 'Day is missing'}
        </_Text>
        <_Text style={styles.date}>
          {checkIn ? checkIn : 'Date Missing' + ' : '}
          {' - '}
          {checkOut ? checkOut : 'Date Missing'}
        </_Text>
      </_View>
    </_View>
  );
};
export { CoverageCard };
const styles = StyleSheet.create({
  TopViewCard: {
    height: 100,
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: whiteThemeColors.white,
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardBody: {
    width: 80,
    height: 80,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  dateText: {
    color: whiteThemeColors.white,
    fontSize: 14,
    fontWeight: '400',
  },
  date: {
    fontSize: 15,
    marginLeft: 10,
  },
  cardText: {
    fontSize: 16,
    color: whiteThemeColors.primary,
    marginLeft: 10,
  },
});
