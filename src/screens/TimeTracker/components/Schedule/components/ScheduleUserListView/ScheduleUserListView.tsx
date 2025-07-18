import moment, { Moment } from 'moment';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../../../../reducers/Appstate';
import { CustomAlert, isAdmin, whiteThemeColors } from '../../../../../../Utilities';
import Endpoints from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import {
  adminScheduleFailed,
  adminScheduleLoading,
  adminScheduleSuccess,
} from '../../../../../../actions/ScheduleAdminAction';
import {
  _Screen,
  _View,
  endpoint,
  Calendar_Strip,
} from '../../../../../../components';
import Screens from '../../../../../../screenNames';
import Header from '../../../../../Headers';
import { _ActivityIndicator } from '../../../../../Loader';
import Search from '../../../../../Search';
import { ReviewScheduleModal } from '../ReviewScheduleModal';
import { useSort } from './CustomHooks';
import {
  fetchScheduleUserListViewResponse,
  onSearchInterface,
  onValueChangeSingleItemInterface,
  singleDayScheduleInterface,
} from '../../../../../../interfaces';
import { StateConstants, initialState, reducer } from './States';
import {
  FooterLoader,
  NoDataFound,
  RenderList,
  ReviewSchedule,
  ScheduleSaveLoader,
} from './components';
import { useNavigation } from '@react-navigation/native';
import { useAppModulePermission } from '../../../../../../customHooks';
const weekDaysShort = moment.weekdaysShort();
let _userIds: number[] = [];
let skipRecords: number = 0;
const dayName: string = moment().format('ddd');

