import { _Text, _VectorIcons, _View } from 'components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import CommonStyles from '../.../../../../CommonStyles';
import { ClassCard } from './ClassCard';

interface CourseClassCardProps {
  courseDetails: {
    id: number;
    name: string;
    isSelected: boolean | undefined;
    subscriptionName: string;
    courseClasses: any[]; // Assuming courseClasses is an array of class objects
    courseLevels: { levelClasses: any[] }[];
  };
  onSelect: (id: number) => void;
  selectedClasses: Set<number>;
}

export const CourseClassCard: React.FC<CourseClassCardProps> = ({
  courseDetails,
  onSelect,
  selectedClasses,
}) => {
  const { subscriptionName, courseClasses, courseLevels } = courseDetails;
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

  return (
    <>
      {courseClasses.length > 0 || courseLevels.length > 0 ? (
        <_View style={styles.cardWrapper}>
          <_View style={styles.card}>
            <_View style={styles.iconBackground}>
              <_VectorIcons
                size={25}
                type={'MaterialCommunityIcons'}
                name={'clipboard-text-outline'}
                color={`${whiteThemeColors.primary}90`}
              />
            </_View>
            <_View flexDirection='row' style={styles.content}>
              <_View width='90%'>
                <_Text
                  style={styles.courseNameText}
                >{`${terminologies['Course']?.label} Name`}</_Text>
                <_Text style={styles.courseName}>{subscriptionName}</_Text>
              </_View>
            </_View>
          </_View>
          <_View style={styles.classesWrapper}>
            {/* Render Course Classes */}
            {courseClasses.map((classItem: any) => (
              <ClassCard
                key={classItem.classId}
                classItem={classItem}
                onSelectClass={onSelect}
                isSelected={selectedClasses.has(classItem.classId)}
              />
            ))}
            {/* Render levelClasses */}
            {courseLevels.map((level: any) =>
              level.levelClasses.map((classItem: any) => (
                <ClassCard
                  key={classItem.classId}
                  classItem={classItem}
                  onSelectClass={onSelect}
                  isSelected={selectedClasses.has(classItem.classId)}
                />
              )),
            )}
          </_View>
        </_View>
      ) : (
        <></>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 10,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${whiteThemeColors.primary}30`,
    borderWidth: 1,
    borderColor: `${whiteThemeColors.primary}90`,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  classesWrapper: {
    padding: 15,
    paddingTop: 0,
  },
  courseName: {
    width: '95%',
    fontSize: 14,
    marginBottom: 5,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  courseNameText: {
    fontSize: 12,
    color: 'gray',
    fontFamily: CommonStyles.fonts.regular,
    marginBottom: 5,
  },
});
