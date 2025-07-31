import {useNavigation} from '@react-navigation/native';
import {AzureAudioInterface} from '../../../../../interfaces';
import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {isStudent, whiteThemeColors} from '../../../../../Utilities';
import {SetStepState} from '../../../../../actions/OnlineNotesActions';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../components';
import {Appstate} from '../../../../../reducers/Appstate';
import Header from '../../../../Headers';
import {style} from './styles';
import Slider from '@react-native-community/slider';

let isPrevNxtInProgress = false;

const VideoPlayer: React.FC<AzureAudioInterface> = ({
  role,
  route,
  header,
  mediaFileUrl,
  isNextStep,
  isCompleted,
  isPreviousStep,
}) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const {commonWords} = useSelector((state: Appstate) => state.language);
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

  useEffect(() => {
    isPrevNxtInProgress = false;
    if (route?.params) {
      let {params} = route;
      setRoleName(params.role);
      setHeader(params.header);
      setUrl(params.mediaFileUrl);
      setIsNext(params.isNextStep);
      setIsCompleted(params.isCompleted);
      setIsPrevious(params.isPreviousStep);
    } else {
      setRoleName(role);
      setHeader(header);
      setUrl(mediaFileUrl);
      setIsNext(isNextStep);
      setIsCompleted(isCompleted);
      setIsPrevious(isPreviousStep);
    }
  }, []);

  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  const onSeek = (seek: number) => {
    videoPlayerRef.current.seek(seek);
    setCurrentTime(seek);
  };

  const onProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);
  const onEnd = () => {};

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
      backgroundColor={whiteThemeColors.background}>
      <_View style={style.container}>
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={paused}
          ref={videoPlayerRef}
          resizeMode={'contain'}
          source={{uri: url}}
          style={style.mediaPlayer}
          volume={10}
          ignoreSilentSwitch="ignore"
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="gray" />
        ) : (
          <_View style={{width: '90%', alignSelf: 'center', marginTop: 12}}>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              onValueChange={onSeek}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
            <TouchableOpacity
              onPress={() => setPaused(!paused)}
              style={{
                marginTop: 16,
                padding: 10,
                backgroundColor: 'gray',
                borderRadius: 6,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                {paused ? 'Play' : 'Pause'}
              </Text>
            </TouchableOpacity>
          </_View>
        )}
      </_View>

      <_View style={style.actionBtnContainer}>
        {isPrevious && (
          <Pressable
            onPress={() => {
              if (!isPrevNxtInProgress) {
                isPrevNxtInProgress = true;
                navigation.goBack();
                route?.params.navigateToNextScreen(
                  JSON.parse(route.params.previousStep),
                );
              }
            }}
            style={style.actionBtn}>
            <_VectorIcons
              type="Entypo"
              name="chevron-thin-left"
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
            }}>
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
                route?.params.navigateToNextScreen(
                  JSON.parse(route.params.nextStep),
                );
              }
            }}
            style={style.actionBtn}>
            <_Text style={style.actionBtnTxt}>{commonWords.next}</_Text>
            <_VectorIcons
              type="Entypo"
              name="chevron-thin-right"
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

export {VideoPlayer};
