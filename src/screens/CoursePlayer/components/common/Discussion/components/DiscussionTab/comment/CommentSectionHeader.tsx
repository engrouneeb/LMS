import React from 'react';
import {styles} from '../styles';
import {UserImg} from '../../../../../../../ThumbNail';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {whiteThemeColors} from '../../../../../../../../Utilities';
import {_Text, _VectorIcons, _View} from '../../../../../../../../components';
import {CommentSectionHeaderInterface} from '../../../../../../../../interfaces';

export const CommentSectionHeader: React.FC<CommentSectionHeaderInterface> = ({
  obj,
  checkHref,
  UserData,
  onPressLike,
  onPressEdit,
  onPressReply,
  onPressDeleteComment,
}) => {
  return (
    <_View style={{flexDirection: 'column', paddingLeft: 10}}>
      <_Text style={styles.userNameTxt}>{obj.userName}</_Text>
      <_View style={{flexDirection: 'row', alignItems: 'center'}}>
        <UserImg
          UserInfo={{
            FirstName: obj.userName,
            LastName: obj.userName.split(' ')[1],
            UserImage: obj.imagePath,
            UserImageColor: obj.userColor,
          }}
          size={30}
          style={{marginLeft: 10}}
        />
        <_View style={styles.singleCommentContainer}>
          {checkHref(obj.comment)}
        </_View>
      </_View>
      <_View style={styles.commentFooterContainer}>
        <_Text numberOfLines={2} style={styles.dateTxt}>
          {obj.createdDate}
        </_Text>
        {obj.createdById == UserData.userID && (
          <TouchableOpacity style={styles.actionIcon} onPress={onPressEdit}>
            <_VectorIcons
              type="FontAwesome"
              name="pencil"
              size={13}
              color={whiteThemeColors.white}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onPressLike} style={styles.actionIcon}>
          <_VectorIcons
            type="AntDesign"
            name="like1"
            size={13}
            color={
              obj.isLiked ? whiteThemeColors.primary : whiteThemeColors.white
            }
          />
        </TouchableOpacity>
        {parseInt(obj.likeCount) > 0 && (
          <_Text style={styles.likeCountTxt}>{`(${obj.likeCount})`}</_Text>
        )}
        <TouchableOpacity
          onPress={onPressReply}
          style={styles.actionIcon}
          activeOpacity={1}>
          <_VectorIcons
            type="FontAwesome"
            name="reply"
            size={13}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
        <_Text style={styles.cmtReplyTxt}>
          {obj.reply.length > 0 && `( ${obj.reply.length} )`}
        </_Text>
        {obj.createdById == UserData.userID && (
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={onPressDeleteComment}>
            <_VectorIcons
              type="MaterialIcons"
              name="delete"
              size={13}
              color={whiteThemeColors.white}
            />
          </TouchableOpacity>
        )}
      </_View>
    </_View>
  );
};
