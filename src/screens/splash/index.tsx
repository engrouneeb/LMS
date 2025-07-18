import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, ImageBackground, Platform, StyleSheet } from 'react-native';
import { isPortrait } from '../../Utilities';
import Screens from '../../screenNames';
import whiteLabelConfig from '../../WhiteLabelConfig';
import styles from './style';

export const SplashScreen = () => {
  const navigation: any = useNavigation();
  const [imageOpacity] = useState(new Animated.Value(0));
  const [titleMarginTop] = useState(
    isPortrait() ? new Animated.Value(200) : new Animated.Value(100),
  );
  let circleLogo =
    Platform.OS == 'android' ? 'asset:/images/circleLogo.png' : 'circleLogo';
  let splashScreen =
    Platform.OS == 'android'
      ? 'asset:/images/splashScreen.jpg'
      : 'splashScreen';

  useEffect(() => {
    Animated.sequence([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(titleMarginTop, {
        toValue: 10,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      navigation.navigate(Screens.getStarted.name);
    });
  }, []);

  return (
    <ImageBackground
      source={{ uri: splashScreen }}
      style={[StyleSheet.absoluteFill, styles.splashContainer]}
    >
      <Animated.Image
        source={{ uri: circleLogo }}
        style={{
          ...styles.imgSize,
          opacity: imageOpacity,
          width:
            whiteLabelConfig.APP_VARIANT_NAME == 'compuchlid' ? '100%' : 200,
        }}
      />
      <Animated.Text
        style={{
          ...styles.title,
          marginTop: titleMarginTop,
        }}
      >
        <Animated.Text style={[styles.title, styles.subTitle]}>
          {whiteLabelConfig.APP_NAME}
          {'\n'}
        </Animated.Text>
        {whiteLabelConfig.GREETING_TEXT}
      </Animated.Text>
    </ImageBackground>
  );
};
