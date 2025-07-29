import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview';
import { _ActivityIndicator } from '../Loader/_ActivityIndicator';
import { _Screen, _View } from '../../components';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../reducers/Appstate';
import { getHeight, getWidth, whiteThemeColors } from '../../Utilities';
import Header from "../Headers"
import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import { useNavigation } from '@react-navigation/native';

export const  NewStore=()=> {
    const UserInfo = useSelector((state:Appstate) => state.User.UserInfo);
      const [loadingWebView, setLoadingWebView] = useState(true);
      const { storeURL } = UserInfo;
      
      const navigation:any =useNavigation();
      const goBack= ()=>{
        navigation.navigate(DrawerScreens.dashboard.name);
    return true;
      }
    return (
        <_Screen
      header={
        <Header
          isMenu={true}
          OpenMenu={() => {
            navigation.openDrawer();
          }}
          Screen={"Store"}
          isLogout={false}
        />
      }
      onAndroidBack={goBack}
      hideTopSafeArea
      bottomSafeAreaColor={whiteThemeColors.white + 40}
      hideBottomSafeArea
      flex={1}
      backgroundColor={whiteThemeColors.background}
    >
            <_View
              style={styles.webViewContainer}
              renderToHardwareTextureAndroid={true}
            >
              <WebView
                onLoadStart={() => setLoadingWebView(true)} // Show loader when WebView starts loading
                onLoadEnd={() => setLoadingWebView(false)} // Hide loader when WebView finishes loading
                source={{
                  uri: storeURL,
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
                <_View style={styles.loaderContainer}>
                  <_ActivityIndicator size='large' />
                </_View>
              )}
            </_View>
         
        </_Screen>
      );
    };
    
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
    });
    