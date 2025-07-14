import { ChatObj, UserData, ChatUserObj } from 'interfaces';
import moment from 'moment';
export const chatObject = (
  ChatObj: ChatObj,
  ChatUserObj: ChatUserObj,
  UserData: UserData,
) => {
  let dateTime = moment(ChatObj.dateTime).toISOString();
  return {
    _id: ChatObj.id,
    text: ChatObj.message,
    createdAt: dateTime,
    isRead: ChatObj.isRead,
    attachment: ChatObj.attachment,
    image: ChatObj?.image,
    video: ChatObj?.video,
    file: ChatObj?.file,
    audio: ChatObj?.audio,
    isReceived: ChatObj.isRecieved,
    videoThumbnailURL: ChatObj?.videoThumbnailURL,
    user: {
      _id: ChatObj.fromId,
      name:
        ChatObj.FromId == UserData.userID
          ? `${UserData.fullName}`
          : `${ChatUserObj.fname} ${ChatUserObj.lname}`,
      avatar: true,
    },
  };
};
