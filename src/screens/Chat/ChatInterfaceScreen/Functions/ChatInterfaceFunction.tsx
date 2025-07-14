import React from 'react';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { createThumbnail } from 'react-native-create-thumbnail';
import DocumentPicker from '@react-native-documents/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { chatObject, whiteThemeColors } from 'utilities';
import {
  fileFormateType,
  saveGalleryAttachmentImageURI,
  saveGalleryAttachmentPath,
  saveLocalImageURI,
  saveThumbnailUri,
  selectedTypes,
} from '../../../../actions/MessengerActions';
import {
  _VectorIcons,
  _View,
  requestCameraPermission,
} from '../../../../components';
import { NotificationTypes } from '../../../../constants';
import ScreensNames from '../../../../screenNames';
import { stateConstants } from '../States';
import {
  UpdateChatObjArgument_chatlistInterface,
  UpdateChatObjArgument_ChatUserInfoInterface,
  UpdateChatObjArgument_UserInfoInterface,
  UpdateChatObj_returningObj,
  getChatObjectAgrgument_SenderInterface,
  getChatObjectArgument_MsgInterface,
  getChatObjectArgument_ReceiverInterface,
  getChatObjectArgument_StateInterface,
  ChatUserObj,
} from '../../../../interfaces';

export const UpdateChatObj = async (
  chatlist: UpdateChatObjArgument_chatlistInterface[],
  ChatUserInfo: UpdateChatObjArgument_ChatUserInfoInterface,
  UserInfo: UpdateChatObjArgument_UserInfoInterface
) => {
  var Chats: UpdateChatObj_returningObj[] = [];
  await chatlist?.map((Obj: any) => {
    let obj = Obj?.attachment?.length > 0 && findAttachmentType(Obj.attachment);
    Obj = { ...Obj, ...obj };
    if (Object.keys(ChatUserInfo).length === 0) {
      const UsrInfo: ChatUserObj = {
        color: whiteThemeColors.primary,
        companyKey: 0,
        companyType: '',
        fname: Obj.fromUserName,
        fullName: Obj.fromUserName,
        image: '',
        index: 0,
        isOWner: false,
        isUserActive: false,
        lastMessage: '',
        lastMsgDateTime: '',
        lname: Obj.fromUserName,
        userGuid: '',
        userId: 0,
        userName: Obj.fromUserName,
      };
      Chats.push(chatObject(Obj, UsrInfo, UserInfo));
    } else Chats.push(chatObject(Obj, ChatUserInfo, UserInfo));
  });
  return Chats;
};

export const extractNameExtension: (path: string) => any[] = (path) => [
  path?.split('/').pop(),
  path?.split('.').pop(),
];

export const findAttachmentType = (url: string, videoThumbnailURL?: string) => {
  if (url == undefined || url == null) return;
  let urlType = url.split('.').pop()!;
  if (['jpeg', 'png', 'jpg'].includes(urlType)) {
    return { image: url };
  } else if (['mkv', 'mp4', 'mov', 'webm'].includes(urlType)) {
    return videoThumbnailURL
      ? { video: url, videoThumbnailURL: videoThumbnailURL }
      : { video: url };
  } else if (['m4a', 'mp3', 'aac'].includes(urlType)) {
    return { audio: url };
  } else {
    return { file: url };
  }
};

export const getChatObject = (
  Sender: getChatObjectAgrgument_SenderInterface,
  Reciever: getChatObjectArgument_ReceiverInterface,
  Msg: getChatObjectArgument_MsgInterface,
  state: getChatObjectArgument_StateInterface,
  fileUrl: string | undefined,
  thumbnailURL: string | undefined
) => {
  if (!Boolean(fileUrl)) {
    fileUrl = Msg?.audio;
  }
  let date = new Date().toISOString();
  console.log('----KSG TIME', date);
  let obj = {
    ToId: Reciever.userId,
    ToUsername: Reciever.userName,
    CompanyID: Sender.companyID,
    isRead: state.isUserOnline ? 1 : 0,
    isReceive: state.isUserOnline ? 1 : 0,
    FromId: Sender.userID,
    FromUserName: Sender.userName,
    Message: unescape(Msg?.text),
    FromRoleName: Sender.roleName,
    DateTime: date,
    TextMessage: unescape(Msg?.text),
    isOwner: Reciever.isOWner,
    receiverUsrGuid: Reciever.userGuid,
    licenseCmpKey: Sender.licenseCmpKey,
    recieverTokens: state.recieverTokens,
    recieverNotiCout:
      Reciever.notiCount == null || undefined ? 0 : Reciever.notiCount,
    senderName: Sender.fullName,
    notificationType: NotificationTypes.Chat,
    BusinessCompanyGuid: Sender.businessCompanyGuid,
    attachmentUrl: fileUrl,
    videoThumbnailURL: thumbnailURL,
  };
  let attachmentObj = fileUrl != null && findAttachmentType(fileUrl);
  return { ...obj, ...attachmentObj };
};

