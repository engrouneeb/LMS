import React, {useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import {_View} from '../components';
import {whiteThemeColors} from '../theme';

interface props {
  url?: any;
  thumbnail?: string;
  style?: any;
}

const Videoplayer: React.FC<props> = ({url, thumbnail, style}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoPlayerRef: any = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  const onSeek = (seek: number) => {
    videoPlayerRef.current.seek(seek);
    setCurrentTime(seek);
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onProgress = (data: any) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onEnd = () => {
    setPaused(true);
    videoPlayerRef.current.seek(0);
    setCurrentTime(0);
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <TouchableOpacity onPress={() => setIsFullScreen(true)}>
      <_View
        height={50}
        width={50}
        style={{
          zIndex: 10,
          position: 'absolute',
          backgroundColor: whiteThemeColors.background,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          top: '50%',
          left: '50%',
          marginTop: -25,
          marginLeft: -25,
        }}>
        <MaterialCommunityIcons
          name="play"
          size={50}
          color={whiteThemeColors.primary}
          style={{
            position: 'absolute',
            elevation: 5,
            height: 50,
            width: 50,
          }}
        />
      </_View>
      <FastImage
        style={{
          width: 260,
          height: 240,
          borderRadius: 6,
          // borderWidth: 5,
          borderColor: whiteThemeColors.chatInterface.chatRight,
          ...style,
        }}
        source={{
          uri: thumbnail
            ? thumbnail
            : 'https://cypressintegration.com/wp-content/uploads/gray-background-texture-1-1.gif',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      {isFullScreen && (
        <Modal
          animationType="fade"
          visible={isFullScreen}
          style={{
            backgroundColor: whiteThemeColors.black,
            justifyContent: 'center',
          }}>
          <Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            ref={videoPlayerRef}
            resizeMode="contain"
            source={{uri: url}}
            style={styles.mediaPlayer}
            volume={10}
            ignoreSilentSwitch="ignore"
          />
          <View style={styles.controlOverlay}>
            <TouchableOpacity onPress={() => setPaused(!paused)}>
              <MaterialCommunityIcons
                name={paused ? 'play' : 'pause'}
                size={35}
                color={whiteThemeColors.white}
              />
            </TouchableOpacity>

            <Slider
              style={{flex: 1, marginHorizontal: 10}}
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              minimumTrackTintColor={whiteThemeColors.primary}
              maximumTrackTintColor={whiteThemeColors.background}
              thumbTintColor={whiteThemeColors.primary}
              onSlidingComplete={onSeek}
            />

            <Text style={{color: whiteThemeColors.white, fontSize: 12}}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsFullScreen(false)}
            style={{
              position: 'absolute',
              right: 20,
              top: 50,
              backgroundColor: whiteThemeColors.primary,
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign
              name="closecircleo"
              size={22}
              color={whiteThemeColors.white}
            />
          </TouchableOpacity>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

export const VideoPlayer = React.memo(Videoplayer);

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
  controlOverlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
