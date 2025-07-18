import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import Rating from '../../../../Ratings';
import CommonStyles from '../../../../CommonStyles';

const CardBottom = (props: any) => {
  return (
    <_View style={styles.textContainer}>
      <_View style={styles.nameContainer}>
        <_Text numberOfLines={2} style={styles.name}>
          {props.item.courseName}
        </_Text>
      </_View>

      <_View style={styles.bottomContainer}>
        <_View style={styles.userContainer}>
          <_Text
            style={{ fontFamily: CommonStyles.fonts.light, fontSize: 10 }}
          >{`${props.item.numberOfLessons}+ Lessons to learn`}</_Text>
          <_Text
            style={{ fontFamily: CommonStyles.fonts.light, fontSize: 10 }}
          >{`${props.item.numberOfStudents}+ Student enrolls`}</_Text>
        </_View>
      </_View>
      <TouchableOpacity style={styles.ratingContainer} onPress={props.onPress}>
        <Rating
          rating={props.item.courseRatingDetail.finalRating}
          maxStars={5}
          size={12}
          reviewsCount={props.item.courseRatingDetail.totalNumberOfReviews}
          textStyle={styles.rating}
        />
      </TouchableOpacity>
    </_View>
  );
};

export default CardBottom;

const styles = StyleSheet.create({
  textContainer: {
    flex: 2,
    padding: 5,
    justifyContent: 'flex-start',
  },
  nameContainer: {
    // marginTop: 7,
    // marginBottom: 4,
  },
  name: {
    textTransform: 'capitalize',
    paddingRight: 10,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.semiBold,
    maxWidth:"60%"
  },

  ratingContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
  rating: {
    fontSize: 13,
  },
  bottomContainer: {
    flex: 1,
    // justifyContent: 'flex-end',
  },
  userContainer: {
    marginTop: 5,
  },
  lessonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  bookIcon: {
    marginBottom: -2,
    paddingHorizontal: 4,
  },
  lessonsNo: {
    fontSize: 13,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  userIcon: {
    fontSize: 13,
    marginBottom: -2,
    paddingHorizontal: 4,
  },
  userCount: {
    fontSize: 13,
    marginBottom: -2,
    color: whiteThemeColors.greyDark,
  },
  courseText: {
    width: 80,
    height: 20,
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  course: {
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.primary,
    fontSize: 12,
  },
});
