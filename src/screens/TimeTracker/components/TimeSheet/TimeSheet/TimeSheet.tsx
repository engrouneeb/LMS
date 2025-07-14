import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useReducer, useRef, useState ,useCallback} from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { CustomAlert, isAdmin, whiteThemeColors } from 'utilities';
import {
  getTimeSheetData,
  saveTimeSheet,
} from '../../../../../actions/TimeSheetAction';
import { Calendar_Strip, _Screen, _View } from '../../../../../components';
import Screens from '../../../../../screenNames';
import Header from '../../../../Headers';
import Loader from '../../../../Loader/loader';
import Search from '../../../../Search';
import { GetEndOfWeek, GetStartOfWeek } from './TimeSheetFunctions';
import { EmptyList, RenderItem, SubmitButton } from './components';
import { Day_Color, Day_Name } from './constants';
import { initialState, reducer, stateConstants } from './states';
import { styles } from './style';
import { ApprovalsListModal } from './components/ApprovalsListModal';
import { useAppModulePermission } from '../../../../../customHooks';

var showButton: boolean;

const TimeSheet = () => {
  const { filterMenuOptions } = useAppModulePermission();
    const isAddTimesheet=filterMenuOptions("AddTimesheet");
  const searchRef: any = useRef();
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const [state, setState] = useReducer(reducer, initialState);
  const [isVisible, setisVisible] = useState(false);
  const _setState = (type: any, data: any) => setState({ type, data });
  const { timeSheet, UserInfo }: any = useSelector((state: Appstate) => ({
    timeSheet: state.language.timeSheet,
    UserInfo: state.User.UserInfo,
  }));
  var UserRole = UserInfo?.roleName;
  // useEffect(() => {
  //   updateWeekDates(new Date());
  // }, []);
  useFocusEffect(
    useCallback(() => {
      if (state.weekStart) {
        updateWeekDates(state.weekStart);
      } else {
        updateWeekDates(new Date());
      }
    }, [state.weekStart])
  );
  

  const updateWeekDateOnWeekChange = (date: any) => {
    _setState(stateConstants.loading, true);
    updateWeekDates(date);
  };

  const updateWeekDates = async (date: any) => {
    _setState(stateConstants.selectedSheetsAndLoading, {
      [stateConstants.loading]: true,
      [stateConstants.selectedSheets]: [],
    });
    var reciveDate = new Date(date);
    var day = reciveDate.getDay();
    reciveDate.setHours(-24 * (day + 1));
    var _dates: any = [];
    for (let i = 0; i <= 6; i++) {
      var dd = new Date(reciveDate.setDate(reciveDate.getDate() + 1));
      _dates.push({
        day: 'Name',
        color: Day_Color[dd.getDay()],
        date: dd.getDate(),
        dtString: dd.toDateString(),
      });
    }
    var sDate = GetStartOfWeek(date);
    var eDate = GetEndOfWeek(date);
    var ListItem: any = [];
    var approvers;
    await dispatch(getTimeSheetData(sDate, eDate)).then((res: any) => {
      _setState(stateConstants.loading, false);
      approvers = res.data.approvers;
      showButton =
        res.data?.timeSheetStatus != null
          ? res.data?.timeSheetStatus.isEditable
          : false;
      var status =
        res.data?.timeSheetStatus != null
          ? res.data.timeSheetStatus.status
          : '';
      res.data?.timeSheetsData?.map((day: any) => {
        status == 'Submitted' &&
          _setState(stateConstants.selectedSheets, [
            ...state.selectedSheets,
            day.timesheetId,
          ]);
        ListItem.push({
          tmskey: day.timesheetId,
          totelWeekHr: day.totalWeekHours,
          status: status,
          itemName: day.type,
          userName: day.timesheetName,
          roleName: day.activity,
          weekStartDate: sDate,
          image: day.userImage,
          week: day?.dayList?.map((weekDay: any, index: any) => {
            var hr = Number(weekDay.dayHours);
            return {
              day: Day_Name[index] || 'null',
              time: hr,
              date: parseInt(weekDay.dayDate.substring(8, 10)),
              color: Day_Color[index],
              comments: weekDay.dayComments,
            };
          }),
        });
      });
    });

    _setState(stateConstants.handleUpdateWeekDates, {
      [stateConstants.items]: ListItem,
      [stateConstants.filteredItems]: ListItem,
      [stateConstants.loading]: false,
      [stateConstants.submittButton]: showButton ? 'flex' : 'none',
      [stateConstants.approvers]: approvers,
      [stateConstants.weekStart]: sDate,
    });
  };

  const sheetToPublish = (sheetId: number) => {
    if (state.selectedSheets.includes(sheetId))
      _setState(
        stateConstants.selectedSheets,
        state.selectedSheets.filter((id: any) => id != sheetId),
      );
    else
      _setState(stateConstants.selectedSheets, [
        ...state.selectedSheets,
        sheetId,
      ]);
  };

  const handleCustomAlert = (
    showAlert?: boolean,
    alertTitle?: string,
    alertMessage?: string,
    firstBtn?: string,
  ) => {
    _setState(stateConstants.handleCustomAlert, {
      showAlert,
      alertTitle,
      alertMessage,
      firstBtn,
    });
  };

  const _submitHr = () => {
    var timeSheetIds = state.selectedSheets.map((Id: any) => {
      return { Id };
    });
    dispatch(saveTimeSheet(timeSheetIds)).then((res: any) => {
      if (res.data.key == 'Error' || res.data.key == '') {
        handleCustomAlert(false, timeSheet.Error, res.data.value, 'Okay');
      } else {
        handleCustomAlert(
          !state.showAlert,
          timeSheet.Success,
          res.data.value,
          'Okay',
        );
      }
    });
  };

  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          isBack
          isSearchBtn
          Screen={timeSheet?.Timesheet}
          GoBack={() => navigation.goBack()}
          OpenSearch={() => setisVisible(true)}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onClose={() => setisVisible(false)}
          onInputChange={(data: any) =>
            _setState(stateConstants.filteredItems, data)
          }
          animSpeed={100}
          data={state.items && state.items}
          searchKey='userName'
          outPos={-110}
          inPos={-10}
          height={60}
          isVisible={isVisible}
        />
      )}
      {state.weekStart && (
        <Calendar_Strip
          weekStart={state.weekStart}
          updateWeekDateOnWeekChange={updateWeekDateOnWeekChange}
        />
      )}
      <_View style={styles.container}>
        {state.loading ? (
          <Loader />
        ) : state.filteredItems.length !== 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.list}
            data={state.filteredItems}
            renderItem={({ item }) => (
              <RenderItem
              isAddTimesheet={isAddTimesheet}
                Obj={item}
                btnDisabled={
                  isAdmin(UserRole) || state.submittButton !== 'flex'
                }
                aprrovers={state.approvers}
                setModal={() => _setState(stateConstants.modalVisible, true)}
                onCardPress={() => {
                 if (isAddTimesheet) navigation.navigate(Screens.timeSheetDetails.name, {
                    timeSheet: item,
                    wStart: state.weekStart,
                  });
                }}
                userRole={UserInfo.roleName}
                onCheckBoxPress={() => sheetToPublish(item.tmskey)}
                selectedSheets={state.selectedSheets}
              />
            )}
            keyExtractor={(item) => item.uniqueId}
            ListFooterComponent={<_View style={{ height: 60 }} />}
          />
        ) : (
          <EmptyList
            show={!state.loading && state.filteredItems.length == 0}
            emptyListMsg={timeSheet?.NoTimesheetFound}
          />
        )}

        <SubmitButton
          show={!isAdmin(UserRole) && isAddTimesheet&& state.selectedSheets.length > 0}
          handleCallback={() => _submitHr()}
          btnShow={state.submittButton}
        />
      </_View>
      {state.modalVisible && (
        <ApprovalsListModal
          timeSheet={timeSheet}
          approvers={state.approvers}
          onPressCallback={() => {
            _setState(stateConstants.modalVisible, false);
          }}
          modalVisible={state.modalVisible}
        />
      )}
      {state.showAlert && (
        <CustomAlert
          visible={state.showAlert}
          title={state.alertTitle}
          msg={state.alertMessage}
          firstBtn={state.firstBtn ? state.firstBtn : 'Okay'}
          firstBtnFunc={() => {
            if (state.alertTitle == timeSheet?.Error) handleCustomAlert();
            else {
              updateWeekDates(state.weekStart);
              handleCustomAlert(false);
            }
          }}
        />
      )}
    </_Screen>
  );
};

export { TimeSheet };
