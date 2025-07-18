import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Platform, Pressable } from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import { DocumentDirectoryPath } from 'react-native-fs';
import { whiteThemeColors } from '../../../../Utilities';
import { SendIcon } from '../../../../../assets/Icons';
import { _Text, _VectorIcons, _View } from '../../../../components';
import Loader from '../../../Loader/loader';
import {
  blinkingAnimation,
  DeleteVoiceMsgAnimation,
  fadeInAnimation,
  rotateIconAnimation,
  rotateMinus90Deg,
  StopBlinkingAnimation,
} from '../Functions/animationFunctions';
import { onSendVoiceMsgInterface, VoiceMsgProps } from '../../../../interfaces';
import { useUploadAttachment } from '../CameraAttachmentComponents/useUploadAttachment';

const voiceRecorder = new AudioRecorderPlayer();
voiceRecorder.setSubscriptionDuration(0.09);

export const VoiceMessageArea: FC<VoiceMsgProps> = ({
  showVoiceMsg,
  setVoiceMsg,
  onSendVoiceMsg,
}) => {
  const [, setRecordSecs] = useState<number>(0);
  const [, setRecordTime] = useState<string>('00:00:00');
  const { uploadFile } = useUploadAttachment();
  const [startRecord, setStartRecord] = useState<boolean>(false);
  const fadeAnim: any = useRef(new Animated.Value(0)).current;
  const deleteAnimation: any = useRef(new Animated.Value(1)).current;
  const animation: any = useState(new Animated.Value(0))[0];
  const fadeDelAnim: any = useRef(new Animated.Value(1)).current;
  const [seconds, setSeconds] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(false);
  const [clear_Interval, setClear_Interval] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeToShow, setTimeToShow] = useState<string>('0');

  const removeRecordedFile: () => Promise<void> = async () => {
    await voiceRecorder.stopRecorder();
    await voiceRecorder.removeRecordBackListener();
  };

  const handleDeleteAnimation: () => void = () => {
    removeRecordedFile();
    StopBlinkingAnimation(fadeAnim);
    DeleteVoiceMsgAnimation(deleteAnimation, fadeDelAnim, animation);
    endTimer();
    rotateIconAnimation(animation);
    fadeInAnimation(fadeDelAnim);
    setTimeout(() => {
      setRecordSecs(0);
      setLoading(false);
      setVoiceMsg(false);
      setStartRecord(false);
    }, 1620);
  };

  const handleOnSend: () => void = () => {
    onStopRecord();
    unMountVoiceMsgArea();
  };

  useEffect(() => {
    if (showVoiceMsg) handleVoiceMessage();
  }, [showVoiceMsg]);

  useEffect(() => {
    blinkingAnimation(fadeAnim);
  }, [startRecord, fadeAnim]);

  function startTimer(): void {
    setClear_Interval(false);
  }
  function endTimer(): void {
    setClear_Interval(true);
  }
  useEffect(
    function () {
      if (clear_Interval) return;
      let timeInterval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1e3);
      return () => clearInterval(timeInterval);
    },
    [clear_Interval],
  );

  useEffect(() => {
    const timeToShow = timeFormate(seconds + 1);
    setTimeToShow(timeToShow);
    if (seconds == 180) {
      onStopRecord();
      unMountVoiceMsgArea();
    }
  }, [seconds]);

  useEffect(() => {
    blinkingAnimation(fadeAnim);
    fadeDelAnim.setValue(1);
    setPause(false);
  }, [startRecord]);
  const unMountVoiceMsgArea: () => void = () => {
    endTimer();
    StopBlinkingAnimation(fadeAnim);
    setStartRecord(false);
  };

  function timeFormate(duration: number): string {
    const hrs = ~~(duration / 3600); //~~ means Math.floor()
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
    let ret = '';
    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }

  const handleVoiceMessage: () => void = () => {
    setStartRecord((prevFlag) => !prevFlag);
    setSeconds(0);
    startTimer();
    onStartRecord();
  };

  const onStartRecord: () => Promise<void> = async () => {
    const path = Platform.select({
      ios: 'newVoiceMsg.aac',
      android: `${DocumentDirectoryPath}/hello.aac`,
    });
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    await voiceRecorder.startRecorder(path, audioSet);
    voiceRecorder.addRecordBackListener((e: any) => {
      setRecordSecs(e.current_position);
      setRecordTime(voiceRecorder.mmssss(Math.floor(e.current_position)));
    });
  };

  const onStopRecord: () => Promise<void> = async () => {
    setLoading(true);
    const stopped: string = await voiceRecorder.stopRecorder();
    const uploadedFile: onSendVoiceMsgInterface = await uploadFile(
      stopped,
      false,
      false,
      true,
    );
    await voiceRecorder.removeRecordBackListener();
    setRecordSecs(0);
    setLoading(false);
    setVoiceMsg(false);
    StopBlinkingAnimation(fadeAnim);
    if (uploadedFile?.error) {
      return Alert.alert('Error', uploadedFile?.error_description);
    }
    onSendVoiceMsg(seconds, uploadedFile?.uri);
  };

  const onPausePlay: () => Promise<void> = useCallback(async () => {
    StopBlinkingAnimation(fadeAnim);
    setPause(true);
    endTimer();
    await voiceRecorder.pausePlayer();
  }, []);
  const onResumePlay: () => Promise<void> = useCallback(async () => {
    blinkingAnimation(fadeAnim);
    setPause(false);
    startTimer();
    await voiceRecorder.resumePlayer();
  }, []);
  return showVoiceMsg ? (
    <_View
      style={{
        width: '100%',
        height: 55,
        backgroundColor: whiteThemeColors.white,
        position: 'absolute',
        bottom: 15,
      }}
    >
      <_View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingHorizontal: 15,
          flexDirection: 'row',
          backgroundColor: whiteThemeColors.white,
          borderRadius: 20,
        }}
      >
        {loading ? <Loader size={'small'} /> : null}
        <_View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name={'radiobox-marked'}
              size={18}
              color={whiteThemeColors.red}
            />
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ translateX: deleteAnimation }],
              flexDirection: 'row',
              opacity: fadeDelAnim,
            }}
          >
            <_Text
              style={{
                fontSize: 14,
                color: whiteThemeColors.primary,

                width: 40,
                marginLeft: 5,
              }}
            >
              {timeToShow}
            </_Text>
          </Animated.View>
        </_View>
        <_View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-evenly',
          }}
        >
          <Animated.View
            style={{ transform: [{ rotate: rotateMinus90Deg(animation) }] }}
          >
            <Pressable hitSlop={20} onPress={handleDeleteAnimation}>
              <_VectorIcons
                type={'Ionicons'}
                name={'trash-bin-outline'}
                color={whiteThemeColors.red}
                size={22}
              />
            </Pressable>
          </Animated.View>

          <Pressable
            hitSlop={20}
            onPress={() => (pause ? onResumePlay() : onPausePlay())}
          >
            <_VectorIcons
              type={'MaterialIcons'}
              name={pause ? 'play-arrow' : 'pause'}
              color={whiteThemeColors.primary}
              size={22}
            />
          </Pressable>
        </_View>
        <_View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Pressable
            onPress={() => handleOnSend()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              backgroundColor: whiteThemeColors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SendIcon size={35} color={whiteThemeColors.primary} />
          </Pressable>
        </_View>
      </_View>
    </_View>
  ) : null;
};
