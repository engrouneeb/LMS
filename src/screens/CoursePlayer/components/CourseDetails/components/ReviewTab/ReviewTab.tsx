import React, {useEffect, useState} from 'react';
import {
  _Text,
  _View,
  _TextInput,
  _VectorIcons,
  PercentageBar,
  _Image,
} from '../../../../../../components';
import {styles} from './styles';
import Rating from '../../../../../Ratings';
import {UserImg} from '../../../../../ThumbNail';
import {Alert, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {DataAccess} from '../../../../../../../data/DAL';
import img1 from '../../../../../../../assets/courseDefault.jpg';
import ApiEndPoint from '../../../../../../../data/ApiEndpoints';
import {
  getTerminologyLabel,
  isParent,
  isStudent,
  ParentInterface,
  StudentInterface,
  TerminologyMap,
  whiteThemeColors,
} from '../../../../../../Utilities';
import {ReviewTabInterface} from '../../../../../../interfaces';
import CommonStyles from '../../../../../CommonStyles';

const defaultImgPath = '/Content/Images/courseImage.png';
var clrCode = -1;

const _ReviewTab: React.FC<ReviewTabInterface> = ({
  route,
  isActive,
  reviewsResponse,
}) => {
  const {PostSecured} = DataAccess();
  const [reviews, setReviews] = useState<any>({
    listOfCourseReviews: [],
    ratingDetail: {},
  });
  const [progress, setprogress] = useState([0, 0, 0, 0, 0]);
  const [studentRating, setStudentRatings] = useState<number>(0);
  const [studentReview, setStudentReview] = useState<string>('');
  const [Disabled, setDisabled] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<number | null>();
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

  useEffect(() => {
    if (isActive) {
      if (
        isStudent(route.params.role as StudentInterface) ||
        isParent(route.params.role as ParentInterface)
      )
        getStudentParentReview();
      else getReviewDetial();
    }
  }, [reviewsResponse]);

  const getReviewDetial = () => {
    if (!reviewsResponse) return;
    if (reviewsResponse.ratingDetail) {
      setReviews(reviewsResponse);
      setReviewId(reviewsResponse.reviewId);
      setprogress([
        parseFloat(reviewsResponse?.ratingDetail.numberOfFiveStarPercentage),
        parseFloat(reviewsResponse?.ratingDetail.numberOfFourStarPercentage),
        parseFloat(reviewsResponse?.ratingDetail.numberOfThreeStarPercentage),
        parseFloat(reviewsResponse?.ratingDetail.numberOfTwoStarPercentage),
        parseFloat(reviewsResponse?.ratingDetail.numberOfOneStarPercentage),
      ]);
    }
  };

  const getStudentParentReview = () => {
    console.log('reviewsResponse', reviewsResponse);
    setStudentRatings(reviewsResponse.rating);
    setStudentReview(reviewsResponse.review);
    setReviewId(reviewsResponse.reviewId);
    if (reviewsResponse.rating == 0) setDisabled(false);
    else setDisabled(true);
  };

  const _findColor = (day: number) => {
    const colors = [
      whiteThemeColors.calenderDayColors.day1,
      whiteThemeColors.calenderDayColors.day2,
      whiteThemeColors.calenderDayColors.day3,
      whiteThemeColors.calenderDayColors.day4,
      whiteThemeColors.calenderDayColors.day5,
      whiteThemeColors.calenderDayColors.day6,
      whiteThemeColors.calenderDayColors.day7,
    ];
    if (day >= 0 && day < colors.length) {
      return colors[day];
    } else {
      return whiteThemeColors.calenderDayColors.default;
    }
  };

  const checkReview = () => {
    if (studentRating == undefined || studentRating == 0) {
      Alert.alert('Please select rating');
    } else if (studentReview == undefined || studentReview == '') {
      Alert.alert('Please give a review');
    } else postUserReview();
  };

  const postUserReview = async () => {
    var reviewObject = {
      Rating: 0,
      Review: '',
      CourseId: 0,
      reviewId: reviewId,
    };
    reviewObject.Rating = studentRating;
    reviewObject.Review = studentReview;
    reviewObject.CourseId = route.params.courseID;
    let response = await PostSecured(ApiEndPoint.AddCourseReview, reviewObject);

    if (response.error) {
      Alert.alert('Something went worrng');
      setStudentRatings(0);
      setStudentReview('');
      setDisabled(false);
    } else {
      setReviewId(response.reviewId);
      Alert.alert('Your review has been submitted successfully');
      setDisabled(true);
    }
  };

  return isStudent(route.params.role as StudentInterface) ||
    isParent(route.params.role as ParentInterface) ? (
    <_View flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <_View style={styles.container}>
          <_View style={styles.courseImgCon}>
            {[null, undefined, defaultImgPath].includes(
              route.params.courseImage,
            ) ? (
              <Image source={img1} style={styles.courseImage} />
            ) : (
              <_Image
                uri={route.params.courseImage}
                style={styles.courseImage}
              />
            )}
            <_Text numberOfLines={2} style={[styles.title, styles.courseName]}>
              {route.params.courseName}
            </_Text>
          </_View>
          <_View style={styles.submitCourseReview}>
            <_View style={styles.RatingStarView}>
              <_Text style={styles.rateText}>{'Rate :'}</_Text>
              <TouchableOpacity
                disabled={Disabled}
                onPress={() => {}}
                style={{flexDirection: 'row', marginLeft: 10}}>
                <Rating
                  rating={studentRating}
                  maxStars={5}
                  size={20}
                  emptyStarColor={whiteThemeColors.orange}
                  fullStarColor={whiteThemeColors.orange}
                  reviewsCount={0} // Hide count for interactive rating
                />
              </TouchableOpacity>
            </_View>
            <_View style={{flexDirection: 'row'}}>
              <_TextInput
                multiline
                textAlignVertical="top"
                width={'100%'}
                style={[styles.textArea]}
                value={studentReview}
                onChangeText={review => setStudentReview(review)}
              />
            </_View>
            <TouchableOpacity
              onPress={() => checkReview()}
              style={styles.btnStyle}>
              <_VectorIcons
                name="content-save-move-outline"
                type={'MaterialCommunityIcons'}
                size={20}
                color="#fff"
              />
              <_Text style={{paddingLeft: 5, paddingRight: 5, color: 'white'}}>
                {'Submit Review'}
              </_Text>
            </TouchableOpacity>
          </_View>
        </_View>
      </ScrollView>
    </_View>
  ) : (
    <ScrollView
      style={{backgroundColor: whiteThemeColors.background}}
      showsVerticalScrollIndicator={false}>
      <_View style={styles.container}>
        <_View style={styles.reviewContainer}>
          <_Text
            style={
              styles.title
            }>{`${terminologies['Course']?.label} Reviews`}</_Text>
          <_View style={styles.totalWrap}>
            <_View
              style={{
                flexDirection: 'row',
              }}>
              <Rating
                rating={reviews.ratingDetail?.finalRating}
                maxStars={5}
                size={18}
                emptyStarColor={whiteThemeColors.greyDark}
                fullStarColor={whiteThemeColors.orange}
                reviewsCount={reviews.listOfCourseReviews.length}
              />
            </_View>
            <_Text style={{fontFamily: CommonStyles.fonts.medium}}>
              {reviews.listOfCourseReviews.length} {'out of '}
              {reviews.listOfCourseReviews.length}
            </_Text>
          </_View>
          <_Text style={styles.amountText}>
            {reviews.listOfCourseReviews.length} {"Student's Rating"}
          </_Text>
          <_View style={{marginTop: 20}}>
            <_View style={styles.spacer}>
              <PercentageBar
                starText="5 star"
                percentage={progress[0]}
                starTextDisplay={'flex'}
                barColor={whiteThemeColors.orange}
              />
            </_View>
            <_View style={styles.spacer}>
              <PercentageBar
                starText="4 star"
                percentage={progress[1]}
                starTextDisplay={'flex'}
                barColor={whiteThemeColors.orange}
              />
            </_View>
            <_View style={styles.spacer}>
              <PercentageBar
                starText="3 star"
                percentage={progress[2]}
                starTextDisplay={'flex'}
                barColor={whiteThemeColors.orange}
              />
            </_View>
            <_View style={styles.spacer}>
              <PercentageBar
                starText="2 star"
                percentage={progress[3]}
                starTextDisplay={'flex'}
                barColor={whiteThemeColors.orange}
              />
            </_View>
            <_View style={styles.spacer}>
              <PercentageBar
                starText="1 star"
                percentage={progress[4]}
                starTextDisplay={'flex'}
                barColor={whiteThemeColors.orange}
              />
            </_View>
          </_View>
        </_View>
        {reviews.listOfCourseReviews.map((Obj: any) => {
          clrCode++;
          if (clrCode == 7) clrCode = 0;
          return (
            <_View
              style={{width: '95%'}}
              key={Obj.reviewId || Obj.userFullName}>
              <_View style={styles.courseReviews}>
                <_View style={styles.headerView}>
                  <UserImg
                    UserInfo={{
                      FirstName: Obj.userFullName,
                      LastName: Obj.userFullName,
                      UserImage: Obj.userImage,
                      UserImageColor: _findColor(clrCode),
                    }}
                    size={30}
                    style={{marginLeft: 10}}
                  />
                  <_View style={{flex: 0.7, marginLeft: 10}}>
                    <_Text style={styles.userName}>{Obj.userFullName}</_Text>
                    <Rating
                      size={13}
                      rating={Obj.rating}
                      maxStars={5}
                      emptyStarColor={whiteThemeColors.greyDark}
                      fullStarColor={whiteThemeColors.orange}
                      reviewsCount={1}
                    />
                  </_View>
                </_View>
                <_View style={styles.bottomView}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled>
                    <_Text numberOfLines={2} style={styles.reviewText}>
                      {Obj.review}
                    </_Text>
                  </ScrollView>
                </_View>
              </_View>
            </_View>
          );
        })}
      </_View>
    </ScrollView>
  );
};

export const ReviewTab = React.memo(_ReviewTab);
