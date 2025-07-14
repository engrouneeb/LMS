import React from 'react';
import { styles } from '../styles';
import { UserImg } from '../../../../../../../ThumbNail';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../../components';
import { EditDiscussion } from '../../../EditDiscussion';
import { CommentSectionBottomInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';

export const CommentSectionBottom: React.FC<CommentSectionBottomInterface> = ({
  obj,
  rObj,
  UserData,
  checkHref,
  onPressEdit,
  onPressLike,
  onPressDelete,
  submittEditCommentValue,
}) => {
  return (
    <_View
      style={{
        marginTop: 10,
        paddingRight: 10,
      }}
    >
      <_Text style={styles.replyingUserNameTxt}>{rObj.userName}</_Text>
      <_View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <_View style={styles.commentReplyContainer}>
          {checkHref(rObj.comment)}
        </_View>
        <_View style={{}}>
          <UserImg
            UserInfo={{
              FirstName: rObj.userName,
              LastName: rObj.userName,
              UserImage: rObj.imagePath,
              UserImageColor: obj.userColor,
            }}
            size={35}
          />
        </_View>
      </_View>

      <_View style={[styles.replyingFooterContainer]}>
        <TouchableOpacity onPress={onPressEdit}>
          <_VectorIcons
            type='FontAwesome'
            name='pencil'
            size={13}
            color={whiteThemeColors.greyDark}
            style={{
              marginLeft: 8,
              display: rObj.createdById == UserData.userID ? 'flex' : 'none',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressLike}
          style={{ flexDirection: 'row' }}
        >
          <_VectorIcons
            type='AntDesign'
            name='like1'
            size={13}
            color={
              rObj.isLiked
                ? whiteThemeColors.primary
                : whiteThemeColors.greyDark
            }
            style={{
              marginLeft: 8,
            }}
          />
          {rObj?.likeCount > '0' && (
            <_Text
              style={{
                fontSize: 10,
                marginLeft: 5,
                alignSelf: 'auto',
                color: whiteThemeColors.black,
                fontFamily: CommonStyles.fonts.regular,
              }}
            >
              {`(${rObj.likeCount})`}
            </_Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDelete}>
          <_VectorIcons
            type='MaterialIcons'
            name='delete'
            size={13}
            color={whiteThemeColors.greyDark}
            style={{
              marginLeft: 8,
              display: rObj.createdById == UserData.userID ? 'flex' : 'none',
            }}
          />
        </TouchableOpacity>
        <_Text numberOfLines={2} style={styles.replyingDateTxt}>
          {rObj.createdDate}
        </_Text>
      </_View>
      {rObj.isEdit && (
        <EditDiscussion
          intialValue={rObj.comment}
          submmitEditedDiscussion={submittEditCommentValue}
          commentObj={obj}
          replyObject={rObj}
        />
      )}
    </_View>
  );
};
