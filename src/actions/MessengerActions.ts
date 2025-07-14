import ApiEndPoint from '../../data/ApiEndpoints/index';
import { DataAccess } from '../../data/DAL';

import { success } from './PlanActions';
import { error, loading } from './AsyncStorage';
import { endpoint } from 'components';
const { Get, PostSecuredWithParams } = DataAccess();
export const setChatFor = (data: any) => ({
  type: 'SET_CHAT_FOR',
  data,
});
export const fileFormateType = (data: any) => ({
  type: 'File_FORMATE',
  data: data,
});
export const selectedTypes = (data: any) => ({
  type: 'SELECTED_TYPE',
  data: data,
});
export const saveLocalImageURI = (data: any) => ({
  type: 'SAVE_LOCAL_IMAGE_URI',
  data: data,
});
export const saveGalleryAttachmentImageURI = (data: any) => ({
  type: 'SAVE_GALLERY_LOCAL_IMAGE_URI',
  data: data,
});
export const saveThumbnailUri = (data: any) => ({
  type: 'Save_Thumbnai_lUri',
  data: data,
});
export const upLoadFileloading = (bool: any) => ({
  type: 'LOADING_File',
  isLoadingFile: bool,
});
export const saveFileUrl = (data: any) => ({
  type: 'File_URL',
  data: data,
});
export const ChatUsers = (ChatUsers: any) => ({
  type: 'CHAT_CONTACT',
  ChatRoomUsers: ChatUsers,
});
export const UpdateChatUsers = (ChatUsers: any) => ({
  type: 'UPDATE_CHAT_CONTACT',
  ChatRoomUsers: ChatUsers,
});

export const ChatUser = (data: any) => ({
  type: 'CHAT_USER',
  data,
});

export const UserChats = (data: any, isList: any) => ({
  type: 'USER_CHAT',
  data,
  isList,
});

export const MessageCount = (Count: any) => ({
  type: 'MessagesCount',
  data: Count,
});
export const ResetMessageCount = (Count: any) => ({
  type: 'reset',
  data: Count,
});
export const StudentMessagesCount = (Count: any) => ({
  type: 'StudentMessage',
  data: Count,
});
export const StaffMessagesCount = (Count: any) => ({
  type: 'StaffMessage',
  data: Count,
});
export const ContactMessagesCount = (Count: any) => ({
  type: 'ContactMessage',
  data: Count,
});
export const InstructorMessagesCount = (Count: any) => ({
  type: 'InstructorMessage',
  data: Count,
});
export const AdminMessageCount = (Count: any) => ({
  type: 'AdminMessage',
  data: Count,
});
export const FranchiseMessageCount = (Count: any) => ({
  type: 'FranchiseMessage',
  data: Count,
});

const UpdateIsReceivedStatus = (status: any) => ({
  type: 'isReceivedMessageStatus',
  data: status,
});

export const saveGalleryAttachmentPath = (
  file: any,
  base64: any,
  isVideo: any,
) => ({
  type: 'save_Gallery_File',
  data: { file, base64, isVideo },
});

export const setCategory = (Category: any) => async (dispatch: any) => {
  try {
    return dispatch(setChatFor(Category));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const GetContacts = (
  ContactFor: any,
  skip: any,
  take: any,
  isFromCategory: any,
) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.Contacts;
    EndPoint.params = `?ChatFor=${ContactFor}&skip=${skip}&Take=${take}`;
    let response = await Get(EndPoint);
    EndPoint.params = undefined;
    if (response.error) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      if (isFromCategory) {
        dispatch(ChatUsers(response));
        return new Promise((resolve, reject) => {
          resolve(response);
        });
      } else {
        return new Promise((resolve, reject) => {
          resolve(response);
          dispatch(UpdateChatUsers(response));
        });
      }
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const setChatUser = (userObj: any) => async (dispatch: any) => {
  try {
    return dispatch(ChatUser(userObj));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const setUserChats = (userChats: any, isList: any) => async (
  dispatch: any,
) => {
  try {
    return dispatch(UserChats(userChats, isList));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const setMessagesCount = (Count: any) => async (dispatch: any) => {
  try {
    return dispatch(MessageCount(Count));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const setStudentMessagesCount = (Count: any) => async (
  dispatch: any,
) => {
  try {
    return dispatch(StudentMessagesCount(Count));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const setContactMessagesCount = (Count: any) => async (
  dispatch: any,
) => {
  try {
    return dispatch(ContactMessagesCount(Count));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const setInstructorMessagesCount = (Count: any) => async (
  dispatch: any,
) => {
  try {
    return dispatch(InstructorMessagesCount(Count));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const setStaffMessagesCount = (Count: any) => async (dispatch: any) => {
  try {
    return dispatch(StaffMessagesCount(Count));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const setFranchiseMessageCount = (Count: any) => async (
  dispatch: any,
) => {
  try {
    return dispatch(FranchiseMessageCount(Count));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const setAdminMessageCount = (Count: any) => async (dispatch: any) => {
  try {
    return dispatch(AdminMessageCount(Count));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const resetMessagesCount = (Count: any) => async (dispatch: any) => {
  try {
    return dispatch(ResetMessageCount(Count));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const setUnreadMessages = (data: any) => async (dispatch: any) => {
  try {
    return dispatch(ChatUsers(data));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const GetPreviousChat = (
  To: any,
  From: any,
  userGuid: any,
  take: any,
  skip: any,
) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.GetPrevChat;
    EndPoint.params = `?To=${To}&From=${From}&userGuid=${userGuid}&take=${take}&skip=${skip}`;
    let response = await Get(EndPoint);
    if (response.error) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const updateIsReadMessageDB = (
  To: any,
  From: any,
  userGuid: any,
) => async (dispatch: any) => {
  try {
    var EndPoint = ApiEndPoint.updateIsRead;
    var params = `?To=${To}&From=${From}&userGuid=${userGuid}`;
    let response = await PostSecuredWithParams(EndPoint, params);
    if (response.error) {
      return dispatch(error(response.message || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const setReceivedMessages = (data: any) => async (dispatch: any) => {
  try {
    return dispatch(UpdateIsReceivedStatus(data));
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
