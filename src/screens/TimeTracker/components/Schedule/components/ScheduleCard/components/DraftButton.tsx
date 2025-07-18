import { ScheduleCardDraftButtonInterface } from '../../../../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _View } from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const DraftButton: React.FC<ScheduleCardDraftButtonInterface> = ({
  visiblity,
}) => {
  return visiblity ? (
    <_View style={styles.tagContainer}>
      <_Text style={styles.tagText}>Draft</_Text>
    </_View>
  ) : null;
};

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: whiteThemeColors.greyDark,
    paddingHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 5,
    width: 60,
  },
  tagText: {
    fontSize: 12,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
