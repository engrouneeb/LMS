import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  BackHandler,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  Text,
} from 'react-native';
import {whiteThemeColors} from '../../../Utilities';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
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
  const [isFlashOn, setIsFlashOn] = useState<'on' | 'off'>('off');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [videoUri, setVideoUri] = useState<string>('');
  const [videoPreviewModal, setVideoPreviewModal] = useState<boolean>(false);
  const [imagePreviewModal, setImagePreviewModal] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60);
  const cameraRef = useRef<Camera>(null);

  const {hasPermission, requestPermission} = useCameraPermission();
  const {
    hasPermission: hasMicPermission,
    requestPermission: requestMicPermission,
  } = useMicrophonePermission();

  const device = useCameraDevice(isFrontCam ? 'front' : 'back');

  useEffect(() => {
    const getPermissions = async () => {
      try {
        await requestPermission();
        await requestMicPermission();
      } catch (err) {
        console.log('Permission error:', err);
      }
    };
    getPermissions();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const sendMsg = (text: string, object?: any) => {
    route.params.onSend(text, object);
    setVideoPreviewModal(false);
    navigation.goBack();
  };

 async function takePicture() {
   if (!cameraRef.current) return;

   try {
     const photo = await cameraRef.current.takePhoto({
       flash: isFlashOn,
       qualityPrioritization: 'quality',
     });

     let compressedURL = await Media_Compressor(photo.path, 'image');
     if (
       compressedURL &&
       !compressedURL.startsWith('http') &&
       !compressedURL.startsWith('file://') &&
       !compressedURL.startsWith('data:')
     ) {
       compressedURL = `file://${compressedURL}`;
     }

     setImageUrl(compressedURL);
     setImagePreviewModal(true);
   } catch (err) {
     console.error('Photo error:', err);
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
      try {
        await cameraRef.current.stopRecording();
      } catch (e) {
        console.log('Recording already stopped');
      }
      setIsRecording(false);
    }
  };

  if (!hasPermission || !hasMicPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Camera or microphone permission not granted</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.permissionContainer}>
        <Text>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
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
        video={isVideo}
        audio={isVideo}
        torch={isFlashOn === 'on' ? 'on' : 'off'}
        enableZoomGesture
      />

      <_View style={styles.container}>
        {isRecording && (
          <_View style={styles.timerContainer}>
            <Animated.View style={[styles.blinkingDot, {opacity: fadeAnim}]} />
            <_Text style={styles.timerText}>
              {`${seconds}`}
              <_Text style={{fontSize: 10}}>{` Sec`}</_Text>
            </_Text>
          </_View>
        )}

        <TouchableHighlight
          style={styles.captureBtn}
          onPress={() => {
            isVideo
              ? isRecording
                ? stopRecording()
                : startRecord()
              : takePicture();
          }}
          underlayColor="transparent">
          <_View
            style={[
              styles.captureInner,
              {
                backgroundColor: isVideo
                  ? whiteThemeColors.red
                  : whiteThemeColors.white,
              },
            ]}
          />
        </TouchableHighlight>

        <_View style={styles.bottomBtns}>
          <TouchableOpacity
            style={[
              styles.iconBg,
              {
                backgroundColor: !isVideo
                  ? whiteThemeColors.white + '80'
                  : 'transparent',
              },
            ]}
            onPress={() => setIsVideo(false)}>
            <_VectorIcons
              name={'camera-outline'}
              type={'Ionicons'}
              size={30}
              color={
                !isVideo ? whiteThemeColors.primary : whiteThemeColors.white
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconBg,
              {
                backgroundColor: isVideo
                  ? whiteThemeColors.white + '80'
                  : 'transparent',
              },
            ]}
            onPress={() => setIsVideo(true)}>
            <_VectorIcons
              name={'videocam-outline'}
              type={'Ionicons'}
              size={30}
              color={
                isVideo ? whiteThemeColors.primary : whiteThemeColors.white
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconBg,
              {
                backgroundColor: isFrontCam
                  ? whiteThemeColors.white + '80'
                  : 'transparent',
              },
            ]}
            onPress={() => {
              setIsFrontCam(!isFrontCam);
              if (isFlashOn === 'on') setIsFlashOn('off');
            }}>
            <_VectorIcons
              name={'camera-reverse-outline'}
              type={'Ionicons'}
              size={30}
              color={
                isFrontCam ? whiteThemeColors.primary : whiteThemeColors.white
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={isFrontCam}
            style={[
              styles.iconBg,
              {
                backgroundColor:
                  isFlashOn === 'on'
                    ? whiteThemeColors.white + '80'
                    : 'transparent',
                opacity: isFrontCam ? 0.5 : 1,
              },
            ]}
            onPress={() => setIsFlashOn(isFlashOn === 'on' ? 'off' : 'on')}>
            <_VectorIcons
              name={isFlashOn === 'off' ? 'flash-outline' : 'flash-off-outline'}
              type={'Ionicons'}
              size={30}
              color={
                isFlashOn === 'off'
                  ? whiteThemeColors.white
                  : whiteThemeColors.primary
              }
            />
          </TouchableOpacity>
        </_View>
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
    </View>
  );
};

export {CameraScreen};
