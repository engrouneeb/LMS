import React, { memo, useEffect, useRef, useState } from 'react';
import { Alert, Modal, ScrollView, TouchableOpacity } from 'react-native';
// import Pdf from 'react-native-pdf';
import * as Progress from 'react-native-progress';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomAlert,
  DownloadDocs,
  FileViewURL,
  MarginTopComponent,
  whiteThemeColors,
} from '../../../../../Utilities';
import { DownloadSvg } from '../../../../../../assets/Icons';
import { getCourseSteps } from '../../../../../actions/CoursePlayerAction';
import { SetStepState } from '../../../../../actions/OnlineNotesActions';
import {
  _Screen,
  _VectorIcons,
  _View,
  isTablet,
} from '../../../../../components';
import Header from '../../../../Headers';
import { _ActivityIndicator } from '../../../../Loader';
import {
  DownloadFooter,
  FileComponent,
  FileFormatFunction,
} from './components';
import { styles } from './styles';
import { DownloadInterface, GetChallengeStepsInterface } from '../../../../../interfaces';
import { Appstate } from '../../../../../reducers/Appstate';
import { useNavigation } from '@react-navigation/native';

const _Download: React.FC<DownloadInterface> = ({ route }) => {
  const navigation: any = useNavigation();
  let isPrevNxtInPrgrs = false;
  const downloadDocsRef: any = useRef();
  const dispatch: any = useDispatch();
  const { isSecured } = useSelector((state: Appstate) => state.User);
  const { commonWords, classNotesScreen } = useSelector(
    (state: Appstate) => state.language,
  );
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [fileViewURI, setFileViewURI] = useState('');
  const [mediaUploadFrom, setMediaUploadFrom] = useState(0);
  const [ModelVisible, setModelVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [WebviewSpinner, setWebviewSpinner] = useState(false);
  useEffect(() => {
    dispatch(getCourseSteps(route.params.stepId, route.params.stepType)).then(
      (res: GetChallengeStepsInterface) => {
        if (res.data) {
          const { data } = res;
          setName(data.mediaFileName);
          setUrl(data.mediaFileUrl);
          setFileViewURI(
            FileViewURL(
              isSecured ? data?.base64URL : data.mediaFileUrl,
              data.mediaUploadOption,
              isSecured,
            ),
          );
          setMediaUploadFrom(data.mediaUploadOption);
          setIsCompleted(data.isCompleted);
        }
      },
    );
  }, [isSecured]);

  const navigateAgainstFileFormat = (fileFormate: any) => {
    let fileName = route.params.title;
    FileFormatFunction(fileFormate, fileViewURI, fileName, navigation);
  };

  const showFile = () => {
    let fileFormate: string = url?.split('.')!.pop()!.toLowerCase();
    if (isTablet) {
      if (['odt', 'ods', 'odp'].includes(fileFormate)) {
        setShowAlert(true);
        setAlertTitle('warning');
        setAlertMessage('format not supported');
        return;
      }
    }
    if (['mp4', 'webm', 'mp3', 'wav'].includes(fileFormate)) {
      navigateAgainstFileFormat(fileFormate);
    } else if (
      ['ogg', 'cr2', 'mj2', 'indt', 'psd', 'eps', 'ai', 'odp'].includes(
        fileFormate,
      )
    ) {
      setShowAlert(true);
      setAlertTitle('warning');
      setAlertMessage(`Currently ${fileFormate} format is not suppoted.`);
      return;
    } else {
      return setModelVisible(true);
    }
  };

  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          isBack
          Screen={route.params.title}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      <ScrollView style={styles.container}>
        <MarginTopComponent portraitMargin={'10%'} landscapeMargin={'4%'} />
        <DownloadDocs ref={downloadDocsRef} />
        <_View style={styles.downloadContainer}>
          <DownloadSvg />
        </_View>
        <FileComponent
          callback={() => showFile()}
          downloadFileCallback={() => {
            downloadDocsRef?.current?.downloadFile(
              url,
              '',
              mediaUploadFrom,
              '',
              '',
            );
          }}
          name={name}
          isSecured={isSecured}
          isCompleted={isCompleted}
          commonWords={commonWords}
          classNotesScreen={classNotesScreen}
          callbackPrevious={() => {
            if (!isPrevNxtInPrgrs) {
              isPrevNxtInPrgrs = true;
              const Obj = {
                StepId: route.params.stepId,
                Status: !isCompleted,
              };
              route.params?.updateLocalStep(route.params.stepId);
              dispatch(SetStepState(Obj)).then(() => {
                setIsCompleted(!isCompleted);
              });
              navigation.goBack();
            }
          }}
        />
        <Modal
          animationType='slide'
          transparent={false}
          visible={ModelVisible}
          supportedOrientations={['portrait', 'landscape']}
          style={{ height: '60%' }}
        >
          <_View style={styles.modalContainer}>
            {fileViewURI?.split('.').pop()?.toLocaleLowerCase() == 'pdf' ? (
              <ScrollView
                contentContainerStyle={{
                  flex: 1,
                }}
              >
                {/* <Pdf
                  renderActivityIndicator={(percentage) => (
                    <Progress.Circle
                      allowFontScaling
                      showsText
                      progress={percentage}
                      size={60}
                    />
                  )}
                  source={{
                    uri: fileViewURI,
                    cache: true,
                  }}
                  style={styles.pdf}
                /> */}
              </ScrollView>
            ) : (
              <WebView
                textInteractionEnabled={false}
                onLoadStart={() => setWebviewSpinner(true)}
                onLoad={() => setWebviewSpinner(false)}
                pullToRefreshEnabled={false}
                onFileDownload={() => {
                  Alert.alert('no download available');
                }}
                allowFileAccess={false}
                source={{
                  uri: fileViewURI,
                }}
                style={styles.webView}
                cacheMode='LOAD_CACHE_ELSE_NETWORK'
                allowsLinkPreview
                domStorageEnabled
              />
            )}
          </_View>
          {WebviewSpinner && (
            <_View style={styles.spinnerContainer}>
              <_ActivityIndicator size='large' showText={false} />
            </_View>
          )}
          <_View style={styles.closeBtnContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeBtn}
              onPress={() => setModelVisible(false)}
            >
              <_VectorIcons
                name={'close'}
                type={'EvilIcons'}
                size={16}
                color={whiteThemeColors.white}
              />
            </TouchableOpacity>
          </_View>
        </Modal>
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
      </ScrollView>
      <DownloadFooter
        previous={route?.params?.isPreviousStep}
        next={route?.params?.isNextStep}
        commonWords={commonWords}
        previousStep={() => {
          if (!isPrevNxtInPrgrs) {
            isPrevNxtInPrgrs = true;
            navigation.goBack();
            route.params.navigateToNextScreen(
              JSON.parse(route.params.previousStep),
            );
          }
        }}
        nextStep={() => {
          if (!isPrevNxtInPrgrs) {
            isPrevNxtInPrgrs = true;
            navigation.goBack();
            route.params.navigateToNextScreen(
              JSON.parse(route.params.nextStep),
            );
          }
        }}
      />
    </_Screen>
  );
};
export const Download = memo(_Download);
