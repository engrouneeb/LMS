import { useNavigation } from '@react-navigation/native';
import { SignleScheduleWeekViewInterface } from 'interfaces';
import moment from 'moment';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { CustomAlert, isAdmin, isInstructor, whiteThemeColors } from 'utilities';
import {
  default as ApiEndpoints,
  default as Endpoints,
} from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import {
  scheduleFailed,
  scheduleLoading,
  scheduleSuccess,
} from '../../../../../../actions/ScheduleActions';
import {
  _Screen,
  _View,
  Calendar_Strip,
  endpoint,
} from '../../../../../../components';
import ScreensNames from '../../../../../../screenNames';
import Header from '../../../../../Headers';
import Loader from '../../../../../Loader/loader';
import { AddScheduleByRange } from '../AddScheduleByRange';
import { CopyWeekSchedule } from '../CopyWeekSchedule';
import { AddSchedule } from '../ScheduleAddTime';
import { ScheduleCard } from '../ScheduleCard';
import { ScheduleOptionsModal } from '../ScheduleOptionsModal';
import { isEmptyNullUndefined } from './ScheduleWeeViewFunctions';
import { initialState, reducer, stateConstants } from './States';
import { EmptyWeek, FooterComponent } from './components';
import { styles } from './style';
import { useAppModulePermission } from '../../../../../../customHooks';

