import { _Text, _VectorIcons, _View } from 'components';
import React, { FC, memo, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

interface CardWrapperInterface {
  cardOnPress: () => void;
  courseName: string;
  title: string;
  homeworkPriority?: string;
  children?: ReactNode;
}

export const CardWrapper: FC<CardWrapperInterface> = memo(
  ({ cardOnPress, courseName, title, homeworkPriority, children }) => {
    return (
      <_View style={styles.container}>
        <TouchableOpacity onPress={cardOnPress}>
          <_View style={styles.courseContainer}>
            <_VectorIcons
              name={'my-library-books'}
              type={'MaterialIcons'}
              color={whiteThemeColors.primaryDark}
              size={22}
            />
            <_Text numberOfLines={2} style={styles.courseName}>
              {courseName}
            </_Text>
          </_View>
          <_View style={styles.titleContianer}>
            <_Text style={styles.title}>Title: {title}</_Text>
          </_View>

          <_View style={styles.tagContainer}>
            <_Text style={styles.tag}>{homeworkPriority || 'low'}</_Text>
          </_View>

          {children}
        </TouchableOpacity>
        <_View style={styles.iconContainer}>
          <_VectorIcons
            name={'arrowright'}
            type={'AntDesign'}
            color={whiteThemeColors.primary}
            size={18}
          />
        </_View>
      </_View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: whiteThemeColors.white,
    marginVertical: 5,
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
    marginLeft: 7,
    width: '100%',
    textAlign: 'left',
  },
  titleContianer: {
    paddingLeft: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 11,
    paddingLeft: 20,
    fontFamily: CommonStyles.fonts.regular,
  },
  tagContainer: {
    position: 'absolute',
    top: 3,
    right: 5,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tag: {
    fontSize: 11,
    color: 'white',
    fontFamily: CommonStyles.fonts.medium,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: whiteThemeColors.primary + 30,
    width: 25,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
