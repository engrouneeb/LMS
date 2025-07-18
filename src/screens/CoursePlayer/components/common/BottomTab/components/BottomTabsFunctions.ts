import { endpoint } from '../../../../../../components';
import {
  AttachmentTypeInterface,
  BottomTabScreensNamesInterfaces,
  GetCourseAttachmentsResponseInterface,
  GetCourseReviewAgainstUserInterface,
  GetCourseReviewsInterface,
  GetDiscussionResponseWithStatusInterface,
  GetReviewDetailInterface,
} from '../../../../../../interfaces';
import ApiEndpoints from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import { SetAttachmentNavigateScreen } from '../../../../../../actions/CoursePlayerAction';
const { Get } = DataAccess();
export const handleWhiteBoardAttachmentTabOnChange = async (
  isWhiteBoardAttachments: boolean,
  isCourse: boolean,
  ScreensNames: BottomTabScreensNamesInterfaces,
  routePath: { params: { courseID: number; challengeId: number } },
  dispatch: any,
  setWhiteBoardAttachment: (val: any[]) => void,
) => {
  let itemId: number = isCourse
    ? routePath.params.courseID
    : routePath.params.challengeId;
  let itemType: number = isCourse ? 2 : 1;
  let screenName: string = isCourse
    ? ScreensNames.courseDetails.name
    : ScreensNames.challengeDetail.name;
  dispatch(SetAttachmentNavigateScreen(screenName));
  let url: endpoint = ApiEndpoints.GetCourseAttachment;
  url.params = `?itemId=${itemId}&itemType=${itemType}&projectType=2&isWhiteBoardFile=${isWhiteBoardAttachments}`;
  Get(url)
    .then((res: GetCourseAttachmentsResponseInterface) => {
      if (res) setWhiteBoardAttachment(res.attachments);
      else setWhiteBoardAttachment([]);
    })
    .catch(() => {
      setWhiteBoardAttachment([]);
    });
};

export const handleAttachmentTabOnChange = async (
  isWhiteBoardAttachments: boolean,
  isCourse: boolean,
  routePath: { params: { courseID: number; challengeId: number } },
  ScreensNames: BottomTabScreensNamesInterfaces,
  setAttachments: (val?: GetCourseAttachmentsResponseInterface) => void,
  dispatch: any,
) => {
  let itemId = isCourse
    ? routePath.params.courseID
    : routePath.params.challengeId;
  let itemType = isCourse ? 2 : 1;
  let screenName = isCourse
    ? ScreensNames.courseDetails.name
    : ScreensNames.challengeDetail.name;
  dispatch(SetAttachmentNavigateScreen(screenName));
  let url: endpoint = ApiEndpoints.GetCourseAttachment;
  url.params = `?itemId=${itemId}&itemType=${itemType}&projectType=2&isWhiteBoardFile=${isWhiteBoardAttachments}`;
  Get(url)
    .then((res: GetCourseAttachmentsResponseInterface) => {
      if (res) {
        setAttachments(res);
      } else setAttachments(undefined);
    })
    .catch(() => {
      setAttachments(undefined);
    });
};

export const getDiscussion = async (
  isCourse: boolean,
  AttachmentTypes: AttachmentTypeInterface,
  routePath: { params: { courseID: number; challengeId: number } },
  setDiscussionComments: (val: any) => void,
) => {
  let type = isCourse
    ? AttachmentTypes.Epic.value
    : AttachmentTypes.UserStory.value;
  let itemId = isCourse
    ? routePath.params.courseID
    : routePath.params.challengeId;
  let url: endpoint = ApiEndpoints.GetDiscussions;
  url.params = `?ItemId=${itemId}&Type=${type}`;
  Get(url)
    .then((res: GetDiscussionResponseWithStatusInterface) => {
      if (res) {
        setDiscussionComments(res);
      } else {
        setDiscussionComments([]);
      }
    })
    .catch(() => {
      setDiscussionComments([]);
    });
};

export const getStudentParentReview = async (
  routePath: { params: { courseID: number; userID: number } },
  setReviewTabResponse: (val: GetCourseReviewAgainstUserInterface) => void,
) => {
  let courseID = routePath.params.courseID;
  let userID = routePath.params.userID;
  let url: endpoint = ApiEndpoints.GetCourseReviewAgainstUser;
  url.params = `?CourseId=${courseID}&UserId=${userID}`;
  Get(url)
    .then((res: GetCourseReviewAgainstUserInterface) => {
      if (res) setReviewTabResponse(res);
    })
    .catch(() => {});
};

export const getReviewDetail = async (
  routePath: GetReviewDetailInterface,
  setReviewTabResponse: (val: GetCourseReviewsInterface) => void,
) => {
  let courseID = routePath.params.courseID;
  let url: endpoint = ApiEndpoints.GetCourseReviews;
  url.params = `?CourseId=${courseID}`;
  Get(url)
    .then((res: GetCourseReviewsInterface) => {
      if (res) setReviewTabResponse(res);
    })
    .catch((err: any) => {
      return console.log(err);
    });
};

export const setScreenSettings = (
  size: number,
  width: number,
  tabRef: any,
  screenRef: any,
  setWidth: (val: number) => void,
  currentScreenIndex: number,
) => {
  if (size != width && screenRef?.current && screenRef?.current?.scrollTo) {
    setTimeout(() => {
      screenRef?.current?.scrollTo({
        x: size * currentScreenIndex,
        y: 0,
        animated: false,
      });
      tabRef.current.scrollTo({
        x: 180 * currentScreenIndex,
        y: 0,
        animated: false,
      });
    }, 50);
  }
  setWidth(size);
};

export const scrollScreenAndTabs = (
  index: number,
  tabRef: any,
  screenRef: any,
  width: number,
) => {
  screenRef?.current?.scrollTo({
    x: width * index,
    animated: true,
  });
  tabRef.current.scrollTo({
    x: 180 * index,
    y: 0,
    animated: true,
  });
};

export const attrTypes = {
  History: 26,
  Checklist: 12,
  Curriculum: 9,
};
export const backlogColumnName = {
  courseContent: 0,
  Attachments: 12,
  Discussion: 11,
  WhiteBoardAttachments: 103,
  ParentCommunication: 121,
  CourseReviews: 120,
  Instructions: 8,
};
