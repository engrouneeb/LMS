import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import {whiteThemeColors} from '../../../../../../../Utilities';
import {_Screen, _View} from '../../../../../../../components';
import Header from '../../../../../../Headers';

const _NotesRecording = (props: any) => {
  const videoPlayer: any = useRef(null);
  const navigation: any = useNavigation();
  const {url} = props?.route?.params;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  const onSeek = (value: number) => {
    videoPlayer?.current?.seek(value);
    setCurrentTime(value);
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onProgress = (data: any) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onEnd = () => {
    setPaused(true);
    videoPlayer?.current?.seek(0);
  };

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      flex={1}
      hideTopSafeArea
      onAndroidBack={onBackPress}
      header={
        <Header
          isBack
          Screen={props.route.params.header}
          GoBack={() => navigation.goBack()}
        />
      }>
      {Boolean(url) && (
        <_View style={styles.videoContainer}>
          <Video
            ref={videoPlayer}
            source={{uri: url}}
            paused={paused}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
            onProgress={onProgress}
            onEnd={onEnd}
            resizeMode="contain"
            style={styles.mediaPlayer}
            volume={10}
          />

          <View style={styles.controls}>
            <TouchableOpacity onPress={() => setPaused(!paused)}>
              <Text style={styles.controlText}>
                {paused ? 'Play' : 'Pause'}
              </Text>
            </TouchableOpacity>

            <Slider
              style={styles.slider}
              value={currentTime}
              minimumValue={0}
              maximumValue={duration}
              onSlidingComplete={onSeek}
              minimumTrackTintColor={whiteThemeColors.primary}
              maximumTrackTintColor="#ccc"
              thumbTintColor={whiteThemeColors.primary}
            />

            <Text style={styles.timeText}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </View>
        </_View>
      )}
    </_Screen>
  );
};

// helper to format seconds to mm:ss
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const styles = StyleSheet.create({
  mediaPlayer: {
    backgroundColor: whiteThemeColors.black,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  videoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  controlText: {
    color: whiteThemeColors.white,
    fontSize: 16,
    marginBottom: 10,
  },
  timeText: {
    color: whiteThemeColors.white,
    marginTop: 5,
  },
});

export const NotesRecording = React.memo(_NotesRecording);
