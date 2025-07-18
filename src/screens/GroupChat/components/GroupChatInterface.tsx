import React, { FC, useState, useEffect, useCallback } from 'react';
import { _View, _Text, _VectorIcons, _Screen } from '../../../components';
import { endpoint } from '../../../components';
import { convertUTCDateStringToLocalDate, whiteThemeColors } from '../../../Utilities';
import { useNavigation } from '@react-navigation/native';

import { GiftedChat, Message } from 'react-native-gifted-chat';
import { ChatHeader } from './ChatHeader';
import { AppState, Keyboard, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserImg } from '../../ThumbNail';
import {
  UpdateChatObj,
  getRoomChatObject,
} from '../../Chat/ChatInterfaceScreen/Functions';
import WhiteLabelConfig from '../../../WhiteLabelConfig';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { EditGroupModal } from './EditGroupModal';
import {
  fileFormateType,
  saveFileUrl,
  saveThumbnailUri,
  selectedTypes,
  upLoadFileloading,
} from '../../../actions/MessengerActions';
import { useUploadAttachment } from '../../Chat/ChatInterfaceScreen/CameraAttachmentComponents';
import {
  renderBubble,
  renderDay,
  renderInputToolbar,
  renderMessageText,
  renderTime,
  useRenderMessageImage,
  VoiceMessageArea,
} from '../../Chat/ChatInterfaceScreen/components';
import { Appstate } from '../../../reducers/Appstate';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import LoadingSc from '../../Loader/Loading';
import Loader from '../../Loader/loader';
import { UpdateChatObj_returningObj } from '../../../interfaces';
import { OopsModal } from '../../../components/OopsModal';
const voiceRecorder: any = new AudioRecorderPlayer();
voiceRecorder.setSubscriptionDuration(0.09); //default is 0.1
export const GroupChatInterface: FC = ({ route }) => {
  const navigation = useNavigation();
  const [keyboardStatus, setKeyboardStatus] = useState<"Keyboard Hidden" | "Keyboard Shown" | "">("")
  const [messages, setMessages] = useState<UpdateChatObj_returningObj[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isConnectionError, setIsConnectionError] = useState(false);
  const {
    fileUrl,
    localImageURI,
    selectedType,
    fileGallery,
    thumbnaillUri,
    galleryLocalImageURI,
    fileFormate,
  }: any = useSelector((state: Appstate) => state.chat);
  const { Get } = DataAccess();
  const { uploadFile } = useUploadAttachment();
  const [renderMessageImage, renderMessageFile, renderSend] =
    useRenderMessageImage();
  const { socketIO } = useSelector((state: Appstate) => state.token);
  const User: any = useSelector((state: Appstate) => state.User.UserInfo);
  const roomObj = route.params.roomName;
  const getGroups = route.params.getGroups;
  const dispatch: any = useDispatch();
  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  const [voiceMsgArea, setVoiceMsgArea] = useState<boolean>(false);
  const messageIdGenerator: () => string = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleVoiceSend: (
    second: number,
    uploadedFile: any,
  ) => Promise<void> = async (second, uploadedFile) => {
    const obj = [
      {
        _id: messageIdGenerator(),
        createdAt: new Date(),
        text: '',
        user: { _id: User.userID },
        messageType: 'audio',
        audio: uploadedFile.url,
      },
    ];
    await onSend(obj);
  };
  const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardStatus('Keyboard Hidden');
  });
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    return () => {
      hideSubscription.remove();
      showSubscription.remove();
    };
  }, []);
  useEffect(() => {
    let name = User.userName;
    let room = roomObj?.name;
    // The rest of the code
    socketIO.emit('join-group', { name, room: room });
  }, [roomObj]);
  useEffect(() => {
    let name = User.userName;
    let room = roomObj.name;
    return () => {
      setSkip(0);
      setIsLoadMore(true);
      socketIO.emit('disconnect-room', { name, room: room });
    };
  }, []);
  useEffect(() => {
    socketIO.on('group-message', (message: any) => {
      setMessages((messages) => [message, ...messages]);
    });
  }, [roomObj]);
  useEffect(() => {
    GetPreviousChat();
  }, []);

  const renderAvatar = (props) => {
    const memoizedRenderAvatar = useCallback(() => {
      const { currentMessage } = props;
      const { user } = currentMessage;
      const UsrInfo = {
        FirstName: user.name,
        LastName: user.name,
        UserImage: typeof user?.avatar == 'boolean' ? '' : user?.avatar,
        UserImageColor: whiteThemeColors.primaryColor,
      };

      return <UserImg UserInfo={UsrInfo} size={36} />;
    }, [messages]);

    return memoizedRenderAvatar();
  };

  const GetPreviousChat = async () => {
    if (!isLoadMore) return;

    try {
      // dispatch(loading(true));
      setLoading(true);

      const EndPoint: endpoint = ApiEndpoints.GetPrevGroupChat;
      EndPoint.params = `?groupId=${roomObj.groupId}&take=${20}&skip=${skip}`;

      const response = await Get(EndPoint);
      // dispatch(loading(false));
      setLoading(false);

      if (response.error) return;

      const dbMessages = response.map((x: any) => ({
        ...x,
        dateTime: convertUTCDateStringToLocalDate(x.dateTime),
      }));

      const chats = await UpdateChatObj(dbMessages, {}, User);
      const updatedMessages = [...messages, ...chats.reverse()];

      setMessages(updatedMessages);
      setSkip(skip + 20);
      setIsLoadMore(response.length >= 20);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      // dispatch(loading(false));
      setLoading(false);
    }
  };
  const onSend = async (newMessages = []) => {
    try {
      let newObj = newMessages[0]?.object ? newMessages[0]?.object : undefined;
      let uri, isAudio;
      uri = fileGallery?.file?.uri;
      isAudio = false;
      let uploadedFile;

      if (Boolean(fileFormate)) {
        uploadedFile = await uploadFile(
          uri,
          fileGallery.isVideo,
          fileGallery.isVideo,
          isAudio,
          fileGallery?.file,
        );
      }

      let fileType = {};
      if (selectedType === 1 || newObj?.selectedType === 1) {
        fileType = {
          image: newObj?.localImageURI ? newObj?.localImageURI : localImageURI,
        };
      } else if (selectedType == 2 || newObj?.selectedType === 2) {
        fileType = {
          video: Boolean(newObj?.uri) ? newObj?.uri?.url : galleryLocalImageURI,
          videoThumbnailURL: Boolean(newObj?.uri)
            ? newObj?.uri
              ? newObj?.uri?.thumbnailURL
                ? newObj?.uri?.thumbnailURL
                : newObj?.localImageURI
              : thumbnaillUri
            : uploadedFile?.uri?.thumbnailURL,
        };
      } else if (selectedType == 3) {
        fileType = {
          file: uploadedFile?.uri?.url,
        };
      } else if (selectedType == 4 || newObj?.selectedType === 4) {
        fileType = {
          audio: Boolean(fileFormate)
            ? uploadedFile?.uri?.url
            : newObj?.uri
              ? newObj?.uri?.url
              : fileUrl,
        };
      }

      delete newMessages[0].object;

      let fileURL, thumbnailURL;
      if (Boolean(fileFormate)) {
        fileURL = uploadedFile?.uri?.url;
        thumbnailURL = uploadedFile?.uri?.thumbnailURL;
      } else {
        fileURL = newObj?.uri?.url ? newObj?.uri?.url : fileUrl;
        thumbnailURL = newObj?.uri ? newObj?.uri?.thumbnailURL : thumbnaillUri;
      }

      let chatObj = getRoomChatObject(
        User,
        newMessages[newMessages.length - 1],
        fileURL,
        thumbnailURL,
      );
      chatObj = { ...chatObj, ...fileType };
      let memberIds = [];
      let memberGuids = [];
      memberIds.push(roomObj.chatGroupMembers.map((item) => item.memberId));
      memberGuids.push(roomObj.chatGroupMembers.map((item) => item.userGuid));

      const data = {
        message: newMessages,
        roomName: roomObj.name,
        roomId: roomObj.groupId,
        UserObj: chatObj,
        receiverObj: {},
        chatFor: '',
        licenseCode: '', // UserData.licenseCode,
        familyCode: '', // UserData.familyCode,
        variantName: WhiteLabelConfig.APP_VARIANT_NAME,
        membersIds: memberIds[0],
        memberGuids: memberGuids[0],
      };

      socketIO.emit('send-group-message', data);
      dispatch(upLoadFileloading(false));
      dispatch(saveThumbnailUri(''));
      dispatch(fileFormateType(null));
      dispatch(selectedTypes(0));
      dispatch(saveFileUrl(null));
    } catch (error) {
      console.log('---ERROR', error);
    }
  };
  const handleVoiceMsg = (res: boolean) => {
    Keyboard.dismiss();
    setVoiceMsgArea(res);
  };
  useEffect(() => {
    socketIO.on('connect_error', async () => {
      setIsConnectionError(true);
    });
  }, []);

  const renderMessage = (props) => <Message {...props} showUserAvatar={true} />;
  const handleBack: () => boolean = () => {
    setKeyboardStatus('Keyboard Hidden'); // Reset keyboard status
    Keyboard.dismiss(); // Explicitly hide the keyboard
    hideSubscription.remove()
    navigation.goBack();
    return true;
  }

  return (
    <_Screen
      flex={1}
      header={
        <ChatHeader
          onBack={handleBack}
          name={roomObj.name}
          members={roomObj?.chatGroupMembers}
          onPress={() => setShowDetails(true)}
        />
      }
      hideTopSafeArea
      hideBottomSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={handleBack}
    >
      <_View style={{ flex: 1, backgroundColor: whiteThemeColors.background,paddingBottom:4 }}>
        <_View
          style={{
            height: '100%',
            backgroundColor: 'white',
            paddingBottom: Platform.OS == "ios" && keyboardStatus == "Keyboard Shown" ? 25 : 0
          }}
        >
          {loading && <Loader />}
          <GiftedChat
            messagesContainerStyle={{ paddingBottom: 30 }}
            messages={messages}
            listViewProps={{
              onEndReached: () => {
                GetPreviousChat();
              },
              onEndReachedThreshold: 0.7,
            }}
            renderSend={(props) => renderSend(props, isMicOn, handleVoiceMsg)}
            alignTop={false}
            onSend={(messages) => onSend(messages)}
            onInputTextChanged={(text) => {
              isMicOn && setIsMicOn(false);
              if (text.length === 0) setIsMicOn(true);
            }}
            // renderInputToolbar={(props) => customtInputToolbar(props)}
            renderMessage={renderMessage}
            renderInputToolbar={(props) => renderInputToolbar(props)}
            renderMessageText={(props) => renderMessageText(props)}
            renderBubble={(props) => renderBubble(props, voiceRecorder)}
            renderDay={(props) => renderDay(props)}
            renderTime={(props) => renderTime(props)}
            renderCustomView={(props) =>
              renderMessageFile(props, isMicOn, setIsMicOn)
            }
            renderMessageImage={(props) =>
              renderMessageImage(props, isMicOn, setIsMicOn)
            }
            user={{
              _id: User.userID,
              name: User.userName,
              avatar: User.userImag,
            }}
            renderAvatar={(props) => renderAvatar(props)}
            showUserAvatar={true}
            shouldUpdateMessage={(props, nextProps) =>
              props.extraData !== nextProps.extraData
            }
            received={true}
            sent={true}
          />

          {voiceMsgArea && (
            <VoiceMessageArea
              showVoiceMsg={voiceMsgArea}
              setVoiceMsg={setVoiceMsgArea}
              onSendVoiceMsg={handleVoiceSend}
            />
          )}
        </_View>
      </_View>
      <EditGroupModal
        showModal={showDetails}
        setShowModal={setShowDetails}
        groupInfo={roomObj}
        getGroups={getGroups}
      />
      <OopsModal
        visible={isConnectionError}
        setVisible={() => setIsConnectionError(false)}
        alertMessage={
          'Messaging App is down at the moment, you cannot send the message. Please contact your administrator.'
        }
      />
    </_Screen>
  );
};
