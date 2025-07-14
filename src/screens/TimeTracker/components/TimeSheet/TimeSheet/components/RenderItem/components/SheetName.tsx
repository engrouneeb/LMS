import { TimeSheetSheetNameInterface } from 'interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

export const SheetName: React.FC<TimeSheetSheetNameInterface> = ({ name }) => {
  return (
    <_View style={styles.sheetNameContainer}>
      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name={'calendar-text'}
        size={18}
        color={whiteThemeColors.greyDark}
      />
      <_View style={styles.marginLeft}>
        <_Text numberOfLines={1} style={styles.detailsHeadValue}>
          {name}
        </_Text>
      </_View>
    </_View>
  );
};
const styles = StyleSheet.create({
  marginLeft: { marginLeft: 5 },
  sheetNameContainer: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
    paddingLeft: 5,
  },
  detailsHeadValue: {
    color: whiteThemeColors.black,
    fontSize: 12,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.medium,
  },
});
