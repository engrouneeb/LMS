import { DiscussionInterface } from 'interfaces';
import moment from 'moment';
import React, { memo, useEffect, useReducer } from 'react';
import { Linking } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { CustomAlert, whiteThemeColors } from 'utilities';
import { EditDiscussion } from '../..';
import { NoDiscussion } from '../../../../../../../../assets/NoDiscussion';
import ApiEndPoint from '../../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../../data/DAL';
import { _Text, _View } from '../../../../../../../components';
import { Appstate } from '../../../../../../../reducers/Appstate';
import { _ActivityIndicator } from '../../../../../../Loader';
import AddCommentReply from '../AddCommentReply';
import { initialState, reducer, stateConstant } from './States';
import { CommentSectionBottom, CommentSectionHeader } from './comment';
import { styles } from './styles';
import CommonStyles from 'screens/CommonStyles';

const _DiscussionTab: React.FC<DiscussionInterface> = ({
  route,
  Discussion,
  discussionRes,
  itemType,
}) => {
  let isClicked = false;
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const { PostSecured, PostSecuredWithParams } = DataAccess();
  const [state, _setState] = useReducer(reducer, initialState);
  const setState = (type: any, data: any) => _setState({ type, data });

  useEffect(() => {
    setState(stateConstant.SHOW_ALERT, false);
    if (state.courseName !== '') {
      setState(
        stateConstant.COURSE_NAME,
        state.courseName ? state.courseName : route?.params?.courseName,
      );
    } else {
      setState(stateConstant.COURSE_NAME, route?.params?.courseName);
    }
  }, []);
  useEffect(()=>{Discussion();},[])
  useEffect(() => {
    getDiscussion();
  }, [discussionRes]);

  const findCommentIndex = (commentObj: any) => {
    let selectedIndex = state.comments.findIndex((Obj: any) => {
      return Obj.commentId == commentObj.commentId;
    });
    return selectedIndex;
  };
  const findReplayIndex = (commentObj: any, replyObject: any) => {
    let selectedIndex = findCommentIndex(commentObj);
    let replyIndex = state.comments[selectedIndex].reply.findIndex(
      (Obj: any) => {
        return Obj.commentId == replyObject.commentId;
      },
    );
    return replyIndex;
  };

  const getDiscussion = () => {
    setState(stateConstant.COMMENT, discussionRes);
  };

  const showReplyView = (commentObj: any) => {
    let previousComments: any = [...state.comments];
    let selectedIndex = findCommentIndex(commentObj);
    if (selectedIndex != undefined && selectedIndex != -1) {
      if (selectedIndex == state.replyItemId) {
        previousComments[state.replyItemId].showReply = true;
        setState(stateConstant.SHOW_REPLY_VIEW, {
          comments: previousComments,
          reply_id: selectedIndex,
          isReplyInProgress: true,
        });
        return;
      }
      if (
        [undefined, null, false].includes(
          previousComments[selectedIndex].showReply,
        )
      )
        previousComments[selectedIndex].showReply = true;
      else previousComments[selectedIndex].showReply = false;

      state.isReplyInProgress
        ? state.replyItemId
          ? (previousComments[state.replyItemId].showReply = false)
          : null
        : null;
      setState(stateConstant.SHOW_REPLY_VIEW, {
        comments: previousComments,
        reply_id: selectedIndex,
        isReplyInProgress: true,
      });
    }
  };

  const addComment = (commentObj: any, value: any) => {
    let cObject = {
      commentId: 0,
      moduleId: 2,
      itemId: route.params.courseID
        ? route.params.courseID
        : route.params?.challengeId,
      comment: value,
      createdDate: getFormattedDate(),
      createdById: UserData.userID,
      likeCount: '',
      userName: UserData.fullName,
      imagePath: UserData.userImag,
      reply: [],
    };

    let commentObject = {
      ItemId: route.params.courseID
        ? route.params.courseID
        : route.params?.challengeId,
      Discussion: value,
      itemType: itemType,
      TaggedUser: null,
      createdDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      CommentType: 'New',
      ParentId: null,
      CommentId: null,
    };
    let oldComments = [...state.comments];
    oldComments.unshift(cObject);
    setState(stateConstant.COMMENT, oldComments);
    let url = ApiEndPoint.SaveDiscussion;
    PostSecured(url, commentObject)
      .then((res: any) => {
        console.log('====================================');
        console.log('res===>', res);
        console.log('====================================');
        Discussion();
        let previousComments: any;
        let selectedIndex = state.comments.findIndex((Obj: any) => {
          return Obj.commentId == 0;
        });
        if (selectedIndex != undefined && selectedIndex != -1) {
          previousComments[selectedIndex].commentId = res;
          setState(stateConstant.COMMENT, previousComments);
        }
      })
      .catch(() => {});
  };

  const addReply = (commentObj: any, reply: any) => {
    let rObject = {
      commentId: 0,
      moduleId: 2,
      itemId: route.params.courseID,
      comment: reply,
      createdDate: getFormattedDate(),
      createdById: UserData.userID,
      userName: UserData.fullName,
      imagePath: UserData.userImag,
      guid: null,
      cds_temp_guid: null,
      isLiked: false,
      replyCount: null,
      likeCount: '',
      parentId: 7013,
      discussionCount: 0,
      reply: null,
    };
    let previousComments: any = [...state.comments];
    let selectedIndex = findCommentIndex(commentObj);
    if (selectedIndex != undefined && selectedIndex != -1) {
      previousComments[selectedIndex].reply.push(rObject);
      previousComments[selectedIndex].showReply = false;
      setState(stateConstant.COMMENT, previousComments);
    }

    let replyObject = {
      ItemId: route.params.courseID,
      Discussion: reply,
      TaggedUser: null,
      CommentType: 'Reply',
      itemType: itemType,
      createdDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      ParentId: commentObj.commentId,
      CommentId: 0,
    };
    let url = ApiEndPoint.SaveDiscussion;
    PostSecured(url, replyObject)
      .then((res: any) => {
        if (selectedIndex != undefined && selectedIndex != -1) {
          let selectedReplyIndex = previousComments[
            selectedIndex
          ].reply.findIndex((rObj: any) => {
            return rObj.commentId == 0;
          });
          if (selectedReplyIndex != undefined && selectedReplyIndex != -1) {
            let oldReplies = [...previousComments[selectedIndex].reply];
            oldReplies[selectedReplyIndex].commentId = res;
            previousComments.reply = oldReplies;
            setState(stateConstant.COMMENT, previousComments);
            setState(stateConstant.IS_REPLY_IN_PROG, false);
          }
        }
      })
      .catch(() => {});
  };

  const likeUnlikeComment = (commentObj: any) => {
    if (commentObj.createdById == UserData.userID) {
      setState(stateConstant.LIKE_UNLIKE_COMMENT, {
        alertTitle: 'Warning',
        alertMessage: 'You can not like your own comment',
        showAlert: true,
        firstBtn: 'Okay',
        secondBtn: 'Cancel',
        isOwnCommentReply: true,
      });
    } else {
      let id = commentObj.commentId;
      let previousComments = [...state.comments];
      let selectedIndex = findCommentIndex(commentObj);
      if (selectedIndex != undefined && selectedIndex != -1) {
        if (
          previousComments[selectedIndex].likeCount == 1 &&
          previousComments[selectedIndex].isLiked
        ) {
          previousComments[selectedIndex].isLiked =
            !previousComments[selectedIndex].isLiked;
          previousComments[selectedIndex].likeCount = 0;
        } else {
          previousComments[selectedIndex].likeCount = previousComments[
            selectedIndex
          ].isLiked
            ? parseInt(previousComments[selectedIndex].likeCount) - 1
            : parseInt(previousComments[selectedIndex].likeCount) + 1;
          previousComments[selectedIndex].isLiked =
            !previousComments[selectedIndex].isLiked;
        }
        setState(stateConstant.COMMENT, previousComments);
      }
      let url = ApiEndPoint.LikeDiscussion;
      let params = `?DiscussionId=${id}`;
      PostSecuredWithParams(url, params)
        .then(() => {})
        .catch(() => {});
    }
  };
  const deleteComment = (commentObj: any) => {
    if (commentObj.createdById == UserData.userID) {
      let previousComments = [...state.comments];
      let selectedIndex = findCommentIndex(commentObj);
      if (selectedIndex != undefined && selectedIndex != -1) {
        previousComments.splice(selectedIndex, 1);
        setState(stateConstant.COMMENT, previousComments);
      }
      let url = ApiEndPoint.DeleteDiscussion;
      let params = `?DiscussionId=${commentObj.commentId}`;
      PostSecuredWithParams(url, params)
        .then(() => {})
        .catch(() => {});
    } else {
      setState(stateConstant.COMMENT_STATE, {
        alertTitle: 'Error',
        alertMessage: 'you cannot delete comment not added by you',
        showAlert: true,
      });
    }
  };
  const likeUnlikeReply = (commentObj: any, replyObject: any) => {
    if (replyObject.createdById == UserData.userID) {
      setState(stateConstant.LIKE_UNLIKE_COMMENT, {
        alertTitle: 'Warning',
        alertMessage: 'User cannot like, Unlike his own reply',
        showAlert: true,
        firstBtn: 'Okay',
        secondBtn: 'Cancel',
        isOwnCommentReply: true,
      });
    } else {
      let id = replyObject.commentId;
      let previousComments: any = [...state.comments];
      let selectedIndex = findCommentIndex(commentObj);
      if (selectedIndex != undefined && selectedIndex != -1) {
        let selectedReplyIndex = findReplayIndex(commentObj, replyObject);
        if (selectedReplyIndex != undefined && selectedReplyIndex != -1) {
          let oldReplies = [...previousComments[selectedIndex].reply];
          if (
            oldReplies[selectedReplyIndex].isLiked &&
            oldReplies[selectedReplyIndex].likeCount == 1
          ) {
            oldReplies[selectedReplyIndex].isLiked =
              !oldReplies[selectedReplyIndex].isLiked;
            oldReplies[selectedReplyIndex].likeCount = 0;
          } else {
            oldReplies[selectedReplyIndex].likeCount = oldReplies[
              selectedReplyIndex
            ].isLiked
              ? parseInt(oldReplies[selectedReplyIndex].likeCount) - 1
              : parseInt(oldReplies[selectedReplyIndex].likeCount) + 1;
            oldReplies[selectedReplyIndex].isLiked =
              !oldReplies[selectedReplyIndex].isLiked;
          }
          previousComments.reply = oldReplies;
          setState(stateConstant.COMMENT, previousComments);
        }
      }
      let url = ApiEndPoint.LikeDiscussion;
      let params = `?DiscussionId=${id}`;
      PostSecuredWithParams(url, params)
        .then(() => {})
        .catch(() => {});
    }
  };
  const deleteReply = (commentObj: any, replyObject: any) => {
    let id = replyObject.commentId;
    let previousComments = [...state.comments];
    let selectedIndex = findCommentIndex(commentObj);
    if (selectedIndex != undefined && selectedIndex != -1) {
      let selectedReplyIndex = findReplayIndex(commentObj, replyObject);
      if (selectedReplyIndex != undefined && selectedReplyIndex != -1) {
        previousComments[selectedIndex].reply.splice(selectedReplyIndex, 1);
        setState(stateConstant.COMMENT, previousComments);
      }
    }
    let url = ApiEndPoint.DeleteDiscussion;
    let params = `?DiscussionId=${id}`;

    PostSecuredWithParams(url, params)
      .then(() => {})
      .catch(() => {});
  };
  const setCommentEditView = (commentObj: any) => {
    let previousComments = [...state.comments];
    let selectedIndex = findCommentIndex(commentObj);
    if (selectedIndex != undefined && selectedIndex != -1) {
      previousComments[selectedIndex].isEdit = true;
      setState(stateConstant.COMMENT, previousComments);
    }
  };

  const closeCommentBox = (obj: any) => {
    let selectedIndex = findCommentIndex(obj);
    let previousComments = [...state.comments];
    previousComments[selectedIndex].isEdit = false;
    setState(stateConstant.COMMENT, previousComments);
  };

  const closeReplyBox = (obj: any) => {
    let selectedIndex = findCommentIndex(obj);
    let previousComments = [...state.comments];
    previousComments[selectedIndex].showReply = false;
    setState(stateConstant.COMMENT, previousComments);
  };

  const setReplyEditView = (commentObj: any, replyObject: any) => {
    let previousComments: any = [...state.comments];
    let selectedIndex = findCommentIndex(commentObj);
    if (selectedIndex != undefined && selectedIndex != -1) {
      let selectedReplyIndex = findReplayIndex(commentObj, replyObject);
      if (selectedReplyIndex != undefined && selectedReplyIndex != -1) {
        let oldReplies = [...previousComments[selectedIndex].reply];
        oldReplies[selectedReplyIndex].isEdit = true;
        previousComments.reply = oldReplies;
        setState(stateConstant.COMMENT, previousComments);
      }
    }
  };

  const submitEditCommentValue = (
    value: any,
    commentObj: any,
    replyObject: any,
    close = false,
  ) => {
    let previousComments = [...state.comments];
    let selectedIndex = findCommentIndex(commentObj);
    if (close) {
      if (replyObject != null || replyObject != undefined) {
        let selectedReplyIndex = findReplayIndex(commentObj, replyObject);
        previousComments[selectedIndex].reply[selectedReplyIndex].isEdit =
          false;
      }
      previousComments[selectedIndex].isEdit = false;
      setState(stateConstant.COMMENT, previousComments);
      return;
    }

    if (selectedIndex != undefined && selectedIndex != -1) {
      if (replyObject != null || replyObject != undefined) {
        let selectedReplyIndex = findReplayIndex(commentObj, replyObject);
        if (selectedReplyIndex != -1 && selectedReplyIndex != undefined) {
          previousComments[selectedIndex].reply[selectedReplyIndex].isEdit =
            false;
          previousComments[selectedIndex].reply[selectedReplyIndex].comment =
            value;
          previousComments[selectedIndex].reply[
            selectedReplyIndex
          ].createdDate = getFormattedDate();
          replyObject = {
            ItemId: route.params.courseID,
            Discussion: value,
            CommentType: 'Update',
            createdDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            CommentId: replyObject.commentId,
          };
          setState(stateConstant.COMMENT, previousComments);
        }
      } else {
        previousComments[selectedIndex].isEdit = false;
        previousComments[selectedIndex].comment = value;
        previousComments[selectedIndex].createdDate = getFormattedDate();
        setState(stateConstant.COMMENT, previousComments);
        replyObject = {
          ItemId: route.params.courseID,
          Discussion: value,
          createdDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          CommentType: 'Update',
          CommentId: commentObj.commentId,
        };
      }
    }

    let url = ApiEndPoint.SaveDiscussion;
    PostSecured(url, replyObject)
      .then(() => {})
      .catch(() => {});
  };

  const checkHref = (str: any) => {
    let hrefs = str.match(/href="([^"]*)/g);
    if (hrefs != null) {
      let urls = hrefs.filter((link: any) => {
        if (isValidHttpUrl(link)) return link;
        else return str;
      });
      return urls.map((link: any) => {
        return (
          <TouchableOpacity
            onPress={async () => {
              if (await Linking.canOpenURL(link.substr(6)))
                Linking.openURL(link.substr(6));
              else
                setState(stateConstant.COMMENT_STATE, {
                  alertTitle: 'Error',
                  alertMessage: 'Broken urles cannot be open',
                  showAlert: true,
                });
            }}
          >
            <_Text
              style={{
                color: whiteThemeColors.primaryTextColor,
                fontFamily: CommonStyles.fonts.regular,
                fontSize: 12,
              }}
            >
              {link.substr(6)}
            </_Text>
          </TouchableOpacity>
        );
      });
    } else {
      return (
        <_Text
          numberOfLines={100}
          style={{
            color: 'black',
            fontStyle: str.includes('</i>') ? 'italic' : 'normal',
            fontWeight: str.includes('</b>') ? 'bold' : 'normal',
            textDecorationLine: str.includes('</u>') ? 'underline' : 'none',
            fontFamily: CommonStyles.fonts.regular,
            fontSize: 12,
          }}
        >
          {str.replace(/(<([^>]+)>)/gi, '')}
        </_Text>
      );
    }
  };
  const isValidHttpUrl = (string: any) => {
    let res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    if (res !== null) {
      return res;
    }
  };
  const getFormattedDate = () => {
    let dd = moment(new Date()).format('LLL');
    let dt = dd.split(' ');
    let mm = dt[0]?.substring(0, 3);

    dt.splice(0, 1);

    let tt = dt.join(' ');
    tt = tt.trim();

    tt = tt.substring(0, 8) + '- ' + tt.substring(8);

    let date = mm + ' ' + tt;

    return date;
  };

  const resetAlertState = () => {
    setState(stateConstant.ALERT_STATE, {
      alertTitle: undefined,
      alertMessage: undefined,
      showAlert: false,
      firstBtn: undefined,
      secondBtn: undefined,
      selectedItem: undefined,
      selectedItemReply: undefined,
      isReplySelected: false,
    });
  };
  const deleteConfirmation = (obj: any) => {
    setState(stateConstant.DELETE_CONFIRMATION, {
      alertTitle: 'warning',
      alertMessage: 'Are you sure, you want delete this item?',
      showAlert: true,
      firstBtn: 'Yes',
      secondBtn: 'No',
      selectedItem: obj,
      isReplySelected: false,
      isOwnCommentReply: false,
    });
  };

  const replyDelConfirmation = (obj: any, rObj: any) => {
    setState(stateConstant.ALERT_STATE, {
      alertTitle: 'warning',
      alertMessage: 'Are you sure, you want delete this item?',
      showAlert: true,
      firstBtn: 'Yes',
      secondBtn: 'No',
      selectedItem: obj,
      selectedItemReply: rObj,
      isReplySelected: true,
      isOwnCommentReply: false,
    });
  };

  const alertFirstBtnFunc = () => {
    if (state.isOwnCommentReply) {
      setState(stateConstant.COMMENT_STATE, {
        alertTitle: undefined,
        alertMessage: undefined,
        showAlert: false,
      });
    } else {
      if (state.isReplySelected) {
        if (!isClicked) {
          isClicked = true;
          deleteReply(state.selectedItem, state.selectedItemReply);
          setTimeout(() => {
            isClicked = false;
          }, 1000);
          resetAlertState();
        }
      } else {
        if (!isClicked) {
          isClicked = true;
          deleteComment(state.selectedItem);
          setTimeout(() => {
            isClicked = false;
          }, 1000);
          resetAlertState();
        }
      }
    }
  };
  return state.isLoading ? (
    <_View style={styles.loaderContainer}>
      <_ActivityIndicator size={'large'} />
    </_View>
  ) : (
    <_View style={styles.mainContainer}>
      <AddCommentReply
        addReply={addComment}
        commentObj={null}
        placeholder={'Your comments ...'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <_View style={styles.submitCourseReview}>
          {state.comments?.length > 0 ? (
            state.comments.map((obj: any) => {
              return (
                <_View style={{ width: '100%' }}>
                  <_View style={styles.commentSectionContainer}>
                    <CommentSectionHeader
                      obj={obj}
                      checkHref={checkHref}
                      onPressLike={() => {
                        if (!isClicked) {
                          isClicked = true;
                          setTimeout(() => {
                            isClicked = false;
                          }, 1000);
                          likeUnlikeComment(obj);
                        }
                      }}
                      onPressEdit={() => {
                        setCommentEditView(obj);
                        closeReplyBox(obj);
                      }}
                      onPressReply={() => {
                        showReplyView(obj);
                        closeCommentBox(obj);
                      }}
                      UserData={UserData}
                      onPressDeleteComment={() => {
                        deleteConfirmation(obj);
                      }}
                    />
                    {obj.showReply && (
                      <AddCommentReply
                        addReply={addReply}
                        commentObj={obj}
                        placeholder={'Your reply ...'}
                      />
                    )}
                    {obj.isEdit && (
                      <EditDiscussion
                        intialValue={obj.comment.replace(/(<([^>]+)>)/gi, '')}
                        submmitEditedDiscussion={submitEditCommentValue}
                        commentObj={obj}
                        replyObject={null}
                      />
                    )}
                    {obj.reply &&
                      obj.reply.map((rObj: any) => {
                        return (
                          <CommentSectionBottom
                            rObj={rObj}
                            obj={obj}
                            UserData={UserData}
                            checkHref={checkHref}
                            onPressEdit={() => {
                              setReplyEditView(obj, rObj);
                            }}
                            onPressLike={() => {
                              if (!isClicked) {
                                isClicked = true;
                                setTimeout(() => {
                                  isClicked = false;
                                }, 1000);
                                likeUnlikeReply(obj, rObj);
                              }
                            }}
                            onPressDelete={() => {
                              replyDelConfirmation(obj, rObj);
                            }}
                            submittEditCommentValue={submitEditCommentValue}
                          />
                        );
                      })}
                  </_View>
                </_View>
              );
            })
          ) : (
            <>
              <NoDiscussion />
              <_Text style={styles.noDisccusionTxt}>{'No Discussions'}</_Text>
            </>
          )}
        </_View>
        {state.showAlert && (
          <CustomAlert
            visible={state.showAlert}
            title={state.alertTitle}
            msg={state.alertMessage}
            firstBtn={state.firstBtn ? state.firstBtn : 'Okay'}
            firstBtnFunc={() => {
              alertFirstBtnFunc();
            }}
            secondBtn={state.secondBtn ? state.secondBtn : 'No'}
            secondBtnFunc={() => {
              resetAlertState();
            }}
          />
        )}
      </ScrollView>
    </_View>
  );
};
export const DiscussionTab = memo(_DiscussionTab);
