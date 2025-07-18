import {
  AddScheduleByRangeInterface,
  MultiScheduleDataType,
  MultiScheduleResponseType,
  UserType,
} from '../../../../../../interfaces';
import moment from 'moment';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../../../../reducers/Appstate';
import {
  CustomAlert,
  DateTimePickerIos,
  isInstructor,
  whiteThemeColors,
} from '../../../../../../Utilities';
import ApiEndPoints from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import { scheduleSuccess } from '../../../../../../actions/ScheduleActions';
import { adminScheduleSuccess } from '../../../../../../actions/ScheduleAdminAction';
import {
  _Text,
  _TextInput,
  _View,
  endpoint,
} from '../../../../../../components';
import Header from '../../../../../Headers';
import Loader from '../../../../../Loader/loader';
import RequestCoverView from '../RequestCoverView';
import {
  _getWages,
  checkDayExists,
  checkDayIndexExists,
  checkScheduleExistence,
  findIndex,
  getDateDuration,
  getSelectedWeekDaysIndexes,
  getTimeDuration,
  handleClickOnDate,
  handleClickOnTime,
  handleTimeConfirm,
  validateForm,
} from './AddScheduleByRangeFunctions';
import { StateConstants, initialState, reducer } from './States';
import { ApplyForItem, WeekButtons } from './components';
import { DateTime } from './components/DateTime';
import { styles } from './style';
let _selectedDays: any = [];
const selectedDaysIndexes: any = [];

