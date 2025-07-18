import { TimeTrackerRenderItemInterface } from '../../../../interfaces';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';
import { _Text, _View } from '../../../../components';
import { GetSvg } from '../TimeTracker_SVGs';
import { Counter } from './Counter';
import CommonStyles from '../../../../screens/CommonStyles';

export const RenderItem: React.FC<TimeTrackerRenderItemInterface> = ({
  item,
  index,
  onPressCard,
  sumOfBadges,
  timeTrackerScreen,
}) => {
  const { title } = item;
  return (
    <Pressable key={index} style={styles.btn} onPress={onPressCard}>
      <_View style={styles.svgContainer}>{GetSvg[title]}</_View>
      <_View style={styles.titleContainer}>
        <_Text style={styles.text}>{title}</_Text>
      </_View>
      <Counter
        item={item}
        sumOfBadges={sumOfBadges}
        timeTrackerScreen={timeTrackerScreen}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    marginVertical: 5,
    height: 90,
    backgroundColor: whiteThemeColors.white + 90,
    justifyContent: 'center',
    alignItems: 'center',
    width: '92%',
    borderRadius: 20,
    alignSelf: 'center',
  },
  svgContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    width: 80,
    height: 70,
    paddingHorizontal: 28,
    borderRadius: 15,
  },
  titleContainer: {
    flex: 0.8,
    marginLeft: 18,
  },
  text: {
    fontSize: 16,
    fontFamily: CommonStyles.fonts.medium,
  },
});
