import { RequestTimeOffRenderDateInterface } from '../../../../../../interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../Utilities';
import { _Text, _View } from '../../../../../../components';
import CommonStyles from '../../../../../../screens/CommonStyles';

export const RenderDate: FC<RequestTimeOffRenderDateInterface> = ({ date }) => {
  const Datesuperscript = (num: number) => {
    if ([1, 21, 31].includes(num)) return 'st';
    else if ([2, 22].includes(num)) return 'nd';
    else if ([3, 23].includes(num)) return 'rd';
    else return 'th';
  };
  return (
    <_View style={styles.container}>
      <_View style={styles.dateContainer}>
        <_Text style={styles.dateTxt}>{date}</_Text>
      </_View>
      <_View style={styles.dateSuperScriptContainer}>
        <_Text style={styles.dateSuperScriptTxt}>
          {Datesuperscript(parseInt(date))}
        </_Text>
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateTxt: {
    fontSize: 16,
    color: whiteThemeColors.textColor.darkBlackText,
    fontFamily: CommonStyles.fonts.bold,
  },
  dateSuperScriptContainer: {
    alignItems: 'flex-start',
    marginTop: 2,
  },
  dateSuperScriptTxt: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.bold,
  },
});
