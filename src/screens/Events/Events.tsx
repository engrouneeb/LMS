import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import CommonStyles from 'screens/CommonStyles';
import {
  convertUTCDateToLocalDateStringFormat,
  CustomAlert,
  getTerminologyLabel,
  isTablet,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { _Text, _VectorIcons, _View } from '../../components';
import ScreensNames from '../../screenNames';
import { _ActivityIndicator } from '../Loader';

let dateObject;

const Event = () => {
  const [EventsDateArray, setEventsDateArray] = useState({});
  const [datesWithEvents, setdatesWithEvents] = useState([]);
  const [loadingDates, setLoadingDates] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    moment(
      convertUTCDateToLocalDateStringFormat(new Date()),
      'MMM DD, YYYY',
    ).format('YYYY-MM-DD'),
  );
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('warning');
  const [alertMsg, setAlertMsg] = useState('');
  const [arr, setArr] = useState([]);
  const { dashboardScreen } = useSelector((state: Appstate) => state.language);
  const navigation = useNavigation<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customDate, setCustomDate] = useState(dayjs());
  const { PostSecured } = DataAccess();
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
    GetEventsDetails();
  }, []);

  useEffect(() => {
    for (let i = dayjs().year(); i > dayjs().year() - 100; i--) {
      setArr((prev) => [...prev, i]);
    }
  }, []);
  const GetEventsDetails = async (date = customDate) => {
    try {
      var EndPoint = ApiEndpoints.GetCalanderEvents;
      let obj = {
        selectedDate: date,
      };
      setLoadingDates(true);
      let response = await PostSecured(EndPoint, obj);

      if (response.data) {
        handelDateList(response);
      } else {
        console.log('something went wrong!!!');
      }
      setLoadingDates(false);
    } catch (error) {
      setLoadingDates(false);
      console.log('Some thing went wrong!!', error);
    }
  };

  const handelDateList = (res: any) => {
    let requiredData = res.data.filter((item: any) => item.eventIds != null);
    var datesWithEvents = requiredData.map((Obj: any) => {
      Obj.date = new Date(Obj.date);
      return Obj;
    });
    var dateList = requiredData.map((Obj: any) =>
      moment(new Date(Obj.date)).format('YYYY-MM-DD'),
    );

    dateObject = Object.fromEntries(
      dateList.map((year: any) => {
        var day: number = new Date(year).getDay();
        return [
          year,
          {
            selected: false,
            // selectedColor: _findColor(day),
            selectedDotColor: _findColor(day),
            marked: true,
            type: 'dot',
            dotColor: _findColor(day),
          },
        ];
      }),
    );
    dateObject[selectedMonth] = {
      marked: true,
      selected: true,
      selectedColor: whiteThemeColors.primary,
      selectedDotColor: whiteThemeColors.white,
      dotColor: '#fff',
    };

    setdatesWithEvents(datesWithEvents);
    setEventsDateArray(dateObject);
  };

  const _showDetailsOnDay = (date: string) => {
    var eventIds = _filterEventIds(date);

    if (eventIds !== undefined) {
      navigation.navigate(ScreensNames.EventDetails.name, {
        selectedDate: date,
        eventIds,
      });
    } else {
      setAlertModalVisible(true);
      setAlertMsg(
        `No upcoming ${terminologies['Event']?.label} in the selected date.`,
      );
      setAlertTitle('Error');
    }
  };

  const _filterEventIds = (date: string) => {
    var filleredEventId;
    datesWithEvents.filter((element: any) => {
      if (moment(new Date(element.date)).format('yyyy-MM-DD') === date) {
        filleredEventId = element.eventIds;
      }
    });
    return filleredEventId;
  };

  const _setDate = (date: any) => {
    setSelectedMonth(date);
    GetEventsDetails(date);
  };

  const CustomCalendarHeader = ({ month, year, onPressPrev, onPressNext }) => {
    return (
      <_View style={styles.calendarHeader}>
        <Pressable hitSlop={10} style={styles.prevButton} onPress={onPressPrev}>
          <_VectorIcons type='AntDesign' name='left' color={'white'} />
        </Pressable>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <_View style={styles.centerView}>
            <_Text style={styles.text}>
              {moment(month).format('MMMM YYYY')}
            </_Text>
          </_View>
        </Pressable>

        <Pressable hitSlop={10} style={styles.nextButton} onPress={onPressNext}>
          <_VectorIcons type='AntDesign' name='right' color='white' />
        </Pressable>
      </_View>
    );
  };

  const _findColor = (day: any) =>
    whiteThemeColors.calenderDayColors[`day${day + 1}`];

  const handleNextPress = () => {
    const nextMonthDate = new Date(customDate);
    nextMonthDate.setMonth(new Date(customDate).getMonth() + 1);
    _setDate(new Date(nextMonthDate).toISOString());
    setSelectedMonth(new Date(nextMonthDate));
    setCustomDate(new Date(nextMonthDate));
  };

  const handlePrevPress = () => {
    const previousMonthDate = new Date(customDate);
    previousMonthDate.setMonth(new Date(customDate).getMonth() - 1);
    _setDate(new Date(previousMonthDate).toISOString());
    setSelectedMonth(new Date(previousMonthDate));
    setCustomDate(new Date(previousMonthDate));
    // Logic to navigate to the previous month
  };
  const handleArrowClick = () => {
    // Do nothing or add logic to handle arrow clicks
  };
  return (
    <_View
      style={{
        width: '100%',
        borderRadius: 15,
      }}
    >
      <_Text
        style={{
          color: 'black',
          textAlign: 'left',
          fontSize: 14,
          width: '100%',
          marginTop: 10,
          fontFamily: CommonStyles.fonts.semiBold,
          // marginLeft: 27,
        }}
      >
        {`${dashboardScreen.UpcomingEvents.replace(
          'Events',
          terminologies['Event']?.pluralLabel,
        )}`}
      </_Text>
      {loadingDates ? (
        <_View height={300}>
          <_ActivityIndicator showText={false} />
        </_View>
      ) : (
        <Calendar
          hideExtraDays
          current={selectedMonth}
          onPressArrowLeft={handleArrowClick}
          onPressArrowRight={handleArrowClick}
          renderArrow={(direction) => null}
          renderHeader={(date) => {
            return (
              <CustomCalendarHeader
                // month={date.toString('MMMM')}
                month={customDate.toString()}
                // year={customDate.year()}
                onPressPrev={handlePrevPress}
                onPressNext={handleNextPress}
              />
            );
          }}
          style={{
            width: Platform.select({
              android: isTablet ? "100%" : '105%',
              ios: isTablet ? "105%" : '110%'
            }),
            marginLeft: Platform.OS == 'android' ? -8 : -20,
            marginTop: 10,
            backgroundColor: whiteThemeColors.background,
            borderRadius: 16,
            marginBottom: '20%',
            height: 300,
          }}
          onDayPress={(day) => {
            _showDetailsOnDay(day.dateString);
          }}
          onVisibleMonthsChange={(monthChanges) =>
            _setDate(new Date(monthChanges[0].dateString).toISOString())
          }
          markedDates={EventsDateArray}
          theme={{
            textSectionTitleColor: whiteThemeColors.primary,
            selectedDayBackgroundColor: whiteThemeColors.white,
            textDayHeaderFontFamily: CommonStyles.fonts.regular,
            selectedDayTextColor: whiteThemeColors.white,
            dayTextColor: whiteThemeColors.greyDark,
            textDayStyle: {
              fontFamily: CommonStyles.fonts.bold,
              color: whiteThemeColors.primary,
              textSize: 16,
              fontWeight: '500',
            },
            textDisabledColor: whiteThemeColors.greenLite,
            // selectedDotColor: whiteThemeColors.primary,
            // dotColor: whiteThemeColors.primary,
            arrowColor: whiteThemeColors.greyDark,
            monthTextColor: whiteThemeColors.greyDark,
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
      )}

      {alertModalVisible && (
        <CustomAlert
          visible={alertModalVisible}
          title={alertTitle}
          msg={alertMsg}
          firstBtn={'Okay'}
          firstBtnFunc={() => setAlertModalVisible(false)}
        />
      )}
      {isModalVisible && arr.length > 0 && (
        <_View
          style={{
            zIndex: 10,
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: whiteThemeColors.white,
            borderRadius: 20,
            padding: 10,
          }}
        >
          <_View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 40,
            }}
          >
            <_View style={{ width: '100%', alignItems: 'center' }}>
              <_Text
                style={{
                  fontSize: 18,
                  fontFamily: CommonStyles.fonts.semiBold,
                }}
              >
                Select Year
              </_Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: whiteThemeColors.background,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 10,
                }}
              >
                <_VectorIcons
                  type={'Entypo'}
                  name='cross'
                  size={20}
                  color={whiteThemeColors.black}
                />
              </TouchableOpacity>
            </_View>

            <TouchableNativeFeedback onPress={() => setIsModalVisible(false)}>
              <_View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              ></_View>
            </TouchableNativeFeedback>
          </_View>
          <ScrollView nestedScrollEnabled>
            <_View
              style={{
                alignItems: 'center',
                zIndex: 25,

                width: '100%',
                height: '100%',
              }}
            >
              {arr.map((year) => (
                <TouchableOpacity
                  key={year}
                  onPress={() => {
                    GetEventsDetails(
                      dayjs().subtract(dayjs().year() - year, 'years'),
                    );
                    setCustomDate((prev) =>
                      dayjs().subtract(dayjs().year() - year, 'years'),
                    );
                    setIsModalVisible(false);
                  }}
                >
                  <_View style={{ width: '100%', marginBottom: 25 }}>
                    <_Text
                      style={{
                        fontSize: 16,
                        fontFamily: CommonStyles.fonts.medium,
                      }}
                    >
                      {year}
                    </_Text>
                  </_View>
                </TouchableOpacity>
              ))}
            </_View>
          </ScrollView>
        </_View>
      )}
    </_View>
  );
};

export const Events = React.memo(Event);
const styles = StyleSheet.create({
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: isTablet?'98%':'100%',
    marginBottom: 20,
    alignItems: 'center',
    marginLeft:isTablet?0: -15,
  },
  prevButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 10,
  },
  centerView: {
    width: 150,
    height: 30,
    backgroundColor: whiteThemeColors.primary,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  text: {
    fontFamily: CommonStyles.fonts.regular,
    color: 'white',
    textAlign: 'center',
  },
  nextButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 10,
  },
});
