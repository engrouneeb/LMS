import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { endpoint } from '../components';
import { Alert, Linking } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import ZoomUs from 'react-native-zoom-us';
import { useDispatch } from 'react-redux';
import { whiteThemeColors } from '../Utilities';
import {
  default as ApiEndPoint,
  default as ApiEndpoints,
} from '../../data/ApiEndpoints';
import { DataAccess, getToken } from '../../data/DAL';
import {
  error,
  loading,
  logout,
  removeUserToken,
  reset,
} from '../actions/AsyncStorage';
import { reset_attendence } from '../actions/AttendanceActions';
import {
  joinOnlineClass,
  JoinRunningClass,
} from '../actions/CoursePlayerAction';
import { alertShow } from '../actions/CustomAlert';
import { setLogoutLoading } from '../actions/DashBoardActions';
import { resetMessagesCount } from '../actions/MessengerActions';
import {
  ClassTypesConstants,
  NotificationReminder,
  NotificationTypes,
} from '../constants';
import ScreensNames from '../screenNames';
import WhiteLabelConfig from '../WhiteLabelConfig';

//useClassMeetingsLogoutFunctions
export const useMeetingLogoutHook = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const { PostSecured, PostSecuredWithParams, GetUnSecured } = DataAccess();
  
  const LogoutFunction = async (UserGuid: string) => {
    try {
      let deviceId = getUniqueId();
      let fcmToken = await AsyncStorage.getItem('FirebaseToken');
      let logoutUserEndpoint = ApiEndPoint.LogoutUser;
      const logoutToken = await getToken();
      PostSecured(
        logoutUserEndpoint,
        {
          DeviceToken: fcmToken,
          DeviceId: deviceId,
          UserGuid: UserGuid,
        },
        logoutToken,
      ).then(() => {
        dispatch(setLogoutLoading(false));
      });
    } catch (err) {}
    resetAuth();
    handleSecureSettings();
    dispatch(logout());
  };

  async function resetAuth() {
    messaging().deleteToken();
    dispatch(resetMessagesCount(0));
    dispatch(removeUserToken());
    dispatch(reset_attendence());
    dispatch(reset(true));
    await AsyncStorage.setItem('userState', 'Auth');
    await AsyncStorage.setItem('FirebaseToken', '');
    dispatch(loading(false));
    dispatch(reset(true));
  }

  const JoinClass = (
    classId: any,
    setClassStartedModal: any,
    classStartedModal: any,
  ) => {
    try {
      dispatch(loading(true));
      dispatch(joinOnlineClass(classId)).then(async (res: any) => {
        console.log({"response of koining class":res});
        
        dispatch(loading(false));
        if (!res.error) {
          var msg = '';
          if (res.onlineClassType == ClassTypesConstants.VariantName) {
            dispatch(JoinRunningClass(classId)).then((response: any) => {
              if (!response.error && response !== 'No class available') {
                setClassStartedModal(false);
                openApp(response);
              } else {
                // Alert.alert('Error', response); // hide alert
                setClassStartedModal(true);
                const className = res?.className;
                const stdName = res?.userFullName;
                {
                  !classStartedModal &&
                    SendReminderNotifications(
                      NotificationReminder.OnlyStudentJoined,
                      classId,
                      stdName,
                      className,
                    );
                }
              }
            });
          } else if (res.onlineClassType == ClassTypesConstants.Zoom) {
             if (!res.meetingDetail.isSuccessful) {
              setClassStartedModal(true);
              const className = res?.className;
              const stdName = res?.userFullName;
              {
                !classStartedModal &&
                  SendReminderNotifications(
                    NotificationReminder.OnlyStudentJoined,
                    classId,
                    stdName,
                    className,
                  );
              }
              // dispatch(alertShow(msg));
              return res;
            } else {
              const { userFullName, meetingId, meetingPassword } =
                res?.meetingDetail;
              // Join Meeting with extra params
              joinMeeting(userFullName, meetingId, setClassStartedModal,meetingPassword);
            }
          } else if (res.onlineClassType == ClassTypesConstants.GoogleMeet) {
            if (!Boolean(res.classUrl))
              return dispatch(alertShow('Class url is empty'));
            openApp(res.classUrl);
          } else {
            alertShow('No class available');
          }
          if (msg != '') {
            dispatch(alertShow(msg));
          }
        } else
          dispatch(
            alertShow(
              "Class can't be join. Please wait for the instructor to start the Class or contact the instructor for any questions.",
            ),
          );
      });
    } catch (err) {
      dispatch(error('Something Went Wrong' || 'ERROR'));
    }
  };

  const joinMeeting = async (userFullName, meetingId, setClassStartedModal,meetingPassword) => {
    try {
      ZoomUs.joinMeeting({
        userName: userFullName,
        meetingNumber: meetingId,
        noMeetingErrorMessage: false, // Set this to be able to show Alert.alert
        password: meetingPassword,
      })
        .then((joinRes) => {
          console.log('====================================');
          console.log({ joinRes });
          console.log('====================================');
        })
        .catch((error) => {
          console.log('====================================');
          console.log({ error });
          console.log('====================================');
        });
      setClassStartedModal(false);
    } catch (er) {
      console.error('Error joining meeting', er); // Log the error for debugging
      Alert.alert('Error', 'Could not Join meeting' + er);
      // setClassStartedModal(false);
    }
  };

  const SendReminderNotifications = async (
    reminderType: any,
    classId: any,
    stdName: any,
    className: any,
  ) => {
    try {
      const URL = ApiEndpoints.SendReminderNotifications;
      const params = `?classId=${classId}&StudentName=${stdName}&className=${className}&notificationType=${NotificationTypes.Announcement}&reminder=${reminderType}`;
      await PostSecuredWithParams(URL, params);
    } catch (e) {}
  };
  const openApp = async (url: any) => {
    await InAppBrowser.close();
    Linking.canOpenURL(url)
      .then(async (supported) => {
        if (!supported) {
          alertShow('Invalid Url,Url is not supported');
        } else {
          if (await InAppBrowser.isAvailable()) {
            InAppBrowser.open(url, {
              dismissButtonStyle: 'done',
              preferredBarTintColor: whiteThemeColors.primary,
              preferredControlTintColor: 'white',
              animated: true,
              modalPresentationStyle: 'fullScreen',
              forceCloseOnRedirection: false,
              showInRecents: true,
              toolbarColor: whiteThemeColors.primary,
              navigationBarColor: whiteThemeColors.primary,
              navigationBarDividerColor: whiteThemeColors.primary,
              enableUrlBarHiding: true,
              enableDefaultShare: true,
            });
          } else {
            if (await InAppBrowser.isAvailable()) {
              InAppBrowser.open(url, {
                dismissButtonStyle: 'done',
                preferredBarTintColor: whiteThemeColors.primary,
                preferredControlTintColor: 'white',
                animated: true,
                modalPresentationStyle: 'fullScreen',
                forceCloseOnRedirection: false,
                showInRecents: true,
                toolbarColor: whiteThemeColors.primary,
                navigationBarColor: whiteThemeColors.primary,
                navigationBarDividerColor: whiteThemeColors.primary,
                enableUrlBarHiding: true,
                enableDefaultShare: true,
              });
            } else {
              return Linking.openURL(url);
            }
          }
        }
      })
      .catch((err) => {});
  };

  const handleSecureSettings = async () => {
    let url: endpoint = ApiEndPoint.GetCompanySecureSettings;
    url.params = `?cmpURL=${WhiteLabelConfig.APP_VARIANT_URL}`;
    let res = await GetUnSecured(url);
    let isSecurePage = false;
    let isMultiLanguage = 'false';
    if (res?.data && Object.keys(res?.data).length != 0) {
      isSecurePage = res.data.isSecurePage;
      if (res.data?.isMultiLangauge)
        isMultiLanguage = JSON.stringify(res.data?.isMultiLangauge);

      let secureSett: any = {
        isSecurePage: isSecurePage,
        isCoursesPage: res.data.isCoursesPage,
        isClassesPage: res.data.isClassesPage,
        isEventsPage: res.data.isEventsPage,
        companyKey: res.data.companyKey,
        companyName: res.data.companyName,
        companySecureURL: res.data.companySecureURL,
        isCompanyFranchises: res.data.isCompanyFranchises,
        secureTerminologies: res.data.terminologies,
      };

      secureSett = JSON.stringify(secureSett);
      await AsyncStorage.setItem('secureSett', secureSett);
      await AsyncStorage.setItem('isMultiLang', isMultiLanguage);
    }
    if (isSecurePage) {
      return navigation.navigate(ScreensNames.loginEnroll.name);
    }
    return navigation.navigate(ScreensNames.signInScreen.name);
  };

  const startZoomMeeting = async (meetingInfo: any) => {
    const { userFullName, meetingId, meetingSignature, startUrl } = meetingInfo;
    console.log('====================================');
    console.log({ meetingInfo });
    console.log('====================================');
    try {
      ZoomUs.startMeeting({
        userName: userFullName,
        meetingNumber: meetingId,
        zoomAccessToken: startUrl.split('=')[1],
        userType: 2, // optional
        // noMeetingErrorMessage: true, // Set this to be able to show Alert.alert
      })
        .then((status) => {
          console.log('====================================');
          console.log({ status: status });
          console.log('====================================');
        })
        .catch((err) => {
          console.log('====================================');
          console.log({ err: err });
          console.log('====================================');
        });
    } catch (e) {
      Alert.alert('Error', 'Could not execute startMeeting');
      console.error('ERR', e);
    }
  };
  return {
    JoinClass,
    LogoutFunction,
    openApp,
    handleSecureSettings,
    startZoomMeeting,
  };
};
