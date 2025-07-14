import moment from 'moment';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomAlert,
  DateTimePickerIos,
  isInstructor,
  whiteThemeColors,
} from 'utilities';
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
import LoadingSc from '../../../../../Loader/Loading';
import Loader from '../../../../../Loader/loader';
import { isEmptyNullUndefined } from '../AddScheduleByRange/AddScheduleByRangeFunctions';
import { SelectInstructorModal } from '../SelectInstructorModal';
import {
  ApplyItemDropdown,
  CalculateDuration,
  ChangeInstructorModal,
  CreateUpdateBtn,
  DayBadge,
  DaysCircle,
  DeleteScheduleBtn,
  PressableArea,
} from './components';
import {
  deleteSchedule,
  doesScheduleExist,
  findExistingItem,
  findExistingItemIndex,
  getSelectedWeekDaysIndexes,
  getWages,
  handleTimeConfirm,
  initializeStates,
  isEmptyNullUndefinedZeroMinusOne,
  isEveryIndexSame,
  ToggleDaySelection,
} from './ScheduleAddTimeFunctions';

import { ScheduleAddTimeInterface } from 'interfaces';
import { Appstate } from 'reducers/Appstate';
import { initialState, reducer, StateConstants } from './States';
import { styles } from './style';

const weekButtons = 'Su_M_Tu_W_Th_F_Sa';
let _selectedDays: any = [];
const weekDays: any = moment.weekdaysShort();
const selectedDaysIndexes: any = [];

