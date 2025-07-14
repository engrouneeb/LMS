import moment from 'moment';
import { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from 'components';
import CommonStyles from 'screens/CommonStyles';

interface SubmittedDetailsInterface {
  dueDate?: string;
  submittedDate?: string;
}

export const SubmittedDetails: FC<SubmittedDetailsInterface> = ({
  dueDate,
  submittedDate,
}) => {
  const getFormattedDate = useCallback(
    (
      date: string | null | undefined,
      fallbackDate: string | null | undefined = ''
    ) => {
      return date !== null &&
        moment(fallbackDate != '' ? fallbackDate : date).format(
          'MMM Do, YYYY'
        ) !== 'Invalid Date'
        ? moment(date).format('MMM Do, YYYY')
        : '';
    },
    []
  );
  return (
    <_View style={styles.container}>
      <_View style={styles.subContainer}>
        <_Text style={styles.label}>Due Date</_Text>
        <_Text style={styles.value}>
          {getFormattedDate(dueDate, submittedDate)}
        </_Text>
      </_View>
      <_View style={styles.subContainer}>
        <_Text style={styles.label}>Submitted Date</_Text>
        <_Text style={styles.value}>{getFormattedDate(submittedDate)}</_Text>
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
  },
  subContainer: {
    width: '40%',
  },
  label: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  value: {
    lineHeight: 25,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.medium,
    color: whiteThemeColors.primaryDark,
  },
});
