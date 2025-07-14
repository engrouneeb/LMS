import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../components';
import {
  ImagePreview,
  VideoPreview,
} from '../ChatInterfaceScreen/CameraAttachmentComponents';
import { styles } from './CameraScreenStyle';
import {
  Media_Compressor,
  StopBlinkingAnimation,
  blinkingAnimation,
} from '../ChatInterfaceScreen/Functions';
import { useNavigation } from '@react-navigation/native';
import { cameraScreenInterface } from '../../../interfaces';

type cameraTorchType = 'on' | 'off' | 'auto' | 'torch' | undefined;

const CameraScreen: FC<cameraScreenInterface> = ({ route }) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [isFrontCam, setIsFrontCam] = useState<boolean>(false);
  const [isFlashOn, setIsFlashOn] = useState<cameraTorchType>('off');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [videoUri, setVideoUri] = useState<string>('');
  const [videoPreviewModal, setVideoPreviewModal] = useState<boolean>(false);
  const [imagePreviewModal, setImagePreviewModal] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60);
  const CameraRef: any = useRef();
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
    const options = {
      base64: true,
      forceUpOrientation: true,
      writeExif: true,
      quality: 0.2,
    };
    const data = await CameraRef.current.takePictureAsync(options);
    const compressedURL = await Media_Compressor(data.uri, 'image');
    setImageUrl(compressedURL);
    setImagePreviewModal(true);
  }
  const startRecord = () => {
    setSeconds(60);
    setIsRecording(true);
    blinkingAnimation(fadeAnim);
    const options = {
      // quality: 0.2,
      videoBitrate: 8000000,
      maxDuration: 60,
      base64: true,
    };
    CameraRef.current
      .recordAsync(options)
      .then(async (data: any) => {
        StopBlinkingAnimation(fadeAnim);
        setVideoUri(data.uri);
        setVideoPreviewModal(true);
        setIsRecording(false);
      })
      .catch((err: any) => console.log(err));
  };
  const stopRecording = () => {
    setIsRecording(false);
    setSeconds(60);
    CameraRef.current.stopRecording();
  };

  return (
    <_View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeIcon}
      >
        <_VectorIcons
          name={'arrow-back'}
          type={'MaterialIcons'}
          size={25}
          color={whiteThemeColors.white}
        />
      </TouchableOpacity>
      <RNCamera
        ref={CameraRef}
        style={styles.preview}
        type={
          isFrontCam
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        }
        focusable
        captureAudio={true}
        useNativeZoom={true}
        flashMode={isFlashOn}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {({ camera, status }) => {
          if (status !== 'READY') return <_Text>Camera is not Ready yet</_Text>;
          return (
            <_View>
              <_View style={styles.cameraView}>
                {isRecording && (
                  <>
                    <_View style={styles.timerContainer}>
                      <Animated.View
                        style={[styles.blinkingDot, { opacity: fadeAnim }]}
                      />
                      <_Text style={styles.timerText}>
                        {`${seconds}`}
                        <_Text style={{ fontSize: 10 }}>{` Sec`}</_Text>
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
                }}
              >
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
                  }}
                >
                  <_VectorIcons
                    name={'camera-outline'}
                    type={'Ionicons'}
                    size={30}
                    color={
                      isVideo
                        ? whiteThemeColors.white
                        : whiteThemeColors.primary
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
                  }}
                >
                  <_VectorIcons
                    name={'videocam-outline'}
                    type={'Ionicons'}
                    size={30}
                    color={
                      isVideo
                        ? whiteThemeColors.primary
                        : whiteThemeColors.white
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
                    isFlashOn === 'torch' && setIsFlashOn('off');
                  }}
                >
                  <_VectorIcons
                    name={'camera-reverse-outline'}
                    type={'Ionicons'}
                    size={30}
                    color={
                      isFrontCam
                        ? whiteThemeColors.primary
                        : whiteThemeColors.white
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
                      isFlashOn === 'torch'
                        ? whiteThemeColors.white + 80
                        : whiteThemeColors.transparent,
                  }}
                  onPress={() => {
                    setIsFlashOn(isFlashOn === 'torch' ? 'off' : 'torch');
                  }}
                >
                  <_VectorIcons
                    name={
                      isFlashOn === 'off'
                        ? 'flash-outline'
                        : 'flash-off-outline'
                    }
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
          );
        }}
      </RNCamera>
    </_View>
  );
};
export { CameraScreen };
