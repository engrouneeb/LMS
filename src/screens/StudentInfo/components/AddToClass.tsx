import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../reducers/Appstate';
import { getHeight, getTerminologyLabel, getWidth, TerminologyMap } from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  studentInfoClassesFailed,
  studentInfoClassesLoading,
  studentInfoClassesSuccess,
} from '../../../actions/StudentInfoAction';
import { endpoint, _Screen, _View } from '../../../components';
import ScreensNames from '../../../screenNames';
import Header from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import { styles } from '../styles';
import { ReturnPage } from '../../../constants';

const _AddToClass = () => {
  const navigation: any = useNavigation();
  const [token, setToken] = useState<string>('');
  const [url, setUrl] = useState<string | null>(null);
  const [loadingWebView, setLoadingWebView] = useState<boolean>(true);
  const dispatch: any = useDispatch();
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const studentInfo: any = useSelector(
    (state: Appstate) => state.StudentInfoReducer.stdInfo
  );
 const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);
  const { Get } = DataAccess();
  const getToken = () => {
    AsyncStorage.getItem('@UserAuth').then((res: string | null) => {
      if (res != null) {
        setToken(JSON.parse(res).token);
        setUrl(
          `${user.companyUrl}/Account/AutoLogin?ForUserId=${studentInfo?.studentId}&returnPage=${ReturnPage['AddToClass']}`
        );
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
    return true; //disable back button
  };
  return (
    <_Screen
      header={
        <Header
          isBack={true}
          isMenu={false}
          Screen={`${terminologies['Class']?.pluralLabel}`}
          isLogout={false}
          GoBack={() => {
            var EndPoint: endpoint = ApiEndpoints.StudentGetClasses;
            EndPoint.params = `?studentId=${studentInfo?.studentId}`;
            dispatch(studentInfoClassesLoading());
            Get(EndPoint).then((res: any) => {
              if (res) dispatch(studentInfoClassesSuccess(res.classesList));
              dispatch(studentInfoClassesFailed());
            });
            navigation.navigate(ScreensNames?.StudentInfoDetials?.name, {
              billing: false,
            });
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {loadingWebView && (
          <_ActivityIndicator
            size='large'
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
    </_Screen>
  );
};

export const AddToClass = React.memo(_AddToClass);
