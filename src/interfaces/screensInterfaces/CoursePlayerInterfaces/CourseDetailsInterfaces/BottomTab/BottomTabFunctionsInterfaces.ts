type ObjectValueType = { name: string };
export interface BottomTabScreensNamesInterfaces {
  authLoading?: ObjectValueType;
  getStarted?: ObjectValueType;
  chatUsers?: ObjectValueType;
  chatInterface?: ObjectValueType;
  cancelClass?: ObjectValueType;
  attendanceDate?: ObjectValueType;
  attendanceDetail1?: ObjectValueType;
  attendance?: ObjectValueType;
  attendanceViewByClass?: ObjectValueType;
  attendanceClassTimings?: ObjectValueType;
  markClassAttendance?: ObjectValueType;
  addMakeupClass?: ObjectValueType;
  offline?: ObjectValueType;
  timeSheet?: ObjectValueType;
  timeSheetDetails?: ObjectValueType;
  timeTracker?: ObjectValueType;
  schedule?: ObjectValueType;
  ScheduleUserListView?: ObjectValueType;
  splashScreen?: ObjectValueType;
  timeOff?: ObjectValueType;
  wages?: ObjectValueType;
  wagesAdmin?: ObjectValueType;
  wagesInstructor?: ObjectValueType;
  addUpdateWage?: ObjectValueType;
  updateWage?: ObjectValueType;
  wageDetailIndividualUser?: ObjectValueType;
  staffSchedule?: ObjectValueType;
  adminSchedule?: ObjectValueType;
  requests?: ObjectValueType;
  timeOffRequests?: ObjectValueType;
  timeSheetRequests?: ObjectValueType;
  coverRequests?: ObjectValueType;
  expenseRequests?: ObjectValueType;
  myRequestsDetails?: ObjectValueType;
  setupScreen?: ObjectValueType;
  scheduleWeekView?: ObjectValueType;
  addSchedule?: ObjectValueType;
  instructorList?: ObjectValueType;
  coursePlayer?: ObjectValueType;
  courseContent?: ObjectValueType;
  courseClasses?: ObjectValueType;
  messageToClass?: ObjectValueType;
  courseAssignment?: ObjectValueType;
  general?: ObjectValueType;
  videoPlayer?: ObjectValueType;
  azurevideoPlayer?: ObjectValueType;
  onlineAssessment?: ObjectValueType;
  notesRecording?: ObjectValueType;
  htmlProjectStep?: ObjectValueType;
  youtubeWebView?: ObjectValueType;
  onlineNotes?: ObjectValueType;
  challengeDetail: any;
  audioChallenge?: ObjectValueType;
  courseDetails: any;
  submitChallenge?: ObjectValueType;
  webView?: ObjectValueType;
  download?: ObjectValueType;
  NoteDetials?: ObjectValueType;
  AudioPlayer?: ObjectValueType;
  VideoPlayer?: ObjectValueType;
  OnlineNotesAttachmentView?: ObjectValueType;
  homeWork?: ObjectValueType;
  signInScreen?: ObjectValueType;
  Eula?: ObjectValueType;
  forgetScreen?: ObjectValueType;
  logout?: ObjectValueType;
  message?: ObjectValueType;
  backBtn?: ObjectValueType;
  courses?: ObjectValueType;
  IndividualCheckIn?: ObjectValueType;
  GroupCheckin?: ObjectValueType;
  userProfile?: ObjectValueType;
  SingleStudentAssessmentList?: ObjectValueType;
  StudentProgress?: ObjectValueType;
  SingleStudentProgress?: ObjectValueType;
  StudentProgressList?: ObjectValueType;
  StudentAssessment?: ObjectValueType;
  StudentAssessmentDetials?: ObjectValueType;
  StudentAssessmentList?: ObjectValueType;
  StudentOnlineClassesList?: ObjectValueType;
  StudentInfoDetials?: ObjectValueType;
  SecurePage?: ObjectValueType;
  loginEnroll?: ObjectValueType;
  franchiseSelection?: ObjectValueType;
  franchiseSecure?: ObjectValueType;
  enrollmentScreen?: ObjectValueType;
  secureFranchise?: ObjectValueType;
  selectTypes?: ObjectValueType;
  articles?: ObjectValueType;
  articleDetails?: ObjectValueType;
  addToClass?: ObjectValueType;
  addPaymentMethod?: ObjectValueType;
  Announcement?: ObjectValueType;
  DayDetails?: ObjectValueType;
  EventDetails?: ObjectValueType;
  AnnouncementDetails?: ObjectValueType;
  HomeWorks?: ObjectValueType;
  AddNewItem?: ObjectValueType;
  StoreHome?: ObjectValueType;
  Shipment?: ObjectValueType;
  Transactions?: ObjectValueType;
  AddRedeemCode?: ObjectValueType;
  Calendar?: ObjectValueType;
  Camera?: ObjectValueType;
}

export interface GetCourseAttachmentsResponseInterface {
  res?: courseattachmen;
}
interface courseattachmen {
  attachments: any[];
  isAddable: boolean;
  isDeletable: boolean;
  isDownloadable: boolean;
  isViewable: boolean;
  status: number;
}

type AttachmentFolderType = { value: number; folderName: string };

export interface AttachmentTypeInterface {
  UserStory: AttachmentFolderType;
  Epic: AttachmentFolderType;
  Inventory?: AttachmentFolderType;
  HomeView?: AttachmentFolderType;
  SubmitCoursePlayerHomework?: AttachmentFolderType;
  InstructorHomeWorkAttachments?: AttachmentFolderType;
  StudentDriveAttachments?: AttachmentFolderType;
  Student?: AttachmentFolderType;
}

export interface GetDiscussionResponseInterface {
  cds_temp_guid?: any;
  comment: string;
  commentId: number;
  companyKey?: any;
  createdById: number;
  createdDate: string;
  discussionCount: number;
  guid?: any;
  imagePath: string;
  isLiked: boolean;
  itemId: number;
  likeCount: string;
  moduleId: number;
  parentId: number;
  repliedToComment?: any;
  reply: any[];
  replyCount: string;
  userColor: string;
  userName: string;
  userTagsString?: string;
}

export interface GetDiscussionResponseWithStatusInterface
  extends GetDiscussionResponseInterface {
  status: number;
}

export interface GetReviewDetailInterface {
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

export interface GetCourseReviewAgainstUserInterface {
  reviewId: number;
  courseId: number;
  userId: number;
  rating: number;
  review?: any;
  userFullName?: any;
  isShow: boolean;
  userImage?: any;
  createdDateString?: any;
  createdDate: string;
  status: number;
}

export interface GetCourseReviewsInterface {
  listOfCourseReviews: any[];
  ratingDetail: RatingDetail;
  status: number;
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
