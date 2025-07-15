import { _Text, _View } from 'components';
import React, { FC, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../Utilities';
import { ProgressBarInterfaces } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';
export const PercentageBar: FC<ProgressBarInterfaces> = ({
  starText,
  showText,
  percentage,
  starTextDisplay,
  barColor,
}) => {
  const [animation] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animation, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  return (
    <_View
      style={{
        flexDirection: 'row',
      }}
    >
      <_Text
        style={{
          ...styles.progressText,
          display: starTextDisplay,
          fontFamily: CommonStyles.fonts.medium,
          fontSize: 13,
        }}
      >
        {starText}
      </_Text>
      <_View style={styles.progressMiddle}>
        <_View style={styles.progressWrap}>
          <Animated.View
            style={{
              ...styles.progressBar,
              shadowColor: barColor,
              backgroundColor: barColor,
              width: animation.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </_View>
      </_View>
      {showText && (
        <_Text style={styles.progressPercentText}>
          {parseFloat(percentage)}%
        </_Text>
      )}
    </_View>
  );
};

const styles = StyleSheet.create({
  progressText: {
    width: 50,
    fontSize: 14,
    color: whiteThemeColors.primaryTextColor,
  },
  progressPercentText: {
    width: 60,
    fontSize: 14,
    color: whiteThemeColors.lightBlack,
    fontFamily: CommonStyles.fonts.regular,
  },
  progressMiddle: {
    height: 15,
    flex: 1,
    marginHorizontal: 10,
  },
  progressWrap: {
    backgroundColor: whiteThemeColors.background,
    borderRadius: 18,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 2,
  },
  progressBar: {
    flex: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 18,
    minWidth: 0,
    elevation: 5,
  },
});
