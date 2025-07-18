import AsyncStorage from '@react-native-async-storage/async-storage';
import { _Screen, _Text, _View } from '../../components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, } from 'react-native';
import WebView from 'react-native-webview';
import { _ActivityIndicator } from '../../../Loader';
import { getHeight, getWidth,whiteThemeColors } from '../../Utilities';
import DrawerScreens from '../../navigation//Drawer/DrawerScreenNames';
import Header from "../Headers";
import { useSelector } from 'react-redux';
import { ReturnPage } from '../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';

export const Programs = () => {
  const route = useRoute();
  const { url } = route.params || {};
    const [loadingWebView, setLoadingWebView] = useState(true);
    const navigation = useNavigation();
  return (
    <_Screen
      header={
        <Header
          isBack
          goBack={() => navigation.goBack()}
          Screen={DrawerScreens.programs.name}
        />
      }
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={() => {
        navigation.goBack();
        return true;
      }}
      hideTopSafeArea
      flex={1}
    > 
   {url ? (
  <_View
    style={styles.webViewContainer}
    renderToHardwareTextureAndroid={true}
  >
    <WebView
      onLoadStart={() => setLoadingWebView(true)}
      onLoadEnd={() => setLoadingWebView(false)}
      source={{ uri: url }}
      style={{
        width: getWidth('100%'),
        height: getHeight('80%'),
      }}
      cacheMode="LOAD_NO_CACHE"
      allowsLinkPreview
      domStorageEnabled
      javaScriptEnabled
      useSharedProcessPool={false}
    />
    {loadingWebView && (
      <_View style={styles.loaderContainer}>
        <_ActivityIndicator size="large" />
      </_View>
    )}
  </_View>
) : (
  <_View style={styles.webViewContainer}>
    <_Text>No URL provided</_Text>
  </_View>
)}
    </_Screen>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
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
      footerContainer: {
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
})