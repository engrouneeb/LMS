import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { SetSocketId, SetupSocketIO } from '../../../actions/DashBoardActions';
import { useDashboard } from './';
export const useSockets = () => {
  const dispatch: any = useDispatch();
  const { handleNotificationMessageCount } = useDashboard();
  async function initSocket(UserData: any, token: string) {
    if (UserData?.licenseCmpKey == undefined) return;

    let roomName = `${UserData?.userName}^${UserData?.licenseCmpKey}`;
    const socket = io(
      // `https://messaging-lms.calibermatrix.com?roomName=${roomName}`,
      `https://calimaticmessage.azurewebsites.net?roomName=${roomName}`,
    );
    socket.on('connect', () => {
      if (token) {
        socket?.emit('subscribe', UserData?.userName + UserData?.userID);
      }
      dispatch(SetSocketId(socket.id));
    });
    socket?.on('notification-count', async (data: any) => {
      handleNotificationMessageCount();
    });

    // loadDataFromApi()
    //   .then(() => {})
    //   .catch(() => {});
    dispatch(SetupSocketIO(socket));
  }
  return { initSocket };
};
