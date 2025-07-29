import React, {useEffect, useState} from 'react';
// ViewAttachment component is not present
import {whiteThemeColors} from '../../../../../../../Utilities';
import {_View} from '../../../../../../../components';
import {Dimensions} from 'react-native';
import {_ActivityIndicator} from '../../../../../../Loader/_ActivityIndicator';
const AttachmentView = (props: any) => {
  const {
    base64Url,
    url,
    uploadFrom,
    fileExtension,
    mimE_TYPE,
    downloadbleLink,
    fileName,
  } = props.route.params;
  const [isPrivate, setisPrivate] = useState(undefined);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (downloadbleLink) {
      setloading(true);
      checkGoogleDriveFileAnonymity(downloadbleLink)
        .then((isPublic: any) => {
          setisPrivate(isPublic);
          console.log('checkGoogleDriveFileAnonymity', isPublic);
        })
        .finally(() => setloading(false));
    }
  }, [props]);
  const checkGoogleDriveFileAnonymity = async (fileUrl: any) => {
    try {
      const response: any = await fetch(fileUrl, {
        method: 'HEAD',
      });
      // Check if the response status indicates success (2xx range)
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');

        // Check if the content type suggests a publicly accessible file
        let size = response['_bodyInit'];
        size = size['_data'].size;

        const isPublic =
          contentType && contentType.includes('text/html') && size === 0;

        return isPublic;
      }
      if (response?.status === 403) return undefined;
      // Handle the case when the response status is not successful
      console.error('Error checking file anonymity:', response.status);
      return false;
    } catch (error) {
      console.error('Error checking file anonymity:', error);
      return undefined;
    }
  };
  return (
    <_View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: whiteThemeColors.background,
      }}>
      {/* {loading ? (
        <_ActivityIndicator size='large' />
      ) : (
        <ViewAttachment
          navigation={props.navigation}
          base64URL={base64Url}
          fileExtension={fileExtension}
          url={url ? url : downloadbleLink}
          mimE_TYPE={isPrivate ? mimE_TYPE : fileName}
          downloadbleLink={downloadbleLink}
          isPrivate={isPrivate}
          uploadFrom={uploadFrom}
        />
      )} */}
    </_View>
  );
};

export {AttachmentView};
