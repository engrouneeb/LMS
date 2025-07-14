import { useNavigation } from '@react-navigation/native';
import { ClassNotStartedModal } from 'components/ClassNotStartedModal';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import CommonStyles from 'screens/CommonStyles';
import { StartClass } from 'screens/CoursePlayer';
import {
  convertUTCDateToLocalDateStringFormat,
  CustomAlert,
  getTerminologyLabel,
  isAdmin,
  isCoordinator,
  isExecutive,
  isInstructor,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  _Text,
  _View,
  dayDetailInterface,
  dayDetailsInterface,
  endpoint,
} from '../../../components';
import { useMeetingLogoutHook } from '../../../customHooks';
import { Appstate } from '../../../reducers/Appstate';
import ScreensNames from '../../../screenNames';
import { _ActivityIndicator } from '../../Loader';
import { useLoadClasses } from '../Hooks';
import { ClassCard } from './ClassCard';
import { CustomCalendarHeader } from './CustomCalendarHeader';
import { styles } from './styles';
import { YearList } from './YearList';

import moment from 'moment';
import {
  saveOnlineClass,
  StartCalimaticOnlineClass,
  startMeeting,
} from '../../../actions/CoursePlayerAction';
import { alertHide } from '../../../actions/CustomAlert';
import {
  ClassTypesConstants,
  NotificationReminder,
  NotificationTypes,
} from '../../../constants';

