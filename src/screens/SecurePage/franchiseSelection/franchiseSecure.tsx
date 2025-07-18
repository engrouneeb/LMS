import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { getHeight, getWidth } from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { _Screen, _View } from '../../../components';
import Header from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
interface props {
  navigation: any;
  route: any;
}
const FranchiseSecure: React.FC<props> = ({ navigation, route }) => {
  const [loadingWebView, setLoadingWebView] = useState(true);
  const [secureUrl, setSecureUrl] = useState<any>();
  const { Post } = DataAccess();
  useEffect(() => {
    let url = route.params.secureUrl;
    let cmpKey = route.params.companyKey;
    let type = route.params.type;
    url = url?.split('/center')[0];

    if (type == 'Courses') {
      let endPoint = ApiEndpoints.GetCoursesEmbededCode;
      Post(endPoint.url, {
        CompanyKey: cmpKey,
      }).then((res) => {
        url = url + res;
        setSecureUrl(url);
      });
    } else {
      url =
        type == 'Classes'
          ? `${url}?FranchiseId=${cmpKey}`
          : `${url}/Events/SubscribeEvents?FranchiseId=${cmpKey}`;
      setSecureUrl(url);
    }
  }, []);

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
          <_View style={styles.indicatorContainer}>
            <_ActivityIndicator size='large' showText={false} />
          </_View>
        )}
        <_View
          style={styles.webViewContainer}
          renderToHardwareTextureAndroid={true}
        >
          <WebView
            onLoad={() => setLoadingWebView(false)}
            source={{
              uri: secureUrl,
            }}
            style={styles.web}
            cacheMode='LOAD_NO_CACHE'
            allowsLinkPreview
            domStorageEnabled
            useSharedProcessPool={false}
          />
        </_View>
      </SafeAreaView>
    </_Screen>
  );
};

export default React.memo(FranchiseSecure);

const styles = StyleSheet.create({
  indicatorContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  web: {
    flex: 1,
    width: getWidth('100%'),
    height: getHeight('80%'),
  },
});