export const getRoomChatObject = (
  Sender: getChatObjectAgrgument_SenderInterface,
  Msg: getChatObjectArgument_MsgInterface,
  // Reciever: getChatObjectArgument_ReceiverInterface,
  //
  // state: getChatObjectArgument_StateInterface,
  fileUrl: string | undefined,
  thumbnailURL: string | undefined
) => {
  console.log('----file url', fileUrl);
  const currentDate = new Date();

  // Convert the Date object to a string in the desired format
  const date = currentDate.toISOString();

  console.log('-----DATE IN FUNCTION', date);
  let obj = {
    ToId: null,
    ToUsername: null,
    CompanyID: Sender.companyID,
    isRead: 1,
    isReceive: 1,
    FromId: Sender.userID,
    FromUserName: Sender.userName,
    Message: unescape(Msg?.text),
    FromRoleName: Sender.roleName,
    DateTime: date,
    TextMessage: unescape(Msg?.text),
    // isOwner: Reciever.isOWner,
    receiverUsrGuid: null,
    licenseCmpKey: Sender.licenseCmpKey,
    // recieverTokens: state.recieverTokens,
    // recieverNotiCout:
    //   Reciever.notiCount == null || undefined ? 0 : Reciever.notiCount,
    senderName: Sender.fullName,
    notificationType: NotificationTypes.Chat,
    BusinessCompanyGuid: Sender.businessCompanyGuid,
    attachmentUrl: fileUrl,
    videoThumbnailURL: thumbnailURL,
  };

  return { ...obj };
};

export const readMessageStatus = (Obj: any) => {
  const { state, setState } = Obj;
  let updatedChat = state.filteredChat.map((singleMsg: any) => {
    let msg = singleMsg;
    msg.isReceived = true;
    msg.isRead = true;
    return msg;
  });
  setState({ type: stateConstants.FILTERED_CHAT, data: updatedChat });
};

export const updateMessageStatus: ({
  state,
  setState,
}: {
  state: any;
  setState: any;
}) => void = ({ state, setState }) => {
  let updatedChat = state?.filteredChat.map((singleMsg: any) => {
    let msg = singleMsg;
    msg.isReceived = true;
    return msg;
  });
  setState({
    type: stateConstants.SET_MESSAGES,
    data: { messages: updatedChat, filteredChat: updatedChat },
  });
};

export const renderTicks: (currentMessage: any, UserData: any) => any = (
  currentMessage,
  UserData
) => {
  const senderId = UserData?.userId || UserData?.userID;
  return currentMessage.user._id == senderId ? (
    <_View style={{ marginRight: 3, marginBottom: 3 }}>
      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name={
          currentMessage.isReceived || currentMessage.isRead
            ? 'check-all'
            : 'check'
        }
        size={13}
        color={
          currentMessage.isRead
            ? whiteThemeColors.primary
            : whiteThemeColors.greyDark
        }
      />
    </_View>
  ) : null;
};

export const renderItemIcon: (item: any) => JSX.Element | null = (item) => {
  if (item.file) {
    return (
      <_VectorIcons
        type={'Feather'}
        name={'file-plus'}
        size={20}
        color={whiteThemeColors.primary}
      />
    );
  } else if (item.camera) {
    return (
      <_VectorIcons
        type={'Entypo'}
        name={'camera'}
        size={20}
        color={whiteThemeColors.primary}
      />
    );
  } else if (item.photo) {
    return (
      <_VectorIcons
        type={'AntDesign'}
        name={'addfile'}
        size={20}
        color={whiteThemeColors.primary}
      />
    );
  }

  return null;
};

export const selectAction: (
  item: any,
  dispatch: any,
  setIsMenuOpen: any,
  navigation: any,
  onSend: any
) => void = (item, dispatch, setIsMenuOpen, navigation, onSend) => {
  console.log('selectAction');
  if (item === 0) {
    Camera(setIsMenuOpen, navigation, onSend);
    dispatch(selectedTypes(1));
  } else if (item === 1) {
    handleSelectFile(setIsMenuOpen, dispatch);
    dispatch(selectedTypes(3));
  } else {
    handleLaunchImageLibrary(setIsMenuOpen, dispatch);
  }
};

