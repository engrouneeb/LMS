export const stateConstant = {
  COMMENT: 'comments',
  IS_LOADING: 'isLoading',
  IS_REPLY_IN_PROG: 'isReplyInProgress',
  REPLY_ITEM_ID: 'replyItemId',
  ALERT_TITLE: 'alertTitle',
  ALERT_MESSAGE: 'alertMessage',
  SHOW_ALERT: 'showAlert',
  FIRST_BUTTON: 'firstBtn',
  SECOND_BUTTON: 'secondBtn',
  COURSE_NAME: 'courseName',
  OWN_COMMENT_REPLY: 'isOwnCommentReply',
  SELECTED_ITEM: 'selectedItem',
  SELECTED_ITEM_REPLY: 'selectedItemReply',
  REPLY_SELECTED: 'isReplySelected',
  SHOW_REPLY_VIEW: 'showReplyView',
  LIKE_UNLIKE_COMMENT: 'likeUnlikeComment',
  COMMENT_STATE: 'deleteComment',
  ALERT_STATE: 'alertState',
  DELETE_CONFIRMATION: 'deleteConfirmation',
  INITIAL_STATE: 'initialState',
};

export const initialState = {
  comments: [],
  isLoading: false,
  isReplyInProgress: false,
  replyItemId: null,
  alertTitle: undefined,
  alertMessage: undefined,
  showAlert: false,
  firstBtn: undefined,
  secondBtn: undefined,
  courseName: '',
  isOwnCommentReply: '',
  selectedItem: '',
  selectedItemReply: undefined,
  isReplySelected: undefined,
  isDeleteComment: undefined,
};

export const reducer = (state: any, payload: any) => {
  switch (payload.type) {
    case stateConstant.SHOW_REPLY_VIEW:
      return {
        ...state,
        comments: payload.data.comments,
        replyItemId: payload.data.replyItemId,
        isReplyInProgress: payload.data.isReplyInProgress,
      };
    case stateConstant.LIKE_UNLIKE_COMMENT:
      return {
        ...state,
        alertTitle: payload.data.alertTitle,
        alertMessage: payload.data.alertMessage,
        showAlert: payload.data.showAlert,
        firstBtn: payload.data.firstBtn,
        secondBtn: payload.data.secondBtn,
        isOwnCommentReply: payload.data.isOwnCommentReply,
      };
    case stateConstant.COMMENT_STATE:
      return {
        ...state,
        alertTitle: payload.data.alertTitle,
        alertMessage: payload.data.alertMessage,
        showAlert: payload.data.showAlert,
      };
    case stateConstant.ALERT_STATE:
      return {
        ...state,
        alertTitle: payload.data.alertTitle,
        alertMessage: payload.data.alertMessage,
        showAlert: payload.data.showAlert,
        firstBtn: payload.data.firstBtn,
        secondBtn: payload.data.secondBtn,
        selectedItem: payload.data.selectedItem,
        selectedItemReply: payload.data.selectedItemReply,
        isReplySelected: payload.data.isReplySelected,
        isOwnCommentReply: payload.data.isOwnCommentReply,
      };
    case stateConstant.DELETE_CONFIRMATION:
      return {
        ...state,
        alertTitle: payload.data.alertTitle,
        alertMessage: payload.data.alertMessage,
        showAlert: payload.data.showAlert,
        firstBtn: payload.data.firstBtn,
        secondBtn: payload.data.secondBtn,
        selectedItem: payload.data.selectedItem,
        isReplySelected: payload.data.isReplySelected,
        isOwnCommentReply: payload.data.isOwnCommentReply,
      };
    case stateConstant.COMMENT:
      return { ...state, comments: payload.data };
    case stateConstant.IS_LOADING:
      return { ...state, isLoading: payload.data };
    case stateConstant.IS_REPLY_IN_PROG:
      return { ...state, isReplyInProgress: payload.data };
    case stateConstant.REPLY_ITEM_ID:
      return { ...state, replyItemId: payload.data };
    case stateConstant.ALERT_TITLE:
      return { ...state, alertTitle: payload.data };
    case stateConstant.ALERT_MESSAGE:
      return { ...state, alertMessage: payload.data };
    case stateConstant.SHOW_ALERT:
      return { ...state, showAlert: payload.data };
    case stateConstant.FIRST_BUTTON:
      return { ...state, firstBtn: payload.data };
    case stateConstant.SECOND_BUTTON:
      return { ...state, secondBtn: payload.data };
    case stateConstant.COURSE_NAME:
      return { ...state, courseName: payload.data };
    case stateConstant.OWN_COMMENT_REPLY:
      return { ...state, isOwnCommentReply: payload.data };
    case stateConstant.SELECTED_ITEM:
      return { ...state, selectedItem: payload.data };
    case stateConstant.SELECTED_ITEM_REPLY:
      return { ...state, selectedItemReply: payload.data };
    case stateConstant.REPLY_SELECTED:
      return { ...state, isReplySelected: payload.data };
    case stateConstant.INITIAL_STATE:
      return initialState;
    default:
      return state || initialState;
  }
};
