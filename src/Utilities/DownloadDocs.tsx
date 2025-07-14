import React, { FC, forwardRef, useImperativeHandle, useState } from 'react';
import { Alert, Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import * as Progress from 'react-native-progress';

const DownloadDocs: FC<any> = React.memo(
  forwardRef((props, ref) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState<
      number | undefined
    >(undefined);

    useImperativeHandle(ref, () => ({
      downloadFile(
        url: string,
        downloadbleLink: string,
        uploadFrom: number,
        mimE_TYPE:
          | 'application/vnd.google-apps.presentation'
          | 'application/vnd.google-apps.spreadsheet'
          | 'application/vnd.google-apps.document',
        extension: string,
      ) {
        setIsDownloading(true);
        setDownloadProgress(undefined);
        let ext = extension;
        var image_URL = url;
        if (image_URL == null) image_URL = downloadbleLink;
        if (uploadFrom === 3) {
          ext = 'pdf';
          let downloadbleLinkId = downloadbleLink.split('id=').pop();
          if (mimE_TYPE == 'application/vnd.google-apps.presentation') {
            image_URL = `https://docs.google.com/presentation/d/${downloadbleLinkId}/export/pdf`;
          } else if (mimE_TYPE == 'application/vnd.google-apps.spreadsheet') {
            image_URL = `https://docs.google.com/spreadsheets/d/${downloadbleLinkId}/export?format=pdf`;
          } else if (mimE_TYPE == 'application/vnd.google-apps.document') {
            image_URL = `https://docs.google.com/document/d/${downloadbleLinkId}/export?format=pdf`;
          }
        }

        let dirs = ReactNativeBlobUtil.fs.dirs;
        var file_name = image_URL.split('/').pop();
        let directory =
          Platform.OS == 'android' ? dirs.DownloadDir : dirs.DocumentDir;
        let filePath = `${directory}/${file_name}`;
        let options = {
          fileCache: true,
          path: filePath,
          // appendEXT: ext,
        };
        let fetchOptions: any =
          Platform.OS == 'android'
            ? {}
            : {
                'Cache-Control': 'no-store',
              };
        ReactNativeBlobUtil.config(options)
          .fetch('GET', image_URL, fetchOptions)

          .progress({ interval: 50 }, (received, total) => {
            setDownloadProgress(received / total);
          })
          .then((res) => {
            setIsDownloading(false);
            let docMimeType = mimE_TYPE
              ? mimE_TYPE
              : res.respInfo.headers['Content-Type'];
            if (Platform.OS == 'android') {
              if (docMimeType == 'application/octet-stream') {
                Alert.alert('Your attachment is downloaded and saved in files');
              } else {
                const android = ReactNativeBlobUtil.android;
                android.actionViewIntent(res.path(), docMimeType);
              }
            } else ReactNativeBlobUtil.ios.previewDocument(res.data);
          })
          .catch((error) => {});
      },
    }));

    return (
      <>
        {isDownloading && (
          <Progress.Circle
            style={{ alignSelf: 'center', marginTop: 30 }}
            progress={downloadProgress}
            size={100}
            showsText={true}
          />
        )}
      </>
    );
  }),
);

export { DownloadDocs };
