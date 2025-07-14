export interface ReviewTabInterface {
  isActive: boolean;
  reviewsResponse: ReviewsResponse;
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  courseID: number;
  courseImage: string;
  courseName: string;
  role: string;
  userID: number;
}

interface ReviewsResponse {
  listOfCourseReviews?: any;
  ratingDetail: RatingDetail;
  reviewId: any;
  rating: any;
  review: any;
}

interface RatingDetail {
  finalRating: number;
  finalRatingPercentage: string;
  numberOfFiveStar: number;
  numberOfFiveStarPercentage: string;
  numberOfFourStar: number;
  numberOfFourStarPercentage: string;
  numberOfOneStar: number;
  numberOfOneStarPercentage: string;
  numberOfThreeStar: number;
  numberOfThreeStarPercentage: string;
  numberOfTwoStar: number;
  numberOfTwoStarPercentage: string;
  totalNumberOfReviews: number;
}
