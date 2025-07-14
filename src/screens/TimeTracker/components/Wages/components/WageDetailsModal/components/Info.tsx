import { WagesDetailModalInfoInterface } from 'interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

export const Info: React.FC<WagesDetailModalInfoInterface> = ({
  wageTitle,
  wageValue,
  hoursTitle,
  hoursValue,
}) => {
  return (
    <_View style={styles.info}>
      <_View style={styles.direction}>
        <_Text style={styles.keyText}>{wageTitle}</_Text>
        <_Text style={styles.valueText}>{wageValue}</_Text>
      </_View>
      <_View style={styles.direction}>
        <_Text style={styles.keyText}>{hoursTitle}</_Text>
        <_Text style={styles.valueText}>
          {hoursValue ? parseFloat(hoursValue).toFixed(3) : 0.0}
        </_Text>
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  direction: { flexDirection: 'row' },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  keyText: {
    color: whiteThemeColors.primary,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.medium,
  },
  valueText: {
    color: whiteThemeColors.greyDark,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.medium,
  },
});
