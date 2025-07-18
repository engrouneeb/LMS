import { TimeTrackerCounterInterface } from '../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';
import { _Text, _View } from '../../../../components';
import CommonStyles from '../../../../screens/CommonStyles';

export const Counter: React.FC<TimeTrackerCounterInterface> = ({
  item,
  sumOfBadges,
  timeTrackerScreen,
}) => {
  return item?.title == timeTrackerScreen?.Requests && sumOfBadges > 0 ? (
    <_View style={styles.badgeContainer}>
      <_Text style={styles.badgeText}>{sumOfBadges}</_Text>
    </_View>
  ) : null;
};

const styles = StyleSheet.create({
  badgeContainer: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: whiteThemeColors.red,
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
