import moment from 'moment';
import React from 'react';
import {styles} from '../styles';
import {_Text, _View} from '../../../../../../../components';
import {UserImg} from '../../../../../../ThumbNail';
import {whiteThemeColors} from '../../../../../../../Utilities';
import {FeedbackMessagePropsInterface} from '../../../../../../../interfaces';

const FeedbackMessage: React.FC<FeedbackMessagePropsInterface> = ({
  name,
  text,
  dateTime,
  image,
}) => {
  return (
    <_View style={styles.messageContainer}>
      <_View style={styles.feedbackMsgContainer}>
        <_View style={styles.textContainer}>
          <_Text style={styles.txt}>{text}</_Text>
          <_Text style={styles.dateTxt}>
            {`${moment(dateTime.split('-').join('/')).format(
              'MMM Do, YYYY hh:mm:a',
            )}`}
          </_Text>
        </_View>
        <_View style={styles.msgAvatar}>
          <UserImg
            UserInfo={{
              FirstName: name?.split(' ')[0],
              LastName: name?.split(' ')[1],
              UserImage: image,
              UserImageColor: whiteThemeColors.primary,
            }}
            size={30}
          />
        </_View>
      </_View>
      <_Text style={styles.avatarName}>{name}</_Text>
    </_View>
  );
};

export default FeedbackMessage;
