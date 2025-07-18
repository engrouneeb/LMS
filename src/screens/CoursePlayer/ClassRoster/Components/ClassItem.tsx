import { _Text, _View } from '../../../../components';
import React from 'react';
import { InstructorsView } from '../ClassOverview/Components';
import { ContactCard, styles, TextPair, TimingItem } from "./";

interface Props {
  singleClass: {
    addOns: any;
    studentFirstName: string;
    studentLastName: string;
    studentGrade: string;
    studentAge: string
    className: string;
    timings: string[];
    courseModule: string;
    contactName: string;
    contactPhone: string;
    staffNames: string;
    specialNeeds?: string;
    policiesStatus?: string;
    contactEmail?: string;
    classStartDate: string;
    classEndDate: string
    dayTimeSubLists: [{ timingLists: string, formattedDays: string[] }];
    contactEmai: string; instructors: string;
  };
  terminologies: Record<string, { label: string }>;
  whiteThemeColors: { primary: string };

}

export const ClassItem: React.FC<Props> = ({ singleClass, terminologies, whiteThemeColors }) => {
  const weekDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

  return (
    <_View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
      <_View style={styles.inner}>
        <TextPair label="Student Name" value={`${singleClass.studentFirstName} ${singleClass.studentLastName}`} iconName='account' width="100%"
        />
        <TextPair
          label={`${terminologies['Class']?.label} Name`}
          value={singleClass.className}
          iconName='book'
          width="100%"
        />

        <_View flex={1} flexDirection="row">
          <TextPair label={`${terminologies['Class']?.label} Start Date`} value={singleClass.classStartDate} iconName='calendar-clock'
          />
          <TextPair label={`${terminologies['Class']?.label} End Date`} value={singleClass.classEndDate} width="50%" iconName='calendar-clock'
          />
        </_View>

        <_View flex={1} flexDirection="row">
          <TextPair label="Student Age" value={singleClass.studentAge} iconName='calendar-month-outline'
          />
          <TextPair label="Student Grade" value={singleClass.studentGrade} width="50%" iconName='chart-timeline'
          />
        </_View>
       {singleClass.addOns&& <TextPair
          label='Add Ons'
          value={singleClass.addOns}
          width='100%'
          iconName='puzzle-outline'
        />}

       {singleClass.specialNeeds&& <TextPair
          label='Special Needs'
          value={singleClass.specialNeeds}
          width='100%'
          iconName='dots-hexagon'

        />}
       {singleClass.policiesStatus&& <TextPair
          label='Policies Status'
          value={singleClass.policiesStatus}
          width='100%'
          iconName='file-document-multiple'

        />}
        <ContactCard singleClass={singleClass} />
        <_Text style={{ ...styles.key, marginVertical: 10 }}>{`${terminologies['Class']?.label} Timings`}</_Text>
        <_View style={styles.timingWrapper}>
          <_View style={styles.week}>
            <TimingItem dayTimeSubLists={singleClass.dayTimeSubLists} weekDays={weekDays} />
          </_View>
        </_View>
        <_Text style={[styles.key2, { marginTop: 10 }]}>Instructor(s)</_Text>
        <_View style={styles.instructorViewBg}>
          <_View style={styles.staffCon}>
            <InstructorsView instructors={singleClass.instructors} />
          </_View>
        </_View>
      </_View>
    </_View>
  );
};
