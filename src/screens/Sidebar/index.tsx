import React, {useEffect, useState} from 'react';
import {Platform, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconBadge from 'react-native-icon-badge';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomAlert,
  isAdmin,
  isCoordinator,
  isParent,
  isStudent,
  whiteThemeColors,
} from '../../Utilities';
import {
  ClassesSvg,
  Home,
  KioskSvg,
  MessageSvg,
  StudentAssessmentSvg,
  StudentIcon,
  StudentProgressSvg,
} from '../../../assets/Icons';

import ApiEndpoints from '../../../data/ApiEndpoints';
import {DataAccess} from '../../../data/DAL';
import {setCurrentFocus} from '../../actions/AsyncStorage';
// For Languages
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Loader from '../Loader/loader';
import {clearNotificationCount} from '../../actions/NotificationActions';
import * as setAction from '../../actions/StudentInfoAction';
import {setTimeTrackerBadges} from '../../actions/TimeTrackerActions';
import {_Text, _VectorIcons, _View, endpoint} from '../../components';
import {useMeetingLogoutHook} from '../../customHooks';
import {
  default as DrawerScreenNames,
  default as DrawerScreens,
} from '../../navigation/Drawer/DrawerScreenNames';
import {Appstate} from '../../reducers/Appstate';
import Screens from '../../screenNames';
import BGColor from './components/BGColor';
import {useSideBarConfig} from './hooks';
import {styles} from './styles';

let BadgeAndroid = require('react-native-android-badge');