const _ScheduleUserListView = () => {
  const navigation: any = useNavigation();
  const { filterMenuOptions } = useAppModulePermission();
  const isPublishSchedule=filterMenuOptions("PublishSchedule");
  const [state, setState] = useReducer(reducer, initialState);
  const _setState = (type: any, data: any) => setState({ type, data });
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const searchInputState: any = useRef();
  const { Get, PostSecured } = DataAccess();
  const [isVisible, setisVisible] = useState(false);
  const { loading, data }: any = useSelector(
    (state: Appstate) => state.adminScheduleReducer
  );
  const { adminSchedule }: any = useSelector(
    (state: Appstate) => state.language
  );
  const {
    companyUrl: domainUrl,
    userID,
    roleName: userRole,
  }: any = useSelector((state: Appstate) => state.User.UserInfo);
  const notificationTypes = adminSchedule.notificationTypes.map(function (
    item: any
  ) {
    return item['Text'];
  });

  useEffect(() => {
    skipRecords = 0;
    fetchData(moment());
  }, []);

  const fetchData = (date = moment(), initial = 20) => {
    console.log('---fEtach data');
    let url: endpoint = Endpoints.getSchedule;
    url.params = `?StartDate=${moment(date)
      .startOf('week')
      .toISOString()}&EndDate=${moment(date)
        .endOf('week')
        .toISOString()}&userId=null&Take=${initial}&Skip=${0}`;
    dispatch(adminScheduleLoading());
    Get(url)
      .then((res: fetchScheduleUserListViewResponse) => {
        _setState(StateConstants.searchEnabled, false);
        if (res) {
          setSkip(20);
          let _staff = getResponseArray(res);
          if (_staff.length < 20) setHasMore(false);
          else setHasMore(true);
          _setState(StateConstants.filteredData, _staff);
          return dispatch(adminScheduleSuccess(_staff));
        } else {
          return dispatch(adminScheduleFailed());
        }
      })
      .catch(() => {
        return dispatch(adminScheduleFailed());
      });
  };

  const getResponseArray = (response: fetchScheduleUserListViewResponse) => {
    let _dayIds: any = [];
    const staff = [];
    for (let i = 0; i < response.scheduleBody.length; i++) {
      let fullName = response.scheduleBody[i].userName.split(' ');
      let fName = fullName[0]?.charAt(0).toUpperCase() + fullName[0]?.slice(1);
      let lName = fullName[1]?.charAt(0).toUpperCase() + fullName[1]?.slice(1);
      let userID = response.scheduleBody[i].userID;
      let schedule = [];
      let startWeekDay = 0;
      for (
        let j = startWeekDay;
        j < response.scheduleBody[i].weekDays.length;
        j++
      ) {
        let curSchedule = response.scheduleBody[i].weekDays[j];
        let todayScheduleIndex = curSchedule.daySchedules.findIndex(
          (x: singleDayScheduleInterface) => {
            return x.dayName == dayName;
          }
        );
        let todaySchedule;
        if (todayScheduleIndex === -1) {
          todaySchedule = false;
        } else {
          todaySchedule = true;
        }
        let todayCheckIn =
          todayScheduleIndex == -1
            ? ''
            : curSchedule.daySchedules[todayScheduleIndex].timeFrom;
        let todayCheckOut =
          todayScheduleIndex == -1
            ? ''
            : curSchedule.daySchedules[todayScheduleIndex].timeTo;

        const _s = {
          todaySchedule: todaySchedule,
          todayCheckIn: todayCheckIn,
          todayCheckOut: todayCheckOut,
          daySchedules: curSchedule.daySchedules,
        };

        curSchedule.daySchedules.map((item: singleDayScheduleInterface) => {
          if (item.dayId !== 0 && item.isPublished == false) {
            _dayIds.push(item.dayId);
            _userIds.push(userID);
          }
        });
        schedule.push(_s);
      }

      _setState(StateConstants.dayIdList, _dayIds);
      _setState(StateConstants.userIdList, _userIds);
      staff.push({
        fName,
        lName,
        userID,
        schedule,
      });
    }
    // staff.sort(useSort);
    return staff;
  };

  const handleCardOnPress = (userId: number) => {
    navigation.navigate(Screens.scheduleWeekView.name, {
      userID: userId,
      weekDays: weekDaysShort,
      date: state.weekStart,
    });
  };

  const updateWeekDateOnWeekChange = (date: Moment) => {
    skipRecords = 0;
    setSkip(0);
    _setState(StateConstants.weekStart, moment(date).startOf('week'));
    _setState(StateConstants.weekEnd, moment(date).endOf('week'));
    fetchData(date);
  };

  const publishSchedule = () => {
    if (state.dayIdList.length == 0) {
      _setState(StateConstants.showAlert, true);
      _setState(StateConstants.alertMessage, 'There is no schedule to publish');
      _setState(StateConstants.alertTitle, 'Error');
    } else {
      let url = Endpoints.publishSchedule;
      const data = {
        dayIds: state.dayIdList,
        userIds: state.userIdList,
        notifyType: state.selectedNotifyType,
        domainUrl: domainUrl,
        Date: `${moment(state.weekStart).format('MMM DD')}-${moment(
          state.weekEnd
        ).format('MMM DD')}`,
      };
      _setState(StateConstants.isPublishing, true);
      PostSecured(url, data).then((res: any) => {
        _setState(StateConstants.dayIdList, []);

        if (res.error == 'error') {
          _setState(StateConstants.isPublishing, false);
          _setState(StateConstants.showAlert, true);
          _setState(
            StateConstants.alertMessage,
            adminSchedule.SomethingWentWrong
          );
          _setState(StateConstants.alertTitle, adminSchedule.Error);
        } else {
          _setState(StateConstants.isPublishing, false);
          _setState(StateConstants.showAlert, true);
          _setState(
            StateConstants.alertMessage,
            adminSchedule.ScheduleHasBeenPublished
          );
          _setState(StateConstants.alertTitle, adminSchedule.Success);

          _setState(StateConstants.userIdList, []);
        }
      });
    }
  };

  const onValueChange = (value: string) => {
    let notifyType = adminSchedule.notificationTypes.filter(
      (x: onValueChangeSingleItemInterface) => x.Text == value
    )[0].Value;
    _setState(StateConstants.selectedNotifyType, notifyType);
  };

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };

  const OpenCloseSearch = () => {
    _setState(StateConstants.searchEnabled, !state.searchEnabled);
    setisVisible(true);
  };

  const loadMore = (date = moment()) => {
    if (!(hasMore&&StateConstants.footerLoader)) return
    _setState(StateConstants.footerLoader, true);
    let url: endpoint = Endpoints.getSchedule;
    if (isAdmin(userRole)) {
      url.params = `?StartDate=${moment(date)
        .startOf('week')
        .toISOString()}&EndDate=${moment(date)
          .endOf('week')
          .toISOString()}&userId=null&Take=20&Skip=${skip}`;
    } else {
      url.params = `?StartDate=${moment(date)
        .startOf('week')
        .toISOString()}&EndDate=${moment(date)
          .endOf('week')
          .toISOString()}&userId=${userID}&Take=20&Skip=${skip}`;
    }
    Get(url)
      .then((res: any) => {
        _setState(StateConstants.footerLoader, false);
        if (res) {
          let _staff = getResponseArray(res);
          if (_staff.length < 20)
            setHasMore(false);
          else setHasMore(true)
          let concat = state.filteredData.concat(_staff);
          concat.sort(useSort);
          _setState(StateConstants.filteredData, concat);
        } else {
          console.log('Error on Loading more data:  ', res);
        }
      })
      .catch((Error: any) => console.log({ Error }));
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          isSearchBtn
          Screen={adminSchedule.Schedule}
          OpenSearch={OpenCloseSearch}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={onBackPress}
      bottomSafeAreaColor={whiteThemeColors.background}
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={(val: onSearchInterface) => _setState(StateConstants.data, val)}
          onClose={() => setisVisible(false)}
          animSpeed={100}
          data={data}
          searchKey='fName,lName'
          outPos={-110}
          inPos={-10}
          height={60}
          isVisible={isVisible} showCross={true}       />
      )}
      <_View width={'100%'} height={100}>
        <Calendar_Strip
          weekStart={state.weekStart}
          updateWeekDateOnWeekChange={updateWeekDateOnWeekChange}
        />
      </_View>

      <_View style={{ flex: 1, backgroundColor: whiteThemeColors.background }}>
        {loading ? (
          <_ActivityIndicator size='large' />
        ) : state.filteredData.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={state?.filteredData}
            keyExtractor={(item) => item.userID}
            renderItem={({ item, index }) => {
              return (
                <RenderList
                  user={item}
                  index={index}
                  key={index.toString() + '+-'}
                  onPress={(id) => handleCardOnPress(id)}
                  weekDaysShort={weekDaysShort}
                />
              );
            }}
            onEndReachedThreshold={0.8}
            onEndReached={() => !state.searchEnabled && loadMore()}
            ListFooterComponent={() => (
              <FooterLoader footerLoader={state.footerLoader} />
            )}
          />
        ) : (
          <NoDataFound text={adminSchedule.NoData} />
        )}

        {state.isPublishing ? (
          <ScheduleSaveLoader
            isPublishing={state.isPublishing}
            text={adminSchedule.Saving}
          />
        ) : null}

        {isPublishSchedule&&state.showScheduleModal ? (
          <ReviewScheduleModal
            modalVisible={state.showScheduleModal}
            setModalVisible={(status: any) =>
              _setState(StateConstants.showScheduleModal, status)
            }
            selectedWeekStartDate={state.weekStart}
            selectedWeekEndDate={state.weekEnd}
            onSelect={(index) => onValueChange(notificationTypes[index])}
            publishSchedule={publishSchedule}
            totalShifts={state.dayIdList?.length}
          />
        ) : null}

        {isPublishSchedule&&state.dayIdList.length > 0 ? (
          <ReviewSchedule
            visibility={state.dayIdList.length > 0}
            onPress={() => {
              _setState(StateConstants.showScheduleModal, true);
            }}
            numberOfSchedules={state.dayIdList.length}
          />
        ) : null}
        {state.showAlert && (
          <CustomAlert
            visible={state.showAlert}
            title={state.alertTitle}
            msg={state.alertMessage}
            firstBtn={'Okay'}
            firstBtnFunc={() => {
              _setState(StateConstants.showAlert, false);
              _setState(StateConstants.dayIdList, []);
            }}
          />
        )}
      </_View>
    </_Screen>
  );
};

export const ScheduleUserListView = React.memo(_ScheduleUserListView);
