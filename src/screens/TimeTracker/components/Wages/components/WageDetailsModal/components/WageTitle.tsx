import { WagesDetailsWageTitleInterface } from '../../../../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { _Text } from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const WageTitle: React.FC<WagesDetailsWageTitleInterface> = ({
  title,
}) => <_Text style={styles.classNameText}>{title}</_Text>;

const styles = StyleSheet.create({
  classNameText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: CommonStyles.fonts.medium,
  },
});
