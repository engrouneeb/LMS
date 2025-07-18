import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import ScreensNames from '../../screenNames';
export const SplashVideo = () => {
  const navigation: any = useNavigation();
  const splashBGURL =
    'https://calibermatrixc3451.blob.core.windows.net/steam-inventors-videos/Splashbg.mp4';
  const splashURL =
    'https://calibermatrixc3451.blob.core.windows.net/steam-inventors-videos/splashVideo.mp4';

  return (
    <View style={{ flex: 1 }}>
      <Video
        source={{ uri: splashBGURL }}
        resizeMode='cover'
        posterResizeMode='cover'
        style={{ flex: 1 }}
        muted={true}
        repeat={true}
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch='ignore'
        volume={0}
        disableFocus
      />
      <Video
        source={{ uri: splashURL }}
        resizeMode='contain'
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderRadius: 20,
        }}
        muted={true}
        repeat={false}
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch='ignore'
        volume={0}
        onEnd={() => navigation.push(ScreensNames.getStarted.name)}
      />
    </View>
  );
};
