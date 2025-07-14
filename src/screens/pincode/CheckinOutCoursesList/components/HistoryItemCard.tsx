import React, { FC, useEffect, useState } from 'react';
import { _VectorIcons, _Text, _View } from 'components';
import { whiteThemeColors } from '../../../../Utilities/colors';
import {
  convertUTCDateToLocalDateStringFormat,
  covertUTCDateTimeToLocalTimeStringFormat,
  getTerminologyLabel,
  TerminologyMap,
} from 'utilities';
import { styles } from '../styles';

interface CheckinOutCoursesList {
  checkinDate: string;
  checkinTime: string;
  checkoutTime: string;
  subjects: [string];
  classes: [string];
}
interface PropsTypes {
  isClass: boolean;
  item: CheckinOutCoursesList;
}
export const HistoryItemCard: FC<PropsTypes> = ({ isClass, item }) => {
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {}
  );
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);
  return (
    <_View style={styles.cardContainer}>
      <_View style={styles.containertwo}>
        <_View style={styles.classContainer}>
          <_VectorIcons
            size={20}
            type={'Ionicons'}
            name={'calendar'}
            color={`${whiteThemeColors.primary}`}
          />
          {/* <_Text style={styles.dateText}>{moment(item?.checkinDate).format("D MMMM YYYY")}</_Text> */}
          <_Text style={styles.dateText}>
            {convertUTCDateToLocalDateStringFormat(item?.checkinDate)}
          </_Text>
        </_View>
        <_View
          style={{
            width: '100%',
            borderWidth: 0.5,
            borderColor: whiteThemeColors.black + 50,
            borderRadius: 15,
            flexDirection: 'row',

            marginTop: 10,
            justifyContent: 'space-between',
            backgroundColor: whiteThemeColors.primary + 20,
          }}
        >
          <_View
            style={[
              styles.checkinContainer,
              {
                borderRightWidth: 0.5,
                borderColor: whiteThemeColors.black + 50,
              },
            ]}
          >
            <_Text style={styles.checkTextKey}>{'Check-in Time '}</_Text>

            <_View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}
            >
              <_VectorIcons
                size={20}
                type={'MaterialCommunityIcons'}
                name={'sort-clock-ascending-outline'}
                color={'gray'}
              />
              <_Text style={styles.timeText}>
                {covertUTCDateTimeToLocalTimeStringFormat(item?.checkinTime)}
              </_Text>
            </_View>
          </_View>
          <_View style={styles.checkinContainer}>
            <_Text style={styles.checkTextKey}>{'Check-out Time'}</_Text>
            <_View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}
            >
              <_VectorIcons
                size={20}
                type={'MaterialCommunityIcons'}
                name={'sort-clock-descending-outline'}
                color={'gray'}
              />
              <_Text style={styles.timeText}>
                {covertUTCDateTimeToLocalTimeStringFormat(item?.checkoutTime)}
              </_Text>
            </_View>
          </_View>
        </_View>
      </_View>
      <_View style={styles.card}>
        <_View style={styles.iconBackground}>
          <_VectorIcons
            size={18}
            type={'MaterialCommunityIcons'}
            name={'clipboard-text-outline'}
            color={`${whiteThemeColors.primary}`}
          />
        </_View>
        <_View flexDirection='row' style={styles.content}>
          <_View width='90%'>
            <_Text style={styles.courseNameText}>
              {isClass ? `${terminologies['Class']?.pluralLabel}` : 'Subjects'}
            </_Text>
            <_Text style={styles.courseName}>
              {isClass
                ? `${item?.classes.join(',')}`
                : `${item?.subjects.join(',')}`}
            </_Text>
          </_View>
        </_View>
      </_View>
    </_View>
  );
};