interface props {
  navigation: any;
}
const SideBar: React.FC<props> = ({navigation}) => {
  const dispatch: any = useDispatch();
  const {LogoutFunction} = useMeetingLogoutHook();
  const notifications = useSelector(
    (state: any) => state.token.CountNotifications,
  );
  const messages = useSelector(
    (state: Appstate) => state.messages.MessagesCount,
  );
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [alertMessage, setAlertMessage] = useState<any>('');
  const [alertTitle, setAlertTitle] = useState<any>('');
  const [secondBtn, setSecondBtn] = useState<any>('');
  const [showPayment, setShowPayment] = useState(true);
  const [firstBtn, setFirstBtn] = useState<any>('');
  const [showAlert, setShowAlert] = useState(false);
  const {Get} = DataAccess();
  const {isLoading, sideBarConfig} = useSideBarConfig();
  useEffect(() => {
    if (isCoordinator(UserData.roleName)) isCurriculumPresent = false;
    return () => {
      setShowAlert(false);
      setAlertTitle(undefined);
      setAlertMessage(undefined);
      setFirstBtn(undefined);
      setSecondBtn(undefined);
    };
  }, [UserData.roleName]);

  const GetTimeTrackingCounter = () => {
    const Endpoint = ApiEndpoints.GetTimeTrackingCounter;
    Get(Endpoint).then(async (res: any) => {
      if (res.error) {
        return;
      } else {
        dispatch(setTimeTrackerBadges(res));
      }
    });
  };
  const CheckDrawer = (Navigation: any, labelName: string) => {
    if (Navigation === 'Notifications') {
      navigation.closeDrawer();
      dispatch(clearNotificationCount(0));
      navigation.navigate(Navigation);
    } else if (Navigation == 'Enrollments') {
      navigation.closeDrawer();
      clearMessagesCount();
      navigation.navigate('EnrollmentsToClass');
    } else if (Navigation == 'Messages') {
      dispatch(setCurrentFocus('MessageGroup'));
      navigation.closeDrawer();
      clearMessagesCount();
      navigation.navigate(Navigation);
    } else if (Navigation === 'Student Info') {
      console.log({Navigation});

      if (isStudent(UserData.roleName)) {
        loadStudentData(UserData.userID);
        navigation.navigate(Screens.StudentInfoDetials.name, {
          studentName: UserData.firstName + ' ' + UserData.lastName,
          goBack: 'Home',
          roleName: UserData.roleName,
          studentId: UserData.userID,
        });
        navigation.closeDrawer();
      } else {
        dispatch(setCurrentFocus('Dashboard'));
        navigation.navigate(Navigation, {
          screen: Navigation,
          params: {
            billing: false,
          },
        });
        navigation.closeDrawer();
      }
    } else if (Navigation == 'Homework/Assignments') {
      if (!isStudent(UserData.roleName)) {
        dispatch(setCurrentFocus('Dashboard'));
        navigation.navigate(Screens.StudentListForHomework.name, {
          goBackScreen: DrawerScreenNames.dashboard.name,
          studentId: UserData.userID,
          studentName: UserData.fullName,
          isStudent: true,
          isMenu: true,
          header: labelName,
        });
      } else {
        navigation.navigate(Screens.HomeWorks.name, {
          goBackScreen: DrawerScreenNames.dashboard.name,
          studentId: UserData.userID,
          studentName: UserData.fullName,
          // header: 'Homework Courses',
          header: labelName,
          isMenu: true,
          isStudent: false,
        });
      }
    } else if (Navigation == 'Assessments') {
      if (isStudent(UserData.roleName))
        navigation.navigate(DrawerScreens.StudentAssessments.name, {
          quickLinks: false,
          stdId: UserData.userID,
          goBackScreen: DrawerScreens.dashboard.name,
        });
      else navigation.navigate(Screens.StudentListForAssessment.name);
    } else {
      if (Navigation == 'Time Tracker') {
        GetTimeTrackingCounter();
      }
      if (navigation.isFocused()) {
        dispatch(setCurrentFocus('Dashboard'));
        if (Navigation == 'Financial') {
          navigation.navigate(DrawerScreenNames.payments.name, {
            screen: DrawerScreenNames.adminPayments.name,
          });
        } else if (Navigation == 'Staff Info') {
          navigation.navigate(DrawerScreenNames.StaffMenu.name);
        } else
          navigation.navigate(Navigation, {
            header: labelName,
            goBackScreen: DrawerScreens.dashboard.name,
          });
        navigation.closeDrawer();
      }
    }
  };

  const _getSvg = (SvgId: any) => {
    switch (SvgId) {
      case 'Home':
        return (
          <Home size={20} color={whiteThemeColors.NavigationDrawer.Home} />
        );

      case 'Courses':
        return (
          <ClassesSvg
            size={22}
            color={whiteThemeColors.NavigationDrawer.Courses}
          />
        );
      case 'Homework/Assignments':
        return (
          <StudentProgressSvg size={20} color={whiteThemeColors.Attendance} />
        );
      case 'Assessments':
        return (
          <StudentAssessmentSvg
            size={20}
            color={whiteThemeColors.NavigationDrawer.Reports}
          />
        );
      case 'Messages':
        return (
          <MessageSvg
            size={20}
            color={whiteThemeColors.NavigationDrawer.Messages}
          />
        );
      case 'Store':
        return (
          <_VectorIcons
            type={'FontAwesome5'}
            size={16}
            name="store-alt"
            color={'#7e02e6'}
          />
        );
      case 'Attendance':
        return (
          <_VectorIcons
            type="FontAwesome"
            name="calendar"
            size={18}
            color={whiteThemeColors.NavigationDrawer.Attendance}
          />
        );
      case 'Kiosk':
        return (
          <KioskSvg size={22} color={whiteThemeColors.NavigationDrawer.Kiosk} />
        );
      case 'Notifications':
        return (
          <_VectorIcons
            type={'MaterialIcons'}
            name="notifications"
            color={whiteThemeColors.NavigationDrawer.Notifications}
            size={22}
          />
        );
      case 'Reports':
        return (
          <_VectorIcons
            type={'MaterialCommunityIcons'}
            name="file-document-edit"
            color={whiteThemeColors.NavigationDrawer.Home}
            size={21}
          />
        );
      case 'Student Info':
        return (
          <StudentIcon
            size={20}
            color={whiteThemeColors.NavigationDrawer.Reports}
          />
        );
      case 'Time Tracker':
        return (
          <_VectorIcons
            type={'MaterialCommunityIcons'}
            name="clock-fast"
            color={whiteThemeColors.NavigationDrawer.TimeTracker}
            size={20}
          />
        );
      case 'Calendar':
        return (
          <_VectorIcons
            type={'FontAwesome5'}
            name="calendar-alt"
            color={'indigo'}
            size={18}
          />
        );
      case 'Curriculum':
        return (
          <_VectorIcons
            type={'AntDesign'}
            name="folderopen"
            color={whiteThemeColors.primary}
            size={18}
          />
        );
      case 'Enroll':
        return (
          <_VectorIcons
            type={'Foundation'}
            name="clipboard-pencil"
            color={'indigo'}
            size={18}
            style={{left: 1}}
          />
        );
      case 'Enrollments':
        return (
          <_VectorIcons
            type={'Foundation'}
            name="clipboard-pencil"
            color={'indigo'}
            size={18}
            style={{left: 1}}
          />
        );
      case 'Logout':
        console.log('Logout');
        return Logout();
      case 'Drive':
        return (
          <_VectorIcons
            type={'FontAwesome'}
            name={'files-o'}
            size={18}
            color={whiteThemeColors.primary}
          />
        );
      case 'Financial':
        return (
          <_VectorIcons
            type={'MaterialIcons'}
            name={'payment'}
            size={18}
            color={whiteThemeColors.primary}
          />
        );
      case 'AdminPayments':
        return (
          <_VectorIcons
            type={'MaterialIcons'}
            name={'payment'}
            size={18}
            color={whiteThemeColors.primary}
          />
        );
      case 'Articles':
        return (
          <_VectorIcons
            type={'Ionicons'}
            name={'newspaper'}
            size={18}
            color={whiteThemeColors.NavigationDrawer.Articles}
          />
        );
      case 'Staff Info':
        return (
          <_VectorIcons
            type={'FontAwesome5'}
            name={'users'}
            size={18}
            color={whiteThemeColors.primary}
          />
        );
      default:
        break;
    }
  };

  const clearMessagesCount = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.getApplicationIconBadgeNumber(num => {
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
      });
    } else {
      BadgeAndroid.setBadge(0);
    }
  };

  const Logout = () => {
    setShowAlert(true);
    setAlertTitle('warning');
    setAlertMessage('Are you sure you want to Logout?');
    setFirstBtn('Logout');
    setSecondBtn('Cancel');
  };
  const LogoutUser = async () => {
    console.log('called');
    setFirstBtn(undefined);
    setSecondBtn(undefined);
    setAlertMessage(undefined);
    setAlertTitle(undefined);
    setShowAlert(false);
    AsyncStorage.setItem('notificationBadgeCount', JSON.stringify(0));
    dispatch(clearNotificationCount(0));
    navigation.toggleDrawer();
    LogoutFunction(UserData?.userGuid);
  };

  const loadStudentData = (studentId: any) => {
    var EndPoint: endpoint = ApiEndpoints.getStudentOverview;
    EndPoint.params = `?studentId=${studentId}`;
    dispatch(setAction.studentInfoOverviewLoading());
    Get(EndPoint).then((res: any) => {
      if (!res.error) dispatch(setAction.studentInfoOverviewSuccess(res));
      dispatch(setAction.studentInfoOverviewFailed());
    });
    EndPoint = ApiEndpoints.GetStudentSkills;
    EndPoint.params = `?studentId=${studentId}`;
    dispatch(setAction.studentInfoSkillsLoading());
    Get(EndPoint).then((res: any) => {
      if (!res.error) dispatch(setAction.studentInfoSkillsSuccess(res));
      dispatch(setAction.studentInfoSkillsFailed());
    });
    EndPoint = ApiEndpoints.GetUserEnrolledEvents;
    EndPoint.params = `?studentId=${studentId}`;
    dispatch(setAction.studentInfoEnrolledEventsLoading());
    Get(EndPoint).then((res: any) => {
      if (!res.error) dispatch(setAction.studentInfoEnrolledEventsSuccess(res));
      dispatch(setAction.studentInfoEnrolledEventsFailed());
    });
    EndPoint = ApiEndpoints.GetStudentMedical;
    EndPoint.params = `?studentId=${studentId}`;
    dispatch(setAction.studentInfoMedicalLoading());
    Get(EndPoint).then((res: any) => {
      if (!res.error) dispatch(setAction.studentInfoMedicalSuccess(res));
      dispatch(setAction.studentInfoMedicalFailed());
    });
    EndPoint = ApiEndpoints.GetStudentFeedback;
    EndPoint.params = `?studentId=${studentId}`;
    dispatch(setAction.studentInfoFeedbackLoading());
    Get(EndPoint).then((res: any) => {
      if (!res.error)
        if (res[0]?.classesList)
          dispatch(setAction.studentInfoFeedbackSuccess(res));
      dispatch(setAction.studentInfoFeedbackFailed());
    });
    EndPoint = ApiEndpoints.StudentGetClasses;
    EndPoint.params = `?studentId=${studentId}`;
    dispatch(setAction.studentInfoClassesLoading());
    Get(EndPoint).then((res: any) => {
      if (!res.error)
        dispatch(setAction.studentInfoClassesSuccess(res.classesList));
      dispatch(setAction.studentInfoClassesFailed());
    });
  };
  return (
    <>
      <BGColor navigation={navigation} />
      <_View
        flex={1}
        style={{backgroundColor: whiteThemeColors.sideBar.background}}>
        <ScrollView
          style={{flex: 1, backgroundColor: whiteThemeColors.background}}
          showsVerticalScrollIndicator={false}>
          {isLoading && <Loader />}
          {sideBarConfig && (
            <_View style={styles.drawerContainer}>
              {sideBarConfig.map((Obj: any, index: number) => {
                return (
                  <_View style={styles.container}>
                    <TouchableOpacity
                      style={[
                        styles.btnContainer,
                        {
                          borderBottomWidth:
                            index !== sideBarConfig.length - 1 ? 0.7 : 0,
                        },
                      ]}
                      key={index}
                      onPress={() => {
                        if (Obj.name == 'Logout') {
                          Logout();
                        } else {
                          CheckDrawer(Obj.name, Obj.labelName);
                        }
                      }}>
                      <_View style={styles.drawerItems}>
                        <_View style={styles.singleItem}>
                          {_getSvg(Obj.name)}
                        </_View>
                        {Obj.name == 'Messages' && messages.Count > 0 ? (
                          <_View style={styles.badgeContainer}>
                            <IconBadge
                              MainElement={<_View style={styles.badge} />}
                              BadgeElement={
                                <_Text style={styles.badgeText}>
                                  {messages.Count}
                                </_Text>
                              }
                              IconBadgeStyle={styles.iconBadge}
                              Hidden={messages.Count == 0}
                            />
                          </_View>
                        ) : null}
                        {Obj.name == 'Notifications' &&
                          notifications !== undefined &&
                          notifications !== null &&
                          (notifications != 0 ? (
                            <_View style={styles.notiBadgeContainer}>
                              <IconBadge
                                MainElement={
                                  <_View style={styles.elementView} />
                                }
                                BadgeElement={
                                  <_Text style={styles.notiBadgeText}>
                                    {notifications}
                                  </_Text>
                                }
                                IconBadgeStyle={styles.iconBadgeStyle}
                                Hidden={
                                  notifications == 0 || notifications == null
                                }
                              />
                            </_View>
                          ) : null)}
                      </_View>
                      <_View style={styles.txtView}>
                        <_Text style={styles.text}>{Obj.labelName}</_Text>
                      </_View>
                    </TouchableOpacity>
                  </_View>
                );
              })}
            </_View>
          )}
          <TouchableOpacity
            onPress={() => Logout()}
            style={[styles.btnContainer, styles.logoutContainer]}>
            <_View style={styles.logoutBtn}>
              <_View style={styles.singleItem}>
                <_VectorIcons
                  type={'AntDesign'}
                  name="logout"
                  color={whiteThemeColors.NavigationDrawer.Logout}
                  size={20}
                />
              </_View>
            </_View>
            <_View style={styles.btnTextContainer}>
              <_Text style={styles.btnText}>{'Logout'}</_Text>
            </_View>
          </TouchableOpacity>
        </ScrollView>
        {showAlert && (
          <CustomAlert
            visible={showAlert}
            title={alertTitle}
            msg={alertMessage}
            firstBtn={firstBtn ? firstBtn : 'Okay'}
            firstBtnFunc={() => LogoutUser()}
            secondBtn={secondBtn}
            secondBtnFunc={() => {
              setShowAlert(false);
              setFirstBtn(undefined);
              setSecondBtn(undefined);
              setAlertMessage(undefined);
              setAlertTitle(undefined);
            }}
          />
        )}
      </_View>
    </>
  );
};
export default SideBar;
