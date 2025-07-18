import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../reducers/Appstate';
import { getHeight, getWidth } from '../../../Utilities';
import { _Screen, _View } from '../../../components';
import Header from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import { ReturnPage } from '../../../constants';
import drawerScreens from '../../../navigation/Drawer/DrawerScreenNames';

export const EnrollmentsToClass = () => {
  const navigation: any = useNavigation();
  const [token, setToken] = useState<string>('');
  const [url, setUrl] = useState<string | null>(null);
  const [loadingWebView, setLoadingWebView] = useState<boolean>(true);
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const studentInfo: any = useSelector(
    (state: Appstate) => state.StudentInfoReducer.stdInfo,
  );

  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem('@UserAuth');
      if (res != null) {
        const parsedRes = JSON.parse(res);
        setToken(parsedRes.token);
        setUrl(
          `${user.companyUrl}/Account/AutoLogin?returnPage=${ReturnPage['AddStudentsToClass']}`,
          // `https://oldpurpletrail91.conveyor.cloud/Account/AutoLogin?&returnPage=${ReturnPage['AddStudentsToClass']}`,
        );
        console.log('====================================');
        console.log(
          `${user.companyUrl}/Account/AutoLogin?returnPage=${ReturnPage['AddStudentsToClass']}`,
        );
        console.log('====================================');
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

  const handleBack = () => {
    navigation.navigate(drawerScreens.dashboard.name);
    return true;
  };

  return (
    <_Screen
      header={
        <Header isBack={true} Screen={'Enrollments'} GoBack={handleBack} />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <_View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          renderToHardwareTextureAndroid={true}
        >
          {url && token != '' && (
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
              setSupportMultipleWindows={true} // Disable handling multiple windows unless needed
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
          {loadingWebView && (
            <View style={styles.loaderContainer}>
              <_ActivityIndicator size='large' />
            </View>
          )}
        </_View>
      </SafeAreaView>
    </_Screen>
  );
};

const styles = StyleSheet.create({
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
