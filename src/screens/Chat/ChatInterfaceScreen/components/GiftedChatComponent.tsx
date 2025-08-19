/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigation } from '@react-navigation/native';
import { voiceMsgPlaybackInterface } from '../../../../interfaces';
import moment from 'moment';
import React, { JSX, useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { FloatingMenu } from 'react-native-floating-action-menu';
import {
  Bubble,
  Day,
  InputToolbar,
  MessageText,
  Time,
} from 'react-native-gifted-chat';
import FastImage from '@d11/react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { VideoPlayer, isTablet, whiteThemeColors } from '../../../../Utilities';
import { DocumentPdfReader } from '../index';
import { SendIcon } from '../../../../../assets/Icons';
import {
  fileFormateType,
  saveGalleryAttachmentImageURI,
  saveLocalImageURI,
  saveThumbnailUri,
  upLoadFileloading,
} from '../../../../actions/MessengerActions';
import {
  chatUserInterface,
  renderVoiceMessageInterface,
  UserDataInterface,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../components';
import { Appstate } from '../../../../reducers/Appstate';
import { _ActivityIndicator } from '../../../Loader';
import { UserImg } from '../../../ThumbNail';
import {
  checkMicorPhonePermission,
  extractNameExtension,
  renderItemIcon,
  selectAction,
} from '../Functions/ChatInterfaceFunction';
import { styles } from './GiftedChatComponentStyle';
import { TypingIndicator } from './TypingIndicator';
import CommonStyles from '../../../../screens/CommonStyles';
import {useLogin} from '../../../../navigation/MainNav';

export const renderAvatar = (
  Obj: any,
  UserData: UserDataInterface,
  ChatUserObj: chatUserInterface,
  viewChat: any = undefined,
) => {
  var UsrInfo: {
    FirstName?: string;
    LastName?: string;
    UserImage?: string;
    UserImageColor?: string;
  } = {};
  if (viewChat != undefined) {
    UsrInfo =
      Obj.currentMessage.user._id == viewChat.userId
        ? {
            FirstName: viewChat.fname,
            LastName: viewChat.lname,
            UserImage: viewChat.image,
            UserImageColor: whiteThemeColors.primary,
          }
        : {
            FirstName: ChatUserObj.fname,
            LastName: ChatUserObj.lname,
            UserImage: ChatUserObj.image,
            UserImageColor: whiteThemeColors.red,
          };
  } else {
    UsrInfo =
      Obj.currentMessage.user._id == UserData?.userID
        ? {
            FirstName: UserData.firstName,
            LastName: UserData.lastName,
            UserImage: UserData.userImag,
            UserImageColor: whiteThemeColors.primary,
          }
        : {
            FirstName: ChatUserObj.fname,
            LastName: ChatUserObj.lname,
            UserImage: ChatUserObj.image,
            UserImageColor: whiteThemeColors.red,
          };
  }
  return <UserImg UserInfo={UsrInfo} size={36} />;
};

export const renderBubble = (
  props: any,
  voiceRecorder: renderVoiceMessageInterface,
) => {
  if (props.currentMessage.audio != undefined)
    return <RenderVoiceMessage props={props} voiceRecorder={voiceRecorder} />;
  return (
    <Bubble
      renderMessageVideo={renderMessageVideo}
      {...props}
      textStyle={styles.text}
      wrapperStyle={styles.wrapper}
    />
  );
};

export const renderDay: (props: any) => JSX.Element = props => (
  <Day {...props} textStyle={styles.dayText} />
);

export const renderInputToolbar: (props: any) => JSX.Element = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: whiteThemeColors.background,
        borderTopColor: '#E8E8E8',
        borderTopWidth: 1,
        padding: 2,
        // position: 'absolute',
        bottom: 18,
        marginHorizontal: 15,
        width: Platform.OS == 'android' ? '87%' : '80%',
        alignSelf: 'center',
        borderRadius: 10,
        left: Platform.OS == 'android' ? '6%' : '8%',
      }}
    />
  );
};