let dateObject;
interface props {
  userID: number | null;
  setchildren: (value: any) => void;
  setActiveStdId: (value: any) => void;
  setActive: (value: string) => void;
}
const AssignedClasses: React.FC<props> = ({
  userID,
  setchildren,
  setActive,
  setActiveStdId
}) => {
  const navigation = useNavigation<any>();
  const [classDateArray, setClassDateArray] = useState({});
  const [datesWithClasses, setDatesWithClasses] = useState([]);
  const [loadingDates, setLoadingDates] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString());
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('warning');
  const [alertMsg, setAlertMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { dashboardScreen } = useSelector((state: Appstate) => state.language);
  const [todayClasses, setTodayClasses] = useState([]);
  const [classDetails, setClassDetails] = useState<any[]>([]);
  const [alertText, setAlertText] = useState('');
  const [selectedClass, setSelectedClass] = useState<dayDetailsInterface>();
  const [_startClass, setStartClass] = useState(false);
  const [hangoutUrl, setHangoutUrl] = useState('');
  const [onlineClassType, setOnlineClassType] = useState(1);
  const [classDetail, setClassDetail] = useState(undefined);
  const [classStartedModal, setClassStartedModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const { getClasses } = useLoadClasses();
  const { JoinClass, startZoomMeeting, openApp } = useMeetingLogoutHook();
  const { Get, PostSecuredWithParams } = DataAccess();
  const dispatch = useDispatch();
  const { show, message }: any = useSelector(
    (state: Appstate) => state.CustomAlert,
  );
  const { courseContentScreen } = useSelector(
    (state: Appstate) => state.language,
  );
  const { roleName, companyUrl, UserData }: any = useSelector(
    (state: Appstate) => state.User.UserInfo,
  );
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formattedDate = today.toISOString();
    setSelectedMonth(formattedDate);
    getClassDates(formattedDate);
  }, [userID]);
  useEffect(() => {
    fetchClasses();
  }, [datesWithClasses]);
  const getClassDates = (month: any) => {
    setLoadingDates(true);
    getClasses(month, userID)
      .then((res) => {
        handelDateList(res);
        if (res?.childList?.length > 0) {
          console.log({"child":res?.childList[0]});
          setActive(res?.childList[0].name);
          setActiveStdId(res?.childList[0]);
          setchildren(res?.childList);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoadingDates(false);
      });
  };
  const fetchClasses = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formattedDate = today.toISOString();
    console.log({ formattedDate });
    var classIds = _filterClassId(formattedDate);
    if (classIds) {
      let EndPoint: endpoint = ApiEndpoints.getAssignClassesDetails;
      EndPoint.params = `?clsIds=${classIds}&selectedDate=${formattedDate}&take=${10}&skip=${0}`;
      Get(EndPoint).then((res: any) => {
        if (res?.length > 0) {
          setTodayClasses(res);
        }
      });
    }
  };

  const handelDateList = (res: any) => {
    var dateList = res.activeDates.map((Obj: any) => Obj.activeDateStr);
    dateObject = Object.fromEntries(
      dateList.map((year: any) => {
        var day = new Date(year).getDay();
        return [
          year,
          {
            selected: false,
            marked: true,
            selectedColor: whiteThemeColors.primary,
            selectedDotColor: whiteThemeColors.white,
          },
        ];
      }),
    );
    const today = new Date();
    // const formattedDate = today.toISOString().split('T')[0];
    const formattedDate = moment(
      convertUTCDateToLocalDateStringFormat(today),
      'MMM DD, YYYY',
    ).format('YYYY-MM-DD');

    dateObject[formattedDate] = {
      selected: true,
      marked: true,
      selectedColor: whiteThemeColors.primary,
      color: '#fff',
    };

    setDatesWithClasses(res.activeDates);
    setClassDateArray(dateObject);
  };

  const _showDetailsOnDay = (date: string) => {
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    let selected_date = new Date(year, month, day);

    var classIds = _filterClassId(date);
    if (classIds !== undefined) {
      navigation.navigate(ScreensNames.DayDetails.name, {
        selectedDay: selected_date.toISOString(),
        classIds,
      });
    } else {
      setShowModal(true);
      setAlertMsg(
        `No ${terminologies['Class']?.label} assigned in the selected date.`,
      );
      setAlertTitle('warning');
    }
  };
  const _filterClassId = (date: any) => {
    var filteredClassId;
    datesWithClasses.filter((element: any) => {
      if (element.activeDateStr === date) {
        filteredClassId = element.clsIds;
      }
    });
    return filteredClassId;
  };

  const _setDate = (date: any) => {
    setSelectedMonth(date);
    getClassDates(date);
  };

  const handleNextPress = () => {
    const nextMonthDate = new Date(selectedMonth);
    nextMonthDate.setMonth(new Date(selectedMonth).getMonth() + 1);
    _setDate(new Date(nextMonthDate).toISOString());
    setSelectedMonth(new Date(nextMonthDate));
  };

  const handlePrevPress = () => {
    const previousMonthDate = new Date(selectedMonth);
    previousMonthDate.setMonth(new Date(selectedMonth).getMonth() - 1);
    _setDate(new Date(previousMonthDate).toISOString());
    setSelectedMonth(new Date(previousMonthDate));
    // Logic to navigate to the previous month
  };
  const handleArrowClick = () => {
    // Do nothing or add logic to handle arrow clicks
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
  const _CancelClass = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const list = classDetails.findIndex(
      (item) => item.classId === selectedClass?.classId,
    );
    classDetails.splice(list, 1);
    var EndPoint: endpoint = ApiEndpoints.DoCanel;

    EndPoint.params = `?ClassorBatchId=${
      selectedClass?.classId
    }&isBatch=${false}&TimeId=${selectedClass?.timingId}&Date=${new Date(
      formattedDate,
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

  const _cancelConfirmation = (item: dayDetailInterface) => {
    setSelectedClass(item);
    setAlertModalVisible(true);
    setAlertTitle('Warning');

    setAlertText(
      `Are you sure you want to cancel ${item?.className} ${terminologies['Class']?.label}?`,
    );
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
          `There is an error while starting the ${terminologies['Class']} please try again later!`,
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
  return (
    <_View style={styles.assignedMain}>
      <_Text style={styles.assignedDashboard}>
        {dashboardScreen.AssignedClasses.replace(
          'Classes',
          terminologies['Class']?.pluralLabel || 'Classes',
        )}
      </_Text>
      {loadingDates ? (
        <_View height={300}>
          <_ActivityIndicator showText={false} />
        </_View>
      ) : (
        <Calendar
          hideExtraDays
          current={selectedMonth}
          renderArrow={(direction) => null}
          onPressArrowLeft={handleArrowClick}
          onPressArrowRight={handleArrowClick}
          renderHeader={(date) => {
            return (
              <CustomCalendarHeader
                month={date.toString('MMMM')}
                year={date.getFullYear()}
                onPressPrev={handlePrevPress}
                onPressNext={handleNextPress}
                setIsModalVisible={setIsModalVisible}
              />
            );
          }}
          style={styles.assignedCalendar}
          onDayPress={(day) => {
            _showDetailsOnDay(day.dateString);
          }}
          onVisibleMonthsChange={(monthChanges) =>
            _setDate(new Date(monthChanges[0].dateString).toISOString())
          }
          markedDates={classDateArray}
          theme={styles.calendarTheme}
        />
      )}
      {/* {WhiteLabelConfig.APP_VARIANT_NAME == 'smavylms' && (
        <> */}
      {Boolean(todayClasses.length) && (
        <_Text
          style={{
            fontSize: 14,
            fontFamily: CommonStyles.fonts.semiBold,
            paddingBottom: 10,
          }}
        >
          {`Today's${terminologies['Class']?.pluralLabel || 'Classes'}`}
        </_Text>
      )}
      <_View style={{ maxHeight: 400 }}>
        <FlatList
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={todayClasses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClassCard
              item={item}
              cancelConfirmation={_cancelConfirmation}
              startClass={_onStartClass}
            />
          )}
        />
      </_View>
      {/* </>
      )} */}
      {showModal && (
        <CustomAlert
          visible={showModal}
          title={alertTitle}
          msg={alertMsg}
          firstBtn={'Okay'}
          firstBtnFunc={() => setShowModal(false)}
        />
      )}
      {isModalVisible && (
        <YearList
          setSelectedMonth={setSelectedMonth}
          setIsModalVisible={setIsModalVisible}
          GetEventsDetails={getClassDates}
        />
      )}
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
    </_View>
  );
};

export const AssignedClassesComponent = React.memo(AssignedClasses);
