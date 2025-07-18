import { useDispatch, useSelector } from 'react-redux';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { setTimeTrackerBadges } from '../../../actions/TimeTrackerActions';
import { clearNotificationCount } from '../../../actions/NotificationActions';
import {
  setAdminMessageCount,
  setContactMessagesCount,
  setFranchiseMessageCount,
  setInstructorMessagesCount,
  setMessagesCount,
  setStaffMessagesCount,
  setStudentMessagesCount,
  setChatUser,
} from '../../../actions/MessengerActions';
import {
  GetUserNotification,
  getKioskCheckinList,
} from '../../../actions/PinCodeActions';
import { endpoint } from '../../../components';
import { NotificationTypes } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { Appstate } from '../../../reducers/Appstate';
import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
import ScreensNames from '../../../screenNames';
import { setModuelPagesPermissions } from '../../../actions/ModuelPagesPermissionsAction';
export const useDashboard = () => {
  const { Get } = DataAccess();
  const dispatch: any = useDispatch();
  const { currentFocus }: any = useSelector(
    (state: Appstate) => state.token.currentFocus,
  );
  const navigation: any = useNavigation();
  const getTimeTrackingCounter = () => {
    const Endpoint = ApiEndpoints.GetTimeTrackingCounter;
    Get(Endpoint).then(async (res: any) => {
      if (res.error) {
        return;
      } else {
        dispatch(setTimeTrackerBadges(res));
      }
    });
  };
  const getParentQuickLinkConfiguration = async () => {
    const Endpoint = ApiEndpoints.GetParentQuickLinksConfiguration;
    const res = await Get(Endpoint);
    if (res.error) {
      return null; // or throw an error, or handle it as you prefer
    }
    return res;
  };
  const getViewProgramConfiguration = async () => {
    const Endpoint = ApiEndpoints.GetViewProgramConfiguration;
    const res = await Get(Endpoint);
    if (res.error) {
      return null; // or throw an error, or handle it as you prefer
    }
    return res.data;
  };

   const getModulePagesPermissions = async () => {
      var EndPoint = ApiEndpoints.GetModuelPagesPermissions;
      Get(EndPoint).then(async (res) => {
        if (res.error) {
          return;
        } else {
          console.log({"data":res.data,"page action":res.data[0].pageActions});
          
          dispatch(setModuelPagesPermissions(res.data));
        }
      });
    };

  const handleNotificationMessageCount = () => {
    dispatch(GetUserNotification()).then((notificationMessagesBadges: any) => {
      dispatch(clearNotificationCount(notificationMessagesBadges.notiCount));
      dispatch(setMessagesCount(notificationMessagesBadges.msgCount));
      dispatch(setAdminMessageCount(notificationMessagesBadges.adminCount));
      dispatch(setStaffMessagesCount(notificationMessagesBadges.staffCount));
      dispatch(
        setFranchiseMessageCount(notificationMessagesBadges.frownersCount),
      );
      dispatch(setInstructorMessagesCount(notificationMessagesBadges.insCount));
      dispatch(
        setContactMessagesCount(notificationMessagesBadges.contactCount),
      );
      dispatch(setStudentMessagesCount(notificationMessagesBadges.stdCount));
    });
  };

  const getCompanyCheckInList = () => {
    dispatch(getKioskCheckinList());
  };

  const _getChatUser = async (userId: any, remoteMessage: any) => {
    const Endpoint: endpoint = ApiEndpoints.Contacts;
    Endpoint.params = `?ChatFor=${0}&skip=${0}&Take=${10}&userKey=${userId}`;
    Get(Endpoint).then(async (res: any) => {
      await dispatch(setChatUser(res.value[0]));
      await _firebaseNotification(remoteMessage);
    });
  };

  const _firebaseNotification = async (data: any) => {
    const notificationType = data?.data?.NotificationType;
    const receiverObj = await JSON.parse(data?.data?.receiverObj);
    const obj = {
      color: receiverObj.userColor,
      companyKey: receiverObj.companyID,
      companyName: null,
      companyType: 'Company',
      fname: receiverObj.firstName,
      fullName: receiverObj.fullName,
      image: receiverObj.userImage,
      index: 1,
      isOWner: receiverObj.isOWner,
      isUserActive: false,
      lastMessage: 'Ggg',
      lastMsgDateTime: '2021-10-15T11:41:20.607',
      lname: receiverObj.lastName,
      notiCount: 0,
      phoneNo: null,
      unReadMsgCount: 0,
      userGuid: receiverObj.userGuid,
      userId: receiverObj.userID,
      userName: receiverObj.userName,
    };
    if (notificationType == NotificationTypes.Chat) {
      if (currentFocus === 'ChatInterface') {
        return;
      } else {
        await navigation.navigate(ScreensNames.chatInterface.name, {
          name: receiverObj.fullName,
          To: receiverObj.userID,
          UserObj: obj,
          fromNotification: true,
          groupName: '',
        });
      }
    } else {
      navigation.navigate(DrawerScreens.notificationsTab.name);
    }
  };
  return {
    getTimeTrackingCounter,
    handleNotificationMessageCount,
    _getChatUser,
    _firebaseNotification,
    getCompanyCheckInList,
    getModulePagesPermissions,
    getParentQuickLinkConfiguration,
    getViewProgramConfiguration
  };
};
