import AsyncStorage from '@react-native-async-storage/async-storage';
import { _Screen, _View } from 'components';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';
import { _ActivityIndicator } from 'screens/Loader/_ActivityIndicator';
import { getHeight, getWidth, whiteThemeColors } from 'utilities';
import { ReturnPage } from '../../../constants';
import Header from '../../Headers';
import screeNames from '../../../navigation/Drawer/DrawerScreenNames';
import { useNavigation } from '@react-navigation/native';

interface NewPaymentProps {
 
}

export const PendingPayments: React.FC<NewPaymentProps> = ({
}) => {
    const navigation = useNavigation();
  const UserInfo = useSelector((state) => state.User.UserInfo);
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');
  const [loadingWebView, setLoadingWebView] = useState(true);
  const [isReadyToLoad, setIsReadyToLoad] = useState(false);
  const { companyUrl } = UserInfo;
  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem('@UserAuth');
      if (res) {
        const parsedRes = JSON.parse(res);
        setToken(parsedRes.token);
        setUrl(
          `${companyUrl}/Account/AutoLogin?ForUserId=${UserInfo?.userID}&returnPage=${ReturnPage["PendingPayments"]}`,
        );
        setIsReadyToLoad(true); // URL and token are ready
      } else {
        console.log('Error in fetching token', res);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
     <_Screen
          header={
            <Header
              isBack
              goBack={() => {
               navigation.goBack();
              }}
              Screen={screeNames.pendingpayments.name}
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
    <SafeAreaView style={styles.container}>
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
              headers: {
                Authorization: token,
              },
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
    </SafeAreaView>
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
