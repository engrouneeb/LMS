import { dayDetailInterface } from '../../../components/Interfaces/dayDetailsInterface';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomAlert,
  dateStringFormatToDisplay,
  isAdmin,
  isCoordinator,
  isExecutive,
  isInstructor,
  isTablet,
  whiteThemeColors,
} from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  StartCalimaticOnlineClass,
  saveOnlineClass,
  startMeeting,
} from '../../../actions/CoursePlayerAction';
import { alertHide } from '../../../actions/CustomAlert';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  dayDetailsInterface,
  endpoint,
} from '../../../components';
import { ClassNotStartedModal } from '../../../components/ClassNotStartedModal';
import {
  ClassTypesConstants,
  NotificationReminder,
  NotificationTypes,
} from '../../../constants';
import { useMeetingLogoutHook } from '../../../customHooks';
import { Appstate } from '../../../reducers/Appstate';
import { StartClass } from '../../CoursePlayer';
import MasterHeader from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import Search from '../../Search';
import { useOrientation } from '../Orientation';
import styles from '../style';
import { ClassCard } from './ClassCard';
const DayDetails: React.FC<dayDetailInterface> = ({ navigation, route }) => {
  let searchRef: any = useRef();
  const orientation = useOrientation();
  const { JoinClass, startZoomMeeting, openApp } = useMeetingLogoutHook();
  const { selectedDay, classIds } = route.params;
  const { roleName, companyUrl, UserData }: any = useSelector(
    (state: Appstate) => state.User.UserInfo,
  );
  const { show, message }: any = useSelector(
    (state: Appstate) => state.CustomAlert,
  );
  const [classDetails, setClassDetails] = useState<any[]>([]);
  const [classDetailSearch, setClassDetailSearch] = useState<any[]>([]);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('Warning');
  const [alertText, setAlertText] = useState('');
  const [selectedClass, setSelectedClass] = useState<dayDetailsInterface>();
  const [loader, setLoader] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  const [_startClass, setStartClass] = useState(false);
  const [hangoutUrl, setHangoutUrl] = useState('');
  const [onlineClassType, setOnlineClassType] = useState(1);
  const [skipRecords, setSkipRecords] = useState(0);
  const [classDetail, setClassDetail] = useState(undefined);
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const [classStartedModal, setClassStartedModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const { Get, PostSecuredWithParams } = DataAccess();
  const [stopCallingOnEndReached, setStopCallingOnEndReached] = useState(false);
  const dispatch: any = useDispatch();
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    setAlertTitle('Error');
    setAlertModalVisible(show);
    setAlertText(message);
  }, [show, message]);
  const { courseContentScreen } = useSelector(
    (state: Appstate) => state.language,
  );
  const fetchClasses = (fetchMoreRequest = false) => {
    if (!fetchMoreRequest) setMainLoader(true);
    setLoader(true);
    let EndPoint: endpoint = ApiEndpoints.getAssignClassesDetails;
    EndPoint.params = `?clsIds=${classIds}&selectedDate=${selectedDay}&take=${10}&skip=${skipRecords}`;
    Get(EndPoint)
      .then((res: any) => {
        if (res?.length > 0) {
          setStopCallingOnEndReached(false);
          setClassDetails([...classDetails, ...res]);
          setClassDetailSearch([...classDetailSearch, ...res]);
          setSkipRecords(skipRecords + 10);
          if (!fetchMoreRequest) setMainLoader(false);
          setLoader(false);
        } else {
          setStopCallingOnEndReached(true);
          setLoader(false);
          if (!fetchMoreRequest) setMainLoader(false);
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);
  const _CancelClass = async () => {
    const list = classDetails.findIndex(
      (item) => item.classId === selectedClass?.classId,
    );
    classDetails.splice(list, 1);
    var EndPoint: endpoint = ApiEndpoints.DoCanel;

    EndPoint.params = `?ClassorBatchId=${
      selectedClass?.classId
    }&isBatch=${false}&TimeId=${selectedClass?.timingId}&Date=${new Date(
      selectedDay,
    ).toDateString()}&MakeUpClassId=${selectedClass?.makeupClassId}`;

    let response = await Get(EndPoint);
    if (response.status) {
      setAlertModalVisible(true);
      setAlertTitle('Success');
      setAlertText(
        selectedClass?.className + ' has been cancelled successfully',
      );
    } else {
      setAlertModalVisible(true);
      setAlertTitle('Error');
      setAlertText(response.error_description);
    }
  };
  const _onStartClass = (item: any) => {
    setSelectedClass(item);
    setSelectedItem(item);
    handleOnlineClass(item.classId);
  };
  const handleOnlineClass = async (classId: any) => {
    if (
      isAdmin(roleName) ||
      isInstructor(roleName) ||
      isExecutive(roleName) ||
      isCoordinator(roleName)
    ) {
      var EndPoint: endpoint = ApiEndpoints.GetCourseOnlineClass;
      EndPoint.params = `?ClassID=${classId}&Url=${companyUrl}`;
      Get(EndPoint).then((response: any) => {
        setClassDetail(response);
        setOnlineClassType(response.onlineClassType);
        setHangoutUrl(response.classUrl);
      });
    } else {
      JoinClass(classId, setClassStartedModal, classStartedModal);
      if (show) {
        setAlertModalVisible(show);
        setAlertTitle('Error');
        setAlertText(message);
      }

      return;
    }
    setStartClass(true);
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

  const _cancelConfirmation = (item: dayDetailsInterface) => {
    setSelectedClass(item);
    setAlertModalVisible(true);
    setAlertTitle('Warning');

    setAlertText(`Are you sure you want to cancel ${item?.className} class?`);
  };

  const handleChangeType = (type: string) => {
    switch (type) {
      case 'Zoom':
        setOnlineClassType(ClassTypesConstants.Zoom);
        break;
      case 'Google Meet':
        setOnlineClassType(ClassTypesConstants.GoogleMeet);
        break;
      default:
        setOnlineClassType(ClassTypesConstants.VariantName);
    }
  };

  const handleSaveClass = (data: any) => {
    let url = '';
    if (onlineClassType === ClassTypesConstants.GoogleMeet) {
      url = hangoutUrl;
      if (!Boolean(url)) {
        Alert.alert('Please enter a valid url');
        return;
      }
    }
    dispatch(saveOnlineClass(data?.classId, onlineClassType, url)).then(
      (res: any) => {
        if (res) {
          console.log(res, '---->onlineClass Save');
          Alert.alert('Success', 'Record saved successfully');
        }
      },
    );
  };

  const handleStartClass = async (data: any) => {
    if (onlineClassType === ClassTypesConstants.VariantName) {
      let response: any = await dispatch(
        StartCalimaticOnlineClass(data.className, data.classId, companyUrl),
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
        setStartClass(false);
      }
    } else if (onlineClassType === ClassTypesConstants.Zoom) {
      dispatch(startMeeting(data.classId, data.className)).then((res: any) => {
        console.log('====================================');
        console.log({ res });
        console.log('====================================');
        if (!res.isSuccessful) {
          Alert.alert(res?.meetingFailure?.message);
        } else {
          startZoomMeeting(res);
          setStartClass(false);
        }
      });
    } else {
      if (hangoutUrl != '') {
        openApp(hangoutUrl);
        // setModalState(false);
      } else {
        console.log(
          'courseContentScreen.EnterUrl',
          courseContentScreen.EnterUrl,
        );
        if (Platform.OS === 'ios') {
          Alert.alert(courseContentScreen.PleaseEnterYourHangoutUrl);
        } else {
          // setShowAlert(true);
          Alert.alert(courseContentScreen.PleaseEnterYourHangoutUrl);
          setAlertTitle(courseContentScreen.EnterUrl);
        }
      }
    }
  };

  const FooterLoader = () => {
    return (
      <_View
        style={{
          width: '100%',
          height: 80,
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <_ActivityIndicator color={whiteThemeColors.greyDark} />
      </_View>
    );
  };
  const onAndroidBack = () => {
    navigation.goBack();
    return true;
  };
  const onChangeText = (data: any) => {
    let array = [];
    data.forEach((element: any) => {
      array.push(element);
    });
    setClassDetails(data);
  };
  return (
    <_Screen
      header={
        <MasterHeader
          isBack={true}
          isMenu={false}
          isSearchBtn
          OpenSearch={() => {
            setDisableLoadMore(true);
            setisVisible(true);
          }}
          Screen={moment(selectedDay).format(dateStringFormatToDisplay())}
          isLogout={false}
          GoBack={() => {
            navigation.goBack();
          }}
        />
      }
      backgroundColor={whiteThemeColors.background}
      flex={1}
      hideTopSafeArea
      onAndroidBack={onAndroidBack}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setDisableLoadMore(false);
            setisVisible(false);
          }}
          animSpeed={100}
          data={classDetailSearch}
          searchKey='className,courseName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <_View
        style={[
          styles.modalContainer,
          {
            height:
              orientation === 'LANDSCAPE'
                ? Platform.OS === 'ios'
                  ? isTablet
                    ? '75%'
                    : '60%'
                  : '60%'
                : Platform.OS === 'ios'
                ? '90%'
                : '90%',
          },
        ]}
      >
        {classDetails.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={classDetails}
            ListHeaderComponent={
              <_View style={{ width: '100%', height: 10 }} />
            }
            renderItem={({ item }) => (
              <ClassCard
                item={item}
                cancelConfirmation={_cancelConfirmation}
                startClass={_onStartClass}
              />
            )}
            keyExtractor={(item) => item.id}
            style={{ height: '100%', marginBottom: 20 }}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (!stopCallingOnEndReached && !disableLoadMore)
                fetchClasses(true);
            }}
            ListFooterComponent={loader ? <FooterLoader /> : undefined}
          />
        ) : mainLoader ? (
          <_ActivityIndicator size={'large'} />
        ) : (
          <_View style={styles.emptyList}>
            <_VectorIcons
              type='FontAwesome5'
              name={'store-alt-slash'}
              size={80}
              color={whiteThemeColors.primary + 50}
            />
            <_Text style={styles.emptyListText}>{'No Data Found!'}</_Text>
          </_View>
        )}
      </_View>
      {alertModalVisible && (
        <CustomAlert
          visible={alertModalVisible}
          title={alertTitle}
          msg={alertText}
          firstBtn={'Okay'}
          secondBtn={alertTitle != 'Error' && 'Close'}
          firstBtnFunc={() => {
            dispatch(alertHide());
            if (alertTitle == 'Success') {
              setAlertModalVisible(false);
              fetchClasses();
              return;
            }
            if (alertTitle != 'Error' && alertModalVisible) _CancelClass();
            setAlertModalVisible(false);
          }}
          secondBtnFunc={() => {
            setAlertModalVisible(false);
          }}
        />
      )}
      {_startClass && (
        <StartClass
          onChangeUrl={(url: any) => setHangoutUrl(url)}
          onChange={(type) => handleChangeType(type)}
          onClose={() => setStartClass(false)}
          onSaveClass={(data) => handleSaveClass(data)}
          onStartClass={(data) => handleStartClass(data)}
          classId={selectedClass?.classId}
          showModal={_startClass}
          data={classDetail}
        />
      )}
      {classStartedModal && (
        <ClassNotStartedModal
          visible={classStartedModal}
          setVisible={setClassStartedModal}
          handleOnlineClass={handleOnlineClass}
          courseID={selectedItem?.courseId}
          selectedClassId={selectedItem?.classId}
        />
      )}
    </_Screen>
  );
};

export default DayDetails;
