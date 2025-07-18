import { useNavigation } from '@react-navigation/native';
import { TimeOffInterface } from '../../../../../interfaces';
import moment from 'moment';
import React, { FC, useEffect, useReducer, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../../../reducers/Appstate';
import { _ActivityIndicator } from '../../../../../../Loader';
import {
  convertUTCDateToLocalDateStringFormat,
  CustomAlert,
  isAdmin,
  whiteThemeColors,
} from '../../../../../Utilities';
import ApiEndPoint from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import { updateTimeOff } from '../../../../../actions/AsyncStorage';
import {
  AddTimeOff,
  DeleteTimeOff,
} from '../../../../../actions/StaffScheduleActions';
import {
  timeOffInstructorFailed,
  timeOffInstructorSuccess,
  timeOffInstructorUpdate,
} from '../../../../../actions/timeOffInstructorActions';
import { endpoint, _Screen, _View } from '../../../../../components';
import { TimeOffModal } from '../components/AddTimeOffModal';
import Header from '../../../../Headers';
import { DAY_COLOR } from '../constants';
import {
  CardTitle,
  DisplayCard,
  FloatingButton,
  _Calendar,
} from './components';
import {
  convertTime12to24,
  endDateFormatting,
  startDateFormatting,
} from './RequestTimeOffFunctions';
import { initialState, reducer, stateConstants } from './states';
import { useAppModulePermission } from '../../../../../customHooks';

const TimeOff: FC<TimeOffInterface> = ({ route }) => {
  const navigation: any = useNavigation();
   const { filterMenuOptions } = useAppModulePermission();
   const isAddTimeoff=filterMenuOptions("AddTimeoff");
  const SelectedLanguage: any = useSelector(
    (state: Appstate) => state.language,
  );
  const { timeOff } = SelectedLanguage;
  const userData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const oldTimeOff: any = useSelector(
    (state: Appstate) => state.timeOffInstructorReducer.data,
  );
  const dispatch: any = useDispatch();
  const [timings, setTimings] = useState(SelectedLanguage.timeOff.TimeOff);
  const highlightingColor = whiteThemeColors.primary;
  const [state, _setState] = useReducer(reducer, initialState);
  const setState = (type: any, data: any) => _setState({ type, data });
  const [loading, setLoading] = useState(false);
  const { Get } = DataAccess();
  const [selectedDate, setselectedDate] = useState(new Date());
  useEffect(() => {
    if (route.params.userId !== state.instructorDetails.userID) {
      setLoading(true);
      getMonthlyTimeOffFromApi(
        startDateFormatting(route.params.syncDate || new Date()),
        endDateFormatting(route.params.syncDate || new Date()),
      );
    }
  }, []);

  useEffect(() => {
    if (Object.keys(state.instructorDetails).length > 0) {
      _markedDates();
      handleDateChange(state.instructorDetails, state.selectedDay);
    }
  }, [state.instructorDetails]);

  const handleDateChange = (details: any, day: any) => {
    details?.weekDays?.map((data: any) => {
      if (
        convertUTCDateToLocalDateStringFormat(day) ===
        convertUTCDateToLocalDateStringFormat(data.dayDate)
      ) {
        if (data.scheduleTimeOfDay !== null) {
          let timing = data.scheduleTimeOfDay;
          setState(stateConstants.handleDateChange, {
            [stateConstants.timeOffId]: data.dayId,
            [stateConstants.isTimeOff]: true,
            [stateConstants.timeIn]: timing.substring(0, 8),
            [stateConstants._timeOff]: timing.substring(9, 17),
            [stateConstants.timeOffComment]: data.dayComments,
            [stateConstants.title]: data.title,
          });

          setTimings(data.scheduleTimeOfDay);
        } else {
          setState(stateConstants.handleDateChange, {
            [stateConstants.timeOffId]: day.dayId,
            [stateConstants.isTimeOff]: false,
            [stateConstants.timeIn]: '',
            [stateConstants._timeOff]: '',
            [stateConstants.timeOffComment]: '',
            [stateConstants.title]: '',
          });
          setTimings('No Time Off');
        }
      }
    });
    _markedDates();
  };

  const _markedDates = () => {
    var markedDates: any = [];
    var marked = {
      key: 'workout',
      color: whiteThemeColors.red,
      selectedDotColor: whiteThemeColors.red,
    };

    // state.instructorDetails &&
    state.instructorDetails?.weekDays.map((data: any) => {
      if (data?.scheduleTimeOfDay !== null) {
        markedDates.push(moment(data.dayDate).format('YYYY-MM-DD'));
      }
    });
    let dateObject = Object.fromEntries(
      markedDates.map((year: any) => {
        var day = new Date(year).getDay();
        return [
          year,
          {
            dots: [marked],
            selected: true,
            selectedColor: DAY_COLOR[day],
          },
        ];
      }),
    );
    setState(stateConstants.markedDates, dateObject);
  };

  const handleCustomAlert = (
    flag: any,
    title?: string,
    msg?: string,
    firstBtn?: string,
    secondBtn?: string,
  ) => {
    setState(stateConstants.handleCustomAlert, {
      [stateConstants.showAlert]: flag,
      [stateConstants.alertTitle]: title,
      [stateConstants.alertMessage]: msg,
      [stateConstants.firstBtn]: firstBtn,
      [stateConstants.secondBtn]: secondBtn,
    });
  };

  const getMonthlyTimeOffFromApi = (startDate: any, endDate: any) => {
    var EndPoint: endpoint = ApiEndPoint.GetWeeklyTimeOff;
    EndPoint.params = `?startDate=${startDate}&endDate=${endDate}&userId=${route.params.userId}`;
    Get(EndPoint)
      .then((res: any) => {
        if (!res) {
          handleCustomAlert(
            true,
            'Error',
            res.error_description,
            'Okay',
            undefined,
          );
          return;
        }

        setState(
          stateConstants.instructorDetails,
          res.scheduleBody?.length && res.scheduleBody[0],
        );
        setLoading(false);
        return res;
      })
      .catch(() => {});
  };

  const getWeeklyTimeOff = () => {
    var EndPoint: endpoint = ApiEndPoint.GetWeeklyTimeOff;
    EndPoint.params = `?startDate=${moment(new Date())
      .startOf('week')
      .toISOString()}&endDate=${moment(new Date())
      .endOf('week')
      .toISOString()}&skip=${0}&take=${10}`;
    Get(EndPoint)
      .then((res: any) => {
        if (res?.error) {
          return dispatch(timeOffInstructorFailed());
        }

        dispatch(timeOffInstructorSuccess(res.scheduleBody));
      })
      .catch(() => {
        return dispatch(timeOffInstructorFailed());
      });
  };

  const handleMonthChange = (month: any) => {
    let startDate = startDateFormatting(month.dateString);
    let endDate = endDateFormatting(month.dateString);

    getMonthlyTimeOffFromApi(startDate, endDate);
  };

  const postToApi = (
    startTime: any,
    endTime: any,
    id: any,
    description: string,
    title: string,
  ) => {
    dispatch(
      AddTimeOff(
        startTime,
        endTime,
        id,
        route.params.userId,
        userData.companyUrl,
        description,
        title,
      ),
    ).then((res: any) => {
      getMonthlyTimeOffFromApi(
        startDateFormatting(startTime),
        endDateFormatting(endTime),
      );
      if (res.type === 'ERROR') {
        handleCustomAlert(
          true,
          'Error',
          res.error.error_description,
          'Okay',
          undefined,
        );
      } else {
        dispatch(updateTimeOff(true));
      }
    });
  };

  const updateLocalState = (Obj: any, type: any) => {
    for (
      let index = 0;
      index < state.instructorDetails.weekDays.length;
      index++
    ) {
      if (
        convertUTCDateToLocalDateStringFormat(
          state.instructorDetails.weekDays[index].dayDate,
        ) === convertUTCDateToLocalDateStringFormat(state.selectedDay)
      ) {
        if (type === 'Add') {
          const _instructorDetails = { ...state.instructorDetails };
          _instructorDetails.weekDays[
            index
          ].scheduleTimeOfDay = `${Obj.startTime} - ${Obj.endTime}`;
          var Obj = _instructorDetails.weekDays[index];
          Obj.userID = _instructorDetails.userID;
          Obj.type = type;

          dispatch(timeOffInstructorUpdate(Obj));
          setState(stateConstants.instructorDetails, _instructorDetails);
        } else if (type === 'Delete') {
          const _instructorDetails = { ...state.instructorDetails };
          var Obj = _instructorDetails.weekDays[index];
          Obj.userID = _instructorDetails.userID;
          Obj.type = type;
          dispatch(timeOffInstructorUpdate(Obj));
          _instructorDetails.weekDays[index].scheduleTimeOfDay = null;
          setState(stateConstants.instructorDetails, _instructorDetails);
        }
      }
    }
  };

  const postData = (Obj: any) => {
    let description = Obj.comment;
    let title = Obj.title;
    let start = convertTime12to24(Obj.startTime).split(':');
    let end = convertTime12to24(Obj.endTime).split(':');
    let startTime = state.selectedDay;
    startTime.setHours(start[0], start[1], 0, 0);
    startTime = startTime.toISOString();
    let endTime = state.selectedDay;
    endTime.setHours(end[0], end[1], 0, 0);
    endTime = endTime.toISOString();

    if (isAdmin(userData.roleName)) {
      if (!state.isTimeOff && Obj.startTime !== '' && Obj.endTime !== '') {
        var indexOfInstructor =
          oldTimeOff?.length &&
          oldTimeOff.findIndex(
            (Obj: any) => Obj.userID == state.instructorDetails.userID,
          );
        var indexOfDay =
          oldTimeOff?.length &&
          oldTimeOff[indexOfInstructor].weekDays.findIndex(
            (Obj: any) =>
              convertUTCDateToLocalDateStringFormat(Obj.dayDateString) ==
              convertUTCDateToLocalDateStringFormat(state.selectedDay),
          );
        if (indexOfDay != -1) {
          var updatedWeek = [...oldTimeOff[indexOfInstructor].weekDays];
          updatedWeek[indexOfDay].scheduleTimeOfDay = timings;
          updatedWeek[indexOfDay].dayId = 1;
          updatedWeek[indexOfDay].scheduleColor = whiteThemeColors.primary;
          var updatedTimeOff: any = [...oldTimeOff];
          updatedTimeOff[indexOfInstructor].weekDays = updatedWeek;

          updateLocalState(Obj, 'Add');
        }

        postToApi(startTime, endTime, 0, description, title);
      } else if (
        state.isTimeOff &&
        Obj.startTime !== '' &&
        Obj.endTime !== ''
      ) {
        if (moment(Obj.startTime, 'HH:mm A') < moment(Obj.endTime, 'HH:mm A')) {
          var indexOfInstructor = oldTimeOff.findIndex(
            (Obj: any) => Obj.userID == state.instructorDetails.userID,
          );
          var indexOfDay = oldTimeOff[indexOfInstructor].weekDays.findIndex(
            (Obj: any) =>
              convertUTCDateToLocalDateStringFormat(Obj.dayDateString) ==
              convertUTCDateToLocalDateStringFormat(state.selectedDay),
          );
          if (indexOfDay != -1) {
            var updatedWeek = [...oldTimeOff[indexOfInstructor].weekDays];
            updatedWeek[indexOfDay].scheduleTimeOfDay = timings;
            updatedWeek[indexOfDay].dayId = state.timeOffId;
            updatedWeek[indexOfDay].scheduleColor = whiteThemeColors.primary;
            let updatedTimeoff = [...oldTimeOff];
            updatedTimeoff[indexOfInstructor].weekDays = updatedWeek;
            updateLocalState(Obj, 'Add');
          }
          postToApi(startTime, endTime, state.timeOffId, description, title);
          handleCustomAlert(
            true,
            'Success',
            'Time Off Updated Successfully',
            'Okay',
            undefined,
          );
        } else {
          handleCustomAlert(
            true,
            'Error',
            'Please select a proper time interval',
            'Okay',
            undefined,
          );
        }
      } else {
        handleCustomAlert(
          true,
          'Error',
          'Incomplete fields try Again',
          'Okay',
          undefined,
        );
      }
    } else {
      updateLocalState(Obj, 'Add');
      postToApi(startTime, endTime, state.timeOffId, description, title);
    }
  };

  const deleteData = (timeOff: any) => {
    handleCustomAlert(
      true,
      'Warning',
      timeOff.DoYouWantToDeleteTimeOffFor +
        convertUTCDateToLocalDateStringFormat(state.selectedDay) +
        '?',
      timeOff.Yes,
      timeOff.NO,
    );
  };

  const confirmDelete = () => {
    updateLocalState(null, 'Delete');
    dispatch(DeleteTimeOff(state.timeOffId)).then((res: any) => {
      if (!res.error) {
        dispatch(updateTimeOff(true));
        setState(stateConstants.timeOffId, 0);
      } else {
        getWeeklyTimeOff();
        getMonthlyTimeOffFromApi(
          startDateFormatting(state.selectedDay),
          endDateFormatting(state.selectedDay),
        );
        Alert.alert(
          'Error',
          'There is an issue while connecting with the server!',
          [
            {
              text: 'OK',
            },
          ],
        );
      }
    });
  };

  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  const removePreviousHighlightedDate = (markedDates: any, curDate: any) => {
    let keys = Object.keys(markedDates);
    for (var it in keys) {
      if (
        markedDates[keys[it]].selectedColor == highlightingColor &&
        keys[it] != curDate
      ) {
        delete markedDates[keys[it]];
        setState(stateConstants.markedDates, markedDates);
      }
    }
  };

  const highLightSelectedDate = (day: any) => {
    const currentDate = moment(day.dateString).format('YYYY-MM-DD');
    if (!state.markedDates[currentDate]) {
      const _markedDates = {
        ...state.markedDates,
        [currentDate]: {
          selected: true,
          selectedColor: highlightingColor,
        },
      };
      removePreviousHighlightedDate(_markedDates, currentDate);

      setState(stateConstants.markedDates, _markedDates);
    } else {
      if (state.markedDates[currentDate].selectedColor == highlightingColor) {
        const _markedDates = {
          ...state.markedDates,
          [currentDate]: {
            selected: true,
            selectedColor: highlightingColor,
          },
        };
        setState(stateConstants.markedDates, _markedDates);
      }
    }
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          Screen={timeOff.TimeOff}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={handleBack}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <_View style={{ width: '100%', height: 'auto' }}>
          <_Calendar
            current={route.params.syncDate || new Date()}
            onDayPress={(day: any) => {
              setselectedDate(day.timestamp);
              let pickedDate = new Date();
              pickedDate.setMonth(parseInt(day.month) - 1);
              pickedDate.setDate(day.day);
              pickedDate.setFullYear(day.year);
              handleDateChange(state.instructorDetails, pickedDate);
              setState(stateConstants.selectedDay, pickedDate);
              highLightSelectedDate(day);
            }}
            onDayLongPress={(day: any) => {
              let pickedDate = new Date();
              pickedDate.setDate(day.day);
              pickedDate.setMonth(parseInt(day.month) - 1);
              pickedDate.setFullYear(day.year);
              handleDateChange(state.instructorDetails, pickedDate);
              setState(stateConstants.isVisible, true);
              setState(stateConstants.selectedDay, pickedDate);
            }}
            markedDates={state.markedDates}
            onMonthChange={(month: any) => handleMonthChange(month)}
          />
        </_View>

        <_View style={{ flex: 1 }}>
          {loading ? (
            <_View style={{ marginTop: 20 }}>
              <_ActivityIndicator size='large' />
            </_View>
          ) : (
            <>
              <CardTitle selectedDay={state.selectedDay} timeOff={timeOff} />
              <DisplayCard
                element={state.instructorDetails}
                isTimeOff={state.isTimeOff}
                onPress={() => {
                  if(isAddTimeoff)
                  setState(stateConstants.isVisible, true)}}
                selectedDay={selectedDate}
                timeOffComment={state.timeOffComment}
                onPressDelete={() => {
                  deleteData(timeOff);
                }}
                timings={timings}
              />
             <TimeOffModal
                selectedUser={state.instructorDetails.userName}
                showModal={state.isVisible}
                handleModalState={() =>
                  setState(stateConstants.isVisible, false)
                }
                selectedDate={state.selectedDay}
                isEdit={state.isTimeOff}
                timeIn={state.timeIn}
                timeOut={state._timeOff}
                comment={state.timeOffComment}
                title={state.title}
                updateLocalState={(Obj: any) => {
                  updateLocalState(Obj, 'Add');
                }}
                postData={(data: any) => postData(data)}
              />
              <_View
                style={{
                  height: '20%',
                  justifyContent: 'center',
                  marginTop: 100,
                }}
              />
            </>
          )}
        </_View>
      </ScrollView>
      {isAddTimeoff&&<FloatingButton
        onPress={() => setState(stateConstants.isVisible, true)}
        isTimeOff={state.isTimeOff}
      />}
      {state.showAlert && (
        <CustomAlert
          visible={state.showAlert}
          title={state.alertTitle}
          msg={state.alertMessage}
          firstBtn={state.firstBtn}
          secondBtn={state.secondBtn}
          firstBtnFunc={() => {
            if (state.alertTitle == 'Warning') {
              confirmDelete();
              handleCustomAlert(
                false,
                undefined,
                undefined,
                undefined,
                undefined,
              );
            }
            handleCustomAlert(
              false,
              undefined,
              undefined,
              undefined,
              undefined,
            );
          }}
          secondBtnFunc={() => {
            setState(stateConstants.showAlert, false);
          }}
        />
      )}
    </_Screen>
  );
};

export { TimeOff };
