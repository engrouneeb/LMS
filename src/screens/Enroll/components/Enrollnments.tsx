import { useNavigation, useRoute } from '@react-navigation/native';
import { _Screen, _View } from '../../../components';
import React, { FC, useEffect, useState } from 'react';
import {  StyleSheet, View } from 'react-native';
import Header from "../../Headers"
import WebView from 'react-native-webview';
import { _ActivityIndicator } from '../../Loader';
import { getHeight, getWidth, whiteThemeColors } from '../../../Utilities';
import ScreensNames from '../../../screenNames';

interface EnrollmentsProps {

}

export const Enrollments: FC<EnrollmentsProps> = () => {
  const { params }: any = useRoute();
  const navigation = useNavigation();
  const {url}=params;
  const [loadingWebView, setLoadingWebView] = useState(true);
  const [isReadyToLoad, setIsReadyToLoad] = useState(false);
console.log(url);

  useEffect(() => {
   if(url) setIsReadyToLoad(true);
  }, [url]);
  const backPress = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          isBack
          GoBack={backPress}
          Screen={ScreensNames.Enrollments.name}
        />
      }
      flex={1}
      hideTopSafeArea
      hideBottomSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={backPress}
    >
      {isReadyToLoad && (
        <_View
          style={styles.webViewContainer}
          renderToHardwareTextureAndroid={true}
        >
          <WebView
            onLoadStart={() => setLoadingWebView(true)} // Show loader when WebView starts loading
            onLoadEnd={() => setLoadingWebView(false)} // Hide loader when WebView finishes loading
            source={{
              uri: url,
            }}
            style={{
              width: getWidth('100%'),
              height: getHeight('80%'),
            }}
            cacheMode='LOAD_NO_CACHE'
            allowsLinkPreview
            domStorageEnabled
            javaScriptEnabled
            useSharedProcessPool={false}
          />
          {loadingWebView && (
            <View style={styles.loaderContainer}>
              <_ActivityIndicator size='large' />
            </View>
          )}
        </_View>
      )}
    </_Screen>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: Add some transparency to the loader background
  },
});
