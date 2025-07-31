import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  BackHandler,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {whiteThemeColors} from '../../../Utilities';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
  CameraPosition,
  Torch,
} from 'react-native-vision-camera';
import {_Text, _VectorIcons, _View} from '../../../components';
import {
  ImagePreview,
  VideoPreview,
} from '../ChatInterfaceScreen/CameraAttachmentComponents';
import {styles} from './CameraScreenStyle';
import {
  Media_Compressor,
  StopBlinkingAnimation,
  blinkingAnimation,
} from '../ChatInterfaceScreen/Functions';
import {useNavigation} from '@react-navigation/native';
import {cameraScreenInterface} from '../../../interfaces';

const CameraScreen: FC<cameraScreenInterface> = ({route}) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [isFrontCam, setIsFrontCam] = useState<boolean>(false);
  const [isFlashOn, setIsFlashOn] = useState<Torch>('off');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [videoUri, setVideoUri] = useState<string>('');
  const [videoPreviewModal, setVideoPreviewModal] = useState<boolean>(false);
  const [imagePreviewModal, setImagePreviewModal] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60);
  const cameraRef = useRef<Camera>(null);

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  const device = useCameraDevice(isFrontCam ? 'front' : 'back');

  useEffect(() => {
    if (!hasCameraPermission) {
      requestCameraPermission();
    }
    if (!hasMicrophonePermission) {
      requestMicrophonePermission();
    }
  }, []);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [seconds, isRecording]);

  const sendMsg = (text: string, object?: any) => {
    route.params.onSend(text, object);
    setVideoPreviewModal(false);
    navigation.goBack();
    return true;
  };

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: isFlashOn,
      });
      const compressedURL = await Media_Compressor(photo.path, 'image');
      setImageUrl(compressedURL);
      setImagePreviewModal(true);
    }
  }

  const startRecord = async () => {
    if (!cameraRef.current) return;

    setSeconds(60);
    setIsRecording(true);
    blinkingAnimation(fadeAnim);

    try {
      await cameraRef.current.startRecording({
        flash: isFlashOn,
        onRecordingFinished: async video => {
          StopBlinkingAnimation(fadeAnim);
          const compressedURL = await Media_Compressor(video.path, 'video');
          setVideoUri(compressedURL);
          setVideoPreviewModal(true);
          setIsRecording(false);
        },
        onRecordingError: error => {
          console.error('Recording error:', error);
          setIsRecording(false);
          StopBlinkingAnimation(fadeAnim);
        },
      });
    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsRecording(false);
      StopBlinkingAnimation(fadeAnim);
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      await cameraRef.current.stopRecording();
      setIsRecording(false);
      setSeconds(60);
    }
  };

  if (!hasCameraPermission || !hasMicrophonePermission) {
    return (
      <_View style={styles.permissionContainer}>
        <_Text>Camera or microphone permission not granted</_Text>
      </_View>
    );
  }

  if (device == null) {
    return (
      <_View style={styles.permissionContainer}>
        <_Text>No camera device found</_Text>
      </_View>
    );
  }

  return (
    <_View style={StyleSheet.absoluteFill}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeIcon}>
        <_VectorIcons
          name={'arrow-back'}
          type={'MaterialIcons'}
          size={25}
          color={whiteThemeColors.white}
        />
      </TouchableOpacity>

      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        video={true}
        audio={true}
        torch={isFlashOn}
        orientation="portrait"
      />

      <_View>
        <_View style={styles.cameraView}>
          {isRecording && (
            <>
              <_View style={styles.timerContainer}>
                <Animated.View
                  style={[styles.blinkingDot, {opacity: fadeAnim}]}
                />
                <_Text style={styles.timerText}>
                  {`${seconds}`}
                  <_Text style={{fontSize: 10}}>{` Sec`}</_Text>
                </_Text>
              </_View>
            </>
          )}
        </_View>

        <TouchableHighlight
          style={styles.captureBtn}
          onPress={() => {
            isVideo
              ? isRecording
                ? stopRecording()
                : startRecord()
              : takePicture();
          }}>
          <Animated.View
            style={{
              backgroundColor: isVideo
                ? whiteThemeColors.red
                : whiteThemeColors.white,
              borderRadius: 20,
              width: 40,
              height: 40,
              opacity: fadeAnim,
            }}
          />
        </TouchableHighlight>

        <_View style={styles.bottomBtns}>
          <TouchableOpacity
            style={{
              ...styles.iconBg,
              backgroundColor: isVideo
                ? whiteThemeColors.transparent
                : whiteThemeColors.white + 80,
            }}
            onPress={() => {
              setIsVideo(false);
            }}>
            <_VectorIcons
              name={'camera-outline'}
              type={'Ionicons'}
              size={30}
              color={
                isVideo ? whiteThemeColors.white : whiteThemeColors.primary
              }
              style={{
                zIndex: 5,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconBg,
              backgroundColor: isVideo
                ? whiteThemeColors.white + 80
                : whiteThemeColors.transparent,
            }}
            onPress={() => {
              setIsVideo(true);
            }}>
            <_VectorIcons
              name={'videocam-outline'}
              type={'Ionicons'}
              size={30}
              color={
                isVideo ? whiteThemeColors.primary : whiteThemeColors.white
              }
              style={{
                zIndex: 5,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconBg,
              backgroundColor: isFrontCam
                ? whiteThemeColors.white + 80
                : whiteThemeColors.transparent,
            }}
            onPress={() => {
              setIsFrontCam(!isFrontCam);
              isFlashOn === 'on' && setIsFlashOn('off');
            }}>
            <_VectorIcons
              name={'camera-reverse-outline'}
              type={'Ionicons'}
              size={30}
              color={
                isFrontCam ? whiteThemeColors.primary : whiteThemeColors.white
              }
              style={{
                zIndex: 5,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isFrontCam}
            style={{
              ...styles.iconBg,
              backgroundColor:
                isFlashOn === 'on'
                  ? whiteThemeColors.white + 80
                  : whiteThemeColors.transparent,
            }}
            onPress={() => {
              setIsFlashOn(isFlashOn === 'on' ? 'off' : 'on');
            }}>
            <_VectorIcons
              name={isFlashOn === 'off' ? 'flash-outline' : 'flash-off-outline'}
              type={'Ionicons'}
              size={30}
              color={
                isFlashOn === 'off'
                  ? whiteThemeColors.white
                  : whiteThemeColors.primary
              }
              style={{
                zIndex: 5,
              }}
            />
          </TouchableOpacity>
        </_View>
        {imagePreviewModal && (
          <ImagePreview
            uri={imageUrl}
            imagePreviewModal={imagePreviewModal}
            setImagePreviewModal={setImagePreviewModal}
            onSend={sendMsg}
          />
        )}
        {videoPreviewModal && (
          <VideoPreview
            uri={videoUri}
            videoPreviewModal={videoPreviewModal}
            setVideoPreviewModal={setVideoPreviewModal}
            onSend={sendMsg}
          />
        )}
      </_View>
    </_View>
  );
};

export {CameraScreen};
