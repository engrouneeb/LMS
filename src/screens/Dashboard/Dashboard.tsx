import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useReducer, useState } from 'react';
import {
  AppState,
  BackHandler,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import ZoomUs from 'react-native-zoom-us';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import {
  CustomAlert,
  getTerminologyLabel,
  isAdmin,
  isCoordinator,
  isExecutive,
  isInstructor,
  isParent,
  isStudent,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { getSuperadminPermissions,SetAppModuelPermissions } from '../../actions/AccountActions';
import { loading, setCurrentFocus } from '../../actions/AsyncStorage';
import { selectLanguage } from '../../actions/LanguageAction';
import { clearNotificationCount } from '../../actions/NotificationActions';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  appStateInterface,
  dashboardInterface,
} from '../../components';
import { LanguageConstant } from '../../constants';
import { useMeetingLogoutHook } from '../../customHooks';
import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import { languages } from '../../reducers/languages';
import CommonStyles, { appFont } from '../CommonStyles';
import CstHeader from '../Headers';
import Loader from '../Loader/loader';
import { NotificationsBadge } from '../Notifications';
import {
  Announcements,
  AssignedClassesComponent,
  BarChartComponent,
  CoursePoints,
  LineChartComponent,
  ParentChildrenInDashboard,
  ParentQuickLink,
  StudentAnalytics,
  StudentPoints,
  StudentQuickLink,
  Timer,
} from './Components';
import {Events} from "../Events"
import {
  messageListener,
  ms_checkPermission,
  requestPermission,
  generateSignature,
} from './Functions';
import {
  useDashboard,
  useDashboardWidgets,
  useLoadAdminWages,
  useLoadCourses,
  useLoadSetupData,
  useSockets,
} from './Hooks';
import LoadStudentForAttendence from './LoadStudentForAttendence';
import { initialState, reducer, stateConstants } from './State';
import { _ActivityIndicator } from 'screens/Loader';
import styles from './style';
import { GetUserData } from '../../actions/PinCodeActions';
import { Greeting } from './Components/Greetings';
import { EmptyHome } from './Components/EmptyHome';
import { webloginUser } from '../../actions/WebAuthLogin';
var BadgeAndroid = require('react-native-android-badge');
var firstCounterText: string | undefined,
  secondCounterText: string | undefined,
  CoursesCompleted: string | undefined;
const Home = () => {
  const { LogoutFunction } = useMeetingLogoutHook();
  const { getAdminWages } = useLoadAdminWages();
  const { getCourse } = useLoadCourses();
  const { getSetupData } = useLoadSetupData();
  const { initSocket } = useSockets();
  const {
    getTimeTrackingCounter,
    handleNotificationMessageCount,
    _getChatUser,
    _firebaseNotification,
    getModulePagesPermissions
  } = useDashboard();
  const dispatch: any = useDispatch();
  const navigation = useNavigation<any>();
  const { dashboardConfigs, isLoading } = useDashboardWidgets();
  const hasActiveWidgets = dashboardConfigs?.some(
    (widget: { status: boolean; name: string }) => widget.status,
  );
  const challengePointsStatus = dashboardConfigs.find(
    item => item.name === "Student Points > Challenge Points"
  )?.status ?? false;
  const [state, setState] = useReducer(reducer, initialState);
  const _setState = (type: any, data: any) => setState({ type, data });
  const {
    token,
    roleName,
    UserData,
    logoutLoading,
    selectedLanguage,
    isShow,
  }: any = useSelector((state: Appstate) => ({
    token: state.token,
    roleName: state.User.UserInfo.roleName,
    UserData: state.User.UserInfo,
    logoutLoading: state.token.logoutLoading,
    selectedLanguage: state.language,
    isShow: state.timerReducer.isShow,
  }));
  let user_ID = UserData?.userID;
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);
  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        _showAlert();
        return true;
      });
    });
    return () =>
      navigation.addListener('blur', () => {
        BackHandler.removeEventListener('hardwareBackPress', _showAlert);
      });
  }, []);

  useEffect(() => {
    dispatch(GetUserData());
  }, []);

  useEffect(() => {
    if (isAdmin(roleName) || isCoordinator(roleName) || isExecutive(roleName)) {
      getSetupData();
      getAdminWages();
    }
    else if(isParent(roleName)||isStudent(roleName)){
      // get User Data
      const {webAPIToken,userName,}=UserData;
      handleWebLogin(userName, webAPIToken, "");
    }
      
  }, [roleName,UserData]);
  useEffect(() => {
    getTimeTrackingCounter();
    getModulePagesPermissions();
    handleNotificationMessageCount();
    _clearNotification();
    requestPermission();
    dispatch(getSuperadminPermissions());
    dispatch(SetAppModuelPermissions());
    StatusBar.setHidden(true);
    dispatch(loading(false));
    dispatch(setCurrentFocus('Dashboard'));
    AppState.addEventListener('change', handleAppStateChange);
    ms_checkPermission();
    loadDataFromApi()
      .then(() => {})
      .catch((err: any) => {
        console.error('Loding data from api[143]:', err.message);
      });
    AsyncStorage.getItem('@LanguageSettings').then((language) => {
      appFont(language);
      if (language == LanguageConstant.Arabic) {
        dispatch(selectLanguage(languages.arabic));
      } else {
        dispatch(selectLanguage(languages.english));
      }
    });
    getCourse();
  }, []);
  useEffect(() => {
    if (UserData) {
      const { zoomConfig } = UserData;
      try {
        if (zoomConfig)
          ZoomUs.initialize({
            jwtToken: generateSignature(zoomConfig),
            //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiI2QXp2X0FBSlJMZWQxWFJucmx2V2tRIiwiYXBwS2V5IjoiNkF6dl9BQUpSTGVkMVhSbnJsdldrUSIsInJvbGUiOjAsImlhdCI6MTcxOTg0NjA4NCwiZXhwIjoxNzE5ODQ5Njg0LCJ0b2tlbkV4cCI6MTcxOTg0OTY4NH0.-68hApqKDEJMfnabMULYe_Kp5HQAZyFM_xYkCiMSAlQ',
          })
            .then((res) => {
              console.log('====================================');
              console.log({ res });
              console.log('====================================');
            })
            .catch((err) => {
              console.log('Error in intailization');
              console.log({ err });
              console.log('====================================');
            });
      } catch (error) {
        console.log('====================================');
        console.log('error', error);
        console.log('====================================');
      }

      UserData &&
        token &&
        Object.keys(UserData).length > 0 &&
        initSocket(UserData, token);
    }
  }, [UserData]);

  const handleWebLogin = (userName:string, password:string, domainUrl:string) => {
    dispatch(webloginUser(userName, password, domainUrl));
  };

  function loadDataFromApi() {
    return messageListener(navigation, _getChatUser);
  }
  const handleAppStateChange = (nextAppState: appStateInterface) => {
    if (
      state.appState?.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      handleNotificationMessageCount();
      _clearNotification();
    }
    _setState(stateConstants.APP_STATE, nextAppState);
  };

  const handleBack = () => {
    BackHandler.exitApp();
  };

  const setchildren = (val: any) => {
    _setState(stateConstants.CHILDREN, val);
  };
  const setActive = (val: string) => {
    _setState(stateConstants.ACTIVE, val);
  };

  const _showAlert = () => {
    _setState(stateConstants.SHOW_ALERT_MESSAGE, {
      [stateConstants.SHOW_ALERT]: true,
      [stateConstants.ALERT_MESSAGE]: 'Do you want to close the App?',
      [stateConstants.ALERT_TITLE]: 'Warning',
    });
    return true;
  };
  function onValueChange(value: any) {
    _setState(stateConstants.STUDENT_ID, value?.id);
  }
  const _findUserRole = (
    userRoleName: any,
    dashboardScreen: dashboardInterface,
  ) => {
    CoursesCompleted = dashboardScreen?.CoursesCompleted;
    CoursesCompleted = CoursesCompleted.replace(
      'Courses',
      terminologies['Course']?.pluralLabel || 'Courses',
    );
    firstCounterText = dashboardScreen?.AssignedClasses;
    firstCounterText = firstCounterText.replace(
      'Classes',
      terminologies['Class']?.pluralLabel || 'Classes',
    );
    if (isParent(userRoleName) || isStudent(userRoleName)) {
      secondCounterText = dashboardScreen?.CoursesCompleted;
      secondCounterText = secondCounterText.replace(
        'Courses',
        terminologies['Course']?.pluralLabel || 'Courses',
      );
    } else if (isAdmin(userRoleName)) {
      secondCounterText = dashboardScreen?.activeStudents;
    } else if (isInstructor(userRoleName)) {
      secondCounterText = dashboardScreen?.AssignedStudent;
    } else {
      firstCounterText = dashboardScreen?.activeClasses;
      firstCounterText = firstCounterText.replace(
        'Classes',
        terminologies['Class']?.pluralLabel || 'Classes',
      );
      secondCounterText = dashboardScreen?.activeStudents;
    }
  };
  function notificationBadgeInHeader() {
    return (
      <NotificationsBadge
        firebaseNotification={_firebaseNotification}
        NotifictionIconClicked={onNotifictionIconClicked}
      />
    );
  }
  const _clearNotification = () => {
    dispatch(clearNotificationCount(0));
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    } else {
      BadgeAndroid.setBadge(0);
    }
  };
  function onNotifictionIconClicked() {
    navigation.navigate(DrawerScreens?.notificationsTab?.name);
  }
  function onLogoutIconClicked() {
    LogoutFunction(UserData?.userGuid);
  }
  const { dashboardScreen } = selectedLanguage;
  const widgetComponents: any = {
    'Classes Counters': (
      <StudentAnalytics
        userRoleName={roleName}
        thirdCounterText={CoursesCompleted}
        secondCounterText={secondCounterText}
        firstCounterText={firstCounterText}
        studentId={state.studentId}
      />
    ),
    'Quick Links': isParent(UserData?.roleName) ? (
      <ParentQuickLink selectedStudentId={state.studentId} />
    ) : (
      <StudentQuickLink />
    ),
    'Announcements': <Announcements />,
    'Student Points': <StudentPoints userID={state.studentId} showChalangesAchivedPoint={challengePointsStatus}  />,
    'Enrollments Received': <LineChartComponent />,
    'Course Points Achieved': <CoursePoints userID={state.studentId} />,
    'Points Achieved': <BarChartComponent userid={state.studentId} />,
    'Assigned Classes': (
      <AssignedClassesComponent
        setActive={setActive}
        setchildren={setchildren}
        userID={state.studentId}
        setActiveStdId={onValueChange}

      />
    ),
    'Upcoming Events': <Events />,
  };
  return (
    <_Screen
      header={
        <CstHeader
          isMenu
          isLogout
          OpenMenu={() => navigation.toggleDrawer()}
          Screen={dashboardScreen.Home}
          Logout={() => onLogoutIconClicked()}
          NotificationsInHeader={notificationBadgeInHeader}
          NotifictionIconClicked={onNotifictionIconClicked}
        />
      }
      hideTopSafeArea
      topSafeAreaColor={whiteThemeColors.background}
      bottomSafeAreaColor={whiteThemeColors.background}
      style={[{ flex: 1 }, CommonStyles.appBackgroundColor]}
    >
      {logoutLoading && <Loader bgColor={whiteThemeColors.white} />}
      {_findUserRole(roleName, dashboardScreen)}
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <_View style={[styles.welcomeView, whiteThemeColors.background]}>
          {isParent(UserData?.roleName) && state.children ? (
            <_View style={{}}>
              <ParentChildrenInDashboard
                children={state.children}
                onSelect={onValueChange}
                active={state.active}
                setactive={setActive}
              />
            </_View>
          ) : (
            <Greeting roleName={roleName} children={state.ch} />
          )}
        </_View>
        <_View style={styles.container2} />
        {isLoading ? (
          <_ActivityIndicator />
        ) : dashboardConfigs && hasActiveWidgets ? (
          dashboardConfigs?.map((widget: { status: boolean; name: string }) => {
            if (widget.status) return widgetComponents[widget.name];
          })
        ) : (
          <EmptyHome />
        )}
        {user_ID && <LoadStudentForAttendence userID={user_ID} />}
      </ScrollView>
      {state.showAlert && (
        <CustomAlert
          visible={state.showAlert}
          title={state.alertTitle}
          msg={state.alertMessage}
          firstBtn={'Yes'}
          firstBtnFunc={() => {
            _setState(stateConstants.SHOW_ALERT, false);
            handleBack();
          }}
          secondBtn={'No'}
          secondBtnFunc={() => {
            _setState(stateConstants.SHOW_ALERT, false);
          }}
        />
      )}
      {isShow && <Timer isShow={isShow} />}
    </_Screen>
  );
};
export const Dashboard = Home;