const handleLaunchImageLibrary: (setIsMenuOpen: any, dispatch: any) => void = (
  setIsMenuOpen,
  dispatch
) => {
  let options: any = {
    mediaType: 'image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
      includeBase64: false,
      saveToPhotos: true,
    },
  };
  launchImageLibrary(options, (response: any) => {
    setIsMenuOpen(false);
    if (response.didCancel) {
    } else if (response.error) {
    } else {
      const file = {
        uri: response?.assets[0]?.uri,
        exten: response?.assets[0]?.uri.split('.').pop(),
        name: response?.assets[0]?.fileName,
        size: response?.assets[0]?.type,
        type: response?.assets[0]?.type,
      };

      let isBase64 = true,
        isVideo = true;
      console.log('file.type', file.type);
      if (file.type.includes('image')) {
        isVideo = false;
        dispatch(selectedTypes(1));
        dispatch(fileFormateType('Image'));
        dispatch(saveLocalImageURI(file?.uri));
        dispatch(saveGalleryAttachmentPath(file, isBase64, isVideo));
      } else {
        createThumbnail({
          url: file?.uri,
        })
          .then((response) => {
            console.log('response', response);
            dispatch(saveThumbnailUri(response?.path));
          })
          .catch((err) => console.log({ err }));
        dispatch(selectedTypes(2));
        dispatch(saveGalleryAttachmentImageURI(file?.uri));
        dispatch(saveGalleryAttachmentPath(file, isBase64, isVideo));
      }
      dispatch(fileFormateType('Image'));
    }
  });
};

const handleSelectFile: (
  setIsMenuOpen: (val: boolean) => void,
  dispatch: any
) => Promise<void> = async (setIsMenuOpen, dispatch) => {
  try {
    const file = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles] || [DocumentPicker.types.images],
    });
    let isVideo = false;
    if (file) {
      let isBase64 = false;
      dispatch(fileFormateType('file'));
      dispatch(saveGalleryAttachmentPath(file, isBase64, isVideo));
      setIsMenuOpen(false);
      if (file.type != null)
        if (file?.type.includes('image')) {
          isVideo = false;
          dispatch(selectedTypes(1));
          dispatch(saveLocalImageURI(file?.uri));
        } else if (file.type.includes('video')) {
          dispatch(selectedTypes(2));
          dispatch(saveGalleryAttachmentImageURI(file?.uri));
        } else if (file.type.includes('audio')) {
          dispatch(selectedTypes(4));
        } else {
          dispatch(selectedTypes(3));
          dispatch(saveGalleryAttachmentImageURI(file?.uri));
        }
    }
  } catch (err) {}
};

function Camera(setIsMenuOpen: any, navigation: any, onSend: any): void {
  Platform.OS === 'android'
    ? CameraAndroid(setIsMenuOpen, navigation, onSend)
    : handleLaunchCamera(setIsMenuOpen, navigation, onSend);
}

function CameraAndroid(setIsMenuOpen: any, navigation: any, onSend: any): void {
  openCamera(navigation, onSend);
  setIsMenuOpen(false);
}
const handleLaunchCamera: (
  setIsMenuOpen: any,
  navigation: any,
  onSend: any
) => void = (setIsMenuOpen, navigation, onSend) => {
  openCamera(navigation, onSend);
  setIsMenuOpen(false);
};
const openCamera: (navigation: any, onSend: any) => Promise<void> = async (
  navigation,
  onSend
) => {
  const isMicrophonePermisson = await checkMicorPhonePermission();
  // console.log('isMicrophonePermisson', isMicrophonePermisson);
  if (!isMicrophonePermisson) return;
  const isCameraPermission = await checkCameraPermission();
  if (isCameraPermission)
    navigation.navigate(ScreensNames.Camera.name, { onSend: onSend });
};

export const checkMicorPhonePermission: () => Promise<boolean> = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        grants['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true;
      } else {
        if (grants['android.permission.RECORD_AUDIO'] === 'never_ask_again') {
          showAlert('"Micorphone"');
          return false;
        } else {
          showAlert('Camera, and Micorphone');
          return false;
        }
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    const result = await request(PERMISSIONS.IOS.MICROPHONE);
    if (result == RESULTS.GRANTED) {
      return true;
    } else if (result == RESULTS.UNAVAILABLE) {
      return false;
    } else if (result == RESULTS.DENIED) {
      return false;
    } else if (result == RESULTS.BLOCKED) {
      showAlert('Microphone');
      return false;
    } else if (result == RESULTS.LIMITED) {
      return false;
    } else return false;
  }
};

export const checkCameraPermission: () => Promise<
  boolean | undefined
> = async () => {
  const requestPermission = await requestCameraPermission();
  if (requestPermission) return true;
  return false;
};
export const showAlert: (item: any) => void = (item: any) => {
  Alert.alert('Alert', `user must allow ${item} permission`, [
    {
      text: 'Go to Settings',
      onPress: () => {
        Linking.openSettings();
      },
    },
    { text: 'Cancel', onPress: () => {}, style: 'destructive' },
  ]);
};
