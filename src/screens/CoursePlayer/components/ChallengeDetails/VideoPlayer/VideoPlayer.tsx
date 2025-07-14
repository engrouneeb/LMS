import { useNavigation } from '@react-navigation/native';
import { AzureAudioInterface } from 'interfaces';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import { isStudent, whiteThemeColors } from 'utilities';
import { SetStepState } from '../../../../../actions/OnlineNotesActions';
import {
  _Button,
  _Screen,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../components';
import { Appstate } from '../../../../../reducers/Appstate';

import Header from '../../../../Headers';
import { style } from './styles';
let isPrevNxtInProgress = false;

const VideoPlayer: React.FC<AzureAudioInterface> = ({
  role,
  route,
  header,
  mediaFileUrl,
  isNextStep,
  isCompleted,
  isPreviousStep,
  // updateLocalStep,
  // stepId,
}) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const { commonWords } = useSelector((state: Appstate) => state.language);
  const [url, setUrl] = useState('');
  const [isNext, setIsNext] = useState<any>();
  const [ScreenHeader, setHeader] = useState('');
  const [roleName, setRoleName] = useState<any>('');
  const [isPrevious, setIsPrevious] = useState<any>();
  const [iscompleted, setIsCompleted] = useState(false);
  const videoPlayerRef: any = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  useEffect(() => {
    isPrevNxtInProgress = false;
    if (route?.params) {
      let { params } = route;

      setRoleName(params.role);
      setHeader(params.header);
      setUrl(params.mediaFileUrl);
      setIsNext(params.isNextStep);
      // PlayVideo(params.mediaFileUrl);
      setIsCompleted(params.isCompleted);
      setIsPrevious(params.isPreviousStep);
    } else {
      setRoleName(role);
      setHeader(header);
      setUrl(mediaFileUrl);
      setIsNext(isNextStep);
      // PlayVideo(mediaFileUrl);
      setIsCompleted(isCompleted);
      setIsPrevious(isPreviousStep);
    }
  }, []);

  const handleBack = () => {
    navigation.goBack();
    return true;
  };

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
    <_Screen
      header={
        <Header
          isBack
          Screen={ScreenHeader}
          GoBack={() => {
            navigation.goBack();
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      <_View style={style.container}>
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
          style={style.mediaPlayer}
          volume={10}
          ignoreSilentSwitch='ignore'
        />
        <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor={whiteThemeColors.AudioChallengeView.mediaControllIconColor}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
          isFullScreen={false}
        />
      </_View>
      <_View style={style.actionBtnContainer}>
        {isPrevious && (
          <Pressable
            onPress={() => {
              if (!isPrevNxtInProgress) {
                isPrevNxtInProgress = true;
                navigation.goBack();
                route?.params.navigateToNextScreen(
                  JSON.parse(route.params.previousStep)
                );
              }
            }}
            style={style.actionBtn}
          >
            <_VectorIcons
              type='Entypo'
              name='chevron-thin-left'
              size={16}
              color={whiteThemeColors.textColor.darkGrayText}
              style={style.chevronThinLft}
            />
            <_Text style={style.actionBtnTxt}>{commonWords.previous}</_Text>
          </Pressable>
        )}
        {isStudent(roleName) && (
          <Pressable
            style={style.actionBtn}
            onPress={() => {
              if (!isPrevNxtInProgress) {
                isPrevNxtInProgress = true;
                const Obj = {
                  StepId: route?.params?.stepId,
                  Status: !iscompleted,
                };
                route?.params?.updateLocalStep(route?.params?.stepId);
                dispatch(SetStepState(Obj)).then(() => {
                  setIsCompleted(!iscompleted);
                });
                navigation.goBack();
              }
            }}
          >
            <_Text style={style.actionBtnTxt}>
              {iscompleted
                ? commonWords.markAsIncomplete
                : commonWords.markAsComplete}
            </_Text>
          </Pressable>
        )}
        {isNext && (
          <Pressable
            onPress={() => {
              if (!isPrevNxtInProgress) {
                isPrevNxtInProgress = true;
                navigation.goBack();
                // route.params.navigateToNextScreen(JSON.parse(isNext));
                route?.params.navigateToNextScreen(
                  JSON.parse(route.params.nextStep)
                );
              }
            }}
            style={style.actionBtn}
          >
            <_Text style={style.actionBtnTxt}>{commonWords.next}</_Text>
            <_VectorIcons
              type='Entypo'
              name='chevron-thin-right'
              size={16}
              color={whiteThemeColors.textColor.darkGrayText}
              style={style.chevronThinRight}
            />
          </Pressable>
        )}
      </_View>
    </_Screen>
  );
};

export { VideoPlayer };
