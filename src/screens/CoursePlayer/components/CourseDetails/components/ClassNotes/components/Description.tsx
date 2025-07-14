import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { Orientation, whiteThemeColors } from 'utilities';
import { Approvels } from '../../../../../../../../assets/Icons';
import { _Text, _View } from '../../../../../../../components';
import CommonStyles from '../../../../../../CommonStyles';

export const Description = (props: any) => {
  const [, setOrientation] = useState('PORTRAIT');
  const [discriptionObj, setDiscriptionObj] = useState({ description: null });
  const orientationMethod = (o: any) => {
    setOrientation(o);
  };
  useEffect(() => {
    setDiscriptionObj(props?.discription);
  }, [props]);
  let htmlContent;
  let decodeDescp: any = props?.isOnlineNotes
    ? discriptionObj?.description
    : discriptionObj?.description != null
    ? decodeURIComponent(discriptionObj?.description)
    : null;
  if (
    decodeDescp == null ||
    decodeDescp == '' ||
    decodeDescp == '<p><br></p>'
  ) {
    htmlContent = null;
  } else {
    let descp = decodeDescp.split('//www').join('http://www');
    htmlContent = `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
      <div>
      ${descp}
      </div>
      </body>
      </html>`;
  }

  return (
    <Orientation
      getOrientation={(o: any) => {
        orientationMethod(o);
      }}
    >
      {htmlContent == null ? (
        <_View style={styles.emptyListContainer}>
          <Approvels />
          <_Text style={[CommonStyles.className, { marginTop: 200 }]}>
            No Data
          </_Text>
        </_View>
      ) : (
        <_View style={[styles.container]}>
          <WebView source={{ html: htmlContent }} />
        </_View>
      )}
    </Orientation>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 15,
    backgroundColor: whiteThemeColors.white,
    height: '100%',
  },
  emptyListContainer: {
    height: '98%',
    width: '98%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
