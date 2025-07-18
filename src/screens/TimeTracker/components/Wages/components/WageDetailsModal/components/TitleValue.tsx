import { WagesDetailsTitleValueInterface } from '../../../../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _View } from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const TitleValue: React.FC<WagesDetailsTitleValueInterface> = ({
  title,
  value,
}) => {
  return (
    <_View style={styles.container}>
      <_Text style={styles.keyText}>{title}</_Text>
      <_Text style={styles.valueText}>{value}</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 8,
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
