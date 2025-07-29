import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../reducers/Appstate';
import { _ActivityIndicator } from '../../../Loader/_ActivityIndicator';
import { whiteThemeColors } from '../../../../Utilities';
import ApiEndPoint from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { updateTimeOff } from '../../../../actions/AsyncStorage';
import {
  timeOffInstructorFailed,
  timeOffInstructorSuccess,
} from '../../../../actions/timeOffInstructorActions';
import {
  _Screen,
  _View,
  endpoint,
  Calendar_Strip,
} from '../../../../components';
import Screens from '../../../../screenNames';
import Header from '../../../Headers';
import Search from '../../../Search/index';
import { HeaderFooter, RenderList } from './components';
import {
  endDateFormatting,
  handleBack,
  startDateFormatting,
} from './TimeOffFunctions';

let take = 10;

const InstructorList = () => {
  const navigation: any = useNavigation();
  const [isVisible, setisVisible] = useState(false);
  const { timeOff, timeOffInstructorReducer } = useSelector(
    (state: Appstate) => ({
      timeOff: state.language.timeOff,
      timeOffInstructorReducer: state.timeOffInstructorReducer,
    })
  );
  const weekStart = moment().startOf('week');
  const [instructorList, setInstructorList] = useState(
    timeOffInstructorReducer?.data
  );
  const [filteredData, setfilteredData] = useState<any>();
  const [weekDate, setWeekDate] = useState<any>('');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  useEffect(() => {
    setLoading(true);
    getWeeklyTimeOff(new Date(), skip, true);
  }, []);
  useEffect(() => {
    if (!isVisible) {
      setInstructorList(timeOffInstructorReducer?.data);
      setfilteredData(timeOffInstructorReducer?.data);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      setfilteredData(timeOffInstructorReducer?.data);
    });
    return unsubscribe;
  }, [timeOffInstructorReducer]);

  const getWeeklyTimeOff = (date: any, skip: any, newRecords: any) => {
    var EndPoint: endpoint = ApiEndPoint.GetWeeklyTimeOff;
    EndPoint.params = `?startDate=${startDateFormatting(
      date
    )}&endDate=${endDateFormatting(date)}&skip=${skip}&take=${take}`;
    Get(EndPoint)
      .then((res: any) => {
        if (!res) {
          dispatch(timeOffInstructorFailed());
          return;
        }
        if (newRecords) {
          dispatch(timeOffInstructorSuccess(res.scheduleBody));
        } else {
          var resultantArray = [...instructorList, ...res.scheduleBody];
          var uniqueArray = [...new Set(resultantArray)];
          dispatch(timeOffInstructorSuccess(uniqueArray));
        }
        setWeekDate(Date.now());
        setSkip(skip);
        return;
      })
      .catch(() => {
        return dispatch(timeOffInstructorFailed());
      })
      .finally(() => setLoading(false));
  };

  const updateWeekDateOnWeekChange = (date: any) => {
    let refreshSkip = 0;
    setWeekDate(date);
    setSelectedMonth(date);
    setInstructorList([]);
    setSkip(refreshSkip);
    setLoading(true);
    getWeeklyTimeOff(date, refreshSkip, true);
  };

  const handlePress = (item: any) => {
    navigation.navigate(Screens.timeOff.name, {
      userId: item.userID,
      date: weekDate,
      getWeeklyTimeOff: getWeeklyTimeOff,
      syncDate: new Date(selectedMonth),
    });
    dispatch(updateTimeOff(false));
  };

  const OpenCloseSearch = () => setisVisible(true);

  return (
    <_Screen
      header={
        <Header
          isBack
          isSearchBtn
          Screen={timeOff.TimeOff}
          GoBack={() => handleBack(navigation)}
          OpenSearch={OpenCloseSearch}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={() => handleBack(navigation)}
      backgroundColor={whiteThemeColors.background}
      bottomSafeAreaColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={(data: any) => setfilteredData(data)}
          onClose={() => setisVisible(false)}
          animSpeed={100}
          data={instructorList}
          searchKey='userName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <_View style={styles.calendarStripContainer}>
        <Calendar_Strip
          weekStart={weekStart}
          updateWeekDateOnWeekChange={updateWeekDateOnWeekChange}
        />
      </_View>
      <_View style={styles.mainContainer}>
        {loading ? (
          <_ActivityIndicator size='large' />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <RenderList
                item={item}
                timeOff={timeOff}
                handlePress={handlePress}
              />
            )}
            onEndReached={() => getWeeklyTimeOff(weekDate, skip + 10, false)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={<HeaderFooter />}
            ListHeaderComponent={<HeaderFooter />}
          />
        )}
      </_View>
    </_Screen>
  );
};

export { InstructorList };

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.93,
    paddingTop: Platform.OS == 'ios' ? 0 : 10,
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.background,
  },
  calendarStripContainer: {
    flex: 0.14,
  },
});
