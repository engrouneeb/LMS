export interface DiscussionInterface {
  Discussion: any;
  discussionRes: DiscussionRe[];
  itemType: number;
  route: Route;
  isCourse?: any;
  isActive?: any;
}

interface Route {
  key?: string;
  name?: string;
  params: Params;
  path?: any;
}

interface Params {
  courseID?: number;
  courseImage?: string;
  courseName?: string;
  role?: string;
  userID?: number;
  challengeId?: number;
}

interface DiscussionRe {
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
  reply: string[];
  replyCount: string;
  userColor: string;
  userName: string;
  userTagsString?: any;
}
