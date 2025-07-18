import { endpoint } from '../../components';
import moment from 'moment';
import { FC, useEffect, useReducer, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  Platform,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import InAppBrowser from 'react-native-inappbrowser-reborn';
import { useDispatch, useSelector } from 'react-redux';
import CommonStyles from '../CommonStyles';
import { ParentChildrenInDashboard } from '../Dashboard/Components';
import { _ActivityIndicator } from '../Loader';
import {
  convertUTCDateToLocalDateStringFormat,
  CustomAlert,
  getTerminologyLabel,
  isAdmin,
  isCoordinator,
  isExecutive,
  isInstructor,
  isPortrait,
  TerminologyMap,
  whiteThemeColors,
} from '../../Utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import {
  StartCalimaticOnlineClass,
  saveOnlineClass,
  startMeeting,
} from '../../actions/CoursePlayerAction';
import { alertHide } from '../../actions/CustomAlert';
import {
  ms_calenderFailed,
  ms_calenderLoading,
  ms_calenderSuccess,
} from '../../actions/MS_DasboardCalenderActions';
import { _Screen, _Text, _VectorIcons, _View } from '../../components';
import { ClassNotStartedModal } from '../../components/ClassNotStartedModal';
import { ClassTypesConstants, NotificationReminder } from '../../constants';
import { useMeetingLogoutHook } from '../../customHooks';
import { Props } from '../../interfaces';
import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import { Appstate } from '../../reducers/Appstate';
import { StartClass } from '../CoursePlayer';
import CstHeader from '../Headers';
import Search from '../Search';
import { SendReminderNotifications } from './Functions';
import { initialState, reducer, stateConstants } from './State';
import CalendarHeader from './components/CalendarHeader';
import ClassCard from './components/ClassCard';
import { ClassDetailsModal } from './components/ClassDetailsModal';
import { styles } from './style';

