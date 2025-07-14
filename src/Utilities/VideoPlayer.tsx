import React, { useRef, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import { _View } from '../components';
import { whiteThemeColors } from '../theme';
interface props {
  url?: any;
  thumbnail?: string;
  style?: any;
}
const Videoplayer: React.FC<props> = ({ url, thumbnail, style }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoPlayerRef: any = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  const onSeek = (seek: any) => {
    videoPlayerRef.current.seek(seek);
  };
  const onPaused = (playerState: any) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };
  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayerRef.current.seek(0);
  };
  const onProgress = (data: any) => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };
  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };
  const onLoadStart = () => setIsLoading(true);
  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
  const onSeeking = (currentTime: any) => setCurrentTime(currentTime);

  return (
    <TouchableOpacity
      style={styles.videoContainer}
      onPress={() => {
        setIsFullScreen(true);
      }}
    >
      <_View
        height={50}
        width={50}
        style={{
          zIndex: 10,
          position: 'absolute',
          backgroundColor: whiteThemeColors.background,
          borderRadius: 30,
        }}
      >
        <MaterialCommunityIcons
          name='play'
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
          animationType='fade'
          visible={isFullScreen}
          style={{
            backgroundColor: whiteThemeColors.black,
            justifyContent: 'center',
          }}
        >
          <Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            ref={videoPlayerRef}
            resizeMode={'contain'}
            source={{
              uri: url,
            }}
            style={styles.mediaPlayer}
            volume={10}
            ignoreSilentSwitch='ignore'
          />
          <MediaControls
            duration={duration}
            isLoading={isLoading}
            mainColor={
              whiteThemeColors.AudioChallengeView.mediaControllIconColor
            }
            onPaused={onPaused}
            onReplay={onReplay}
            onSeek={onSeek}
            onSeeking={onSeeking}
            playerState={playerState}
            progress={currentTime}
          />
          <TouchableOpacity
            onPress={() => {
              setIsFullScreen(false);
            }}
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
            }}
          >
            <AntDesign
              name='closecircleo'
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
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 270,
    height: 250,
    borderRadius: 10,
  },
});
