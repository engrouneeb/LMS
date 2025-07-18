import { useNavigation } from '@react-navigation/native';
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Alert, AppState, Keyboard, Platform } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../reducers/Appstate';
import Loader from '../../Loader/loader';
import {
  DownloadDocs,
  convertUTCDateStringToLocalDate,
  isAdmin,
  isCoordinator,
  isExecutive,
  isInstructor,
  isParent,
  isStudent,
  whiteThemeColors,
} from '../../../Utilities';
import WhiteLabelConfig from '../../../WhiteLabelConfig';
import { setCurrentFocus } from '../../../actions/AsyncStorage';
import {
  GetPreviousChat,
  fileFormateType,
  saveFileUrl,
  saveThumbnailUri,
  selectedTypes,
  setReceivedMessages,
  setUserChats,
  upLoadFileloading,
  updateIsReadMessageDB,
} from '../../../actions/MessengerActions';
import { _Screen, _View } from '../../../components';
import { OopsModal } from '../../../components/OopsModal';
import {
  ChatInterfaceScreenInterface,
  getChatObjectArgument_MsgInterface,
  getUserChatParam,
  handleMsgReceivedInterface,
} from '../../../interfaces';
import EmptyList from '../../EmptyList';
import CstHeader from '../../Headers';
import Search from '../../Search';
import MsgScreenMeta from '../MsgScreen/MsgScreenMeta';
import { useUploadAttachment } from './CameraAttachmentComponents';
import {
  UpdateChatObj,
  findAttachmentType,
  getChatObject,
  readMessageStatus,
  renderTicks,
  updateMessageStatus,
} from './Functions';
import { initialState, messagesType, reducer, stateConstants } from './States';
import {
  SelectUserButton,
  SelectUserModal,
  VoiceMessageArea,
  renderAvatar,
  renderBubble,
  renderDay,
  renderFooter,
  renderInputToolbar,
  renderMessageText,
  renderTime,
  useRenderMessageImage,
} from './components';
const voiceRecorder: any = new AudioRecorderPlayer();
voiceRecorder.setSubscriptionDuration(0.09); //default is 0.1