export const CalendarScreen: FC<Props> = (props) => {
  const { JoinClass, startZoomMeeting } = useMeetingLogoutHook();
  const [state, setState] = useReducer(reducer, initialState);
  const _setState = (type: any, data: any) => setState({ type, data });
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const { courseContentScreen } = useSelector(
    (state: Appstate) => state.language,
  );
  const [isVisible, setisVisible] = useState(false);
  const { show, message } = useSelector((state: Appstate) => state.CustomAlert);

  const domainUrl: any = useSelector(
    (state: Appstate) => state?.User?.UserInfo?.companyUrl,
  );
  let screenHeight = Dimensions.get('window').height;
  const dispatch = useDispatch<any>();
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

  function onValueChange(value: any) {
    _setState(stateConstants.STUDENT_ID, value?.id);
  }
  const onAndroidBack = () => {
    props.navigation.navigate(DrawerScreens.dashboard.name);
    return true;
  };
  const { Get } = DataAccess();
  const setShowDetailsModal = (hideModal: boolean) => {
    _setState(stateConstants.SHOW_DETAILS_MODAL, hideModal);
  };
  const setClassStartedModal = (hideModal: boolean) => {
    _setState(stateConstants.CLASS_STARTED_MODAL, hideModal);
  };
  const setActive = (name: string) => {
    _setState(stateConstants.ACTIVE, name);
  };
  useEffect(() => {
    _setState(stateConstants.SHOW_ALERT_MESSAGE, {
      [stateConstants.ALERT_TITLE]: 'Error',
      [stateConstants.ALERT_MODAL_VISIBLE]: true,
      [stateConstants.ALERT_MESSAGE]: message,
    });
  }, [show, message]);

  useEffect(() => {
    // if (state.studentId) {
    //   getClassDates(new Date(state.selectedMonth).toISOString());
    // }
    getClassDates(new Date(state.selectedMonth).toISOString());
  }, [state.studentId]);

  useEffect(() => {
    const subs = Dimensions.addEventListener('change', () => {
      _setState(stateConstants.IS_LANDSCAPE, isPortrait());
    });
    return () => subs.remove();
  });
  const _showDetailsOnDay = (
    date: string,
    skip: number = 0,
    isIntial: boolean = false,
  ) => {
    if (state.requestCompleted == false) {
      return;
    }
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    let selected_date = new Date(year, month, day);
    var classIds = _filterClassId(date);
    if (classIds !== undefined) {
      var EndPoint: endpoint = ApiEndpoints.getAssignClassesDetails;
      EndPoint.params = `?clsIds=${classIds}&selectedDate=${selected_date.toISOString()}&take=${10}&skip=${skip}`;
      dispatch(ms_calenderLoading());
      _setState(stateConstants.FOOTER_LOADER, true);
      Get(EndPoint)
        .then((res: any) => {
          _setState(stateConstants.REQUEST_COMPLETED, true);
          if (!res) {
            _setState(stateConstants.ERROR, {
              [stateConstants.SKIP]: 0,
              [stateConstants.ALERT_FIRST_BTN]: 'Okay',
              [stateConstants.ALERT_SECOND_BTN]: '',
              [stateConstants.ALERT_TITLE]: 'Error',
              [stateConstants.ALERT_MODAL_VISIBLE]: true,
              [stateConstants.ALERT_MESSAGE]: res.error_description,
            });
          } else {
            if (res.length > 0) {
              _setState(stateConstants.SET_DATA, res);
              !isIntial && _setState(stateConstants.SKIP, state.skip + 10);
              return dispatch(ms_calenderSuccess(res));
            }
            _setState(stateConstants.SELECTED_DAY, date);
          }
        })
        .catch((err: any) => {
          _setState(stateConstants.LOADINGS_DATES, false);
          return dispatch(ms_calenderFailed());
        })
        .finally(() => {
          _setState(stateConstants.LOADING, false);
          _setState(stateConstants.FOOTER_LOADER, false);
        });
    } else {
      _setState(stateConstants.LOADING, false);
      _setState(stateConstants.FOOTER_LOADER, false);
      _setState(stateConstants.LOADINGS_DATES, false);
      _setState(stateConstants.SET_NO_DATA, {});
      _setState(
        stateConstants.ALERT_MESSAGE,
        `No ${terminologies['Class']?.label} assigned in the selected date.`,
      );
    }
  };

  const _filterClassId = (date: String) => {
    var filteredClassId;
    const { datesWithClasses } = state;
    datesWithClasses.length > 0 &&
      datesWithClasses.filter((element: any) => {
        if (element.activeDateStr == date) {
          filteredClassId = element.clsIds;
        }
      });
    return filteredClassId;
  };
  const changePressedDayColor = (date: any) => {
    let classesDates = state.classDateArray;
    delete classesDates[state.previousSelectedDate];
    for (const property in classesDates) {
      if (property == date) {
        classesDates[property].selectedColor = whiteThemeColors.primary;
        classesDates[property].selected = true;
        classesDates[property].marked = true;
        classesDates[property].selectedDotColor = whiteThemeColors.white;
      } else {
        var day = new Date(property).getDay();
        classesDates[property].selected = false;
        classesDates[property].selectedDotColor = whiteThemeColors.primary;
        classesDates[property].marked = true;
      }
    }
    if (!(date in classesDates)) {
      classesDates[date] = {
        marked: true,
        selected: true,
        selectedColor: whiteThemeColors.primary,
      };

      classesDates[date].selectedColor = whiteThemeColors.primary;
      _setState(stateConstants.PREVIOUS_SELECTED_DATE, date);
    }
    _setState(stateConstants.CLASS_DATE_ARRAY, state.classDateArray);
  };
  useEffect(() => {
    let todayDate = moment(new Date(state.selectedMonth)).format('yyyy-MM-DD');
    _setState(stateConstants.MODAL_DATA, []);
    _setState(stateConstants.SELECTED_DAY, todayDate);
    _showDetailsOnDay(todayDate, 0, true);
  }, [state.datesWithClasses]);

  const getClassDates = async (month: string) => {
    var EndPoint: endpoint = ApiEndpoints.getAssignClassesDates;
    EndPoint.params = `?UserId=${state.studentId}&date=${month}`;  
    EndPoint.token = props.userToken;
    _setState(stateConstants.LOADINGS_DATES, true);
    Get(EndPoint)
      .then((res: any) => {
        // if (state.studentId == null) {
        //   res?.childList.length > 0 && setActive(res?.childList[0].name);
        // }
        if (res.activeDates.length > 0) handelDateList(res, new Date(month));
        else {
          let day = moment(new Date(month)).format('yyyy-MM-DD');
          let dateObject = {
            [day]: {
              selected: true,
              marked: true,
              selectedDotColor: whiteThemeColors.primary,
              selectedColor: whiteThemeColors.primary,
            },
          };
          res?.childList.length > 0 &&
            _setState(stateConstants.CHILDREN, res?.childList);
          _setState(stateConstants.DATE_DATA, {
            [stateConstants.DATES_WITH_CLASSES]: res.activeDates,
            [stateConstants.CLASS_DATE_ARRAY]: dateObject,
          });
        }
      })
      .catch((err: any) => {
        return;
      })
      .finally(() => {});
  };

  function areDatesInSameMonth(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  }

  const handelDateList = async (res: any, month: Date) => {
    // let currentDate = moment(new Date()).format('yyyy-MM-DD');
    let currentDate = moment(
      convertUTCDateToLocalDateStringFormat(month),
      'MMM DD, YYYY',
    ).format('YYYY-MM-DD');
    let fistDate = moment(new Date(month)).format('yyyy-MM-DD');
    let dateObject;
    var dateList = res.activeDates.map((Obj) => Obj.activeDateStr);
    let y = new Date(state.selectedMonth).getFullYear();
    let m = new Date(state.selectedMonth).getMonth();
    let day: any = moment(new Date(y, m + 1, 1));
    let day2: any = moment(new Date(y, m - 1, 1));
    let firstDay = moment(new Date(day)).format('yyyy-MM-DD');
    let secondDay = moment(new Date(day2)).format('yyyy-MM-DD');
    dateObject = Object.fromEntries(
      dateList.map((year: any) => {
        var dayName = new Date(year).getDay();
        return [
          year,
          {
            selected: false,
            marked: true,
            color: whiteThemeColors.primary,
            selectedDotColor: whiteThemeColors.primary,
          },
        ];
      }),
    );
    dateObject[currentDate] = {
      marked: true,
      selected: true,
      selectedColor: whiteThemeColors.primary,
      selectedDotColor: whiteThemeColors.white,
    };

    if (!areDatesInSameMonth(new Date(fistDate), new Date(currentDate))) {
      if (!(fistDate in dateObject)) {
        dateObject[fistDate] = {
          marked: true,
          selected: true,
          selectedDotColor: whiteThemeColors.white,
        };
      }
    }
    res?.childList.length > 0 &&
      _setState(stateConstants.CHILDREN, res?.childList);
    _setState(stateConstants.DATE_DATA, {
      [stateConstants.DATES_WITH_CLASSES]: res.activeDates,
      [stateConstants.CLASS_DATE_ARRAY]: dateObject,
    });
  };
  const _setDate = (date: string) => {
    let y = new Date(date).getFullYear();
    let m = new Date(date).getMonth();
    let firstDay: any = new Date(y, m, 1);

    _setState(stateConstants.INTITIAL_LOAD, false);
     let currentDate = new Date();

    if (!areDatesInSameMonth(firstDay, currentDate)) {
      _setState(
        stateConstants.SELECTED_MONTH,
        firstDay.toISOString(),
      );

      getClassDates(firstDay.toISOString());
    } else {
      currentDate.setHours(0, 0, 0, 0);
      _setState(
        stateConstants.SELECTED_MONTH,
        new Date(currentDate).toISOString(),
      );
      getClassDates(currentDate.toISOString());
    }
  };

  const _onCancelClass = () => {
    _setState(stateConstants.SHOW_CANCEL_CLASS_ALERT, {
      [stateConstants.SHOW_DETAILS_MODAL]: false,
      [stateConstants.ALERT_TITLE]: 'Warning',
      [stateConstants.ALERT_FIRST_BTN]: 'Yes',
      [stateConstants.ALERT_SECOND_BTN]: 'No',
      [stateConstants.ALERT_MODAL_VISIBLE]: true,
      [stateConstants.ALERT_MESSAGE]: `Are you sure you want to cancel this ${terminologies['Class']?.label}?`,
      [stateConstants.DELETE_POPUP]: true,
    });
  };

  const handleChangeType = (type: String) => {
    switch (type) {
      case 'Zoom':
        _setState(stateConstants.ONLINE_CLASS_TYPE, ClassTypesConstants.Zoom);
        break;
      case 'Google Meet':
        _setState(
          stateConstants.ONLINE_CLASS_TYPE,
          ClassTypesConstants.GoogleMeet,
        );
        break;
      default:
        _setState(
          stateConstants.ONLINE_CLASS_TYPE,
          ClassTypesConstants.VariantName,
        );
    }
  };
  const handleSaveClass = (data: { classId: Number }) => {
    let url: String = '';
    if (state.onlineClassType === ClassTypesConstants.GoogleMeet) {
      url = state.hangoutUrl;
      if (!url) {
        Alert.alert('Please enter a valid url');
        return;
      }
    }
    dispatch(saveOnlineClass(data.classId, state.onlineClassType, url)).then(
      (res: any) => {
        if (res) {
          Alert.alert('Success', 'Record saved successfully');
        }
      },
    );
  };

  const handleStartClass = async (
    data:
      | {
          className: String;
          classId: Number;
        }
      | any,
  ) => {
    if (state.onlineClassType === ClassTypesConstants.VariantName) {
      let response: any = await dispatch(
        StartCalimaticOnlineClass(
          data.className,
          data.classId,
          user?.companyUrl,
        ),
      );
      if (response.isApiError === true) {
        Alert.alert(
          `There is an error while starting the ${terminologies['Class']?.label} please try again later!`,
        );
      } else if (response.isException === true) {
        Alert.alert('There is an issue while connecting with the server!');
      } else {
        openApp(response.joinUrl);
        SendReminderNotifications(
          data,
          NotificationReminder.OnlyInstuctorJoined,
        );
        _setState(stateConstants.START_CLASS, false);
      }
    } else if (state.onlineClassType === ClassTypesConstants.Zoom) {
      dispatch(startMeeting(data.classId, data.className)).then((res: any) => {
        if (!res.isSuccessful) {
          Alert.alert(res?.meetingFailure?.message);
          _setState(stateConstants.START_CLASS, false);
          _setState(stateConstants.MEETING_FAILURE, {
            [stateConstants.ALERT_MESSAGE]: res?.meetingFailure?.message,
            [stateConstants.ALERT_TITLE]: 'Error',
          });
        } else {
          startZoomMeeting(res);
          _setState(stateConstants.START_CLASS, false);
        }
      });
    } else {
      _setState(stateConstants.START_CLASS, false);
      if (state.hangoutUrl != '') {
        openApp(state.hangoutUrl);
      } else {
        if (Platform.OS === 'ios') {
          Alert.alert(courseContentScreen.PleaseEnterYourHangoutUrl);
        } else {
          _setState(stateConstants.MEETING_FAILURE, {
            [stateConstants.ALERT_MESSAGE]:
              courseContentScreen.PleaseEnterYourHangoutUrl,
            [stateConstants.ALERT_TITLE]: 'Enter Url',
          });
        }
      }
    }
  };

  const openApp = async (url: string) => {
    InAppBrowser.close();
    Linking.canOpenURL(url).then(async (supported) => {
      if (!supported) {
        _setState(stateConstants.ALERT_TITLE, 'Error');
      } else if (await InAppBrowser.isAvailable()) {
        InAppBrowser.open(url, {
          dismissButtonStyle: 'done',
          preferredBarTintColor: whiteThemeColors.primary,
          preferredControlTintColor: 'white',
          animated: true,
          modalPresentationStyle: 'fullScreen',
          //for android
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
    });
  };

  const _CancelClass = async () => {
    var EndPoint: endpoint = ApiEndpoints.DoCanel;
    const { selectedItem } = state;
    EndPoint.params = `?ClassorBatchId=${
      selectedItem?.classId
    }&isBatch=${false}&TimeId=${selectedItem?.timingId}&Date=${new Date(
      state.selectedDay,
    ).toDateString()}&MakeUpClassId=${selectedItem?.makeupClassId}`;
    _setState(stateConstants.LOADINGS_DATES, true);
    const res = await Get(EndPoint);
    if (!res) {
      Alert.alert(res.error_description);
    }
    _setState(stateConstants.MODAL_DATA, []);
    _showDetailsOnDay(
      moment(new Date(state.selectedMonth)).format('yyyy-MM-DD'),
    );
    _setState(stateConstants.LOADINGS_DATES, false);
  };

  const _onStartClass = () => {
    // handleOnlineClass(selectedItem?.classId);
    _setState(stateConstants.SHOW_DETAILS_MODAL, false);
    handleOnlineClass(state.selectedItem.classId);
  };

  const handleOnlineClass = (classId: Number | undefined) => {
    if (
      isAdmin(user?.roleName) ||
      isInstructor(user?.roleName) ||
      isExecutive(user?.roleName) ||
      isCoordinator(user?.roleName)
    ) {
      var EndPoint: endpoint = ApiEndpoints.GetCourseOnlineClass;
      EndPoint.params = `?ClassID=${classId}&Url=${domainUrl}`;
      Get(EndPoint).then((response: any) => {
        _setState(stateConstants.HANDLE_START_ONLINE_CLASS, {
          [stateConstants.CLASS_DETAIL]: response,
          [stateConstants.ONLINE_CLASS_TYPE]: response.onlineClassType,
          [stateConstants.HANGOUT_URL]: response.classUrl,
          [stateConstants.START_CLASS]: true,
        });
      });
    } else {
      JoinClass(classId, setClassStartedModal, state.classStartedModal);
      if (state.classStartedModal) {
        _setState(stateConstants.SHOW_ALERT_MESSAGE, {
          [stateConstants.ALERT_MODAL_VISIBLE]: true,
          [stateConstants.ALERT_TITLE]: 'Error',
          [stateConstants.ALERT_MESSAGE]: message,
        });
      }
      return;
    }
  };

  const onChangeText = (data: any) => {
    let array = [];
    data.forEach((element: any) => {
      array.push(element);
    });
    _setState(stateConstants.MODAL_DATA, data);
  };

  const selectClass = (item: any) => {
    // here need to call api for getting latest info of class
    const { classId, timingId, makeupClassId } = item;
    var EndPoint: endpoint = ApiEndpoints.RequestMakeupOrCancelStatus;
    EndPoint.params = `?classId=${classId}&classTimeSlotId=${timingId}&clickedDate=${
      state.selectedDay
    }&makeupClassID=${makeupClassId ?? 0}`;
    EndPoint.token = props.userToken;
    let requestMakeupOrCancelClass = {};
    Get(EndPoint)
      .then((res: any) => {
        requestMakeupOrCancelClass = res;
      })
      .catch((err: any) => {
        console.log('====================================');
        console.log({ err });
        console.log('====================================');
      })
      .finally(() => {
        _setState(stateConstants.SELECT_CLASS, {
          [stateConstants.SHOW_DETAILS_MODAL]: true,
          [stateConstants.SELECTED_ITEM]: item,
          [stateConstants.CLASS_DETAIL]: item,
          [stateConstants.REQUEST_MAKEUP_OR_CANCEL_CLASS]:
            requestMakeupOrCancelClass,
        });
      });
  };
  return (
    <_Screen
      header={
        <CstHeader
          isBack={false}
          isMenu={true}
          isSearchBtn
          OpenSearch={() => {
            setisVisible(true);
          }}
          OpenMenu={() => {
            props.navigation.toggleDrawer();
          }}
          Screen={'Calendar'}
          isLogout={false}
        />
      }
      onAndroidBack={onAndroidBack}
      hideTopSafeArea
      bottomSafeAreaColor={whiteThemeColors.white}
      flex={1}
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={state.modalDataSearch}
          searchKey='className'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={'position'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          // showsVerticalScrollIndicator={false}
          // scrollEnabled={state.isLandscape}
          style={{ height: screenHeight, paddingBottom: 40 }}
        >
          <_View
            style={{
              paddingBottom: 5,
            }}
          >
            <ParentChildrenInDashboard
              children={state.children}
              onSelect={onValueChange}
              active={state.active}
              setactive={setActive}
            />
          </_View>
          <Calendar
            hideExtraDays
            customHeader={(headerProps: any) => (
              <CalendarHeader headerProps={headerProps} />
            )}
            current={state.selectedMonth}
            style={styles.calendar}
            onDayPress={(day) => {
              if (day.dateString === state.selectedDay) return;
              _setState(stateConstants.ON_DAY_PRESS, {
                [stateConstants.LOADINGS_DATES]: true,
                [stateConstants.MODAL_DATA]: [],
                [stateConstants.MODAL_DATA_SEARCH]: [],
                [stateConstants.SKIP]: 0,
                [stateConstants.INTITIAL_LOAD]: [],
                [stateConstants.SELECTED_DAY]: day.dateString,
              });
              changePressedDayColor(day.dateString);
              _showDetailsOnDay(day.dateString);
            }}
            onVisibleMonthsChange={(monthChanges) => {
              _setDate(new Date(monthChanges[0].dateString).toISOString());
            }}
            markedDates={state.classDateArray}
            theme={{
              todayTextColor: whiteThemeColors.primary,
              todayBackgroundColor: whiteThemeColors.white,
              textSectionTitleColor: whiteThemeColors.primary,
              selectedDayBackgroundColor: whiteThemeColors.primary,
              textDayHeaderFontFamily: CommonStyles.fonts.regular,
              selectedDayTextColor: whiteThemeColors.white,
              dayTextColor: whiteThemeColors.primary,
              textDayStyle: {
                fontFamily: CommonStyles.fonts.bold,
                color: whiteThemeColors.primary,
                textSize: 16,
                fontWeight: '500',
              },
              selectedDotColor: whiteThemeColors.primary,
              dotColor: whiteThemeColors.primary,
              // arrowColor: whiteThemeColors.greyDark,
              monthTextColor: whiteThemeColors.primary,
              indicatorColor: whiteThemeColors.primary,
              textMonthFontFamily: CommonStyles.fonts.semiBold,
              textDayFontSize: 13,
              textDayFontFamily: CommonStyles.fonts.semiBold,
              textMonthFontSize: 13,
              textDayHeaderFontSize: 12,
              textDayHeaderFontWeight: 'bold',
              backgroundColor: 'transparent', // Set your desired background color here
              calendarBackground: 'transparent',
              'stylesheet.day.basic': {
                base: {
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: -4,
                  borderRadius: 15,
                  backgroundColor: whiteThemeColors.white,
                  shadowColor: '#000',
                  elevation: 4,
                  shadowOpacity: 0.09,
                  shadowRadius: 3 * 1,
                  shadowOffset: {
                    height: 3 * 1,
                    width: 3 * 1,
                  },
                },
              },

              'stylesheet.calendar.header': {
                week: {
                  marginTop: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                },
                monthText: {
                  fontSize: 12,
                  fontFamily: CommonStyles.fonts.medium,
                },
              },
            }}
          />
          <_View style={styles.innerContainer}>
            <_Text
              style={{ fontSize: 14, fontFamily: CommonStyles.fonts.semiBold }}
            >
              {state.initialLoad
                ? `Today's ${terminologies['Class']?.pluralLabel}`
                : `${terminologies['Class']?.pluralLabel}`}
            </_Text>
            <_Text style={styles.selectedDay}>{state.selectedDay}</_Text>
          </_View>
          {state.loadingsDate ? (
            <_ActivityIndicator />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              data={state.modalData}
              contentContainerStyle={{ marginBottom: 120 }}
              renderItem={({ item, index }) => (
                <ClassCard
                  item={item}
                  onPress={(item) => {
                    selectClass(item);
                  }}
                />
              )}
              keyExtractor={(item) => item.id}
              onEndReached={({ distanceFromEnd }) => {
                if (state.requestCompleted) {
                  _showDetailsOnDay(state.selectedDay, state.skip);
                }
                if (distanceFromEnd < 0)
                  _setState(
                    stateConstants.REQUEST_COMPLETED,
                    !state.requestCompleted,
                  );
              }}
              style={{
                marginBottom: 10,
              }}
              ListFooterComponent={() => {
                return (
                  <_View style={styles.listFooter}>
                    {state.footerLoader ? (
                      <_ActivityIndicator
                        color={whiteThemeColors.primary}
                        // showText={false}
                      />
                    ) : null}
                  </_View>
                );
              }}
              onEndReachedThreshold={0.9}
              ListEmptyComponent={() => (
                <_View style={styles.listEmptyContainer}>
                  <_VectorIcons
                    name={'clipboard'}
                    type={'Entypo'}
                    size={60}
                    color={whiteThemeColors.primary + 50}
                  />
                  <_Text style={styles.emptyListText}>
                    {state.alertMessage}
                  </_Text>
                </_View>
              )}
            />
          )}
          {/* </_View> */}
        </ScrollView>
        {state.alertModalVisible && (
          <CustomAlert
            visible={state.alertModalVisible}
            title={state.alertTitle}
            msg={state.alertMessage}
            firstBtn={state.alertFirstBtn}
            secondBtn={state.alertSecondBtn.length > 0 && state.alertSecondBtn}
            firstBtnFunc={() => {
              dispatch(alertHide());
              if (state.deletePopup) {
                console.log('_CancelClass');
                _CancelClass();
              }
              _setState(stateConstants.ALERT_MODAL_VISIBLE, false);
            }}
            secondBtnFunc={() => {
              _setState(stateConstants.HIDE_DELETE_ALERT, {
                [stateConstants.ALERT_MODAL_VISIBLE]: false,
                [stateConstants.DELETE_POPUP]: false,
              });
            }}
          />
        )}

        {state.showDetailsModal && (
          <ClassDetailsModal
            modalVisible={state.showDetailsModal}
            setModalVisible={setShowDetailsModal}
            selectedItem={state.selectedItem}
            onCancelClass={_onCancelClass}
            onStartClass={_onStartClass}
            selectedDate={state.selectedDay}
            makeupCancelClassStatus={state.requestMakeupOrCancelClass}
          />
        )}

        <StartClass
          onChangeUrl={(url) => _setState(stateConstants.HANGOUT_URL, url)}
          onChange={(type) => handleChangeType(type)}
          onClose={() => _setState(stateConstants.START_CLASS, false)}
          onSaveClass={(data) => handleSaveClass(data)}
          onStartClass={(data) => handleStartClass(data)}
          classId={state.selectedItem?.classId}
          showModal={state.startClass}
          data={state.classDetail}
        />
        {state.classStartedModal && (
          <ClassNotStartedModal
            visible={state.classStartedModal}
            setVisible={setClassStartedModal}
            handleOnlineClass={handleOnlineClass}
            selectedClassId={state.selectedItem?.classId}
          />
        )}
      </KeyboardAvoidingView>
    </_Screen>
  );
};