export const useRenderMessageImage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const {
    selectedType,
    localImageURI,
    thumbnaillUri,
    isFileLoading,
    fileFormate,
  }: any = useSelector((state: Appstate) => state.chat);
  let items = [
    {
      photo: 'Gallery',
      index: 1,
    },
    {
      camera: 'Camera',
      index: 0,
    },
  ];
  const obj = {
    camera: '',
    file: 'File',
    index: 2,
  };
  {
    Platform.OS == 'ios' ? (items = [obj, ...items]) : items;
  }

const renderMessageImage: (props: any) => JSX.Element = props => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  return (
    props.currentMessage.image && (
      <TouchableOpacity
        style={styles.messageMediaWrapper}
        onPress={() => {
          setImageUrl(props.currentMessage.image);
          setIsFullScreen(true);
        }}>
        <FastImage
          style={styles.thumbnailImage}
          source={{
            uri: props.currentMessage.image,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
        />
        <Modal
          animationType="fade"
          onRequestClose={() => setIsFullScreen(false)}
          visible={isFullScreen}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <_View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
            }}>
            <FastImage
              style={styles.fullScreenImage}
              source={{
                uri: imageUrl,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </_View>

          <TouchableOpacity
            onPress={() => {
              setIsFullScreen(false);
            }}
            style={styles.closeModal}>
            <_VectorIcons
              type="AntDesign"
              name="closecircleo"
              size={22}
              color={whiteThemeColors.white}
            />
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    )
  );
};
  const renderMessageFile = (props: any) => {
   const [isFileView, setIsFileView] = useState<boolean>(false);
  const [docUrl, setDocUrl] = useState<string>('');

    let fileExtention = props?.currentMessage?.file
      ? props?.currentMessage?.file.split('/').pop().toLowerCase()
      : '';
    return (
      props?.currentMessage?.file && (
        <TouchableOpacity
          style={styles.fileWrapper}
          onPress={() => {
            setDocUrl(props.currentMessage.file);
            dispatch(saveGalleryAttachmentImageURI(''));
            setIsFileView(true);
          }}>
          <_View style={styles.bgfile}>
            <_View style={{alignItems: 'center', flexDirection: 'row'}}>
              <_View style={styles.fileIconCircle}>
                <_View style={styles.fileExtension}>
                  <_Text style={styles.fileType}>
                    {fileExtention.split('.').pop()}
                  </_Text>
                </_View>
                <_VectorIcons
                  name={'insert-drive-file'}
                  type={'MaterialIcons'}
                  size={25}
                  color={whiteThemeColors.white}
                  style={{
                    zIndex: 5,
                  }}
                />
              </_View>
              <_Text
                numberOfLines={1}
                style={{
                  width: '70%',
                  marginLeft: 4,
                  fontSize: 12,
                  fontFamily: CommonStyles.fonts.regular,
                }}>
                {fileExtention}
              </_Text>
            </_View>
          </_View>
          {props.currentMessage.file === docUrl ? (
            <Modal
              animationType="fade"
              visible={isFileView}
              onRequestClose={() => setIsFileView(false)}
              style={{
                backgroundColor: whiteThemeColors.black,
                justifyContent: 'center',
              }}>
              <DocumentPdfReader
                url={props.currentMessage.file}
                fileExtension={
                  extractNameExtension(props.currentMessage.file)[1]
                }
              />
              <TouchableOpacity
                onPress={() => {
                  setIsFileView(false);
                }}
                style={styles.closeModal}>
                <_VectorIcons
                type="AntDesign"
                name="closecircleo"
                size={22}
                color={whiteThemeColors.white}
              />
              </TouchableOpacity>
            </Modal>
          ) : null}
        </TouchableOpacity>
      )
    );
  };

  const seekVoicePermissionFromUser: () => Promise<boolean> = async () => {
    const res: boolean = await checkMicorPhonePermission();
    return res;
  };
  const handlePermissions: (
    handleVoiceMessage: (val: boolean) => void,
  ) => Promise<void> = async handleVoiceMessage => {
    const res: boolean = await seekVoicePermissionFromUser();
    handleVoiceMessage(res);
  };
  const renderMenuIcon: () => JSX.Element = () => (
    <_VectorIcons
      type={'Entypo'}
      name={isMenuOpen ? 'cross' : 'attachment'}
      size={20}
      color={whiteThemeColors.primary}
    />
  );

  const renderSend: (
    props: any,
    isMicOn: boolean,
    handleVoiceMessage: (val: boolean) => void,
  ) => JSX.Element = (props, isMicOn = false, handleVoiceMessage) => {
    const onSend = (text: string, object?: any) => {
      props.onSend({text, object});
    };
    const {orientation} = useLogin();
    return (
      <_View
        style={[
          styles.sendIcon,
          {
            marginRight: isMicOn ? 15 : 10,
          },
        ]}>
        {Boolean(fileFormate) && (
          <_View style={styles.uploadFile}>
            <RenderFile />
          </_View>
        )}
        {Boolean(fileFormate) ? (
          <TouchableOpacity
            disabled={isFileLoading}
            activeOpacity={0.2}
            onPress={() => {
              if (Boolean(fileFormate)) {
                setIsMenuOpen(false);
                dispatch(upLoadFileloading(true));

                props.onSend(
                  {text: Boolean(props.text) ? props.text : ''},
                  true,
                );
              } else if (isMicOn && isMenuOpen == false) {
                handlePermissions(handleVoiceMessage);
              } else if (props.text !== '') {
                dispatch(fileFormateType(''));
                props.onSend({text: props.text}, true);
              } else setIsMenuOpen(true);
            }}>
            <SendIcon
              size={35}
              color={
                isFileLoading
                  ? whiteThemeColors.greyDark
                  : whiteThemeColors.primary
              }
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => {
              if (isMicOn && isMenuOpen == false) {
                console.log('isMicOn');
                handlePermissions(handleVoiceMessage);
              } else if (props.text !== '') {
                dispatch(fileFormateType(''));
                props.onSend({text: props.text}, true);
              } else setIsMenuOpen(true);
            }}>
            {!isMenuOpen &&
              (isMicOn ? (
                <_View
                  style={{
                    height: 35,
                    width: 35,
                    borderRadius: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <_VectorIcons
                    type={'MaterialCommunityIcons'}
                    name={'microphone'}
                    size={25}
                    color={whiteThemeColors.greyDark}
                  />
                </_View>
              ) : (
                <SendIcon
                  size={35}
                  color={
                    props?.text?.trim().length == 0
                      ? whiteThemeColors.greyDark
                      : whiteThemeColors.primary
                  }
                />
              ))}
          </TouchableOpacity>
        )}
        <FloatingMenu
          buttonWidth={41}
          innerWidth={38}
          primaryColor={whiteThemeColors.primary + '99'}
          renderMenuIcon={renderMenuIcon}
          renderItemIcon={renderItemIcon}
          items={items}
          isOpen={isMenuOpen}
          onMenuToggle={setIsMenuOpen}
          onItemPress={(item: any) => {
             console.log('Pressed item:', item); // <--- log the whole object
             console.log('Item index:', item.index);
            selectAction(
              item.index,
              dispatch,
              setIsMenuOpen,
              navigation,
              onSend,
            );
          }}
          buttonSize={40}
          dimmerStyle={whiteThemeColors.white}
          borderColor={whiteThemeColors.white}
          iconColor={whiteThemeColors.primary}
          position={'bottom-left'}
          backgroundColor={whiteThemeColors.primary}
          bottom={-7}
          left={
            isTablet
              ? -(Dimensions.get('window').width - 45)
              : Platform.OS == 'android'
              ? -(Dimensions.get('window').width - 45)
              : -(Dimensions.get('window').width - 65)
          }
        />
      </_View>
    );
  };

  const RenderFile: () => JSX.Element = () => {
    return (
      <_View style={[styles.fileIconBg, styles.renderFile]}>
        <TouchableOpacity
          onPress={() => {
            dispatch(saveThumbnailUri(''));
            dispatch(fileFormateType(''));
            dispatch(saveLocalImageURI(''));
            dispatch(saveGalleryAttachmentImageURI(''));
          }}
          style={{
            backgroundColor: whiteThemeColors.background,
            position: 'absolute',
            right: 5,
            top: 5,
            zIndex: 10,
            borderWidth: 2,
            height: 30,
            width: 30,
            borderRadius: 15,
            borderColor: whiteThemeColors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <_VectorIcons
            name={'close'}
            type={'MaterialIcons'}
            size={16}
            color={whiteThemeColors.primary}
            style={{
              zIndex: 5,
            }}
          />
        </TouchableOpacity>
        {isFileLoading && (
          <_View
            style={{
              position: 'absolute',
              zIndex: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <_ActivityIndicator color={'#84DDE0'} showText={false} />
          </_View>
        )}
        {selectedType == 1 ? (
          <FastImage
            style={{height: 250, width: 250, borderRadius: 4}}
            source={{
              uri: localImageURI,
              priority: FastImage.priority.normal,
            }}
          />
        ) : selectedType == 2 ? (
          <_View
            width={250}
            height={250}
            alignItems={'center'}
            justify={'center'}
            style={{
              backgroundColor: whiteThemeColors.background,
              borderRadius: 5,
            }}>
            <FastImage
              resizeMode="contain"
              style={{
                width: 250,
                height: 250,
                borderRadius: 4,
              }}
              source={{
                uri: 'https://cypressintegration.com/wp-content/uploads/gray-background-texture-1-1.gif',
                priority: FastImage.priority.normal,
              }}
            />
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name={'play-circle-outline'}
              size={50}
              color={whiteThemeColors.primary}
              style={{
                position: 'absolute',
                elevation: 5,
                backgroundColor: whiteThemeColors.background,
                borderRadius: 30,
                height: 50,
                width: 50,
              }}
            />
          </_View>
        ) : selectedType == 4 ? (
          <_View style={{alignItems: 'center'}}>
            <_VectorIcons
              name={'applemusic'}
              type={'Fontisto'}
              size={100}
              color={whiteThemeColors.primary}
              style={{
                zIndex: 5,
              }}
            />
          </_View>
        ) : (
          <_View style={{alignItems: 'center'}}>
            <_View style={styles.fileExtension}>
              <_Text style={{fontSize: 15, color: whiteThemeColors.white}}>
                {'file'}
              </_Text>
            </_View>
            <_VectorIcons
              name={'insert-drive-file'}
              type={'MaterialIcons'}
              size={100}
              color={whiteThemeColors.primary}
              style={{
                zIndex: 5,
              }}
            />
          </_View>
        )}
      </_View>
    );
  };
  const RenderImage: () => JSX.Element = () => {
    return (
      <_View style={[styles.fileIconBg, styles.renderImg]}>
        <TouchableOpacity
          onPress={() => {
            dispatch(saveLocalImageURI(''));
            dispatch(saveGalleryAttachmentImageURI(''));
            dispatch(fileFormateType(''));
            dispatch(saveThumbnailUri(''));
          }}
          style={{
            backgroundColor: whiteThemeColors.background,
            position: 'absolute',
            right: 5,
            top: 5,
            zIndex: 10,
            borderWidth: 2,
            height: 30,
            width: 30,
            borderRadius: 15,
            borderColor: whiteThemeColors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <_VectorIcons
            name={'close'}
            type={'MaterialIcons'}
            size={16}
            color={whiteThemeColors.primary}
            style={{
              zIndex: 5,
            }}
          />
        </TouchableOpacity>
        <_View style={{alignItems: 'center'}}>
          {selectedType == 1 ? (
            <FastImage
              style={{height: 250, width: 250, borderRadius: 4}}
              source={{
                uri: localImageURI,
                priority: FastImage.priority.normal,
              }}
            />
          ) : (
            <_View
              width={250}
              height={250}
              alignItems={'center'}
              justify={'center'}
              style={{
                backgroundColor: whiteThemeColors.background,
                borderRadius: 5,
              }}>
              {Boolean(thumbnaillUri) ? (
                <>
                  <FastImage
                    resizeMode={'contain'}
                    style={{
                      width: 250,
                      height: 250,
                      borderRadius: 4,
                    }}
                    source={{
                      uri: thumbnaillUri,
                      priority: FastImage.priority.normal,
                    }}
                  />
                  <_VectorIcons
                    type={'MaterialCommunityIcons'}
                    name={'play-circle-outline'}
                    size={50}
                    color={whiteThemeColors.primary}
                    style={{
                      position: 'absolute',
                      elevation: 5,
                      backgroundColor: whiteThemeColors.background,
                      borderRadius: 30,
                      height: 50,
                      width: 50,
                    }}
                  />
                </>
              ) : (
                <_VectorIcons
                  type={'MaterialCommunityIcons'}
                  name={'play-circle-outline'}
                  size={50}
                  color={whiteThemeColors.white}
                  style={{
                    zIndex: 5,
                    marginTop: 5,
                  }}
                />
              )}
            </_View>
          )}
        </_View>
      </_View>
    );
  };

  return [
    renderMessageImage,
    renderMessageFile,
    renderSend,
    RenderFile,
    RenderImage,
  ];
};
export const renderMessageVideo: (props: any) => JSX.Element = props => {
  return (
    <_View style={styles.messageMediaWrapper}>
      <VideoPlayer
        url={props.currentMessage.video}
        thumbnail={props.currentMessage?.videoThumbnailURL}
      />
    </_View>
  );
};
export const renderMessageText: (props: any) => JSX.Element = props => {
  return (
    <_View style={styles.messageTextWrapper}>
      <MessageText
        linkStyle={{
          right: {
            color: whiteThemeColors.primary,
            fontFamily: CommonStyles.fonts.semiBold,
            fontSize: 14,
            paddingHorizontal: 5,
          },
          left: {
            color: whiteThemeColors.primary,
            fontFamily: CommonStyles.fonts.semiBold,
            fontSize: 14,
            paddingHorizontal: 5,
          },
        }}
        customTextStyle={{
          color: whiteThemeColors.chatInterface.textColor,
          fontFamily: CommonStyles.fonts.regular,
          fontSize: 12,
          paddingHorizontal: 5,
        }}
        {...props}
      />
    </_View>
  );
};

export const renderTime: (props: any) => JSX.Element = props => {
  return <Time {...props} timeTextStyle={styles.timeText} />;
};
export const renderFooter: (
  isTyping: boolean,
) => JSX.Element | null = isTyping => {
  if (isTyping) {
    return (
      <_View style={styles.indicator}>
        <_Text style={styles.typingTxt}>typing</_Text>
        <TypingIndicator />
      </_View>
    );
  }
  return null;
};

const RenderVoiceMessage: ({
  props,
  voiceRecorder,
}: {
  props: any;
  voiceRecorder: renderVoiceMessageInterface;
}) => JSX.Element = ({props, voiceRecorder}) => {
  const [play, setPlay] = useState<boolean>(false);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [seekbarWidth, setSeekbarWidth] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [, setHadPause] = useState<boolean>(false);
  const resetStates = () => {
    setCurrentPosition(0);
    setSeekbarWidth(0);
    voiceRecorder.removePlayBackListener();
    setPlay(false);
  };

  const onPausePlay: () => Promise<void> = async () => {
    await voiceRecorder
      .stopPlayer()
      .then(() => {
        resetStates();
      })
      .catch((e: any) => console.log('error pausing audio: ', e));
  };

  const isUrlValid: (url: string) => boolean = url => {
    return RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?').test(
      url,
    );
  };

  const handlePlay: (id: number) => Promise<void> = async id => {
    if (!isUrlValid(props.currentMessage.audio)) {
      Alert.alert('Error', 'The provided url for voice msg is corrupted', [
        {text: 'Okay', style: 'cancel'},
        {text: 'Cancel', style: 'destructive'},
      ]);
      return;
    }
    if (play) {
      onPausePlay();
      setPlay(false);
      setHadPause(true);
      return;
    }
    if (props.currentMessage._id === id) {
      setPlay(true);
      setLoader(true);
      await voiceRecorder.startPlayer(props.currentMessage.audio);
      voiceRecorder.setVolume(1.0);
      voiceRecorder.addPlayBackListener((e: voiceMsgPlaybackInterface) => {
        setLoader(false);
        setTotalDuration(e.duration);
        setSeekbarWidth(e.currentPosition / e.duration);
        setCurrentPosition(e.currentPosition);
        if (e.currentPosition === e.duration) {
          setPlay(false);
          voiceRecorder.stopPlayer();
          setCurrentPosition(0);
          setSeekbarWidth(0);
        }
      });
    }
  };

  const getDefaultDuration: (durations: number) => string = durations => {
    if (!Boolean(durations)) return '00/00';
    else if (durations < 10) return `00/0${durations} sec(s)`;
    else return `00/${durations} sec(s)`;
  };

  return (
    <_View
      style={{
        width: 270,
        height: 60,
        borderRadius: 20,
        backgroundColor: whiteThemeColors.primary + 30,
        alignItems: 'center',
        padding: 5,

        justifyContent: 'center',
      }}>
      <_View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable
          hitSlop={20}
          style={{}}
          onPress={() => handlePlay(props.currentMessage._id)}>
          {loader ? (
            <_ActivityIndicator
              showText={false}
              color={whiteThemeColors.greyDark}
            />
          ) : (
            <_VectorIcons
              type={'Ionicons'}
              name={!play ? 'caret-forward' : 'pause'}
              color={
                play ? whiteThemeColors.primary : whiteThemeColors.greyDark
              }
              size={25}
            />
          )}
        </Pressable>
        <_View
          style={{
            width: 170,
            height: 4,
            backgroundColor: whiteThemeColors.primary + 30,
            borderRadius: 10,
          }}>
          <_View
            style={{
              width: `${+seekbarWidth * 100}%`,
              height: '100%',
              backgroundColor: whiteThemeColors.primary,
              borderRadius: 11,
              marginRight: 10,
            }}
          />
          {play && (
            <_View
              style={{
                width: `${+seekbarWidth * 100}%`,
                height: 10,
                backgroundColor: 'transparent',
                position: 'absolute',
                borderColor: whiteThemeColors.white,
                borderRightWidth: 8,
                marginTop: -3,
              }}
            />
          )}
        </_View>
        <_View
          height={35}
          width={35}
          justify={'center'}
          style={{
            backgroundColor: whiteThemeColors.white + 90,
            borderRadius: 24,
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <_VectorIcons
            type={'MaterialCommunityIcons'}
            name={'microphone'}
            color={whiteThemeColors.primary}
            size={20}
          />
          {play && (
            <_Text style={{color: whiteThemeColors.black, fontSize: 9}}>
              {currentPosition != 0 && totalDuration != 0
                ? `${moment(currentPosition).format('ss')}/${moment(
                    totalDuration,
                  ).format('ss')}`
                : getDefaultDuration(props?.currentMessage?.duration)}
            </_Text>
          )}
        </_View>
        <_View
          style={{
            position: 'absolute',
            right: 60,
            top: 30,
          }}>
          <_Text style={{color: whiteThemeColors.greyDark, fontSize: 9}}>
            {moment(props.currentMessage.createdAt).format('h:mm A')}
          </_Text>
        </_View>
      </_View>
    </_View>
  );
};
