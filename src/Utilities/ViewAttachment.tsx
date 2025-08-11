import { useFocusEffect } from '@react-navigation/native';
import { viewAttachmentInterface } from '../interfaces';
import React, { useState } from 'react';
import { BackHandler, Platform, TouchableOpacity } from 'react-native';
import Pdf from 'react-native-pdf';
import * as Progress from 'react-native-progress';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import { Appstate } from '../reducers/Appstate';
import { CustomAlert, FileViewURL } from '../Utilities';
import { _VectorIcons, _View } from '../components';
import { AudioChallenge, VideoPlayer } from '../screens/CoursePlayer';
import { _ActivityIndicator } from '../screens/Loader';
import { whiteThemeColors } from '../theme';

export const ViewAttachment: React.FC<viewAttachmentInterface> = ({
  navigation,
  base64URL,
  url,
  fileExtension,
  uploadFrom,
  downloadbleLink,
  mimE_TYPE,
  isPrivate,
}) => {
  let fileExt: any =
    downloadbleLink && mimE_TYPE
      ? mimE_TYPE.match('pdf')
        ? mimE_TYPE.match('pdf')[0]
        : ''
      : fileExtension?.indexOf('.') !== -1
      ? fileExtension?.replace('.', '').toLowerCase()
      : fileExtension.toLowerCase();

  // fileExt = uploadFrom == 3 || uploadFrom == 2 ? '' : fileExt;

  const [WebviewSpinner, setWebViewSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const { isSecured } = useSelector((state: Appstate) => state.User);

  const hideSpinner = () => {
    if (WebviewSpinner) {
      setWebViewSpinner(false);
    } else {
      showFile();
    }
  };
  const showSpinner = () => {
    setWebViewSpinner(true);
  };

  const setFileViewUri = (url: string) => {
    if (Platform.OS == 'android') {
      if (
        [
          'txt',
          'mp4',
          'webm',
          'webp',
          'mp3',
          'wav',
          'png',
          'jpeg',
          'jpg',
          'pdf',
          'gif',
        ].includes(fileExt)
      ) {
        return url;
      } else if (
        [
          'odt',
          'ods',
          'odp',
          'docx',
          'doc',
          'ppt',
          'pptx',
          'xls',
          'xlsx',
        ].includes(fileExt)
      )
        return `https://view.officeapps.live.com/op/view.aspx?src=${url}`;
      else {
        var fileViewURI = `http://docs.google.com/gview?embedded=true&url=${url}&embedded=true`;
        return fileViewURI;
      }
    } else {
      return url;
    }
  };
  const showFile = () => {
    let fileName = url?.split('/').pop();
    fileExt = isPrivate ? 'isPrivate' : fileExt;
    switch (fileExt) {
      case 'mp4':
      case 'ogv':
      case 'webm':
        return (
          <VideoPlayer
            mediaFileUrl={url}
            header={fileName}
            isPreviousStep={false}
            isNextStep={false}
          />
        );
      case 'mp3':
      case 'wav':
        return (
          <AudioChallenge
            header={fileName}
            isPreviousStep={false}
            isNextStep={false}
          />
        );
      case 'ogg':
      case 'cr2':
      case 'mj2':
      case 'indt':
      case 'psd':
      case 'eps':
      case 'ai':
        setAlertMessage(`Currently ${fileExt} format is not suppoted.`);
        setAlertTitle('warning');
        setShowAlert(true);
        return;
      case 'pdf':
        downloadbleLink =
          downloadbleLink && Platform.OS === 'ios'
            ? downloadbleLink.replace('export=download&', '')
            : downloadbleLink;
        // viewer?src
        return (
          <>
            <Pdf
              source={{
                uri: downloadbleLink ? downloadbleLink : setFileViewUri(url),
                cache: true,
              }}
              renderActivityIndicator={(percentage) => (
                <Progress.Circle
                  allowFontScaling
                  showsText
                  progress={percentage}
                  size={60}
                />
              )}
              style={{
                flex: 1,
                zIndex: 10,
                width: '100%',
                height: '60%',
              }}
            />
            <_View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 15,
                zIndex: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 25,
                  backgroundColor: whiteThemeColors.greyDark + '90',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 20,
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <_VectorIcons
                  name={'close'}
                  type={'EvilIcons'}
                  size={16}
                  color={whiteThemeColors.white}
                />
              </TouchableOpacity>
            </_View>
          </>
        );
      default:
        downloadbleLink = downloadbleLink
          ? isPrivate
            ? downloadbleLink.replace('uc?export=download&', 'viewer?src')
            : isPrivate === false
            ? downloadbleLink.replace('export=download&', '')
            : downloadbleLink
          : null;

        return (
          <_View
            style={{
              flex: 1,
              height: '60%',
              width: '100%',
            }}
          >
            {WebviewSpinner && (
              <_View
                style={{
                  flex: 1,
                }}
              >
                <_ActivityIndicator
                  size='large'
                  color={whiteThemeColors.primary}
                />
              </_View>
            )}
            <WebView
              onLoadStart={() => showSpinner()}
              onLoad={() => hideSpinner()}
              source={{
                uri: downloadbleLink
                  ? isPrivate
                    ? downloadbleLink +
                      '&pid=explorer&efh=false&a=v&chrome=false&embedded=true'
                    : isPrivate === false
                    ? downloadbleLink
                    : FileViewURL(
                      isSecured && ![2, 3].includes(uploadFrom)
                          ? base64URL
                          : downloadbleLink,
                        uploadFrom,
                        isSecured,
                      )
                  : FileViewURL(
                    isSecured && ![2, 3].includes(uploadFrom)
                        ? base64URL
                        : url,
                      uploadFrom,
                      isSecured,
                    ),
              }}
              style={{
                width: '100%',
                height: '60%',
                backgroundColor: whiteThemeColors.background,
                marginTop:
                  uploadFrom == 3 || uploadFrom == 2
                    ? isPrivate === undefined
                      ? -20
                      : -48
                    : 0,
              }}
            />

            <_View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 15,
                zIndex: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 25,
                  backgroundColor: whiteThemeColors.greyDark + '90',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 20,
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <_VectorIcons
                  name={'close'}
                  type={'EvilIcons'}
                  size={18}
                  color={whiteThemeColors.white}
                />
              </TouchableOpacity>
            </_View>
          </_View>
        );
    }
  };

  const backPress = () => {
    navigation.goBack();
    return true;
  };

useFocusEffect(
  React.useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backPress,
    );

    return () => backHandler.remove();
  }, []),
);

  return (
    <>
      <_View
        style={{
          flex: 1,
          height: '60%',
          width: '100%',
          backgroundColor: whiteThemeColors.white,
        }}
      >
        {showFile()}
      </_View>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setShowAlert(false);
          }}
        />
      )}
    </>
  );
};
