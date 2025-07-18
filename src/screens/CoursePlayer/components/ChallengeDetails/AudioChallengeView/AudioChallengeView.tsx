import { useNavigation } from '@react-navigation/native';
import { AzureAudioInterface } from '../../../../../interfaces';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
// import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import { isStudent, whiteThemeColors } from '../../../../../Utilities';
import { SetStepState } from '../../../../../actions/OnlineNotesActions';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import { Appstate } from '../../../../../reducers/Appstate';
import Screens from '../../../../../screenNames';
import CommonStyles from '../../../../CommonStyles';
import { AudioHeader } from './components/AudioHeader';
import { styles } from './styles';
let isPrevNxtInPrgrs = false;
const AzureVideoPlayer: React.FC<AzureAudioInterface> = ({
  route,
  isPreviousStep,
  isNextStep,
  role,
}) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const videoPlayer: any = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudio, setIsAudio] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType] = useState('content');
  const [header, setHeader] = useState('');
  const [roleName, setRoleName] = useState<any>('');

  useEffect(() => {
    isPrevNxtInPrgrs = false;
    if (route?.params) {
      const { params } = route;
      setIsCompleted(params.isCompleted);
      setIsPrevious(params.isPreviousStep);
      setIsNext(params.isNextStep);
      setIsAudio(params?.isAudio);
      setHeader(params.header);
      setRoleName(params.role);
    } else {
      setIsCompleted(isCompleted);
      setIsPrevious(isPreviousStep);
      setIsNext(isNextStep);
      setIsAudio(isAudio);
      setHeader(header);
      setRoleName(role);
    }
  }, []);

  const onSeek = (seek: any) => {
    //Handler for change in seekbar
    videoPlayer?.current?.seek(seek);
  };

  const onPaused = () => {
    setPaused(!paused);
    // if (!paused) setPlayerState(PLAYER_STATES.PAUSED);
    // else setPlayerState(PLAYER_STATES.PLAYING);
  };

  const onReplay = () => {
    // setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer?.current?.seek(0);
  };

  const onProgress = (data: any) => {
    // if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
    //   setCurrentTime(data.currentTime);
    // }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  // const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
  const onSeeking = (currentTime: any) => setCurrentTime(currentTime);

  const { commonWords } = useSelector((state: Appstate) => state.language);
  var url = isAudio
    ? route?.params.mediaFileUrl
    : `https:${route?.params.mediaFileUrl}(format=m3u8-aapl)`;
  return (
    <_View style={styles.container}>
      <AudioHeader
        header={header}
        onPress={() => {
          onPaused();
          navigation.pop();
        }}
      />
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
          mainColor={whiteThemeColors.AudioChallengeView.mediaControllIconColor}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
          children={undefined}
          containerStyle={{ backgroundColor: 'black' }}
          isFullScreen={true}
        /> */}
      </_View>
      <_View style={styles.chevronContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
            if (!isPrevNxtInPrgrs) {
              isPrevNxtInPrgrs = true;
              navigation.pop();
              route!.params.navigateToNextScreen(
                JSON.parse(route!.params.previousStep)
              );
            }
          }}
          style={[
            {
              display: isPrevious ? 'flex' : 'none',
              width: isStudent(roleName) ? '30%' : '49%',
            },
            styles.chevronButton,
          ]}
        >
          <_VectorIcons
            type='Entypo'
            name='chevron-thin-left'
            size={14}
            color={whiteThemeColors.textColor.darkGrayText}
            style={styles.chevronLeft}
          />
          <_Text numberOfLines={1} style={styles.previousText}>
            {commonWords.previous}
          </_Text>
        </TouchableOpacity>
        {!isStudent(roleName) ? null : (
          <TouchableOpacity
            style={styles.markCompletedBtn}
            onPress={() => {
              if (!isPrevNxtInPrgrs) {
                isPrevNxtInPrgrs = true;
                const Obj = {
                  StepId: route!.params.stepId,
                  Status: !isCompleted,
                };
                route!.params.updateLocalStep(route!.params.stepId);
                dispatch(SetStepState(Obj)).then(() => {
                  setIsCompleted(!isCompleted);
                });
                navigation.navigate(Screens.challengeDetail.name, {
                  header: header,
                  role: roleName,
                });
              }
            }}
          >
            <_Text
              numberOfLines={1}
              style={[CommonStyles.className, styles.markText]}
            >
              {isCompleted === true
                ? commonWords.markAsIncomplete
                : commonWords.markAsComplete}
            </_Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            if (!isPrevNxtInPrgrs) {
              isPrevNxtInPrgrs = true;
              navigation.pop();
              route!.params.navigateToNextScreen(
                JSON.parse(route!.params.nextStep)
              );
            }
          }}
          style={[
            {
              display: isNext ? 'flex' : 'none',
              width: isStudent(roleName) ? '30%' : '49%',
            },
            styles.nextBtn,
          ]}
        >
          <_Text numberOfLines={1} style={styles.nextBtnText}>
            {commonWords.next}
          </_Text>
          <_VectorIcons
            type='Entypo'
            name='chevron-thin-right'
            size={14}
            color={whiteThemeColors.textColor.darkGrayText}
            style={styles.chevronRight}
          />
        </TouchableOpacity>
      </_View>
    </_View>
  );
};

export const AudioChallenge = React.memo(AzureVideoPlayer);
