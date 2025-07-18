import { CourseContentInterface } from '../../../../interfaces';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform, ScrollView, UIManager } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomAlert,
  isAdmin,
  isCoordinator,
  isExecutive,
  isInstructor,
  whiteThemeColors,
} from '../../../../Utilities';
import {
  default as ApiEndPoint,
  default as ApiEndpoints,
} from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import {
  assignCoursesFailed,
  assignCoursesSuccess,
} from '../../../../actions/AssignCoursesAction';
import { loading } from '../../../../actions/AsyncStorage';
import {
  StartCalimaticOnlineClass,
  saveOnlineClass,
  startMeeting,
} from '../../../../actions/CoursePlayerAction';
import { alertHide } from '../../../../actions/CustomAlert';
import { _Text, _View, endpoint } from '../../../../components';
import { ClassNotStartedModal } from '../../../../components/ClassNotStartedModal';
import {
  ClassTypesConstants,
  NotificationReminder,
  NotificationTypes,
} from '../../../../constants';
import { useMeetingLogoutHook } from '../../../../customHooks';
import { Appstate } from '../../../../reducers/Appstate';
import Screens from '../../../../screenNames';
import { _ActivityIndicator } from '../../../Loader';
import { CourseDetails } from '../ChallengeDetails';
import { HtmlWebView } from '../common/HtmlWebView';
import { StudentsList } from '../common/StudentList/StudentList';
import {
  CourseContentList,
  CourseDetailTabs,
  RenderImage,
  StartClass,
} from './components';
import { styles } from './styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const _CourseContent: React.FC<CourseContentInterface> = ({
  courseContent,
  courseFeilds,
  navigation,
  route,
  role,
}) => {
  const { Get, PostSecuredWithParams } = DataAccess();
  const { JoinClass, openApp,  startZoomMeeting } = useMeetingLogoutHook();
  const dispatch = useDispatch();
  const { cpLoading, cpFailed, cpProgress, data }: any = useSelector(
    (state: Appstate) => state.cpStudentReducer,
  );

  const defaultImgPath = '/Content/Images/courseImage.png';
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const domainUrl: any = useSelector(
    (state: Appstate) => state.User.UserInfo!.companyUrl,
  );
  const { courseContentScreen } = useSelector(
    (state: Appstate) => state.language,
  );
  const { show, message } = useSelector((state: Appstate) => state.CustomAlert);
  const [modalState, setModalState] = useState(false);
  const [onlineClassType, setOnlineClassType] = useState(
    ClassTypesConstants.VariantName,
  );
  const [hangoutUrl, setHangoutUrl] = useState('');
  const [classDetail, setClassDetail] = useState();
  const [selectedClassId, setSelectedClassId] = useState(0);
  const [onlineClassId, setOnlineClassId] = useState(0);
  const [selectedStudentId, setSelectedStudentId] = useState(0);
  const [whiteBoardTitle, setWhiteBoardTitle] = useState('');
  const [showAlert, setShowAlert] = useState(show);
  const [alertTitle, setAlertTitle] = useState<any>('');
  const [alertMessage, setAlertMessage] = useState(message);
  const [load, setload] = useState(false);
  const [classStartedModal, setClassStartedModal] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [isCourseVisible, setisCourseVisible] = useState(false);
  const isLoading: any = useSelector((state: Appstate) => state.token.loading);
  const [isWebview, setisWebview] = useState(false);
  const openScreen = (courseTitle: any, id: any) => {
    navigation.navigate(Screens.challengeDetail.name, {
      challengeId: id,
      role: role,
      header: courseTitle,
      courseName: route?.params?.courseName,
      userID: route.params.userID,
    });
  };

  useEffect(() => {
    setShowAlert(show);
    setAlertMessage(message);
  }, [show, alertMessage]);
  const handleChangeUrl = (url: any) => {
    setHangoutUrl(url);
  };

  const handleChangeType = (type: any) => {
    if (type === 'Zoom') {
      setOnlineClassType(ClassTypesConstants.Zoom);
    } else if (type == 'Google Meet') {
      setOnlineClassType(ClassTypesConstants.GoogleMeet);
    } else {
      setOnlineClassType(ClassTypesConstants.VariantName);
    }
  };
  const handleOnlineClass = (classId: any) => {
    
    setOnlineClassId(classId);
    setSelectedClassId(classId);
    if (
      isAdmin(user.roleName) ||
      isInstructor(user.roleName) ||
      isExecutive(user.roleName) ||
      isCoordinator(user.roleName)
    ) {
      var EndPoint: endpoint = ApiEndPoint.GetCourseOnlineClass;
      EndPoint.params = `?ClassID=${classId}&Url=${domainUrl}`;
      console.log({EndPoint});
      Get(EndPoint).then((response: any) => {
        console.log({response});
        setClassDetail(response);
        setOnlineClassType(response.onlineClassType);
        setHangoutUrl(response.classUrl);
        handleModalVisible();
      }).catch((err=>{
        console.log("=====================");
        console.log({err});
        console.log("=====================");
        
      }));
    } else {
      JoinClass(classId, setClassStartedModal, classStartedModal);
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
        Alert.alert('Please enter a valid url....');
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
        console.log('******IN ELSE********');
        openApp(response.joinUrl);
        setModalState(false);
        SendReminderNotifications(
          data,
          NotificationReminder.OnlyInstuctorJoined,
        );
      }
    } else if (onlineClassType === ClassTypesConstants.Zoom) {
      dispatch(startMeeting(data.classId, data.className)).then((res: any) => {
        if (!res.isSuccessful) {
          setShowAlert(true);
          Alert.alert(res?.meetingFailure?.message);
          setAlertMessage(res?.meetingFailure?.message);
          setAlertTitle('Error');
        } else {
          console.log({res});
          startZoomMeeting(res);
          // openApp(res.startUrl);
          setModalState(false);
        }
      });
    } else {
      if (hangoutUrl !== '') {
        openApp(hangoutUrl);
        setModalState(false);
      } else {
        setShowAlert(true);
        setAlertMessage(courseContentScreen.PleaseEnterYourHangoutUrl);
        setAlertTitle('Error');
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

  const handleOnNotesPress = (res: any) => {
    navigation.navigate('OnlineNotes', {
      CourseId: route.params.courseID,
      classId: res.classDetail[0]?.value,
      ProjectId: route.params.projectID,
      backTo: Screens.courseDetails.name,
    });
  };

  const handleClassesAssignToCourse = async (redirect: any) => {
    let url: endpoint = ApiEndPoint.getCourseClasses;
    url.params = `?CourseId=${route.params.courseID}`;
    let res = await Get(url);
    if (res.error === null) {
      if (res.isJustOneClass === false) {
        dispatch(assignCoursesSuccess(res.classDetail));
        return navigation.navigate(Screens.courseClasses.name, {
          redirectTo: redirect,
          courseID: route.params.courseID,
          projectID: route.params.projectID,
          onlineClass: handleOnlineClass,
          classWhiteBoard: handleClassWhiteBoard,
        });
      } else {
        setSelectedClassId(res?.classDetail?.value);
        if (redirect == 'onlineNotes') {
          handleOnNotesPress(res);
        } else if (redirect == 'onlineClass') {
          await handleOnlineClass(res.classDetail[0]?.value);
        } else if (redirect == 'whiteBoard') {
          handleClassWhiteBoard(
            res?.classDetail[0]?.value,
            res?.classDetail[0]?.text,
          );
        }
      }
    } else {
      dispatch(assignCoursesFailed());
      Alert.alert(res.error);
    }
  };

  const handleClassWhiteBoard = (classId: any, className: any) => {
    setSelectedClassId(classId);
    setSelectedStudentId(0);
    setWhiteBoardTitle(className);
    setisWebview(true);
  };
  const handleStudentWhiteBoard = (stdId: any, stdName: any) => {
    setSelectedClassId(0);
    setSelectedStudentId(stdId);
    setWhiteBoardTitle(stdName);
    setisWebview(true);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: whiteThemeColors.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <_View style={styles.classImageView}>
        <RenderImage
          load={load}
          setLoad={setload}
          imgType={
            route.params.courseImage == null ||
            route.params.courseImage == undefined ||
            route.params.courseImage == defaultImgPath
              ? 'defaultImage'
              : 'url'
          }
          image={
            route.params.courseImage === defaultImgPath ||
            route.params.courseImage === null ||
            route.params.courseImage === undefined
              ? defaultImgPath
              : route.params.courseImage
          }
        />
      </_View>
      <CourseDetailTabs
        roleName={user.roleName}
        handleClassesAssignToCourse={handleClassesAssignToCourse}
        onPress1={() => {
          setWhiteBoardTitle(route.params.courseName);
          // htmlRef?.current?.changeVisibleState();
          setisWebview(true);
        }}
        onPress2={(val: any) => {
          if (val == 1) {
            handleClassesAssignToCourse('whiteBoard');
          } else {
            // studentRef?.current?.hideModal();
            setisVisible(true);
          }
        }}
        onPress3={() => setisCourseVisible(true)}
      />

      <_View style={styles.body}>
        {isWebview && (
          <HtmlWebView
            changeVisibleState={() => {
              // htmlRef?.current?.changeVisibleState();
              setisWebview(false);
            }}
            // ref={htmlRef}
            title={whiteBoardTitle}
            classId={selectedClassId}
            studentId={selectedStudentId}
            role={user.roleName}
            isWebview={isWebview}
          />
        )}

        {isLoading && (
          <_ActivityIndicator
            size={'large'}
            showText={false}
            color={whiteThemeColors.primary}
          />
        )}
        {!Boolean(courseContent!.length > 0) &&
          !Boolean(data?.courseChilds?.courseChilds.length > 0) && (
            <_Text style={styles.noDataTxt}>No Data</_Text>
          )}
        <_View style={styles.listView}>
          {cpLoading ? null : cpFailed ? (
            <_Text
              style={[
                styles.loadingFailedTxt,
                { display: cpFailed ? 'flex' : 'none' },
              ]}
            >
              {courseContentScreen.FailedToLoadData}
            </_Text>
          ) : (
            <CourseContentList
              openScreen={openScreen}
              navigation={navigation}
              data={
                cpProgress ? data?.courseChilds?.courseChilds : courseContent
              }
            />
          )}
        </_View>
        {isCourseVisible && (
          <CourseDetails
            changeVisibleState={() => setisCourseVisible(false)}
            courseFields={courseFeilds}
            // ref={modalRef}
            isCourseVisible={isCourseVisible}
          />
        )}
      </_View>
      {modalState && (
        <StartClass
          onChangeUrl={(url) => handleChangeUrl(url)}
          onChange={(type) => handleChangeType(type)}
          onClose={() => handleModalVisible()}
          onSaveClass={(data) => handleSaveClass(data)}
          onStartClass={(data) => handleStartClass(data)}
          classId={onlineClassId}
          showModal={modalState}
          data={classDetail}
        />
      )}
      {isVisible && (
        <StudentsList
          studentWhiteBoard={handleStudentWhiteBoard}
          isFromWhiteBoard={true}
          userID={user.userID}
          courseId={route.params.courseID}
          isVisible={isVisible}
          setisVisible={setisVisible}
        />
      )}
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
      {classStartedModal && (
        <ClassNotStartedModal
          visible={classStartedModal}
          setVisible={setClassStartedModal}
          handleOnlineClass={handleOnlineClass}
          selectedClassId={selectedClassId}
        />
      )}
    </ScrollView>
  );
};

export const CourseContent = React.memo(_CourseContent);