export const ScheduleWeekView: React.FC<SignleScheduleWeekViewInterface> = ({
  route,
}) => {
  const navigation: any = useNavigation();
  const { filterMenuOptions } = useAppModulePermission();
   const isCreateSchedule=filterMenuOptions("CreateSchedule");
  const {
    UserInfo: userData,
    language: { ScheduleWeekView },
    scheduleReducer: { loading, data },
  }: any = useSelector((state: Appstate) => ({
    UserInfo: state.User.UserInfo,
    language: state.language,
    scheduleReducer: {
      loading: state.scheduleReducer.loading,
      data: state.scheduleReducer.data,
    },
  }));
  const domainURL = userData.companyUrl;
  const flatlistRef: any = useRef();

  const userID = !isInstructor(userData.roleName)
    ? route.params.userID
    : userData.userID;

  const dispatch = useDispatch();
  const [state, _setState]: any = useReducer(reducer, initialState);
  const setState = (type: any, data: any) => _setState({ type, data });
  const { Get, PostSecured } = DataAccess();
  const [weekStart, setWeekStart] = useState(
    !isInstructor(userData.roleName)
      ? moment(route.params.date).startOf('week')
      : moment().startOf('week'),
  );
  const [weekDate, setWeekDate] = useState(
    !isInstructor(userData.roleName)
      ? moment(route.params.date).startOf('week')
      : moment(),
  );

  const weekDays = route.params.weekDays;

  useEffect(() => {
    if (!isInstructor(userData.roleName)) {
      if (!isEmptyNullUndefined(route.params.date)) {
        setWeekStart(moment(route.params.date).startOf('week'));
        setWeekDate(moment(route.params.date).startOf('week'));
      }
    }
    fetchData(route.params.date);
    handlePreviousWeekDates(route.params.date);
  }, []);

  useEffect(() => {
    setState(stateConstants.schedule, data.schedule);
  }, [data.schedule]);
  useEffect(() => {
    if (route.params.date != weekStart)
      setWeekStart(moment(route.params.date).startOf('week'));
  }, [route.params.date]);

  useEffect(() => {
    updateWeekDates(weekDate);
  }, [weekStart]);

  const updateWeekDates = (currentDate: any) => {
    if (!currentDate) return;
    const _dates = [];
    let date: any = moment(currentDate).startOf('week');
    date = new Date(date);
    for (let i = 0; i <= 6; i++) {
      var dd =
        i == 0
          ? new Date(date.setDate(date.getDate()))
          : new Date(date.setDate(date.getDate() + 1));

      _dates.push(dd.toISOString());
    }

    setState(stateConstants.weekDates, _dates);
  };

  const checkForEmptyWeek = (weekSchedule: any) => {
    setState(stateConstants.isWeekEmpty, true);
    weekSchedule.map((item: any) => {
      if (item.daySchedules.length > 0 || item.timeOffs != null) {
        setState(stateConstants.isWeekEmpty, false);
        return;
      }
    });
  };

  const handlePreviousWeekDates = (date: any) => {
    var givenDate = new Date(date);
    var previousWeek = new Date(
      givenDate.getFullYear(),
      givenDate.getMonth(),
      givenDate.getDate() - 7,
    );
    setState(
      stateConstants.previousWeekStartDate,
      moment(previousWeek).startOf('week'),
    );
    setState(
      stateConstants.previousWeekEndDate,
      moment(previousWeek).endOf('week'),
    );
  };

  const updateWeekDateOnWeekChange = (date: any) => {
    var givenDate = new Date(date);
    var previousWeek = new Date(
      givenDate.getFullYear(),
      givenDate.getMonth(),
      givenDate.getDate() - 7,
    );
    setState(
      stateConstants.previousWeekStartDate,
      moment(previousWeek).startOf('week'),
    );
    setState(
      stateConstants.previousWeekEndDate,
      moment(previousWeek).endOf('week'),
    );
    setWeekDate(date);
    setWeekStart(moment(date).startOf('week'));
    updateWeekDates(new Date(date));
    fetchData(date);
  };

  const changeModalState = (
    state?: any,
    date?: any,
    day?: any,
    startTime?: any,
    endTime?: any,
    scheduleID?: any,
    dayID?: any,
    selectedWageID?: any,
    dayComments?: any,
    isEdit = false,
  ) => {
    if (!isEmptyNullUndefined(date)) {
      setState(stateConstants.selectedDate, date);
    }
    setState(stateConstants.Change_Modal_State, {
      [stateConstants.selectedDayID]: day,
      [stateConstants.showModal]: state,
      [stateConstants.startTime]: startTime,
      [stateConstants.endTime]: endTime,
      [stateConstants.scheduleID]: scheduleID,
      [stateConstants.dayID]: dayID,
      [stateConstants.selectedWageID]: selectedWageID,
      [stateConstants.dayComments]: dayComments,
      [stateConstants.isEdit]: isEdit,
    });
  };

  const changeRangeModalState = (
    status: any,
    date: any,
    day: any,
    startTime = state.startTime,
    endTime = state.endTime,
    scheduleID = state.scheduleID,
    dayID = state.dayID,
    selectedWageID = state.selectedWageID,
    dayComments = state.dayComments,
    isEdit = false,
  ) => {
    if (!isEmptyNullUndefined(date)) {
      setState(stateConstants.selectedDate, date);
    }

    setState(stateConstants.Change_Range_Modal_State, {
      [stateConstants.selectedDayID]: day,
      [stateConstants.showAddByRangeModal]: status,
      [stateConstants.startTime]: startTime,
      [stateConstants.endTime]: endTime,
      [stateConstants.scheduleID]: scheduleID,
      [stateConstants.dayID]: dayID,
      [stateConstants.selectedWageID]: selectedWageID,
      [stateConstants.dayComments]: dayComments,
      [stateConstants.isEdit]: isEdit,
    });
  };

  const fetchData = (date?: any) => {
    date = date ? date : weekDate ? weekDate : moment();
    let weekStartDate = moment(date).startOf('week');
    let weekEndDate = moment(date).endOf('week');
    let url: endpoint = Endpoints.getSchedule;
    url.params = `?StartDate=${weekStartDate.toISOString()}&EndDate=${weekEndDate.toISOString()}&userId=${userID}`;
    dispatch(scheduleLoading());
    Get(url)
      .then((res: any) => {
        if (res) {
          const weekSchedule = [];
          let fullName = res.scheduleBody[0]?.userName.split(' ');
          let fName = fullName[0];
          let lName = fullName[1];
          let timeOffs = [];

          let startWeekDay = 0;
          for (
            let i = startWeekDay;
            i < res.scheduleBody[0]?.weekDays.length;
            i++
          ) {
            let daySchedules: any = [];
            if (res.scheduleBody[0].weekDays[i].dayTimeOff !== null) {
              timeOffs.push(res.scheduleBody[0].weekDays[i].dayTimeOff);
            } else {
              timeOffs.push(null);
            }

            res.scheduleBody[0]?.weekDays[i].daySchedules.map((value: any) => {
              daySchedules.push({
                checkIn: value.timeFrom,
                checkOut: value.timeTo,
                scheduleID: value.scheduleID,
                dayID: value.dayId,
                wageID: value.dayTimesheetId,
                dayComments: value.dayComments,
                userName: value.userName,
                isPublished: value.isPublished,
              });
            });

            const _s = {
              checkIn: res.scheduleBody[0]?.weekDays[i].dayName,
              daySchedules: daySchedules,
              timeOffs: timeOffs[i],
            };

            weekSchedule.push(_s);
          }
          const user = {
            fName: fName,
            lName: lName,
            schedule: weekSchedule,
          };
          checkForEmptyWeek(weekSchedule);
          dispatch(scheduleSuccess(user));
        }
      })
      .catch(() => {
        dispatch(scheduleFailed());
      });
  };

  const handleBack = () => {
    if(isInstructor(userData.roleName)){
      navigation.navigate(ScreensNames.timeTracker.name);
    } 
   else navigation.goBack();
    return true;
  };

  const setCustomAlert = (
    flag: boolean,
    title: string,
    msg: string,
    firstBtn = 'Okay',
    secondBtn = 'Cancel',
  ) => {
    setState(stateConstants.Custom_Alert, {
      [stateConstants.showAlert]: flag,
      [stateConstants.alertTitle]: title,
      [stateConstants.alertMessage]: msg,
      [stateConstants.firstBtn]: firstBtn,
      [stateConstants.secondBtn]: secondBtn,
    });
  };

  const copyPreviousWeek = () => {
    let endPoint = ApiEndpoints.CopyWeekSchedule;

    var obj = {
      selectedWeekStartDate: moment(weekDate).startOf('week'),
      selectedWeekEndDate: moment(weekDate).endOf('week'),
      copyWeekStartDate: state.previousWeekStartDate,
      copyWeekEndDate: state.previousWeekEndDate,
      userId: route.params.userID,
    };
    PostSecured(endPoint, obj).then((res: any) => {
      if (res) {
        if (res.isCopied) {
          setCustomAlert(false, 'Info', 'Schedule is copied successfully.');
          fetchData();
        } else {
          setCustomAlert(
            true,
            'Error',
            'There is no schedule available in the selected week to copy.',
            undefined,
          );
        }
      } else {
        setCustomAlert(true, 'Error', res.error_description);
      }
    });
  };

  const onCopyPreviousWeek = () => {
    setCustomAlert(
      !state.showAlert,
      'Warning',
      'Are you sure you want to copy this week schedule?',
      'Copy',
      'Cancel',
    );
  };

  const onAddWageItem = () => {
    setState(stateConstants.showOptionModal, false);
    navigation.navigate(ScreensNames.addUpdateWage.name, {
      temp: 'abc',
      UserId: route?.params?.userID,
      onClose: true,
      type: 'add wage',
    });
  };

  const handleScrollToDate = (date: any) => {
    const index = state.weekDates.findIndex(
      (item: any) =>
        moment(item).format('ddd MMM DD YYYY') ===
        moment(date).format('ddd MMM DD YYYY'),
    );
    flatlistRef.current.scrollToIndex({
      index,
    });
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          isOptionsMenu
          onPressOptionsMenu={() =>
            setState(stateConstants.showOptionModal, !state.showOptionModal)
          }
          Screen={
            loading
              ? 'Loading...'
              : data && data.fName + "'s" + ' ' + ScheduleWeekView.Schedule
          }
          GoBack={handleBack}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      {weekStart && (
        <Calendar_Strip
          weekStart={weekStart}
          updateWeekDateOnWeekChange={updateWeekDateOnWeekChange}
          handleScrollToDate={handleScrollToDate}
        />
      )}
      <_View style={[styles.scheduleBodyView]}>
        {loading ? (
          <Loader />
        ) : state.isWeekEmpty ? (
          <EmptyWeek
            handleOnCopyPreviousWeek={() => onCopyPreviousWeek()}
            handleOnCreateNewSchedule={() =>
              changeModalState(true, state.weekDates[0])
            }
          />
        ) : (
          <FlatList
            ref={flatlistRef}
            style={styles.flatListStyles}
            showsVerticalScrollIndicator={false}
            data={state.schedule}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ScheduleCard
                key={index.toString() + '0-'}
                day={weekDays[index]}
                schedule={data.schedule}
                index={index}
                dates={state.weekDates}
                changeModalState={changeModalState}
                userID={route.params.userID}
                userName={data && data.fName + ' ' + data.lName}
                domainURL={domainURL}
                setEditingEnable={() =>
                  setState(stateConstants.isScheduleEditing, true)
                }
                onPress={(date: any) => {
                  setState(stateConstants.scheduleDate, date);
                  changeModalState(true, state.weekDates[index], index);
                }}
              />
            )}
            ListFooterComponent={<FooterComponent />}
          />
        )}
      </_View>

      {state.isCopyWeekScheduleModal && (
        <CopyWeekSchedule
          showModal={state.isCopyWeekScheduleModal}
          changeModalState={() =>
            setState(
              stateConstants.isCopyWeekScheduleModal,
              !state.isCopyWeekScheduleModal,
            )
          }
          selectedWeekStartDate={state.weekDates[0]}
          selectedWeekEndDate={state.weekDates[6]}
          fetchData={fetchData}
          userID={
            isAdmin(userData.roleName) ? route.params.userID : userData.userID
          }
        />
      )}
      {state.showModal && (
        <AddSchedule
          showModal={state.showModal}
          changeModalState={changeModalState}
          selectedDate={state.selectedDate}
          selectedDayID={state.selectedDayID}
          fetchData={fetchData}
          isEdit={state.isScheduleEditing}
          startTime={state.startTime}
          endTime={state.endTime}
          scheduleID={state.scheduleID}
          dayID={state.dayID}
          userData={userData}
          navigation={navigation}
          selectedWageID={state.selectedWageID}
          description={state.dayComments}
          schedule={state.schedule}
          selectedWeekStartDate={state.weekDates[0]}
          selectedWeekEndDate={state.weekDates[6]}
          dates={state.weekDates}
          setEditingDisable={() =>
            setState(stateConstants.isScheduleEditing, false)
          }
          updateLocalState={(schedule: any) =>
            setState(stateConstants.schedule, schedule)
          }
          userID={
            isAdmin(userData.roleName) ? route.params.userID : userData.userID
          }
          userName={data && data.fName + ' ' + data.lName}
          domainURL={domainURL}
        />
      )}
      {state.showAddByRangeModal && isCreateSchedule&&(
        <AddScheduleByRange
          showModal={state.showAddByRangeModal}
          changeModalState={changeRangeModalState}
          selectedDate={state.selectedDate}
          selectedDayID={state.selectedDayID}
          fetchData={fetchData}
          isEdit={state.isEdit}
          startTime={state.startTime}
          endTime={state.endTime}
          scheduleID={state.scheduleID}
          dayID={state.dayID}
          userData={userData}
          navigation={navigation}
          selectedWageID={state.selectedWageID}
          description={state.dayComments}
          schedule={state.schedule}
          selectedWeekStartDate={state.weekDates[0]}
          selectedWeekEndDate={state.weekDates[6]}
          dates={state.weekDates}
          updateLocalState={(schedule: any) =>
            setState(stateConstants.schedule, schedule)
          }
          userID={
            isAdmin(userData.roleName) ? route.params.userID : userData.userID
          }
          userName={data && data.fName + ' ' + data.lName}
          domainURL={domainURL}
        />
      )}

     {isCreateSchedule&& <ScheduleOptionsModal
        modalVisible={state.showOptionModal}
        setModalVisible={() =>
          setState(stateConstants.showOptionModal, !state.showOptionModal)
        }
        handleCopyWeekScheduleModal={() =>
          setState(
            stateConstants.isCopyWeekScheduleModal,
            !state.isCopyWeekScheduleModal,
          )
        }
        handleCopyPreviousWeek={onCopyPreviousWeek}
        handleAddWageItem={onAddWageItem}
        showAddWageItem={isAdmin(userData.roleName)}
        onPressByRange={() => {
          setState(stateConstants.showOptionModal, false);
          changeRangeModalState(true, state.weekDates[0], 0);
        }}
      />}
      {state.showAlert && (
        <CustomAlert
          visible={state.showAlert}
          title={state.alertTitle}
          msg={state.alertMessage}
          firstBtn={state.firstBtn ? state.firstBtn : 'Okay'}
          firstBtnFunc={() => {
            state.firstBtn === 'Copy' && copyPreviousWeek();
            state.alertTitle == 'Error' &&
              setState(stateConstants.showAlert, false);
          }}
          secondBtn={state.secondBtn ? state.secondBtn : 'No'}
          secondBtnFunc={() => {
            setState(stateConstants.showAlert, false);
          }}
        />
      )}
    </_Screen>
  );
};