const AddScheduleByRange: React.FC<AddScheduleByRangeInterface> = ({
  navigation,
  updateLocalState,
  userID,
  userName,
  domainURL,
  isEdit,
  startTime,
  schedule,
  scheduleID,
  selectedDate,
  selectedDayID,
  selectedWageID,
  showModal,
  dates,
  dayID,
  description,
  endTime,
  changeModalState,
  fetchData,
}) => {
  const [state, setState] = useReducer(reducer, initialState);
  const [IsVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const _setState = (type: any, data: any) => setState({ type, data });
  const [mode, setmode] = useState('date');
  const currentUser: any = useSelector(
    (state: Appstate) => state.scheduleReducer.data,
  );
  const DATA: any = useSelector(
    (state: Appstate) => state.adminScheduleReducer.data,
  );
  const selectedLanguage: any = useSelector(
    (state: Appstate) => state.language,
  );
  const { ScheduleWeekView } = selectedLanguage;
  const userData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const dispatch = useDispatch();
  const { Get, PostSecured } = DataAccess();
  useEffect(() => {
    _setState(StateConstants.selectedDays, []);
    _setState(StateConstants.assignProps, {
      [StateConstants.startTime]: isEdit ? startTime : '09:00 AM',
      [StateConstants.endTime]: isEdit ? endTime : '10:00 AM',
      [StateConstants.description]: isEdit ? description : '',
      [StateConstants.selectedDate]: selectedDate,
      [StateConstants.selectedDay]: selectedDayID,
      [StateConstants.dayID]: scheduleID,
    });
    fetchWages();
  }, []);

  const fetchWages = () => {
    const { ScheduleWeekView } = selectedLanguage;
    let _url: endpoint = ApiEndPoints.getUserWages;
    _url.params = `?userId=${userID}`;
    Get(_url)
      .then((wages: any) => {
        if (wages.length > 0) {
          _getWages(wages, _setState, ScheduleWeekView, selectedWageID);
        } else {
          _getWages(wages, _setState, ScheduleWeekView, selectedWageID);
          _setState(StateConstants.handleAlert, {
            [StateConstants.showAlert]: true,
            [StateConstants.alertTitle]: 'Warning',
            [StateConstants.alertMessage]:
              ScheduleWeekView.YouMustAddedWageForYourSchedule,
          });
        }
      })
      .catch(() => {
        _setState(StateConstants.handleAlert, {
          [StateConstants.showAlert]: true,
          [StateConstants.alertTitle]: ScheduleWeekView.Error,
          [StateConstants.alertMessage]:
            ScheduleWeekView.CannotGetWagesAtMoment,
        });
      });
  };

  const handleDaySelection = (dayIndex: any, day: any) => {
    let existingDayIndex = checkDayIndexExists(selectedDaysIndexes, dayIndex);
    let existingDay = checkDayExists(_selectedDays, day.day);
    if (existingDayIndex === dayIndex) {
      let ind = findIndex(selectedDaysIndexes, day);
      selectedDaysIndexes.splice(ind, 1);
    } else {
      selectedDaysIndexes.push(dayIndex);
    }
    if (existingDay === day.day) {
      let ind = _selectedDays.findIndex(function (el: any) {
        return el === day.day;
      });
      _setState(day.key, false);
      _selectedDays.splice(ind, 1);
    } else {
      _setState(day.key, true);
      _selectedDays.push(day.day);
    }

    _setState(StateConstants.selectedDays, _selectedDays);
  };

  const RenderWeekButtons = () => {
    return (
      <Fragment>
        {moment.weekdays().map((day, index) => {
          let _existingDay: string | undefined = state.selectedDays.find(
            function (el: string) {
              return el === day;
            },
          );

          return (
            <WeekButtons
              _existingDay={_existingDay}
              day={{ day: day, key: `is${day}On` }}
              index={index}
              handleDaySelection={handleDaySelection}
            />
          );
        })}
      </Fragment>
    );
  };

  const postMultipleSchedulesIntoDB = (
    data: MultiScheduleDataType,
    day_id: number | string,
  ) => {
    PostSecured(ApiEndPoints.SaveMultipleSchedules, data)
      .then((res: MultiScheduleResponseType) => {
        if (res.item1) {
          if (!isInstructor(userData.roleName) && isEdit == false) {
            let _localSchedule: any = schedule;
            let day_schedules: any = _localSchedule[selectedDayID].daySchedules;
            if (day_schedules.filter((x: any) => x.dayID == day_id)[0])
              day_schedules.filter((x: any) => x.dayID == day_id)[0].dayID =
                res.item2;
            _localSchedule[selectedDayID].daySchedules = day_schedules;
            updateLocalState(_localSchedule);
          }
          if (isInstructor(userData.roleName)) {
            Alert.alert(
              'Sucess',
              'Your schedule has been saved. You can see your schedule, once the administrator approves it.',
            );
          }
          if (state.isRangeEnable) {
            changeModalState(false);
            fetchData();
          }
          changeModalState(false);
        } else if (res.item1 === false) {
          fetchData();
          _setState(StateConstants.handleAlert, {
            [StateConstants.showAlert]: true,
            [StateConstants.alertTitle]: ScheduleWeekView.Error,
            [StateConstants.alertMessage]: res.item3,
          });

          return;
        }
      })
      .catch(() => {
        fetchData();
        _setState(StateConstants.handleAlert, {
          [StateConstants.showAlert]: true,
          [StateConstants.alertTitle]: ScheduleWeekView.Error,
          [StateConstants.alertMessage]: ScheduleWeekView.SomethingWentWrong,
        });

        return;
      });
    setLoading(false);
    // dispatch(loading(false));
  };

  const handleFormSubmission = () => {
    let user: UserType = {
      fName: '',
      lName: '',
      schedule: [],
    };
    let updatedSchedule = [];
    if (validateForm(state, _setState, ScheduleWeekView)) return;
    let day_id = isEdit === true ? dayID : 0;
    const currentWeekDates = [];
    for (let i = 0; i < dates.length; i++)
      currentWeekDates.push(moment(dates[i]).format('MMM DD YY'));

    if (state.isRangeEnable) {
      let selectedWeekDays = getSelectedWeekDaysIndexes(
        currentWeekDates,
        state.startDate,
        state.endDate,
      );
      let _localSchedule = schedule;
      for (let j = 0; j < selectedWeekDays.length; j++) {
        checkScheduleExistence(
          state,
          _localSchedule[selectedWeekDays[j]].daySchedules,
          _setState,
        );
      }
    } else {
      let _localSchedule = schedule;
      let day_schedules = _localSchedule[selectedDayID].daySchedules;
      day_schedules = isEdit
        ? day_schedules.filter((x: any) => x.dayID !== day_id)
        : day_schedules;
      checkScheduleExistence(state, day_schedules, _setState);
    }

    let data: any = null;
    if (state.isRangeEnable) {
      let selectedWeekDays = getSelectedWeekDaysIndexes(
        currentWeekDates,
        state.startDate,
        state.endDate,
      );
      if (!isInstructor(userData.roleName)) {
        const _localSchedule = schedule;
        for (let j = 0; j < selectedWeekDays.length; j++) {
          let day_schedules = _localSchedule[selectedWeekDays[j]].daySchedules;
          day_schedules.push({
            dayID: 0,
            checkIn: state.startTime,
            checkOut: state.endTime,
            dayComments: state.description,
            wageID: state.wages[state.applyForItem].value,
          });
          _localSchedule[selectedWeekDays[j]].daySchedules = day_schedules;
        }
        user.fName = currentUser.fName;
        user.lName = currentUser.lName;
        user.schedule = _localSchedule;
        updatedSchedule = DATA.map((Obj: any) => {
          if (Obj.userID == userID) {
            Obj.schedule = _localSchedule;
            return Obj;
          }
          return Obj;
        });

        dispatch(scheduleSuccess(user));
        updateLocalState(_localSchedule);
        dispatch(adminScheduleSuccess(updatedSchedule));
      }

      data = {
        UserID: userID,
        IsCalenderView: false,
        ScheduleID: 0,
        StartDate: moment(state.startDate).toISOString(),
        EndDate: moment(state.endDate).toISOString(),
        StartTimeString: state.startTime,
        EndTimeString: state.endTime,
        isMondayOn: state.isMondayOn,
        isTuesdayOn: state.isTuesdayOn,
        isWednesdayOn: state.isWednesdayOn,
        isThursdayOn: state.isThursdayOn,
        isFridayOn: state.isFridayOn,
        isSaturdayOn: state.isSaturdayOn,
        isSundayOn: state.isSundayOn,
        Description: state.description,
        BgColor: whiteThemeColors.primary,
        ApplyForItem: state.wages[state.applyForItem].value,
      };
    } else {
      if (!isInstructor(userData.roleName)) {
        let _localSchedule = schedule;
        let day_schedules = _localSchedule[selectedDayID].daySchedules;
        if (isEdit) {
          let scheduleIndex = day_schedules.findIndex(
            (x: any) => x.dayID == day_id,
          );
          if (scheduleIndex != -1) {
            let scheduleObj = {
              dayID: day_id,
              checkIn: state.startTime,
              checkOut: state.endTime,
              dayComments: state.description,
              wageID: state.wages[state.applyForItem].value,
            };
            day_schedules[scheduleIndex] = scheduleObj;
            _localSchedule[selectedDayID].daySchedules = day_schedules;
          }
        } else {
          day_schedules.push({
            dayID: day_id,
            checkIn: state.startTime,
            checkOut: state.endTime,
            dayComments: state.description,
            wageID: state.wages[state.applyForItem].value,
          });
          _localSchedule[selectedDayID].daySchedules = day_schedules;
        }
        user.fName = currentUser.fName;
        user.lName = currentUser.lName;
        user.schedule = _localSchedule;

        updatedSchedule = data.map((Obj: any) => {
          if (Obj.userID == userID) {
            Obj.schedule = _localSchedule;
            return Obj;
          }
          return Obj;
        });

        updateLocalState(_localSchedule);
        dispatch(scheduleSuccess(user));
        dispatch(adminScheduleSuccess(updatedSchedule));
      }

      data = {
        DayID: isEdit === true ? dayID : 0,
        UserID: userID,
        DayDate: `${selectedDate}`,
        ScheduleID: isEdit === true ? scheduleID : 0,
        Description: state.description,
        BgColor: whiteThemeColors.primary,
        StartTimeString: state.startTime,
        EndTimeString: state.endTime,
        ApplyForItem: state.wages[state.applyForItem].value,
      };
    }
    if (isInstructor(userData.roleName)) setLoading(true); //dispatch(loading(true));
    postMultipleSchedulesIntoDB(data, day_id);
  };

  return (
    <KeyboardAvoidingView>
      <Modal
        animationType='slide'
        transparent={false}
        visible={showModal}
        onRequestClose={() => changeModalState(false)}
        supportedOrientations={['landscape', 'portrait']}
      >
        {/* <LoadingSc /> */}
        {loading && <Loader />}
        <Header
          isBack
          Screen={`${ScheduleWeekView.AddSchedule} by Range`}
          GoBack={() => {
            _setState(StateConstants.selectedDays, []);
            _selectedDays = [];
            changeModalState(false);
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}
        >
          <_View style={styles.subContainer}>
            <_View style={styles.daysNameContainer}>
              <RenderWeekButtons />
            </_View>
            <_View style={styles.dateTimesRowContainer}>
              <DateTime
                onPress={() => {
                  setmode('date');
                  handleClickOnDate(true, true, false, _setState, setIsVisible);
                }}
                label={'Start Date'}
                value={state.startDate}
              />
              <DateTime
                onPress={() => {
                  setmode('date');
                  handleClickOnDate(true, true, true, _setState, setIsVisible);
                }}
                label={'End Date'}
                value={state.endDate}
              />
              <_View>
                <_Text style={styles.headText}>Duration</_Text>
                <_Text style={styles.timeText}>
                  {getDateDuration(state.startDate, state.endDate)}
                </_Text>
              </_View>
            </_View>
            <_View style={styles.dateTimesRowContainer}>
              <DateTime
                onPress={() => {
                  setmode('time');
                  handleClickOnTime(
                    true,
                    false,
                    false,
                    _setState,
                    setIsVisible,
                  );
                }}
                label={'Start Time'}
                value={state.startTime}
              />

              <DateTime
                onPress={() => {
                  setmode('time');
                  handleClickOnTime(true, false, true, _setState, setIsVisible);
                }}
                label={'End Time'}
                value={state.endTime}
              />

              <_View>
                <_Text style={styles.headText}>Duration</_Text>
                <_Text style={styles.timeText}>
                  {getTimeDuration(state.startTime, state.endTime)}
                </_Text>
              </_View>
            </_View>
            <_View width={'90%'}>
              <_View style={styles.applyItemContainer}>
                <_View style={styles.applyItemLabel}>
                  <_Text style={styles.headText}>Apply for item</_Text>
                </_View>
                <_View style={styles.wagesListContainer}>
                  <ApplyForItem data={state.wages} _setState={_setState} />
                </_View>
              </_View>

              {IsVisible && (
                <DateTimePickerIos
                  onConfirm={(date: any) =>
                    handleTimeConfirm(date, state, _setState)
                  }
                  data={new Date()}
                  mode={mode}
                  isVisible={IsVisible}
                  setisVisible={setIsVisible}
                />
              )}

              <_View style={styles.fieldContainer}>
                <_View style={styles.fieldTextContainer}>
                  <_Text style={styles.headText}>
                    {ScheduleWeekView.Description}
                  </_Text>
                </_View>
                <_View style={styles.descripContainer}>
                  <_TextInput
                    multiline
                    style={styles.descripTxtInp}
                    value={state.description}
                    placeholderTextColor={whiteThemeColors.lightBlack}
                    placeholder={'Enter Description...'}
                    onChange={(text) => {
                      _setState(
                        StateConstants.description,
                        text.nativeEvent.text,
                      );
                    }}
                  />
                </_View>
              </_View>

              <_View style={styles.reviewModalContainer}>
                {isEdit && (
                  <RequestCoverView
                    date={dates[selectedDayID]}
                    checkInTime={startTime}
                    checkOutTime={endTime}
                    dayID={dayID}
                    userID={userID}
                    type='cover'
                    userName={userName}
                    navigation={navigation}
                    domainURL={domainURL}
                  />
                )}

                <Pressable
                  style={styles.buttonSave}
                  onPress={handleFormSubmission}
                >
                  <_Text style={styles.buttonText}>Create Schedule</_Text>
                </Pressable>
              </_View>
            </_View>
          </_View>
        </ScrollView>
        {state.showAlert && (
          <CustomAlert
            visible={state.showAlert}
            title={state.alertTitle}
            msg={state.alertMessage}
            firstBtn={'Okay'}
            secondBtn={'Close'}
            firstBtnFunc={() => _setState(StateConstants.showAlert, false)}
            secondBtnFunc={() => _setState(StateConstants.showAlert, false)}
          />
        )}
      </Modal>
    </KeyboardAvoidingView>
  );
};

export { AddScheduleByRange };
