import { useIsFocused, useNavigation } from '@react-navigation/native';
import { _VectorIcons, endpoint } from '../../../components';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, View } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch, useSelector } from 'react-redux';
import { whiteThemeColors } from '../../../Utilities/colors';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  CheckInOut,
  checkInSuccess,
  getCompanyCoursClassesList,
  message,
  validateQRcode,
  viaQRCode,
} from '../../../actions/PinCodeActions';
import { Appstate } from '../../../reducers/Appstate';
import {
  default as screenNames,
  default as Screens,
} from '../../../screenNames';
import { _ActivityIndicator } from '../../Loader';
import { usePincode } from '../hooks';
import styles from '../style';
import { CustomAlert } from '../../../Utilities';
interface props {
  onClose: () => void;
  setStatus: (res: any) => void;
}
export const QrScanner: React.FC<props> = ({ onClose, setStatus }) => {
  const viewFocused = useIsFocused();
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const selectedLanguage = useSelector((state: Appstate) => state.language);
  const { checkInList } = useSelector((state: Appstate) => state.token);
  const [loading, setLoading] = useState(false);
  const [isFrontCam, setIsFrontCam] = useState(false);
  const [checkoutUserId, setCheckoutUserId] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const animatedValue = useRef(new Animated.Value(0)).current;
  const handleScannedCode = async (info = '') => {
    setLoading(false);
    dispatch(validateQRcode(info)).then((res) => {
      if (Boolean(res.data)) {
        const { isCheckedIn } = res.data.user;
        if (isCheckedIn) {
          // prompt user for check out
          setCheckoutUserId(res.data.user.userId);
          //doCheckIn(res.data.user);
          propmtUserToCheckOut();
        } else {
          const { userId } = res.data.user;
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
              } else
                dispatch(viaQRCode(info)).then((res: any) => {
                  if (res) {
                    onClose();
                    setStatus(res.data);
                  } else {
                    setStatus({ error: true, msg: 'cannot get result' });
                    onClose();
                  }
                });
            })
            .catch((error) => {
              setStatus({ error: true, msg: 'cannot get result' });
              onClose();
            })
            .finally(() => {
              onClose();
            });
        }
      } else {
        onClose();
        setStatus({ error: true, msg: res?.message });
      }
    });
  };
  const onSuccess = async (e) => {
    if (loading) return;
    if (e?.data) {
      setLoading(true);
      await handleScannedCode(e?.data);
    } else {
      setLoading(false);
      console.log('Something went wrong!');
    }
  };
  const propmtUserToCheckOut = () => {
    setAlertMessage("Would you like to check out?")
    setAlertTitle("Alert");
    setShowAlert(true);
    setLoading(true)
  }
  const doCheckIn = async () => {
    const { individualCheckinScreen } = selectedLanguage;
    setLoading(true);
    const res = await CheckInOut(false, checkoutUserId);
    if (res.checkedInOutMsg) {
      dispatch(checkInSuccess(res));
      var dt = new Date(res.time);
      var dd = formatDate(dt);
      var chkdOut = individualCheckinScreen.CheckOut;

      dispatch(
        message({
          MainMsg: res.checkedInOutMsg,
          TimeMsg: `${individualCheckinScreen.You} ${chkdOut} ${individualCheckinScreen.successfuly
            } ${individualCheckinScreen.at} ${dt.toLocaleTimeString()} ${individualCheckinScreen.on
            } ${dd}`,
          isGroup: false,
          isCheckIn: false,
        }),
      );

      setLoading(false);
      return navigation.navigate(Screens.message.name);
    } else {
      setLoading(false);
    }
  };
  const formatDate = (dt: any) => {
    return moment(new Date(dt)).format('ddd MMM Do, YYYY');
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
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, Dimensions.get('window').height * 0.359], // Adjust the range to match the QR scanner height
  });
  return (
    <View style={styles.topContainer}>
      {loading ? (
        <_ActivityIndicator size={'large'} />
      ) : (
        <>
          {viewFocused && (
            <QRCodeScanner
              cameraType={isFrontCam ? 'front' : 'back'}
              onRead={onSuccess}
              vibrate
              fadeIn
              reactivateTimeout={15000}
              containerStyle={{ flex: 1 }}
              cameraContainerStyle={styles.cameraContainer}
              cameraStyle={styles.cameraStyle}
              bottomContent={
                <Pressable
                  onPress={() => {
                    setIsFrontCam(!isFrontCam);
                  }}
                >
                  <_VectorIcons
                    name={'camera-reverse-outline'}
                    type={'Ionicons'}
                    size={40}
                    color={whiteThemeColors.white}
                  />
                </Pressable>
              }
            />
          )}
          <Animated.View
            style={[
              {
                transform: [{ translateY }],
                position: 'absolute',
                top: Dimensions.get('window').height * 0.275,
                left: Dimensions.get('window').width * 0.125,
                width: Dimensions.get('window').width * 0.75,
                height: 2,
                backgroundColor: whiteThemeColors.primary + 90,
                zIndex: 200,
              },
            ]}
          />
        </>
      )}
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Yes'}
          firstBtnFunc={() => {
            doCheckIn();
            setShowAlert(false);
            setLoading(false);
          }}
          secondBtn={"No"}
          secondBtnFunc={() => {
            setAlertMessage("")
            setAlertTitle("");
            setShowAlert(false);
            setCheckoutUserId(0);
            onClose();
          }}
        />
      )}
    </View>
  );
};
