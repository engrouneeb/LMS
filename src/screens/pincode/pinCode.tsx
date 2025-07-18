import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Loader/loader';
import { CustomAlert, isStaff, isStudent, Orientation, whiteThemeColors } from '../../Utilities';
import {
  CheckInOut,
  checkInSuccess,
  getData,
  message,
  setUserInfo,
  UpdateUserCheckedInStatus,
  validatePin,
} from '../../actions/PinCodeActions';
import { _Screen, _VectorIcons } from '../../components';
import drawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import { Appstate } from '../../reducers/Appstate';
import Screens from '../../screenNames';
import { CheckOrientation } from './components';
import { usePincode } from './hooks';
import styles from './style';

export const PinComponent: FC = () => {
  const navigation: any = useNavigation();
  const pinArr = [false, false, false, false, false, false];
  const selectedLanguage = useSelector((state: Appstate) => state.language);
  const { UserInfo } = useSelector((state: Appstate) => state.User);
  const { checkInList } = useSelector((state: Appstate) => state.token);
  const dispatch: any = useDispatch();
  const [pinCode, setPinCode] = useState(pinArr);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [pin, setPin] = useState('');
  const [errorText, setErrorText] = useState('');
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [load, setload] = useState(false);
  const { getCompanyCoursClassesCheckInList } = usePincode();

  useEffect(() => {
    clearAll();
  }, [navigation]);

  const changePin = (val: any) => {
    const _number = '' + pin + val.toString();
    setPin(_number);
    if (pin.length < 6) {
      pinCode[pin.length] = true;
      CheckInScreen(_number);
    }
  };

  const CheckInScreen = async (pinVal: any) => {
    if (pinVal.length == 6) {
      setload(true);
      const res = await validatePin(pinVal);
      // if (res)
      if (!res?.isSuccess) {
        setload(false);
        setAlertText(
          res?.message ?? res?.error_description ?? 'Something Went Wrong',
        );
        setAlertModalVisible(true);

        clearAll();
      } else {
        setload(false);
        dispatch(getData(res));
        dispatch(setUserInfo(res));
        clearAll();
        const { isCheckedIn } = res?.user;
        if (res?.pinType != 'User') {
          navigation.navigate(Screens.GroupCheckin.name);
        } else {
          if (Boolean(isCheckedIn)) {
            doCheckIn(res?.user);
          } else {
            const { userId, roleName } = res.user;
            if (isStudent(roleName)) {
              getCompanyCoursClassesCheckInList(userId)
                .then((response: []) => {
                  if (response.length > 0) {
                    navigation.navigate(Screens.CoursesClassesList.name, { user: res?.user });
                  } else {
                    handleKioskSubjects(res?.user, checkInList);
                  }
                })
                .catch((error) => {
                  console.error('Error fetching classes check-in list:', error);
                });
            }
            else navigation.navigate(Screens.IndividualCheckIn.name);
          }
        }
      }
    }
  };
  const handleKioskSubjects = (user: any, checkInList: any) => {
    if (checkInList?.length > 0) {
      navigation.navigate(Screens.CheckinOutCoursesList.name, { user });
    } else {
      navigation.navigate(Screens.IndividualCheckIn.name);
    }
  }

  const clearAll = () => {
    setPinCode([false, false, false, false, false, false]);
    setPin('');
  };
  const backBtn = () => {
    if (pin.length > 0) {
      pinCode[pin.length - 1] = false;

      let _number: any = pin.split('');
      _number.pop();
      _number = _number.join('');
      setPin(_number);
    }
    setErrorText('');
  };

  const handleBack = () => {
    navigation.navigate(drawerScreens.dashboard.name);
    return true;
  };
  const doCheckIn = async (user: any) => {
    const { individualCheckinScreen } = selectedLanguage;
    const { userId } = user;
    setload(true);
    const res = await CheckInOut(false, userId);
    isStaff(UserInfo.roleName) &&
      userId == UserInfo.userID &&
      dispatch(UpdateUserCheckedInStatus(false));
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

      setload(false);
      return navigation.navigate(Screens.message.name);
    } else {
      setload(false);
      // show error alert
    }
  };
  const formatDate = (dt: any) => {
    return moment(new Date(dt)).format('ddd MMM Do, YYYY');
  };
  const { pincodeScreen } = selectedLanguage;
  return (
    <Orientation
      getOrientation={(o: any) => {
        setOrientation(o);
      }}
    >
      <_Screen
        flex={1}
        hideTopSafeArea
        hideBottomSafeArea
        onAndroidBack={handleBack}
      >
        <LinearGradient
          start={{ x: 0, y: 0.1 }}
          end={{ x: 1, y: 1 }}
          locations={[0.0, 0.99]}
          colors={whiteThemeColors.pinCode}
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              navigation.navigate(drawerScreens.dashboard.name);
            }}
          >
            <_VectorIcons
              type='FontAwesome'
              name='angle-left'
              size={32}
              color={whiteThemeColors.white}
            />
          </TouchableOpacity>
          {load && <Loader />}

          <CheckOrientation
            pin={pin}
            changePin={changePin}
            backBtn={backBtn}
            clearAll={clearAll}
            pinCode={pinCode}
            errorText={errorText}
            pinCodeScreen={pincodeScreen}
            orientation={orientation}
          />
        </LinearGradient>
        <CustomAlert
          visible={alertModalVisible}
          title={'Error'}
          msg={alertText}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setAlertModalVisible(false);
          }}
        />
      </_Screen>
    </Orientation>
  );
};
