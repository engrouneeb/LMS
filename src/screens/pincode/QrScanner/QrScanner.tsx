import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  useCameraDevice,
  useCodeScanner,
  Camera,
} from 'react-native-vision-camera';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  CheckInOut,
  checkInSuccess,
  getCompanyCoursClassesList,
  message,
  validateQRcode,
  viaQRCode,
} from '../../../actions/PinCodeActions';
import {Appstate} from '../../../reducers/Appstate';
import screenNames, {default as Screens} from '../../../screenNames';
import {_ActivityIndicator} from '../../Loader';
import {CustomAlert} from '../../../Utilities';
import {whiteThemeColors} from '../../../Utilities/colors';

interface Props {
  onClose: () => void;
  setStatus: (res: any) => void;
}

export const QrScanner: React.FC<Props> = ({onClose, setStatus}) => {
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const device = useCameraDevice(cameraPosition);
  const viewFocused = useIsFocused();
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const selectedLanguage = useSelector((state: Appstate) => state.language);
  const {checkInList} = useSelector((state: Appstate) => state.token);
  const [loading, setLoading] = useState(false);
  const [checkoutUserId, setCheckoutUserId] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [torch, setTorch] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const {width, height} = Dimensions.get('window');
  const scannerSize = width * 0.8;
  const scannerPosition = {
    top: (height - scannerSize) / 2,
    left: (width - scannerSize) / 2,
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, scannerSize],
  });

  const handleScannedCode = async (info = '') => {
    setLoading(false);
    dispatch(validateQRcode(info)).then(res => {
      if (Boolean(res.data)) {
        const {isCheckedIn} = res.data.user;
        if (isCheckedIn) {
          setCheckoutUserId(res.data.user.userId);
          propmtUserToCheckOut();
        } else {
          const {userId} = res.data.user;
          dispatch(getCompanyCoursClassesList(userId))
            .then((response: []) => {
              if (response.length > 0) {
                navigation.navigate(Screens.CoursesClassesList.name, {
                  user: res.data.user,
                });
              } else if (checkInList && checkInList.length > 0) {
                navigation.navigate(screenNames.CheckinOutCoursesList.name, {
                  user: res.data.user,
                });
              } else {
                dispatch(viaQRCode(info)).then((res: any) => {
                  if (res) {
                    onClose();
                    setStatus(res.data);
                  } else {
                    setStatus({error: true, msg: 'Cannot get result'});
                    onClose();
                  }
                });
              }
            })
            .catch(() => {
              setStatus({error: true, msg: 'Cannot get result'});
              onClose();
            })
            .finally(() => {
              onClose();
            });
        }
      } else {
        onClose();
        setStatus({error: true, msg: res?.message});
      }
    });
  };

  const onCodeScanned = useCallback(
    codes => {
      if (loading) return;
      const value = codes[0]?.value;
      if (value) {
        setLoading(true);
        handleScannedCode(value);
      }
    },
    [loading],
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned,
  });

  const propmtUserToCheckOut = () => {
    setAlertMessage('Would you like to check out?');
    setAlertTitle('Alert');
    setShowAlert(true);
    setLoading(true);
  };

  const doCheckIn = async () => {
    const {individualCheckinScreen} = selectedLanguage;
    setLoading(true);
    const res = await CheckInOut(false, checkoutUserId);
    if (res.checkedInOutMsg) {
      dispatch(checkInSuccess(res));
      const dt = new Date(res.time);
      const dd = moment(dt).format('ddd MMM Do, YYYY');
      const chkdOut = individualCheckinScreen.CheckOut;

      dispatch(
        message({
          MainMsg: res.checkedInOutMsg,
          TimeMsg: `${individualCheckinScreen.You} ${chkdOut} ${
            individualCheckinScreen.successfuly
          } ${individualCheckinScreen.at} ${dt.toLocaleTimeString()} ${
            individualCheckinScreen.on
          } ${dd}`,
          isGroup: false,
          isCheckIn: false,
        }),
      );

      setLoading(false);
      navigation.navigate(Screens.message.name);
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <_ActivityIndicator size="large" />
      ) : (
        <>
          <View style={StyleSheet.absoluteFill} />
          {device != null && viewFocused && (
            <View
              style={{
                position: 'absolute',
                top: scannerPosition.top,
                left: scannerPosition.left,
                width: scannerSize,
                height: scannerSize,
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: 'black',
              }}>
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={viewFocused}
                codeScanner={codeScanner}
                torch={torch ? 'on' : 'off'}
              />
            </View>
          )}

          <View
            style={[
              styles.scannerFrame,
              {
                width: scannerSize,
                height: scannerSize,
                top: scannerPosition.top,
                left: scannerPosition.left,
              },
            ]}>
            <Animated.View
              style={[
                styles.scannerLine,
                {
                  transform: [{translateY}],
                },
              ]}
            />
          </View>
          <Pressable
            onPress={() => setTorch(!torch)}
            style={styles.flashButton}>
            <IonIcon
              name={torch ? 'flash' : 'flash-off'}
              color="white"
              size={24}
            />
          </Pressable>
          <View style={styles.bottomButtons}>
            <Pressable
              onPress={() =>
                setCameraPosition(prev => (prev === 'back' ? 'front' : 'back'))
              }
              style={styles.switchButton}>
              <IonIcon
                name="camera-reverse-outline"
                size={32}
                color={whiteThemeColors.white}
              />
            </Pressable>
          </View>
        </>
      )}

      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn="Yes"
          firstBtnFunc={() => {
            doCheckIn();
            setShowAlert(false);
            setLoading(false);
          }}
          secondBtn="No"
          secondBtnFunc={() => {
            setAlertMessage('');
            setAlertTitle('');
            setShowAlert(false);
            setCheckoutUserId(0);
            onClose();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    borderRadius: 10,
    overflow: 'hidden',
  },
  scannerFrame: {
    position: 'absolute',
    borderColor: 'white',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 100,
  },
  scannerLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: whiteThemeColors.primary + '90',
  },
  flashButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
    zIndex: 100,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderRadius: 50,
  },
});
