import { TimeSheetEmptyListInterface } from '../../../../../../interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../components';

export const EmptyList: FC<TimeSheetEmptyListInterface> = ({
  show,
  emptyListMsg,
}) => {
  return show ? (
    <_View style={styles.listEmptyContainer}>
      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name={'timetable'}
        size={100}
        color={whiteThemeColors.primary}
      />
      <_Text style={styles.listEmptyText}>{emptyListMsg}</_Text>
    </_View>
  ) : null;
};
const styles = StyleSheet.create({
  listEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listEmptyText: {
    fontWeight: '600',
    fontSize: 12,
    color: whiteThemeColors.black,
    textTransform: 'capitalize',
  },
});
