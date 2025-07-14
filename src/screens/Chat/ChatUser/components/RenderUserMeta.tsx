import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { msgType } from 'interfaces';
import { FC, useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import ScreensNames from '../../../../screenNames';
import { UserImg } from 'screens/ThumbNail';
import {
  convertUTCDateToLocalDateStringFormat,
  covertUTCDateTimeToLocalTimeStringFormat,
  whiteThemeColors,
} from 'utilities';
import {
  setAdminMessageCount,
  setChatUser,
  setContactMessagesCount,
  setFranchiseMessageCount,
  setInstructorMessagesCount,
  setMessagesCount,
  setStaffMessagesCount,
  setStudentMessagesCount,
} from '../../../../actions/MessengerActions';
import { _Text, _View } from '../../../../components';
import MsgScreenMeta from '../../MsgScreen/MsgScreenMeta';
import styles from '../ChatScreenStyle';
import { MsgCounter } from '../MsgCounter';

interface _renderUserMetaInterface {
  item: msgType;

  setState: (value: any) => void;
  params: any;
  state: any;
}

export const RenderUserMeta: FC<_renderUserMetaInterface> = ({
  item: Obj,
  setState,
  params,
  state,
}) => {
  const { chatFor, group } = params;
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch: any = useDispatch();
  const Messages = useSelector((state: Appstate) => state.messages);

  const _getLastMessageDateTime: (dateTime: Date | string) => string = (
    dateTime: Date | string
  ) => {
    const curDateTime = new Date();
    const messageDateTime = new Date(dateTime);
    const curDate = convertUTCDateToLocalDateStringFormat(curDateTime);
    const messageDate = convertUTCDateToLocalDateStringFormat(messageDateTime);
    if (curDate === messageDate)
      return covertUTCDateTimeToLocalTimeStringFormat(dateTime);

    const curYear = curDateTime.getFullYear();
    const messageYear = messageDateTime.getFullYear();

    if (curYear === messageYear)
      return convertUTCDateToLocalDateStringFormat(messageDateTime, 'MMM DD');

    return convertUTCDateToLocalDateStringFormat(
      messageDateTime,
      'MMM DD YYYY'
    );
  };

  const handleClearOpenUserNotiCount = (userId: string | number) => {
    let body = state.chatUsers;
    const newChatIndex = body.findIndex(
      (el: any, _index: number) => el.userId == userId
    );

    if (Boolean(body[newChatIndex].unReadMsgCount)) {
      resetMessageCount(body[newChatIndex].unReadMsgCount);
      body[newChatIndex].unReadMsgCount = 0;
      setState({ type: 'chatUsers', data: body });
      setState({ type: 'filteredData', data: body });
    }
  };

  const resetMessageCount: (msgCount: number) => void = (msgCount: number) => {
    switch (chatFor) {
      case MsgScreenMeta.Students: {
        if (Messages.StudentMessage.Count > 0) {
          dispatch(setMessagesCount(Messages.MessagesCount.Count - msgCount));
          dispatch(
            setStudentMessagesCount(Messages.StudentMessage.Count - msgCount)
          );
        }
        break;
      }
      case MsgScreenMeta.Contacts: {
        if (Messages.ContactMessage.Count > 0) {
          dispatch(setMessagesCount(Messages.MessagesCount.Count - msgCount));
          dispatch(
            setContactMessagesCount(Messages.ContactMessage.Count - msgCount)
          );
        }
        break;
      }

      case MsgScreenMeta.Staff: {
        if (Messages.StaffMessage.Count > 0) {
          dispatch(setMessagesCount(Messages.MessagesCount.Count - msgCount));
          dispatch(
            setStaffMessagesCount(Messages.StaffMessage.Count - msgCount)
          );
        }
        break;
      }
      case MsgScreenMeta.FranchiseOwners: {
        if (Messages.FranchiseMessage.Count > 0) {
          dispatch(setMessagesCount(Messages.MessagesCount.Count - msgCount));
          dispatch(
            setFranchiseMessageCount(Messages.FranchiseMessage.Count - msgCount)
          );
        }
        break;
      }
      case MsgScreenMeta.Admin: {
        if (Messages.AdminMessage.Count > 0) {
          dispatch(setMessagesCount(Messages.MessagesCount.Count - msgCount));
          dispatch(
            setAdminMessageCount(Messages.AdminMessage.Count - msgCount)
          );
        }
        break;
      }
      case MsgScreenMeta.Instructors: {
        if (Messages.InstructorMessage.Count > 0) {
          dispatch(setMessagesCount(Messages.MessagesCount.Count - msgCount));
          dispatch(
            setInstructorMessagesCount(
              Messages.InstructorMessage.Count - msgCount
            )
          );
        }
        break;
      }
      default:
        break;
    }
  };
  const handleMessageBadgeCount = (unreadMessageCount: any) => {
    if (unreadMessageCount && unreadMessageCount > 0)
      resetMessageCount(unreadMessageCount);
  };

  const getChating = (UserID: number, userName: string) => {
    let UserObject = _getUserObj(UserID)[0];
    let groupName = group;
    navigation.navigate(ScreensNames.chatInterface.name, {
      name: userName,
      To: UserID,
      UserObj: UserObject,
      groupName: groupName,
      shiftToTop: shiftToTop,
    });
    dispatch(setChatUser(UserObject));
    setState({
      type: 'chatUsers',
      data: state.chatUsers.map((el: any) =>
        el.userId === UserID ? Object.assign({}, el, { unReadMsgCount: 0 }) : el
      ),
    });
  };

  const _getUserObj = (UserID: number) => {
    return state.chatUsers.filter((obj: any) => obj.userId == UserID);
  };
  const shiftToTop = (data: any, userId: number) => {
    let newChatIndex = -1;
    let body = state.chatUsers;
    body.forEach((el: any, _index: any) => {
      if (el.userId === userId) {
        newChatIndex = _index;
      }
    });
    if (newChatIndex != -1) {
      let latestElement = body[newChatIndex];
      body.splice(newChatIndex, 1);
      body.splice(0, 0, latestElement);
      setState({ type: 'chatUsers', data: body });
      setState({ type: 'chatUsers', data: body });
    }
    body[0].lastMessage = data[0]?.text;
    body[0].lastMsgDateTime = data[0]?.createdAt;
    setState({ type: 'chatUsers', data: body });
    setState({ type: 'filteredData', data: body });
  };
  const handleUserImagePress = useCallback(() => {
    if (group === 'Students' || group === 'Parents') {
      setState({ type: 'showUserProfileModal', data: true });
      setState({ type: 'showUserProfile', data: Obj });
    }
  }, [group, Obj, setState]);

  const handleUserNamePress = useCallback(() => {
    const userName = `${Obj.fname} ${Obj.lname}`;
    handleMessageBadgeCount(Obj.unReadMsgCount);
    getChating(Obj.userId, userName);
    handleClearOpenUserNotiCount(Obj.userId);
  }, [Obj, handleMessageBadgeCount, getChating, handleClearOpenUserNotiCount]);
  let userName = `${Obj.fname} ${Obj.lname}`;

  const Background = useMemo(
    () => ({
      backgroundColor:
        state.onlineUsers.indexOf(Obj.userName) !== -1
          ? whiteThemeColors.green
          : whiteThemeColors.lightBlack,
    }),
    [state.onlineUsers]
  );

  const _userName = useMemo(
    () =>
      userName.length < 27 ? `${userName}` : `${userName.substring(0, 14)}...`,
    [userName]
  );

  const renderLastMessage = useMemo(
    () =>
      chatFor == 11 || chatFor == 12 //11 for instructor-student chat // 12 for instructor parent chat
        ? null
        : Obj?.lastMessage,
    [chatFor]
  );

  const renderLastMessageTime = useMemo(
    () =>
      chatFor == 11 || chatFor == 12 //11 for instructor-student chat // 12 for instructor parent chat
        ? null
        : Obj.lastMsgDateTime && _getLastMessageDateTime(Obj?.lastMsgDateTime),
    [chatFor]
  );

  const renderAvatar = useMemo(
    () => (
      <UserImg
        UserInfo={{
          FirstName: Obj.fname,
          LastName: Obj.lname,
          UserImage: Obj.image || '',
          UserImageColor: whiteThemeColors.thumbnailBGColor,
        }}
        size={45}
      />
    ),
    [Obj]
  );

  return (
    <_View style={styles.userMetaWrapper} key={Obj.userId}>
      <_View width={'20%'}>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={handleUserImagePress}
        >
          {renderAvatar}
        </TouchableOpacity>
        <_View style={[styles.useStatus, Background]} />
      </_View>
      <_View width={'50%'}>
        <TouchableOpacity onPress={handleUserNamePress}>
          <_Text style={styles.userName}>{_userName}</_Text>
          <_Text numberOfLines={2} style={styles.lastMessage}>
            {renderLastMessage}
          </_Text>
        </TouchableOpacity>
      </_View>
      <_View style={styles.lastMessageContainer}>
        <_Text style={styles.lastMessageDateTime}>
          {renderLastMessageTime}
        </_Text>
        {Obj.unReadMsgCount > 0 ? (
          <MsgCounter UnreadCount={Obj.unReadMsgCount} />
        ) : null}
      </_View>
    </_View>
  );
};
