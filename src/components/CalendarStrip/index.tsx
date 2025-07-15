import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { DateTimePickerIos, whiteThemeColors } from '../../Utilities';

import { _VectorIcons, _View } from '../../components';
import CommonStyles from '../../screens/CommonStyles';
interface props {
  weekStart: any;
  updateWeekDateOnWeekChange: (week: any) => void;
  posType?: any;
  handleScrollToDate?: (date: any) => void;
}
const CustomCalendar: React.FC<props> = ({
  weekStart,
  updateWeekDateOnWeekChange,
  handleScrollToDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<any>(moment());

  const [IsVisible, setIsVisible] = useState(false);
  useMemo(() => {
    setSelectedDate(weekStart);
  }, [weekStart]);

  const leftRightIcon = (direction: string) => (
    <_View style={styles.directionalArrowContainer}>
      <_VectorIcons
        type='FontAwesome'
        name={`chevron-${direction}`}
        size={18}
        color={whiteThemeColors.primary}
      />
    </_View>
  );

  const onConfirmDate = (date: any) => {
    setSelectedDate(date);
    updateWeekDateOnWeekChange(moment(date).startOf('week'));
  };

  return (
    <_View style={styles.container}>
      <TouchableOpacity
        style={[styles.btnContainer]}
        onPress={() => setIsVisible(true)}
      >
        <_VectorIcons
          type='Feather'
          name='calendar'
          size={25}
          color={whiteThemeColors.primary}
        />
      </TouchableOpacity>
      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 40 }}
        selectedDate={selectedDate}
        calendarHeaderContainerStyle={styles.calendarHeaderContainer}
        style={[styles.calendarStripContainer]}
        calendarHeaderStyle={styles.headerTitleTxt}
        calendarColor={whiteThemeColors.background}
        dateNumberStyle={styles.deSelectedDateTxt}
        dateNameStyle={styles.deSelectedDateTxt}
        leftSelector={leftRightIcon('left')}
        rightSelector={leftRightIcon('right')}
        highlightDateNumberStyle={styles.selectedDateTxt}
        highlightDateNameStyle={styles.selectedDateTxt}
        iconContainer={{ flex: 0.15 }}
        useIsoWeekday={false}
        startingDate={weekStart}
        onWeekChanged={(date) => updateWeekDateOnWeekChange(date)}
        shouldAllowFontScaling={false}
        onDateSelected={handleScrollToDate}
      />

      {IsVisible && (
        <DateTimePickerIos
          onConfirm={(date) => onConfirmDate(date)}
          data={new Date()}
          mode='date'
          isVisible={IsVisible}
          setisVisible={setIsVisible}
        />
      )}
    </_View>
  );
};

export const Calendar_Strip = React.memo(CustomCalendar);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 60,
    width: '100%',
  },
  calendarStripContainer: {
    height: 98,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
  calendarHeaderContainer: {
    marginBottom: 5,
  },
  iconLeftRight: {
    color: whiteThemeColors.black,
    padding: 5,
    flex: 1,
  },
  headerTitleTxt: {
    color: whiteThemeColors.black,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  deSelectedDateTxt: {
    color: whiteThemeColors.greyDark,
    fontSize: 11,
    fontFamily: CommonStyles.fonts.regular,
  },
  selectedDateTxt: {
    color: whiteThemeColors.black,
    fontSize: Platform.OS == 'android' ? 13 : 13,
    fontFamily: CommonStyles.fonts.regular,
  },
  btnContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    left: '4%',
    width: '20%',
    height: 40,
  },
  directionalArrowContainer: {
    width: 30,
    height: 30,
    backgroundColor: whiteThemeColors.primary + 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
