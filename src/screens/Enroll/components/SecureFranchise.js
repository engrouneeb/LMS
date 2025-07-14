import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import { getHeight, getWidth, isParent } from 'utilities';
import { _Screen, _View } from '../../../components';
import Header from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
const SecureFranchise = ({ navigation, route }) => {
  const [secureUrl, setSecureUrl] = useState();
  const [loadingWebView, setLoadingWebView] = useState(true);
  const { roleName, userID, licenseCmpKey, companySecureUrl } = useSelector(
    (state) => state.User.UserInfo
  );

  useEffect(() => {
    urlFunction();
  }, []);

  const urlFunction = async () => {
    const { type, typeID } = route.params;
    const parent = isParent(roleName);
    let url = companySecureUrl;
    url = url.split('/center')[0];
    url =
      type == 'Classes'
        ? `${url}/Landing/SignUp/?franchiseid=${licenseCmpKey}&isEmbededScript=${false}&TypeID=${typeID}&isLogin=${true}&isParent=${parent}&userId=${userID}&isDisableLoginToPortalBtn=${true}`
        : `${url}/Events/EventSubscription?franchiseid=${licenseCmpKey}&isEmbededScript=${false}&type=${typeID}&isLogin=${true}&isParent=${parent}&userId=${userID}&isDisableLoginToPortalBtn=${true}`;
    setSecureUrl(url);
  };

  const handleBack = () => {
    navigation.goBack();
    return true; //disable back button
  };

  return (
    <_Screen
      header={
        <Header
          isBack={true}
          isMenu={false}
          Screen={route.params.title}
          isLogout={false}
          GoBack={() => {
            navigation.goBack();
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {loadingWebView && (
          <_View style={styles.loaderContainer}>
            <_ActivityIndicator size='large' showText={false} />
          </_View>
        )}
        {secureUrl != undefined && (
          <_View
            style={styles.webContainer}
            renderToHardwareTextureAndroid={true}
          >
            <WebView
              onLoad={() => setLoadingWebView(false)}
              source={{
                uri: secureUrl,
              }}
              style={styles.webView}
              cacheMode='LOAD_NO_CACHE'
              allowsLinkPreview
              domStorageEnabled
              useSharedProcessPool={false}
            />
          </_View>
        )}
      </SafeAreaView>
    </_Screen>
  );
};

export default React.memo(SecureFranchise);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    zIndex: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  webContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    flex: 1,
    width: getWidth('100%'),
    height: getHeight('80%'),
  },
});
