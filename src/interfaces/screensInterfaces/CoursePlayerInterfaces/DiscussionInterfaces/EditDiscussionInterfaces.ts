export interface EditDiscussionInterface {
  commentObj: CommentObj;
  intialValue: string;
  replyObject?: any;
  submmitEditedDiscussion: any;
}

interface CommentObj {
  cds_temp_guid?: any;
  comment: string;
  commentId: number;
  companyKey?: any;
  createdById: number;
  createdDate: string;
  discussionCount: number;
  guid?: any;
  imagePath: string;
  isEdit: boolean;
  isLiked: boolean;
  itemId: number;
  likeCount: string;
  moduleId: number;
  parentId: number;
  repliedToComment?: any;
  reply: any[];
  replyCount: string;
  showReply: boolean;
  userColor: string;
  userName: string;
  userTagsString?: any;
}
