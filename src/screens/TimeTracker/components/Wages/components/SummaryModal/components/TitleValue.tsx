import { WagesSummaryModalTitleValueInterface } from 'interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

export const TitleValues: React.FC<WagesSummaryModalTitleValueInterface> = ({
  containerStyle = false,
  title,
  value,
}) => {
  return (
    <_View
      style={
        containerStyle ? styles.containerStyle : styles.instructorContainer
      }
    >
      <_Text style={styles.keyText}>{title}</_Text>
      <_Text style={styles.valueText}>{value}</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  instructorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '80%',
  },
  keyText: {
    color: whiteThemeColors.primary,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.medium,
  },
  valueText: {
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 12,
  },
});
