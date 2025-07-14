import React from 'react';
import { _View, _Text } from 'components';
import { TextPair, TimingItem, ContactCard, styles } from "."

interface Props {
  singleClass: {
    addOns: any;
    studentFirstName: string;
    studentLastName: string;
    studentGrade: string;
    studentAge: string
    eventName: string;
    timings: string[];
    courseModule: string;
    contactName: string;
    contactPhone: string;
    staffNames: string;
    specialNeeds?: string;
    policiesStatus?: string;
    contactEmail?: string;
    eventStartDate: string;
    eventEndDate: string
    eventTimings:string;
    dayTimeSubLists: [{ timingLists: string, formattedDays: string[] }];
    contactEmai: string; instructors: string;
  };
  terminologies: Record<string, { label: string }>;
  whiteThemeColors: { primary: string };

}

export const EventItem: React.FC<Props> = ({ singleClass, terminologies, whiteThemeColors }) => {
  return (
    <_View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
      <_View style={styles.inner}>
        <TextPair label="Student Name" value={`${singleClass.studentFirstName} ${singleClass.studentLastName}`} iconName='account'
         />
         <_View flex={1} flexDirection='row'>
         <TextPair
          label={`${terminologies['Event']?.label} Name`}
          value={singleClass.eventName}
          iconName='book'
          width='50%'
        />
        <TextPair label={`${terminologies['Event']?.label} Timings`} value={singleClass.eventTimings} iconName='clock-outline'
           />
         </_View>
        <_View flex={1} flexDirection="row">
          <TextPair label={`${terminologies['Event']?.label} Start Date`} value={singleClass.eventStartDate} iconName='calendar'
           />
          <TextPair label={`${terminologies['Event']?.label} End Date`} value={singleClass.eventEndDate} width="50%" iconName='calendar'
           />
        </_View>
          

        <_View flex={1} flexDirection="row">
          <TextPair label="Student Age" value={singleClass.studentAge} iconName='calendar-month-outline'
           />
          <TextPair label="Student Grade" value={singleClass.studentGrade} width="50%" iconName='chart-timeline'
           />
        </_View>

        <TextPair
          label='Special Needs'
          value={singleClass.specialNeeds}
          width='100%'
          iconName='dots-hexagon'
        
        />
        <TextPair
          label='Polices Status'
          value={singleClass.policiesStatus}
          width='100%'
          iconName='file-document-multiple'
        
        />
        <ContactCard singleClass={singleClass} />
      </_View>
    </_View>
  );
};
