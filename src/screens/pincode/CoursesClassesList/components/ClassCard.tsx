import { _Text, _VectorIcons, _View } from 'components';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';

interface ClassCardInterface {
  classItem: any;
  onSelectClass: (classId: number) => void;
  isSelected: boolean;
}

export const ClassCard: FC<ClassCardInterface> = ({
  classItem,
  onSelectClass,
  isSelected = false,
}) => {
  const { classId, className, date } = classItem;
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
    <_View style={styles.container}>
      <TouchableOpacity
        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
        onPress={() => {
          onSelectClass(classId);
        }}
        style={styles.iconContainer}
      >
        <_VectorIcons
          name={'checkcircle'}
          type={'AntDesign'}
          size={18}
          color={isSelected ? whiteThemeColors.primary : 'grey'}
        />
      </TouchableOpacity>
      <_View style={styles.courseContainer}>
        <_VectorIcons
          name={'my-library-books'}
          type={'MaterialIcons'}
          color={whiteThemeColors.primaryDark}
          size={25}
        />
        <_View flex={1} marginLeft={5}>
          <_Text
            style={styles.className}
          >{`${terminologies['Class']?.label} Name`}</_Text>
          <_Text numberOfLines={3} style={styles.courseName}>
            {className}
          </_Text>
        </_View>
      </_View>
      <_View style={styles.titleContianer}>
        <_Text style={styles.title}>{`Date: ${date}`} </_Text>
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: whiteThemeColors.background,
    marginVertical: 5,
    borderColor: whiteThemeColors.background,
    borderWidth: 1,
  },
  courseContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  courseName: {
    color: whiteThemeColors.black,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
    width: '85%',
    textAlign: 'left',
  },
  titleContianer: {
    width: '90%',
    paddingLeft: 10,
    numberOfline: 2,
    marginBottom: 10,
    marginLeft: 22,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 11,
    paddingLeft: 20,
    fontFamily: CommonStyles.fonts.regular,
  },
  tag: {
    fontSize: 11,
    color: 'white',
    fontFamily: CommonStyles.fonts.medium,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    backgroundColor: whiteThemeColors.white,
    padding: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  className: {
    fontSize: 12,
    color: 'gray',
    fontFamily: CommonStyles.fonts.regular,
    marginBottom: 2,
  },
});
