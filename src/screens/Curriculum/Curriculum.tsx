import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { _Screen, _View } from '../../components';
import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { _ActivityIndicator } from '../Loader/_ActivityIndicator';
import { getHeight, getWidth, whiteThemeColors } from '../../Utilities';
import Header from '../Headers';
import { ReturnPage } from '../../constants';
import { useSelector } from 'react-redux';
import { Appstate } from '../../reducers/Appstate';
interface CurriculumProps {}

export const Curriculum: FC<CurriculumProps> = ({}) => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');
  const { UserInfo }: any = useSelector((state: Appstate) => state.User);
  const [loadingWebView, setLoadingWebView] = useState(true);
  const getToken = () => {
    AsyncStorage.getItem('@UserAuth').then((res) => {
      if (res != null) {
        setToken(JSON.parse(res).token);
        setUrl(
          `${UserInfo.companyUrl}/Account/AutoLogin?returnPage=${ReturnPage['Documents']}`,
        );
        console.log('====================================');
        console.log(
          `${UserInfo.companyUrl}/Account/AutoLogin?returnPage=${ReturnPage['Documents']}`,
        );
        console.log('====================================');
      } else {
        console.log('Error in fetching token', res);
      }
    });
  };

  useEffect(() => {
    getToken();
  }, []);
  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={<Header isBack goBack={handleBack} Screen={'Curriculum'} />}
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={handleBack}
      hideTopSafeArea
      flex={1}
    >
      <_View style={styles.container}>
        <SafeAreaView style={styles.container}>
          {loadingWebView && (
            <_ActivityIndicator
              size='large'
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
          <_View
            style={styles.webViewContainer}
            renderToHardwareTextureAndroid={true}
          >
            {url && token != '' && (
              <WebView
                onLoad={() => setLoadingWebView(false)}
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
                setSupportMultipleWindows={false} // Disable handling multiple windows unless needed
                allowFileAccessFromFileURLs={true}
                originWhitelist={['*']} // Allow navigation to external content
                onShouldStartLoadWithRequest={(request) => {
                  if (request.navigationType === 'click') {
                    return true; // Allow new windows/modal behavior if needed
                  }
                  return true;
                }}
                useSharedProcessPool={false}
              />
            )}
          </_View>
        </SafeAreaView>
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
  footerContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