export const ChatInterface: FC<ChatInterfaceScreenInterface> = ({ route }) => {
  const downloadDocsRef: MutableRefObject<undefined> = useRef();
  const { uploadFile } = useUploadAttachment();
  const [renderMessageImage, renderMessageFile, renderSend] =
    useRenderMessageImage();
  const navigation = useNavigation();
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const isDelivered = useSelector((state: Appstate) => state.chat.isDelivered);
  const {
    fileUrl,
    localImageURI,
    selectedType,
    fileGallery,
    thumbnaillUri,
    galleryLocalImageURI,
  }: any = useSelector((state: Appstate) => state.chat);
  const ChatUserObj: any = useSelector((state: Appstate) => state.chat.User);
  const { socketIO, currentFocus } = useSelector(
    (state: Appstate) => state.token,
  );
  const { groupName } = route?.params;
  const dispatch: any = useDispatch();
  const [keyboardStatus, setKeyboardStatus] = useState<"Keyboard Hidden" | "Keyboard Shown" | "">("")
  const [loading, setLoading] = useState(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  const [voiceMsgArea, setVoiceMsgArea] = useState<boolean>(false);
  const [isVisible, setisVisible] = useState(false);
  const file = useSelector((state: Appstate) => state.chat.fileFormate);
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
        user: { _id: UserData.userID },
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
    if (groupName.includes('View')) return;

    setGroupName();
    const myListener = AppState.addEventListener('change', async (appState) => {
      if (appState === 'inactive' || appState === 'background') {
        chatUserOnline(false, false);
      } else {
        chatUserOnline(true, true);
      }
    });
    dispatch(setCurrentFocus('ChatInterface'));
    // dispatch(loading(true));
    setLoading(true);
    loadChat();
    registerSocketIOMethod();
    return () => {
      myListener.remove();
      setState({ type: stateConstants.INTIAL_STATE });
      socketIO.removeListener('universal-message');
      socketIO.removeListener('chat-user-online');
      chatUserOnline(false, false);
    };
  }, []);
  useEffect(() => {
    socketIO?.emit('online-users', {});
    if (state.isSocketConnected == false) {
      Alert.alert(
        'Oops!',
        'Messaging App is down at the moment, you may not see some recent messages. Please contact your administrator',
        [{ text: 'OK' }],
      );
    }
  }, []);

  useEffect(() => {
    if (groupName.includes('View')) {
      setState({
        type: stateConstants.VIEW_MODAL,
        data: {
          modalVisible: true,
          STD_ID: state?.stdID === null ? 0 : state?.stdID,
          headerTitle: groupName.includes('Instructor-Student')
            ? 'Students'
            : 'Parents',
          chatID: groupName.includes('Instructor-Student') ? 4 : 5,
        },
      });
    }
  }, [groupName]);
  const setGroupName = () => {
    setState({
      type: stateConstants.GROUP_NAME_AND_OTHER_CHAT_SKIP,
      data: {
        groupName: groupName,
        otherChatSkip: 0,
      },
    });
  };

  const registerSocketIOMethod = async () => {
    socketIO.on(
      'chat-user-online',
      async (roomName: string, isOnline: boolean, isShakeHandReq: boolean) => {
        let chatUserRoomName = `${route.params.UserObj.userName}^${UserData.licenseCmpKey}`;
        if (chatUserRoomName == roomName) {
          if (state.isOnline != isOnline)
            setState({ type: stateConstants.IS_USER_ONLINE, data: isOnline });
          handleOnlineUserRef.current(isOnline, isShakeHandReq);
        }
      },
    );
    socketIO.on('user-typing', async (status: boolean) => {
      userTypingRef.current(status);
    });
    chatUserOnline(true, true);
    socketIO.on(
      'universal-message',
      async (data: handleMsgReceivedInterface) => {
        handleMessageReceivedRef.current(data);
      },
    );
    socketIO.on('connect_error', async () => {
      handleConnectionErrorRef.current();
    });
  };

  const setUserIsTyping: () => void = () => {
    if (+new Date() - state.typingTime > 1950) {
      setState({
        type: stateConstants.SET_TYPING_AND_TIME,
        data: {
          isTyping: true,
          typingTime: new Date(),
        },
      });
      setTimeout(() => {
        if (+new Date() - state.typingTime > 1900) {
          setState({ type: stateConstants.IS_TYPING, data: false });
        }
      }, 2000);
    }
  };
  const updateUserReadStatus: (interval: any) => Promise<void> = async (
    interval,
  ) => {
    setTimeout(() => {
      readMessageStatus({ state, setState });
    }, interval);
  };
  const chatUserOnline: (
    onlineStatus: boolean,
    isShakeHandReq: boolean,
  ) => void = (onlineStatus, isShakeHandReq) => {
    let receiverRoomName = `${route.params.UserObj.userName}^${UserData.licenseCmpKey}`;
    let senderRoomName = `${UserData.userName}^${UserData.licenseCmpKey}`;
    socketIO.emit(
      'chat-user-online',
      receiverRoomName,
      senderRoomName,
      onlineStatus,
      isShakeHandReq,
    );
  };
  const getUserChat: (item: getUserChatParam) => Promise<void> = async (
    item,
  ) => {
    setState({
      type: stateConstants.LOAD_MORE_AND_VIEW_CHAT_OF,
      data: {
        isLoadMoreChat: true,
        viewChatOf: item,
      },
    });
    onLoadChat(item, true, 0);
  };
  const onLoadChat = (
    item = state?.viewChatOf,
    loadMore = state?.isLoadMoreChat,
    skip = state.otherChatSkip,
  ) => {
    if (loadMore) {
      // dispatch(loading(true));
      setLoading(true);
      setState({ type: stateConstants.STD_ID, data: item?.userId });
      dispatch(
        GetPreviousChat(
          item?.userId,
          route?.params?.To,
          item?.userGuid,
          35,
          skip,
        ),
      ).then(async (response: any) => {
        // dispatch(loading(false));
        setLoading(false);
        setState({
          type: stateConstants.RECEIVER_TOKEN,
          data: response.data.key,
        });
        if (response?.data?.value?.length > 0) {
          let dbMessages = response?.data?.value.map((x: any) => {
            x.dateTime = convertUTCDateStringToLocalDate(x.dateTime);
            return x;
          });
          UpdateChatObj(dbMessages, route?.params?.UserObj, item)
            .then((chats) => {
              // dispatch(loading(false));
              setLoading(false);
              dispatch(setUserChats(chats, true));
              setState({
                type: stateConstants.SET_FILTERED_CHAT_DATA_AND_OTHER_CHAT_SKIP,
                data: {
                  filteredChat: [...state?.filteredChat, ...chats],
                  data: [...state?.data, ...chats],
                  otherChatSkip: state.otherChatSkip + 35,
                },
              });
            })
            .catch((er) => console.log('error1', er))
            .finally(() => loading(false));
        } else {
          setState({
            type: stateConstants.DATA,
            data: [],
          });
        }

        setState({
          type: stateConstants.IS_LOAD_MORE_CHAT,
          data: response.data.value.length > 34 ? true : false,
        });
      });
      // dispatch(loading(false));
      setLoading(false);
    }
  };

  const loadChat = () => {
    if (state.isLoadMore) {
      // dispatch(loading(true));
      setLoading(true);
      dispatch(
        GetPreviousChat(
          UserData.userID,
          route.params.To,
          ChatUserObj.userGuid,
          35,
          state.skip,
        ),
      ).then(async (response: any) => {
        setState({
          type: stateConstants.IS_READ_MESSAGE_AND_RECEIVER_TOKEN,
          data: {
            isReadMessage:
              response?.data?.value[response?.data?.value.length - 1],
            recieverTokens: response.data.key,
          },
        });

        if (response.data.value.length > 0) {
          let dbMessages = response.data.value.map((x: any) => {
            x.dateTime = convertUTCDateStringToLocalDate(x.dateTime);
            return x;
          });
          UpdateChatObj(dbMessages, route.params.UserObj, UserData).then(
            (chats) => {
              dispatch(setUserChats(chats, true));
              setState({
                type: stateConstants.SET_FILTERED_CHAT_DATA_AND_CHAT_SKIP,
                data: {
                  filteredChat: [...state.filteredChat, ...chats],
                  data: chats,
                  skip: state.skip + 35,
                },
              });
            },
          );
        }
        // dispatch(loading(false));
        setLoading(false);
        setState({
          type: stateConstants.IS_LOAD_MORE,
          data: response.data.value.length > 34 ? true : false,
        });
      });
    }
  };
  const onChangeText: (data: messagesType) => void = (data) => {
    setState({ type: stateConstants.FILTERED_CHAT, data: data });
  };

  const onSend: (
    messages?: getChatObjectArgument_MsgInterface[],
  ) => Promise<void> = async (messages = []) => {
    let newObj = messages[0]?.object ? messages[0]?.object : undefined;

    if (!state.isSocketConnected) {
      setState({
        type: stateConstants.ALERT_MESSAGE,
        data: 'Messaging App is down at the moment, you cannot send the message. Please contact your administrator.',
      });
      setState({ type: stateConstants.SHOW_ALERT, data: true });
      return;
    }
    route.params?.shiftToTop?.(messages, ChatUserObj.userId);
    let uri, isAudio;
    uri = fileGallery?.file?.uri;
    isAudio = false;
    let uploadedFile;
    if (Boolean(file)) {
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
        audio: Boolean(file)
          ? uploadedFile?.uri?.url
          : newObj?.uri
            ? newObj?.uri?.url
            : fileUrl,
      };
    }

    delete messages[0].object;
    let latestMsg = [
      {
        ...messages[0],
        isRead: state.isUserOnline,
        isReceived: state.isUserOnline,
        ...fileType,
      },
    ];
    let filteredChat = [...latestMsg, ...state.filteredChat];
    setState({ type: stateConstants.FILTERED_CHAT, data: filteredChat });
    dispatch(setUserChats(messages, false));
    let fileURL, thumbnailURL;
    if (Boolean(file)) {
      fileURL = uploadedFile?.uri?.url;
      thumbnailURL = uploadedFile?.uri?.thumbnailURL;
    } else {
      fileURL = newObj?.uri?.url ? newObj?.uri?.url : fileUrl;
      thumbnailURL = newObj?.uri ? newObj?.uri?.thumbnailURL : thumbnaillUri;
    }
    let chatObj = getChatObject(
      UserData,
      ChatUserObj,
      messages[messages.length - 1],
      state,
      fileURL,
      thumbnailURL,
    );
    let usrRole: any = chatObj.FromRoleName;
    let chatFor = 0;
    if (isStudent(usrRole)) {
      chatFor = MsgScreenMeta.Students;
    } else if (isParent(usrRole)) {
      chatFor = MsgScreenMeta.Contacts;
    } else if (isInstructor(usrRole)) {
      chatFor = MsgScreenMeta.Instructors;
    } else if (isExecutive(usrRole) || isCoordinator(usrRole)) {
      chatFor = MsgScreenMeta.Staff;
    } else if (isAdmin(usrRole)) {
      chatFor = UserData.isFranchise
        ? chatObj.isOwner
          ? MsgScreenMeta.FranchiseOwners
          : MsgScreenMeta.Admin
        : MsgScreenMeta.Admin;
    }
    let recieverFromApp = `${chatObj.ToUsername}^${UserData.licenseCmpKey}`;
    socketIO.emit('send-message', {
      reciever: recieverFromApp,
      message: messages,
      UserObj: chatObj,
      receiverObj: UserData,
      chatFor: chatFor,
      licenseCode: '', // UserData.licenseCode,
      familyCode: '', // UserData.familyCode,
      variantName: WhiteLabelConfig.APP_VARIANT_NAME,
    });
    dispatch(upLoadFileloading(false));
    dispatch(saveThumbnailUri(''));
    dispatch(fileFormateType(null));
    dispatch(selectedTypes(0));
    dispatch(saveFileUrl(null));
  };
  const handleOnlineUser: (
    isOnline: boolean,
    isShakeHandReq: boolean,
  ) => void = (isOnline, isShakeHandReq) => {
    if (isOnline) {
      if (isShakeHandReq) {
        updateUserReadStatus(0);
        chatUserOnline(true, false);
        dispatch(
          updateIsReadMessageDB(
            UserData.userID,
            route.params.To,
            ChatUserObj.userGuid,
          ),
        );
      }
    }
  };
  const handleMessageReceived: (data: handleMsgReceivedInterface) => void = (
    data,
  ) => {
    if (currentFocus === 'ChatInterface' || currentFocus === 'Messages') {
      if (data.UserObj.FromId === ChatUserObj.userId) {
        let newMessage = data.message;
        newMessage[0].createdAt = new Date(newMessage[0]?.createdAt);
        if (data?.UserObj?.attachmentUrl) {
          let attachment = findAttachmentType(
            data?.UserObj?.attachmentUrl,
            data?.UserObj?.videoThumbnailURL,
          );
          let receivedMessage = { ...newMessage[0], ...attachment };
          newMessage[0] = receivedMessage;
        }
        let filteredChat = [...newMessage, ...state.filteredChat];

        setState({
          type: stateConstants.SET_MESSAGES,
          data: {
            filteredChat: filteredChat,
            messages: filteredChat,
          },
        });

        setState({ type: stateConstants.FILTERED_CHAT, data: filteredChat });
        setState({ type: stateConstants.MESSAGES, data: filteredChat });
        dispatch(setUserChats(newMessage, false));
      }
    }
  };
  const handleConnectionError: () => void = () => {
    setState({ type: stateConstants.IS_SOCKET_CONNECTED, data: false });
  };
  const onLoadEarlier: () => void = () => {
    loadChat();
  };
  const onLoadOthersChat: () => void = () => {
    onLoadChat(state.viewChatOf);
  };
  const handleBack: () => boolean = () => {
    dispatch(setReceivedMessages(false));
    dispatch(setCurrentFocus('Messages'));
    chatUserOnline(false, false);
    voiceRecorder?._isPlaying &&
      voiceRecorder?.stopPlayer().then(() => {
        voiceRecorder?.removePlayBackListener();
      });
      setKeyboardStatus('Keyboard Hidden'); // Reset keyboard status
      Keyboard.dismiss(); // Explicitly hide the keyboard
      navigation.goBack();
    return true;
  };
  const handleModalVisiblility = () => {
    setState({ type: stateConstants.MODAL_VISIBLE, data: false });
  };

  const handleOnlineUserRef: any = useRef();
  const userTypingRef: any = useRef();
  const handleMessageReceivedRef: any = useRef();
  const handleConnectionErrorRef: any = useRef();
  userTypingRef.current = setUserIsTyping;
  handleOnlineUserRef.current = handleOnlineUser;
  handleMessageReceivedRef.current = handleMessageReceived;
  handleConnectionErrorRef.current = handleConnectionError;

  let userId = UserData.userId || UserData.userID;
  const [state, setState] = useReducer(reducer, initialState);

  if (Boolean(isDelivered)) {
    updateMessageStatus({ state, setState });
    dispatch(setReceivedMessages(false));
  }

  const handleVoiceMsg = (res: boolean) => {
    Keyboard.dismiss();
    setVoiceMsgArea(res);
  };

  const renderMessageTextCallback = useCallback(
    (props: any) => {
      return renderMessageText(props);
    },
    [state],
  );

  const renderAvatarCallback = useCallback(
    (props: any) => {
      return renderAvatar(props, UserData, ChatUserObj, state.viewChatOf);
    },
    [UserData, ChatUserObj, state.viewChatOf],
  );
  return (
    <_Screen
      header={
        <CstHeader
          isBack={true}
          GoBack={() => {
            handleBack();
          }}
          Screen={route.params.name != null ? route.params.name : 'Messages'}
          isSearchBtn
          OpenSearch={() => {
            setisVisible(true);
          }}
        />
      }
      backgroundColor={whiteThemeColors.background}
      flex={1}
      hideTopSafeArea
      hideBottomSafeArea
      onAndroidBack={handleBack}
    >
    <_View style={{ flex: 1, backgroundColor: whiteThemeColors.background }}>
      {/* <LoadingSc /> */}
      {loading && <Loader />}
      {isVisible && (
        <Search
          onInputChange={(data: messagesType) => onChangeText(data)}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={state.data}
          searchKey='text'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
          showCross
        />
      )}

      {groupName.includes('View') && (
        <SelectUserButton
          onPress={() => {
            groupName.includes('Instructor-Student')
              ? [
                setState({
                  type: stateConstants.HEADER_TITLE,
                  data: 'Students',
                }),
                setState({ type: stateConstants.CHAT_ID, data: 4 }),
              ]
              : [
                setState({
                  type: stateConstants.HEADER_TITLE,
                  data: 'Parents',
                }),
                setState({ type: stateConstants.CHAT_ID, data: 5 }),
              ];
            setState({ type: stateConstants.MODAL_VISIBLE, data: true });
            setState({
              type: stateConstants.STD_ID,
              data: state.stdID == null ? 0 : state.stdID,
            });
          }}
          text={
            groupName.includes('Instructor-Student')
              ? 'Select Student'
              : 'Select Parent'
          }
          userName={state.viewChatOf !== undefined && state.viewChatOf.fullName}
        />
      )}     
      <_View
        style={{
          height: '100%',
          backgroundColor: 'white',
          paddingBottom: Platform.OS == "ios" && keyboardStatus == "Keyboard Shown" ? 25 : 0
        }}
      >
        <DownloadDocs ref={downloadDocsRef} />
        {groupName.includes('View') ? (
          state.data.length > 0 ? (
            <GiftedChat
              messages={state.stdID != null ? state?.data : null}
              maxInputLength={500}
              listViewProps={{
                onEndReached: () => {
                  onLoadOthersChat();
                },
                onEndReachedThreshold: 0.7,
              }}
              onSend={(messages: any) => onSend(messages)}
              minInputToolbarHeight={0}
              renderInputToolbar={() => null}
              user={{
                _id: state.stdID,
              }}
              renderMessageText={(props) => renderMessageText(props)}
              renderAvatar={(props) => renderAvatarCallback(props)}
              renderBubble={(props) => renderBubble(props, voiceRecorder)}
              renderDay={(props) => renderDay(props)}
              renderTime={(props) => renderTime(props)}
              renderCustomView={(props) =>
                renderMessageFile(props, isMicOn, setIsMicOn)
              }
              alwaysShowSend={true}
              renderSend={(props) => renderSend(props, isMicOn, setIsMicOn)}
              showUserAvatar={true}
              shouldUpdateMessage={() => true}
              received={true}
              sent={true}
              renderTicks={(props: any) => renderTicks(props, UserData)}
            />
          ) : state.viewChatOf !== undefined ? (
            <EmptyList text='No Chat Found!' />
          ) : (
            <EmptyList text='Please Select User to View Chat' />
          )
        ) : (
          <GiftedChat
            messages={state?.filteredChat}
            isTyping={true}
            maxInputLength={500}
            listViewProps={{
              onEndReached: () => {
                onLoadEarlier();
              },
              onEndReachedThreshold: 0.7,
               keyboardDismissMode: 'on-drag'
            }}
             keyboardDismissMode='on-drag'
            messagesContainerStyle={{
              paddingBottom: 20
            }}
            onSend={(messages) => onSend(messages)}
            onInputTextChanged={(text) => {
              isMicOn && setIsMicOn(false);
              if (state.isUserOnline && text.length > 0) {
                let roomName = `${route.params.UserObj.userName}^${UserData.licenseCmpKey}`;
                socketIO.emit('user-typing', roomName);
              }
              if (text.length === 0) setIsMicOn(true);
            }}
            renderInputToolbar={(props) => renderInputToolbar(props)}
            user={{
              _id: userId,
            }}
            renderMessageImage={(props) =>
              renderMessageImage(props, isMicOn, setIsMicOn)
            }
            renderMessageText={(props) => renderMessageTextCallback(props)}
            renderBubble={(props) => renderBubble(props, voiceRecorder)}
            renderDay={(props) => renderDay(props)}
            renderTime={(props) => renderTime(props)}
            renderCustomView={(props) =>
              renderMessageFile(props, isMicOn, setIsMicOn)
            }
            alwaysShowSend={true}
            renderSend={(props) => renderSend(props, isMicOn, handleVoiceMsg)}
            showUserAvatar={false}
            shouldUpdateMessage={(props, nextProps) =>
              props.extraData !== nextProps.extraData
            }
            received={true}
            sent={true}
            renderTicks={(props: any) => renderTicks(props, UserData)}
            renderFooter={() => renderFooter(state.isTyping)}
          />
        )}

        {state.showAlert && (
          <OopsModal
            visible={state.showAlert}
            setVisible={() =>
              setState({ type: stateConstants.SHOW_ALERT, data: false })
            }
            alertMessage={state.alertMessage}
          />
        )}
        {groupName.includes('View') && (
          <SelectUserModal
            modalVisible={state.modalVisible}
            headerTitle={state.headerTitle}
            chatFor={state.chatID}
            selectedID={state.stdID}
            instructorID={route.params.UserObj.userId}
            setModalVisible={handleModalVisiblility}
            getUserChat={getUserChat}
            resetSkip={() => {
              setState({ type: stateConstants.OTHER_CHAT_SKIP, data: 0 });
              setState({ type: stateConstants.IS_LOAD_MORE_CHAT, data: true });
              setState({
                type: stateConstants.FILTERED_CHAT,
                data: state.filteredChat,
              });
            }}
            userList={state.userList}
          />
        )}

        {voiceMsgArea && (
          <VoiceMessageArea
            showVoiceMsg={voiceMsgArea}
            setVoiceMsg={setVoiceMsgArea}
            onSendVoiceMsg={handleVoiceSend}
          />
        )}
      </_View>
      </_View>
    </_Screen>
  );
};
