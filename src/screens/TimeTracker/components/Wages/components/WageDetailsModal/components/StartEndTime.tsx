import { WagesDetailsStartEndTimeInterface } from '../../../../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const StartEndTime: React.FC<WagesDetailsStartEndTimeInterface> = ({
  startDate,
  endDate,
}) => {
  return (
    <_View style={styles.timingContainer}>
      <_VectorIcons
        type={'Entypo'}
        name='clock'
        size={15}
        color={whiteThemeColors.greyDark}
        style={{ marginRight: 10 }}
      />
      <_Text
        style={styles.timingText}
      >{`From ${startDate}  to ${endDate} `}</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  timingContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  timingText: {
    color: whiteThemeColors.primary,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: CommonStyles.fonts.medium,
  },
});
