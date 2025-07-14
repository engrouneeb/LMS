import { CourseClassesInterface } from 'interfaces';
import React, { useState, FC, useEffect } from 'react';
import { Alert, FlatList, Platform, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomAlert,
  getTerminologyLabel,
  isAdmin,
  isCoordinator,
  isExecutive,
  isInstructor,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import {
  default as ApiEndPoint,
  default as ApiEndpoints,
} from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import { loading } from '../../../../../actions/AsyncStorage';
import {
  StartCalimaticOnlineClass,
  saveOnlineClass,
  startMeeting,
} from '../../../../../actions/CoursePlayerAction';
import { alertHide } from '../../../../../actions/CustomAlert';
import { _Screen, _View, endpoint } from '../../../../../components';
import { ClassNotStartedModal } from '../../../../../components/ClassNotStartedModal';
import {
  ClassTypesConstants,
  NotificationReminder,
  NotificationTypes,
} from '../../../../../constants';
import { useMeetingLogoutHook } from '../../../../../customHooks';
import { useLogin } from '../../../../../navigation/MainNav';
import { Appstate } from '../../../../../reducers/Appstate';
import Screens from '../../../../../screenNames';
import Header from '../../../../Headers';
import { StartClass } from '../../CourseDetails';
import { HtmlWebView } from '../HtmlWebView';
import { CourseClassCard } from './components/CourseClassCard';
import { styles } from './styles';

const _CourseClasses: FC<CourseClassesInterface> = ({ navigation, route }) => {
  const { PostSecuredWithParams, Get } = DataAccess();
  const { JoinClass, startZoomMeeting, openApp } = useMeetingLogoutHook();
  const { show, message, error } = useSelector(
    (state: Appstate) => state.CustomAlert,
  );
  const { data } = useSelector((state: Appstate) => state.assignCoursesReducer);
  const { classListHeading } = useSelector((state: Appstate) => state.language);
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const domainUrl: any = useSelector(
    (state: Appstate) => state.User.UserInfo!.companyUrl,
  );
  const [onlineClassId, setOnlineClassId] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [classDetail, setClassDetail] = useState();
  const [onlineClassType, setOnlineClassType] = useState(
    ClassTypesConstants.VariantName,
  );
  const [hangoutUrl, setHangoutUrl] = useState('');
  const [showAlert, setShowAlert] = useState(show);
  const [alertTitle, setAlertTitle] = useState(error);
  const [alertMessage, setAlertMessage] = useState(message);
  const [selectedStudentId, setSelectedStudentId] = useState(0);
  const [whiteBoardTitle, setWhiteBoardTitle] = useState('');
  const [selectedClassId, setSelectedClassId] = useState(0);
  const { courseContentScreen } = useSelector(
    (state: Appstate) => state.language,
  );
  const [classStartedModal, setClassStartedModal] = useState(false);
  const [isWebview, setisWebview] = useState(false);
  const dispatch: any = useDispatch();
  const { orientation } = useLogin();
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
    setAlertTitle(error);
    setShowAlert(show);
    setAlertMessage(message);
    setAlertTitle(error);
  }, [show, alertMessage, error]);

  const selectHeader = (redirectTo: string) => {
    switch (redirectTo) {
      case 'messageToClass':
        return classListHeading.ClassNotificationFor.replace(
          'Class',
          terminologies['Class']?.label,
        );
      case 'assignStudents':
        return classListHeading.CheckAssignedStudent;
      case 'onlineNotes':
        return classListHeading.onlineNotesFor;
      case 'onlineClass':
        return classListHeading.onlineClassFor.replace(
          'Class',
          terminologies['Class']?.label,
        );
      case 'whiteBoard':
        return classListHeading.WhiteBoardFor;
      default:
        break;
    }
  };

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };

  const navigateToRespectiveScreen = (item: any) => {
    if (route.params.redirectTo == 'onlineNotes') {
      navigation.navigate('OnlineNotes', {
        CourseId: route.params.courseID,
        classId: item.item.value,
        ProjectId: route.params.projectID,
        backTo: Screens.courseClasses.name,
      });
    } else if (route.params.redirectTo == 'onlineClass') {
      handleOnlineClass(item.item.value);
    } else if (route.params.redirectTo == 'whiteBoard') {
      handleClassWhiteBoard(item.item.value, item.item.text);
    } else {
      route.params.onClassSelect(
        route.params.courseID,
        item.item.value,
        item.item.text,
        route.params.redirectTo,
      );
    }
  };
  const handleChangeUrl = (url: any) => {
    setHangoutUrl(url);
  };
  const handleChangeType = (type: string) => {
    if (type === 'Zoom') {
      setOnlineClassType(ClassTypesConstants.Zoom);
    } else if (type == 'Google Meet') {
      setOnlineClassType(ClassTypesConstants.GoogleMeet);
    } else {
      setOnlineClassType(ClassTypesConstants.VariantName);
    }
  };
  const handleModalVisible = () => {
    setModalState(!modalState);
  };
  const handleSaveClass = (data: any) => {
    let url = '';
    dispatch(loading(true));
    if (onlineClassType === ClassTypesConstants.GoogleMeet) {
      url = hangoutUrl;
      if (!Boolean(url)) {
        dispatch(loading(false));
        Alert.alert('Please enter a valid url');
        return;
      }
    }
    dispatch(saveOnlineClass(data.classId, onlineClassType, url)).then(
      (res: any) => {
        dispatch(loading(false));
        if (res) {
          handleModalVisible();
          Alert.alert('Success', 'Record saved successfully');
        }
      },
    );
  };
  const handleStartClass = async (data: any) => {
    if (onlineClassType === ClassTypesConstants.VariantName) {
      let response: any = await dispatch(
        StartCalimaticOnlineClass(
          data.className,
          data.classId,
          user.companyUrl,
        ),
      );
      if (response.isApiError === true) {
        Alert.alert(
          'There is an error while starting the class please try again later!',
        );
      } else if (response.isException === true) {
        Alert.alert('There is an issue while connecting with the server!');
      } else {
        openApp(response.joinUrl);
        SendReminderNotifications(
          data,
          NotificationReminder.OnlyInstuctorJoined,
        );
      }
      // setModalState(false);
    } else if (onlineClassType === ClassTypesConstants.Zoom) {
      dispatch(startMeeting(data.classId, data.className)).then((res: any) => {
        if (!res.isSuccessful) {
          Alert.alert(res?.meetingFailure?.message);
          setShowAlert(true);
          setAlertMessage(res?.meetingFailure?.message);
          setAlertTitle('Error');
        } else {
          startZoomMeeting(res);
          setModalState(false);
        }
      });
    } else {
      if (hangoutUrl != '') {
        openApp(hangoutUrl);
        setModalState(false);
      } else {
        if (Platform.OS === 'ios') {
          Alert.alert(courseContentScreen.PleaseEnterYourHangoutUrl);
        } else {
          setShowAlert(true);
          setAlertMessage(courseContentScreen.PleaseEnterYourHangoutUrl);
          setAlertTitle('Url is not valid');
        }
      }
    }
  };
  const SendReminderNotifications = async (data: any, reminderType: any) => {
    const { classId, className } = data;
    try {
      const URL = ApiEndpoints.SendReminderNotifications;
      const params = `?classId=${classId}&StudentName=${null}&className=${className}&notificationType=${
        NotificationTypes.Announcement
      }&reminder=${reminderType}`;
      await PostSecuredWithParams(URL, params);
    } catch (e) {
      console.log('Error', e);
    }
  };

  const handleOnlineClass = (classId: any) => {
    setOnlineClassId(classId);
    if (
      isAdmin(user.roleName) ||
      isInstructor(user.roleName) ||
      isExecutive(user.roleName) ||
      isCoordinator(user.roleName)
    ) {
      var EndPoint: endpoint = ApiEndPoint.GetCourseOnlineClass;
      EndPoint.params = `?ClassID=${classId}&Url=${domainUrl}`;
      Get(EndPoint).then((response: any) => {
        setClassDetail(response);
        setOnlineClassType(response.onlineClassType);
        setHangoutUrl(response.classUrl);
        handleModalVisible();
      });
    } else JoinClass(classId, setClassStartedModal, classStartedModal);
  };
  const handleClassWhiteBoard = (classId: any, className: any) => {
    setSelectedClassId(classId);
    setSelectedStudentId(0);
    setWhiteBoardTitle(className);
    // htmlref?.current?.changeVisibleState();
    setisWebview(true);
  };
  return (
    <_Screen
      header={
        <Header
          isBack={true}
          isMenu={false}
          isLogout={false}
          Screen={selectHeader(route.params.redirectTo)}
          GoBack={() => {
            navigation.goBack();
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={onBackPress}
      backgroundColor={whiteThemeColors.background}
    >
      <SafeAreaView>
        <_View
          style={[
            styles.container,
            { height: orientation === 'PORTRAIT' ? '96%' : '93%' },
          ]}
        >
          <FlatList
            style={{ width: '95%' }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            ListHeaderComponent={() => <_View style={{ height: 15 }} />}
            ItemSeparatorComponent={() => <_View style={{ height: 8 }} />}
            renderItem={(item: any, index: number) => (
              <CourseClassCard
                item={item}
                index={index}
                onPress={() => {
                  setSelectedClassId(item?.item?.value);
                  navigateToRespectiveScreen(item);
                }}
              />
            )}
            ListFooterComponent={() => <_View style={{ height: 90 }} />}
          />
        </_View>
        {isWebview && (
          <HtmlWebView
            changeVisibleState={() => {
              setisWebview(false);
            }}
            title={whiteBoardTitle}
            classId={selectedClassId}
            studentId={selectedStudentId}
            role={user.roleName}
            isWebview={isWebview}
          />
        )}
        {modalState && (
          <StartClass
            onChangeUrl={(url) => handleChangeUrl(url)}
            onChange={(type) => handleChangeType(type)}
            onClose={(val = false) => {
              setModalState(val);
            }}
            onSaveClass={(data) => {
              handleSaveClass(data);
            }}
            onStartClass={(data) => {
              handleStartClass(data);
            }}
            classId={onlineClassId}
            showModal={modalState}
            data={classDetail}
          />
        )}
        <_View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          {showAlert && (
            <CustomAlert
              visible={showAlert}
              title={alertTitle}
              msg={alertMessage}
              firstBtn={'Okay'}
              firstBtnFunc={() => {
                dispatch(alertHide());
                setShowAlert(false);
              }}
            />
          )}
        </_View>
        {classStartedModal && (
          <ClassNotStartedModal
            selectedClassId={selectedClassId}
            visible={classStartedModal}
            setVisible={setClassStartedModal}
            handleOnlineClass={handleOnlineClass}
          />
        )}
      </SafeAreaView>
    </_Screen>
  );
};
export const CourseClasses = React.memo(_CourseClasses);
