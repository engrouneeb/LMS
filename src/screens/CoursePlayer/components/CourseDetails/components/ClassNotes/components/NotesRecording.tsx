import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
// import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Screen, _View } from '../../../../../../../components';
import Header from '../../../../../../Headers';
const _NotesRecording = (props: any) => {
  const videoPlayer: any = useRef(null);
  const navigation: any = useNavigation();
  const { url } = props?.route?.params;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  // will change to below just for now media control is not supported
  // const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [playerState, setPlayerState] = useState(true);
  const [screenType] = useState('content');
  const onSeek = (seek: any) => {
    videoPlayer?.current?.seek(seek);
  };
  const onPaused = (playerState: any) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };
  const onReplay = () => {
    // setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer?.current?.seek(0);
  };
   const onProgress = (data: any) => {
  //   if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
  //     setCurrentTime(data.currentTime);
  //   }
  };
  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };
  const onLoadStart = () => setIsLoading(true);
  // const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
  const onEnd = () => {};
  // const onSeeking = (currentTime: any) => setCurrentTime(currentTime);
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
      }
    >
      {Boolean(url) && (
        <_View style={styles.videoContainer}>
          <Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            ref={videoPlayer}
            resizeMode={screenType}
            source={{
              uri: url,
            }}
            style={styles.mediaPlayer}
            volume={10}
          />
          {/* <MediaControls
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
            children={undefined}
            containerStyle={{ backgroundColor: 'black' }}
            isFullScreen={false}
          /> */}
        </_View>
      )}
    </_Screen>
  );
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
  webView: {
    height: '88%',
    zIndex: 1,
  },
});

export const NotesRecording = React.memo(_NotesRecording);
