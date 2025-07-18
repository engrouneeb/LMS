import React, { FC, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';

var { width } = Dimensions.get('window');

export const TypingIndicator: FC = () => {
  const dot1: Animated.Value = useRef(new Animated.Value(0)).current;
  const dot2: Animated.Value = useRef(new Animated.Value(0)).current;
  const dot3: Animated.Value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dot1, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { opacity: dot1 }]} />
      <Animated.View style={[styles.dot, { opacity: dot2 }]} />
      <Animated.View style={[styles.dot, { opacity: dot3 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    marginTop: 13,
    width: width,
    flexDirection: 'row',
  },
  xTextContainer: {
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 6,
    marginHorizontal: 2,
    backgroundColor: whiteThemeColors.primary + 60,
  },
});
