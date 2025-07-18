import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { DayTimeSubList, InstructorsView } from '.';
import { _Text, _View } from '../../../../../components';
import { whiteThemeColors } from '../../../../../Utilities';
import { TextPair } from '../../Components';
import { styles } from '../styles';

interface ClassCardProps {
  singleClass: any;
  terminologies: any;
  navigation: any;
  isShowRoster:boolean | any[]
}

export const ClassCard: FC<ClassCardProps> = ({ singleClass, terminologies, navigation ,isShowRoster}) => {
  const weekDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

  return (
    <_View
      style={{ paddingHorizontal: 15, marginBottom: 10 }}
    >
      <_View style={styles.inner}>
        {/* { class roster button} */}
        {isShowRoster&&<Pressable style={{ position: "absolute", top: 5, right: 5, zIndex: 10, backgroundColor: whiteThemeColors.primary + 90, height: 30, width: 100, borderRadius: 8 }}
          onPress={() => {
            navigation.navigate("ClassRoster", { classId: singleClass?.classId })
          }}>
          <_Text
            style={styles.rosterBtn}
          >{`${terminologies['Class']?.label} Roster`}</_Text>
        </Pressable>}
        <TextPair
          label={`${terminologies['Class']?.label} Name`}
          value={singleClass?.className}
          width="60%" />
       {singleClass?.courseTitle&& <TextPair label={`${terminologies['Course']?.label} Name`} value={singleClass?.courseTitle} width='100%' />}

        <TextPair label={`${terminologies['Class']?.label} Date`} value={singleClass?.dateFromTo}  width='100%'/>

        <_View flex={1} flexDirection='row'>
          <TextPair label='Amount' value={singleClass?.amount} width='50%' />
          <TextPair label='Fee' value={singleClass?.fee} width='50%' />
        </_View>
        <_View flex={1} flexDirection='row'>
          <TextPair label='Slots Left' value={singleClass?.totalSlots.remainingSlots} width='50%' />
          <TextPair label='No Of Slots' value={singleClass?.totalSlots.noOfAvailableSlots} width='50%' />
        </_View>
        <_View flex={1} flexDirection='row'>
          <TextPair label='No Of Enrolled' value={singleClass?.noOfEnrolled} width='50%' />
          <TextPair label='Level' value={singleClass?.courseLevelName} width='50%' />
        </_View>
        <_View flex={1} flexDirection='row'>
          <TextPair label='Display Website' value={Boolean(singleClass?.isActive) ? "Yes" : "No"} width='50%' />
          <TextPair label={`${terminologies['Coupon']?.label}`} value={Boolean(singleClass?.isCuoponExist) ? "Exist" : "Not Exist"} width='50%' />
        </_View>
        <_Text style={{ ...styles.value, marginTop: 10 }}>{`${terminologies['Class']?.label} Timings`}</_Text>
        <_View style={styles.week}>
          {singleClass.dateFromTo && <_Text style={[styles.courseName, { marginVertical: 5, alignSelf: "center" }]}>
            {`${singleClass?.dateFromTo?.replace("From ", "")}`}
          </_Text>}
          {singleClass?.classDaysTimingList.map((obj, index) => {
            return (
              <>
                <DayTimeSubList dayTime={obj} weekDays={weekDays} />
                <_View style={styles.instructorViewBg}>
                  <_Text style={styles.key2}>Instructor(s)</_Text>
                  <_View style={styles.staffCon}>
                    <InstructorsView instructors={obj?.instructorName} />
                  </_View>
                </_View>
              </>
            );
          })}
        </_View>

      </_View>
    </_View>
  );
};
