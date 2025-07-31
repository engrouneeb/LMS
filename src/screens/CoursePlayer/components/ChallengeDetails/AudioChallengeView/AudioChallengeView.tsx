import {useNavigation} from '@react-navigation/native';
import {AzureAudioInterface} from '../../../../../interfaces';
import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {isStudent, whiteThemeColors} from '../../../../../Utilities';
import {SetStepState} from '../../../../../actions/OnlineNotesActions';
import {_Text, _VectorIcons, _View} from '../../../../../components';
import {Appstate} from '../../../../../reducers/Appstate';
import Screens from '../../../../../screenNames';
import CommonStyles from '../../../../CommonStyles';
import {AudioHeader} from './components/AudioHeader';
import {styles} from './styles';

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
  const [screenType] = useState('content');
  const [header, setHeader] = useState('');
  const [roleName, setRoleName] = useState<any>('');

  useEffect(() => {
    isPrevNxtInPrgrs = false;
    if (route?.params) {
      const {params} = route;
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

  const onSeek = (seek: number) => {
    videoPlayer?.current?.seek(seek);
    setCurrentTime(seek);
  };

  const onProgress = (data: any) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPaused(true);
    videoPlayer?.current?.seek(0);
  };

  const {commonWords} = useSelector((state: Appstate) => state.language);

  const url = isAudio
    ? route?.params.mediaFileUrl
    : `https:${route?.params.mediaFileUrl}(format=m3u8-aapl)`;

  return (
    <_View style={styles.container}>
      <AudioHeader
        header={header}
        onPress={() => {
          setPaused(true);
          navigation.pop();
        }}
      />
      <_View style={styles.videoContainer}>
        <Video
          ref={videoPlayer}
          source={{uri: url}}
          paused={paused}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onProgress={onProgress}
          onEnd={onEnd}
          resizeMode={screenType}
          style={styles.mediaPlayer}
          volume={10}
        />

        <View style={{width: '100%', paddingHorizontal: 15, paddingBottom: 40}}>
          <TouchableOpacity
            onPress={() => setPaused(!paused)}
            style={{alignSelf: 'center', marginBottom: 10}}>
            <Text style={{color: whiteThemeColors.white}}>
              {paused ? 'Play' : 'Pause'}
            </Text>
          </TouchableOpacity>

          <Slider
            value={currentTime}
            minimumValue={0}
            maximumValue={duration}
            onSlidingComplete={onSeek}
            minimumTrackTintColor={whiteThemeColors.primary}
            maximumTrackTintColor="#ccc"
            thumbTintColor={whiteThemeColors.primary}
          />

          <Text
            style={{
              color: whiteThemeColors.white,
              textAlign: 'center',
              marginTop: 5,
            }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        </View>
      </_View>

      <_View style={styles.chevronContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!isPrevNxtInPrgrs) {
              isPrevNxtInPrgrs = true;
              navigation.pop();
              route!.params.navigateToNextScreen(
                JSON.parse(route!.params.previousStep),
              );
            }
          }}
          style={[
            {
              display: isPrevious ? 'flex' : 'none',
              width: isStudent(roleName) ? '30%' : '49%',
            },
            styles.chevronButton,
          ]}>
          <_VectorIcons
            type="Entypo"
            name="chevron-thin-left"
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
            }}>
            <_Text
              numberOfLines={1}
              style={[CommonStyles.className, styles.markText]}>
              {isCompleted
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
                JSON.parse(route!.params.nextStep),
              );
            }
          }}
          style={[
            {
              display: isNext ? 'flex' : 'none',
              width: isStudent(roleName) ? '30%' : '49%',
            },
            styles.nextBtn,
          ]}>
          <_Text numberOfLines={1} style={styles.nextBtnText}>
            {commonWords.next}
          </_Text>
          <_VectorIcons
            type="Entypo"
            name="chevron-thin-right"
            size={14}
            color={whiteThemeColors.textColor.darkGrayText}
            style={styles.chevronRight}
          />
        </TouchableOpacity>
      </_View>
    </_View>
  );
};

// Helper to format seconds to mm:ss
const formatTime = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const AudioChallenge = React.memo(AzureVideoPlayer);
