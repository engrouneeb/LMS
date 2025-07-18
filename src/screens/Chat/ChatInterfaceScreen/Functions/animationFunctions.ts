import { Easing } from 'react-native';
import { Animated } from 'react-native';

export const blinkingAnimation: (value: any) => void = (animationRef: any) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(animationRef, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(animationRef, {
        toValue: 0.5,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(animationRef, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ])
  ).start();
};

export const StopBlinkingAnimation: (val: any) => void = (
  animationRef: any
) => {
  animationRef.stopAnimation();
  Animated.timing(animationRef, {
    toValue: 1,
    duration: 10,
    useNativeDriver: true,
    easing: Easing.linear,
  }).start();
};

export const DeleteVoiceMsgAnimation: (
  val1: any,
  val2: any,
  val3: any
) => void = (
  deleteAnimationRef: any,
  secondsTextRef: any,
  rotateBinRef: any
) => {
  Animated.timing(deleteAnimationRef, {
    toValue: 100,
    duration: 700,
    easing: Easing?.back(2),
    useNativeDriver: true,
  }).start(() =>
    Animated.sequence([
      Animated.timing(secondsTextRef, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }),

      Animated.timing(rotateBinRef, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
    ]).start(() =>
      Animated.sequence([
        Animated.timing(deleteAnimationRef, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),

        Animated.timing(secondsTextRef, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]).start()
    )
  );
};

export const rotateIconAnimation: (val1: any) => void = (rotationRef: any) => {
  rotationRef.setValue(0);
  Animated.timing(rotationRef, {
    toValue: 1,
    duration: 300,
    useNativeDriver: false,
    easing: Easing.linear,
  }).start();
};

export const fadeInAnimation: (val1: any) => void = (secondsTextRef: any) => {
  Animated.timing(secondsTextRef, {
    toValue: 1,
    duration: 700,
    useNativeDriver: true,
    easing: Easing.linear,
  }).start();
};

export const rotateMinus90Deg: (
  val1: any
) => string | Animated.Value | Animated.AnimatedInterpolation = (
  secondsTextRef: any
) =>
  secondsTextRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  });
