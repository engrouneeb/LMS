import { _Text, _VectorIcons, _View } from 'components';
import moment from 'moment';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

interface AssignedDetailsInterface {
  dueDate?: string;
}

export const AssignedDetails: FC<AssignedDetailsInterface> = ({ dueDate }) => {
  return (
    <_View style={styles.container}>
      <_View style={styles.subContainer}>
        <_Text style={styles.label}>Due Date</_Text>
        <_Text style={styles.value}>
          {dueDate ? moment(dueDate).format('MMM Do, YYYY') : ''}
        </_Text>
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
    width: '80%',
  },
  label: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  value: {
    lineHeight: 25,
    fontSize: 14,

    color: whiteThemeColors.primaryDark,
    fontFamily: CommonStyles.fonts.medium,
  },
});
