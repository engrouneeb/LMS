import React, { FC, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { CustomAlert, FileViewURL, whiteThemeColors } from '../../../../Utilities';
import { _View } from '../../../../components';
import { prohibitedExtensions } from './DocumentPdfReaderConstants';
import { _ActivityIndicator } from '../../../Loader';

interface Props {
  url: string;
  fileExtension: string;
}

export const DocumentPdfReader: FC<Props> = ({ url, fileExtension }) => {
  const [WebviewSpinner, setWebViewSpinner] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const hideSpinner: () => void = () => {
    if (WebviewSpinner) {
      setWebViewSpinner(false);
    } else {
      handleFileReader();
    }
  };

  const handleFileReader: () => JSX.Element | undefined = () => {
    if (prohibitedExtensions.includes(fileExtension)) {
      setAlertMessage(`Currently ${fileExtension} format is not suppoted.`);
      setAlertTitle('Warning');
      setShowAlert(true);
      return;
    } else if (fileExtension == 'pdf') {
    } else {
      return (
        <_View style={styles.webViewContainer}>
          <WebView
            onLoadStart={() => setWebViewSpinner(true)}
            onLoad={() => hideSpinner()}
            source={{
              uri: FileViewURL(url),
            }}
            style={styles.webView}
          />
          {WebviewSpinner && (
            <_View style={styles.loaderContainer}>
              <_ActivityIndicator
                size='large'
                color={whiteThemeColors.primary}
                showText={false}
              />
            </_View>
          )}
        </_View>
      );
    }
  };

  return (
    <>
      <_View style={styles.container}>{handleFileReader()}</_View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '60%',
    width: '100%',
    backgroundColor: whiteThemeColors.modalWhiteBG,
  },
  pdfContainer: {
    flex: 1,
    zIndex: 10,
    width: '100%',
    height: '60%',
  },
  webViewContainer: {
    height: '100%',
    width: '100%',
    paddingTop: StatusBar.currentHeight ?? 0 + 100,
  },
  webView: {
    width: '100%',
    height: '60%',
  },
  loaderContainer: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
