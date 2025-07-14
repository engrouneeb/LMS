import { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { _Text, _VectorIcons, _View } from 'components';
import { whiteThemeColors } from 'utilities';
import CommonStyles from 'screens/CommonStyles';

interface TimeEntry {
  dayID: number | undefined;
  startTime: string;
  timeTo: string;
  endTime: string;
  dayDate: string;
  scheduleID: number;
  makeupClassId: number;
}

interface scheduleCard {
  item: TimeEntry;
  onSelectSchedule: (item: TimeEntry) => void;
  selected: TimeEntry | undefined;
}

export const Schedule: FC<scheduleCard> = ({
  item,
  onSelectSchedule,
  selected,
}) => {
  const { dayDate, startTime, endTime, scheduleID } = item;
  const isSelected = selected && selected.scheduleID === scheduleID;

  const calculateTotalMinutes = (
    startTime: string,
    endTime: string,
  ): number => {
    const [startHour, startMinute, startSecond] = startTime
      .split(':')
      .map(Number);
    const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);

    const startDate = new Date();
    const endDate = new Date();

    // Set the start time
    startDate.setHours(startHour, startMinute, startSecond, 0);

    // Set the end time, adjust if it's on the next day
    if (
      endHour < startHour ||
      (endHour === startHour && endMinute < startMinute) ||
      (endHour === startHour &&
        endMinute === startMinute &&
        endSecond < startSecond)
    ) {
      endDate.setDate(endDate.getDate() + 1);
    }
    endDate.setHours(endHour, endMinute, endSecond, 0);

    // If start time and end time are exactly the same, return 0
    if (startDate.getTime() === endDate.getTime()) {
      return 0;
    }

    // Calculate the difference in milliseconds
    const differenceMs = endDate.getTime() - startDate.getTime();
    return Math.abs(Math.round(differenceMs / (1000 * 60)));
  };

  const convertToAMPMFormat = (time: string): string => {
    const [hour, minute, second] = time.split(':').map(Number);
    let formattedHour = hour % 12;
    formattedHour = formattedHour === 0 ? 12 : formattedHour;
    const period = hour >= 12 ? 'PM' : 'AM';
    return `${formattedHour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}:${second.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <TouchableOpacity
      onPress={() => onSelectSchedule(item)}
      style={[
        styles.card,
        {
          backgroundColor: isSelected
            ? whiteThemeColors.primary + 10
            : whiteThemeColors.white,
        },
      ]}
    >
      <_View flex={1} flexDirection='row'>
        <_View style={styles.userIcon}>
          <_VectorIcons
            color={whiteThemeColors.primary}
            size={20}
            type={'FontAwesome'}
            name={'user'}
          />
        </_View>
        <_View>
          <_View flexDirection='row'>
            <_View marginRight={10}>
              <_Text style={styles.heading}>Date</_Text>
              <_Text>{moment(dayDate).format('MMM-DD-YYYY')}</_Text>
            </_View>
            <_View>
              <_Text style={styles.heading}>Time From</_Text>
              <_Text>{convertToAMPMFormat(startTime)}</_Text>
            </_View>
          </_View>
          <_View>
            <_View flexDirection='row' marginVertical={10}>
              <_View marginRight={10}>
                <_Text style={styles.heading}>Time To</_Text>
                <_Text>{convertToAMPMFormat(endTime)}</_Text>
              </_View>
              <_View marginLeft={10}>
                <_Text style={styles.heading}>Total Minutes</_Text>
                <_Text>{calculateTotalMinutes(startTime, endTime)}</_Text>
              </_View>
            </_View>
          </_View>
        </_View>
      </_View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginVertical: 5,
    padding: 10,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: whiteThemeColors.primary + 20,
    borderColor: whiteThemeColors.primary,
    borderWidth: 0.5,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: whiteThemeColors.primary,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
    textAlign: 'left',
  },
});