const AddSchedule: React.FC<ScheduleAddTimeInterface> = ({
  isEdit,
  updateLocalState,
  userID,
  userName,
  domainURL,
  schedule,
  scheduleID,
  selectedDate,
  selectedDayID,
  selectedWageID,
  selectedWeekEndDate,
  selectedWeekStartDate,
  setEditingDisable,
  showModal,
  startTime,
  description,
  dates,
  endTime,
  dayID,
  fetchData,
  changeModalState,
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(reducer, initialState);
  const _setState = (type: any, data: any) => setState({ type, data });
  const DATA: any = useSelector(
    (state: Appstate) => state.adminScheduleReducer.data,
  );
  const [mode, setmode] = useState('date');
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser: any = useSelector(
    (state: Appstate) => state.scheduleReducer.data,
  );
  const { ScheduleWeekView }: any = useSelector(
    (state: Appstate) => state.language,
  );
  const userData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const { Get, PostSecured } = DataAccess();
  const [IsVisible, setIsVisible] = useState(false);
  useEffect(() => {
    _setState(StateConstants.selectedDays, []);
    initializeStates(_setState, {
      isEdit,
      startTime,
      selectedDayID,
      endTime,
      description,
      selectedWeekStartDate,
      selectedWeekEndDate,
    });
    fetchWages();
  }, []);

  useEffect(() => {
    _setState(StateConstants.isEdit, isEdit);
  }, [isEdit]);

  const fetchWages = () => {
    let _url: endpoint = ApiEndPoints.getUserWages;
    _url.params = `?userId=${userID}`;
    Get(_url)
      .then((wages: any) => {
        if (wages.length > 0) {
          getWages(wages, _setState, selectedWageID);
        } else {
          getWages(wages, _setState, selectedWageID);
          _setState(StateConstants.handleAlert, {
            [StateConstants.showAlert]: true,
            [StateConstants.alertMessage]:
              ScheduleWeekView.YouMustAddedWageForYourSchedule,
            [StateConstants.alertTitle]: ScheduleWeekView.Warning,
          });
        }
      })
      .catch(() => {
        _setState(StateConstants.handleAlert, {
          [StateConstants.showAlert]: true,
          [StateConstants.alertMessage]:
            ScheduleWeekView.CannotGetWagesAtMoment,
          [StateConstants.alertTitle]: ScheduleWeekView.Error,
        });
      });
  };

  const handleDaySelection = (selectedDayIndex: any, day: any) => {
    let existingDayIndex: any = findExistingItem(
      selectedDaysIndexes,
      selectedDayIndex,
    );
    let existingDay = findExistingItem(_selectedDays, day);
    if (existingDayIndex === selectedDayIndex) {
      let ind = findExistingItemIndex(selectedDaysIndexes, selectedDayIndex);
      selectedDaysIndexes.splice(ind, 1);
    } else {
      selectedDaysIndexes.push(selectedDayIndex);
    }
    ToggleDaySelection(existingDay, day, _setState, _selectedDays);
    _setState(StateConstants.selectedDays, _selectedDays);
  };

  const WeekButtons = () => {
    return (
      <Fragment>
        {weekButtons.split('_').map((day, index) => {
          let _existingDay = state.selectedDays.find(function (el: any) {
            return el === day;
          });
          return (
            <DaysCircle
              isDaySelected={_existingDay === day || index == selectedDayID}
              onPress={() => handleDaySelection(index, day)}
              day={day}
              date={dates[index]}
              index={index}
            />
          );
        })}
      </Fragment>
    );
  };

  const handleFormSubmission = () => {
    _setState(StateConstants.isVisibleCreate, true);
    let user: any = {
      fName: '',
      lName: '',
      schedule: [],
    };
    let updatedSchedule = [];
    let sTime = moment(state.startTime, 'h:mma');
    let eTime = moment(state.endTime, 'h:mma');

    if (isEmptyNullUndefinedZeroMinusOne(state.applyForItem)) {
      _setState(StateConstants.handleAlert, {
        [StateConstants.alertTitle]: ScheduleWeekView.Error,
        [StateConstants.alertMessage]: ScheduleWeekView.PleaseSelectItem,
        [StateConstants.showAlert]: true,
      });
      return;
    }
    if (isEdit === false) {
      if (
        isEveryIndexSame(
          [
            state.isSundayOn,
            state.isMondayOn,
            state.isTuesdayOn,
            state.isWednesdayOn,
            state.isThursdayOn,
            state.isFridayOn,
            state.isSaturdayOn,
          ],
          false,
        )
      ) {
        _setState(StateConstants.handleAlert, {
          [StateConstants.alertTitle]: ScheduleWeekView.Error,
          [StateConstants.alertMessage]:
            ScheduleWeekView.PleaseSelectYourScheduleDays,
          [StateConstants.showAlert]: true,
        });
        return;
      }
    }

    if (
      isEmptyNullUndefined(state.startTime) ||
      isEmptyNullUndefined(state.endTime)
    ) {
      _setState(StateConstants.handleAlert, {
        [StateConstants.alertTitle]: ScheduleWeekView.Error,
        [StateConstants.alertMessage]:
          ScheduleWeekView.PleaseSelectTimeMissingStarttimeEndtime,
        [StateConstants.showAlert]: true,
      });
      return;
    }
    if (sTime.isBefore(eTime)) {
    } else {
      _setState(StateConstants.handleAlert, {
        [StateConstants.alertTitle]: 'Error',
        [StateConstants.alertMessage]:
          'End time must be greater than start time for Schedule',
        [StateConstants.showAlert]: true,
      });
      return;
    }
    let day_id = isEdit === true ? dayID : 0;
    const currentWeekDates = [];
    for (let i = 0; i < dates.length; i++) {
      currentWeekDates.push(moment(dates[i]).format('MMM DD YY'));
    }
    if (!isEdit) {
      let selectedWeekDays = getSelectedWeekDaysIndexes(
        currentWeekDates,
        state.startDate,
        state.endDate,
      );
      let _localSchedule = schedule;
      for (let j = 0; j < selectedWeekDays.length; j++) {
        let day_schedules = _localSchedule[selectedWeekDays[j]].daySchedules;
        let isScheduleExist = false;
        for (let i = 0; i < day_schedules.length; i++) {
          let checkIn = day_schedules[i].checkIn.toUpperCase();
          let checkOut = day_schedules[i].checkOut.toUpperCase();

          isScheduleExist = doesScheduleExist(
            state.startTime,
            state.endTime,
            checkIn,
            checkOut,
          );

          if (isScheduleExist) {
            _setState(StateConstants.handleAlert, {
              [StateConstants.alertTitle]: ScheduleWeekView.Error,
              [StateConstants.alertMessage]:
                'There is already a schedule present in a specified time between these two dates.',
              [StateConstants.showAlert]: true,
            });
            return;
          }
        }
      }
    } else {
      let _localSchedule = schedule;
      let day_schedules = _localSchedule[selectedDayID].daySchedules;
      day_schedules = isEdit
        ? day_schedules.filter((x: any) => x.dayID !== day_id)
        : day_schedules;
      let isScheduleExist = false;
      for (let i = 0; i < day_schedules.length; i++) {
        let checkIn = day_schedules[i].checkIn.toUpperCase();
        let checkOut = day_schedules[i].checkOut.toUpperCase();

        isScheduleExist = doesScheduleExist(
          state.startTime,
          state.endTime,
          checkIn,
          checkOut,
        );
        if (isScheduleExist)
          _setState(StateConstants.handleAlert, {
            [StateConstants.alertTitle]: ScheduleWeekView.Error,
            [StateConstants.alertMessage]:
              'There is already a schedule between specified time.',
            [StateConstants.showAlert]: state.isEdit ? false : true,
          });
      }
    }

    let data = null;
    if (!isEdit) {
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

      const _data: any = {
        UserID: userID,
        IsCalenderView: false,
        ScheduleID: isEdit ? scheduleID : 0,
        StartDate: moment(
          isEdit ? state.startDate : selectedWeekStartDate,
        ).toISOString(),
        EndDate: moment(
          isEdit ? state.endDate : selectedWeekEndDate,
        ).toISOString(),
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

      data = _data;
    } else {
      if (!isInstructor(userData.roleName && isEdit)) {
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

        updatedSchedule = DATA.map((Obj: any) => {
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

      const _data = {
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

      data = _data;
    }

    if (isInstructor(userData.roleName)) setLoading(true); // dispatch(loading(true));
    PostSecured(
      state.isEdit
        ? ApiEndPoints.SaveSpecificDaySchedule
        : ApiEndPoints.SaveMultipleSchedules,
      data,
    )
      .then((res: any) => {
        if (res.item1 === true) {
          setEditingDisable();
          fetchData();
          if (!isInstructor(userData.roleName) && isEdit == false) {
            let _localSchedule = schedule;
            let day_schedules = _localSchedule[selectedDayID].daySchedules;
            if (day_schedules.filter((x: any) => x.dayID == day_id)[0])
              day_schedules.filter((x: any) => x.dayID == day_id)[0].dayID =
                res.item2;
            _localSchedule[selectedDayID].daySchedules = day_schedules;
            updateLocalState(_localSchedule);
          }

          if (isInstructor(userData.roleName)) {
            // dispatch(loading(false));
            setLoading(false);

            _setState(StateConstants.handleAlert, {
              [StateConstants.alertTitle]: 'Success',
              [StateConstants.alertMessage]:
                'Your schedule has been saved. You can see your schedule, once the administrator approves it.',
              [StateConstants.showAlert]: true,
            });
          } else if (!isEdit) fetchData();
          changeModalState(false);
        } else if (res.item1 === false) {
          setEditingDisable();

          // dispatch(loading(false));
          setLoading(false);
          return setTimeout(() => {
            fetchData();
            _setState(StateConstants.handleAlert, {
              [StateConstants.alertTitle]: ScheduleWeekView.Error,
              [StateConstants.alertMessage]: res.item3,
              [StateConstants.showAlert]: true,
            });
          }, 500);
        }
        return null;
      })
      .catch(() => {
        fetchData();
        return _setState(StateConstants.handleAlert, {
          [StateConstants.alertTitle]: ScheduleWeekView.Error,
          [StateConstants.alertMessage]: ScheduleWeekView.SomethingWentWrong,
          [StateConstants.showAlert]: true,
        });
      });
  };
  const deleteConfirmSchedule = () => {
    let schedules = schedule;
    let url = ApiEndPoints.DeleteSchedule;
    PostSecured(url, {
      Id: state.dayID,
    })
      .then((res: any) => {
        changeModalState(false);
        if (res.key === true) {
          let day_schedules = schedules[selectedDayID].daySchedules;
          day_schedules = day_schedules.filter((x: any) => x.dayID != dayID);
          schedules[selectedDayID].daySchedules = day_schedules;
          setEditingDisable();
          updateLocalState(schedules);
          changeModalState(false);
        } else {
          _setState(StateConstants.handleAlert, {
            [StateConstants.alertTitle]: 'Error',
            [StateConstants.alertMessage]: res.error_description,
            [StateConstants.showAlert]: true,
          });
          fetchData();
          Alert.alert(res.value);
        }
        return;
      })
      .catch(() => {
        fetchData();
        _setState(StateConstants.handleAlert, {
          [StateConstants.alertTitle]: 'Error',
          [StateConstants.alertMessage]: 'Unable to delete schedule!',
          [StateConstants.showAlert]: true,
        });
      });
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: whiteThemeColors.white }}>
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
          Screen={
            isEdit
              ? ScheduleWeekView.UpdateAvailability
              : ` ${ScheduleWeekView.ShowAvailability} for ${weekDays[selectedDayID]}`
          }
          GoBack={() => {
            setEditingDisable();
            changeModalState(false);
            _setState(StateConstants.selectedDays, []);
            _selectedDays = [];
          }}
        />
        <ScrollView style={styles.mainContainer}>
          <_View style={styles.topCalender}>
            <_View
              style={[
                styles.rowDirection,
                {
                  marginTop: isEdit ? 10 : 30,
                },
              ]}
            >
              {isEdit ? (
                <DayBadge selectedDay={selectedDayID} />
              ) : (
                <WeekButtons />
              )}
            </_View>
            <_View style={styles.timeCo}>
              <PressableArea
                onPressVal={() => {
                  setmode('time');
                  setIsVisible(true);
                  _setState(StateConstants.handleTimePicker, {
                    [StateConstants.showDatePicker]: true,
                    [StateConstants.hasDateSelection]: false,
                    [StateConstants.hasStartTimeSelected]: false,
                  });
                }}
                label={'Start Time'}
                value={state.startTime}
              />
              <PressableArea
                onPressVal={() => {
                  setmode('time');
                  setIsVisible(true);
                  _setState(StateConstants.handleTimePicker, {
                    [StateConstants.showDatePicker]: true,
                    [StateConstants.hasDateSelection]: false,
                    [StateConstants.hasStartTimeSelected]: true,
                  });
                }}
                label={'End Time '}
                value={state.endTime}
              />
              <CalculateDuration
                label={'Duration'}
                startTime={state.startTime}
                endTime={state.endTime}
              />
            </_View>
            <_View width={'90%'}>
              <ApplyItemDropdown
                data={state.wages}
                isEdit={isEdit}
                onValueChange={(value: any) =>
                  _setState(StateConstants.applyForItem, value)
                }
                selectedItem={state.applyForItemName}
              />

              {IsVisible && (
                <DateTimePickerIos
                  onConfirm={(date: any) =>
                    handleTimeConfirm(date, _setState, state)
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
                <_View style={styles.txtInpContainer}>
                  <_TextInput
                    multiline
                    style={styles.descriptionText}
                    value={state.description}
                    placeholderTextColor={whiteThemeColors.lightBlack}
                    placeholder={'Enter Description...'}
                    secureTextEntry={false}
                    onChange={(text) => {
                      _setState(
                        StateConstants.description,
                        text.nativeEvent.text,
                      );
                    }}
                  />
                </_View>
              </_View>
              <ChangeInstructorModal
                showChangeInstructorModal={isEdit}
                onPress={() =>
                  _setState(StateConstants.showInstructorModal, true)
                }
              />
              <CreateUpdateBtn
                onPress={handleFormSubmission}
                isCreateBtn={isEdit}
                isVisibleCreate={state.isVisibleCreate}
              />
              <DeleteScheduleBtn
                showBtn={isEdit}
                onPress={() => {
                  deleteSchedule(dayID, _setState);
                }}
              />
            </_View>
          </_View>
        </ScrollView>
        <SelectInstructorModal
          modalVisible={state.showInstructorModal}
          setModalVisible={(value: any) =>
            _setState(StateConstants.showInstructorModal, value)
          }
          changeModalState={() => {
            changeModalState(false);
            fetchData();
          }}
          DayID={isEdit === true ? +dayID : 0}
          UserID={userID}
          DayDate={`${selectedDate}`}
          ScheduleID={isEdit === true ? +scheduleID : 0}
          Description={state.description}
          BgColor={whiteThemeColors.primary}
          StartTimeString={state.startTime}
          EndTimeString={state.endTime}
        />
        {state.showAlert && (
          <CustomAlert
            visible={state.showAlert}
            title={state.alertTitle}
            msg={state.alertMessage}
            firstBtn={state.firstBtn ? state.firstBtn : 'Okay'}
            secondBtn={state.secondBtn ? state.secondBtn : 'No'}
            firstBtnFunc={() => {
              if (state.alertTitle == 'Warning') deleteConfirmSchedule();
              _setState(StateConstants.handleAlert, {
                [StateConstants.showAlert]: false,
                [StateConstants.alertMessage]: '',
                [StateConstants.alertTitle]: '',
              });
              _setState(StateConstants.isVisibleCreate, false);
            }}
            secondBtnFunc={() => {
              _setState(StateConstants.showAlert, false);
              _setState(StateConstants.isVisibleCreate, false);
            }}
          />
        )}
      </Modal>
    </KeyboardAvoidingView>
  );
};

export { AddSchedule };
