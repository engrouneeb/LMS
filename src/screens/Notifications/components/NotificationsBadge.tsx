import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import { useDispatch, useSelector } from 'react-redux';
import {
  isAdmin,
  isCoordinator,
  isExecutive,
  isInstructor,
  isParent,
  isStudent,
  whiteThemeColors,
} from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  AnnouncemetsLoading,
  AnnouncemetsSuccess,
} from '../../../actions/AnnouncementActions';
import {
  setAdminMessageCount,
  setContactMessagesCount,
  setFranchiseMessageCount,
  setInstructorMessagesCount,
  setMessagesCount,
  setReceivedMessages,
  setStaffMessagesCount,
  setStudentMessagesCount,
} from '../../../actions/MessengerActions';
import { clearNotificationCount } from '../../../actions/NotificationActions';
import { setTimeTrackerBadges } from '../../../actions/TimeTrackerActions';
import { _Text, _View } from '../../../components';
import { NotificationTypes } from '../../../constants';
import { Appstate } from '../../../reducers/Appstate';
import ToastAlert from '../ToastAlert';
var currentMessageId: any = 0;
interface props {
  NotifictionIconClicked: () => void;
  firebaseNotification: any;
}
const NotificationsBadge: React.FC<props> = ({
  NotifictionIconClicked,
  firebaseNotification,
}) => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: Appstate) => state?.token?.CountNotifications,
  );
  const { timeTrackerBadges }: any = useSelector(
    (state: Appstate) => state?.timetracker?.timeTrackerBadges,
  );
  const { token } = useSelector((state: Appstate) => state.token);
  const { User }: any = useSelector((state: Appstate) => state.User);
  const { messages }: any = useSelector((state: Appstate) => state.messages);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [remoteMessage, setRemoteMessage] = useState({});
  const { Get, PostSecured } = DataAccess();
  useEffect(() => {
    messageListener();
  }, []);

  const messageListener = async () => {
    messaging().onMessage(async (message: any) => {
      console.log('message');
      if (currentMessageId === 0 || currentMessageId !== message.messageId) {
        if (message?.data?.body == 'Messages are Recieved')
          dispatch(setReceivedMessages(true));
        else {
          currentMessageId = message.messageId;
          if (token.currentFocus != 'ChatInterface') {
            setTitle(message?.data?.title);
            setMessage(message?.data?.body);
            setRemoteMessage(message?.data);
            setVisible(true);
          }

          if (message.data.NotificationType == NotificationTypes.Chat) {
            updateIsDeliveredStatus(message);
            var senderRole = message.data.senderRole;
            saveGroupCount(senderRole);
          } else if (
            message.data.notificationType == NotificationTypes.Announcement
          ) {
            dispatch(AnnouncemetsLoading());
            let Endpoint = ApiEndpoints.GetAnnouncements;
            Get(Endpoint).then((res: any) => {
              dispatch(AnnouncemetsSuccess(res.value));
            });
          } else if (
            message.data.notificationType === NotificationTypes.ScheduleCover
          ) {
            let badges = timeTrackerBadges;
            badges.coverCount = badges.coverCount + 1;
            dispatch(setTimeTrackerBadges(badges));
          } else if (
            message.data.notificationType === NotificationTypes.ScheduleCoverage
          ) {
            let badges = timeTrackerBadges;
            badges.coverageCount = badges.coverageCount + 1;
            dispatch(setTimeTrackerBadges(badges));
          } else if (
            message.data.notificationType === NotificationTypes.ExpenseApproval
          ) {
            let badges = timeTrackerBadges;
            badges.expenseCount = badges.expenseCount + 1;
            dispatch(setTimeTrackerBadges(badges));
          } else if (
            message.data.notificationType === NotificationTypes.TimeOffApproval
          ) {
            let badges = timeTrackerBadges;
            badges.timeOffCount = badges.timeOffCount + 1;
            dispatch(setTimeTrackerBadges(badges));
          } else if (
            message.data.notificationType === NotificationTypes.Timesheet
          ) {
            let badges = timeTrackerBadges;
            badges.timeSheetCount = badges.timeSheetCount + 1;
            dispatch(setTimeTrackerBadges(badges));
          }
          saveNotificationCount(message.data.notiCount);
        }
      }
    });
  };
  const updateIsDeliveredStatus = async (remoteMessage: any) => {
    let receiverObj = JSON.parse(remoteMessage?.data?.receiverObj);
    let msgReceivedParams = {
      companyKey: '',
      fromUserId: '',
      toUserId: '',
      businessGuid: '',
      fromUserGuid: '',
    };
    msgReceivedParams = {
      companyKey: receiverObj?.licenseCmpKey,
      fromUserId: receiverObj?.fromUserId,
      toUserId: receiverObj?.toUserId,
      businessGuid: receiverObj?.businessCompanyGuid,
      fromUserGuid: receiverObj?.userGuid,
    };
    await PostSecured(
      ApiEndpoints.sendIsReceivedMsgNotification,
      msgReceivedParams,
    );
  };
  const saveNotificationCount = (count: any) => {
    dispatch(clearNotificationCount(count));
  };

  const saveGroupCount = (senderRole: any) => {
    dispatch(setMessagesCount(messages.MessagesCount.Count + 1));
    if (isAdmin(senderRole)) {
      if (
        User?.UserInfo?.roleName == 'Business Admin' &&
        senderRole == 'Franchise Admin'
      ) {
        dispatch(setFranchiseMessageCount(messages.FranchiseMessage.Count + 1));
      } else dispatch(setAdminMessageCount(messages.AdminMessage.Count + 1));
    } else if (isInstructor(senderRole)) {
      dispatch(
        setInstructorMessagesCount(messages.InstructorMessage.Count + 1),
      );
    } else if (isStudent(senderRole)) {
      dispatch(setStudentMessagesCount(messages.StudentMessage.Count + 1));
    } else if (isParent(senderRole)) {
      dispatch(setContactMessagesCount(messages.ContactMessage.Count + 1));
    } else if (isCoordinator(senderRole) || isExecutive(senderRole)) {
      dispatch(setStaffMessagesCount(messages.StaffMessage.Count + 1));
    }
  };

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 15,
      }}
      onPress={() => {
        NotifictionIconClicked();
      }}
    >
      <IconBadge
        MainElement={
          <_View
            style={{
              width: 5,
              height: 5,
            }}
          />
        }
        BadgeElement={
          <_Text
            style={{
              fontSize: 9.5,
              fontWeight: '700',

              color: 'white',
            }}
          >
            {notifications}
          </_Text>
        }
        IconBadgeStyle={{
          width: 19,
          height: 19,
          backgroundColor: whiteThemeColors.red,
          borderWidth: 1.5,
          borderColor: whiteThemeColors.white,
        }}
        Hidden={notifications == 0 || notifications == null}
      />
      {visible && (
        <ToastAlert
          title={title}
          msg={message}
          onHide={() => setVisible(false)}
        ></ToastAlert>
      )}
    </Pressable>
  );
};

export { NotificationsBadge };
