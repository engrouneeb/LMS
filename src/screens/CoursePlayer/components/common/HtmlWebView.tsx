import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import {
  getHeight,
  getWidth,
  isStudent,
  StudentInterface,
  whiteThemeColors,
} from '../../../../Utilities';
import { _View } from '../../../../components';
import Header from '../../../Headers';
import { Appstate } from '../../../../reducers/Appstate';

const _HtmlWebView = (props: {
  changeVisibleState: any;
  role: string;
  title: string;
  classId?: any;
  studentId?: any;
  noteId?: any;
  courseID?: any;
  isWebview: boolean;
}) => {
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [token, setToken] = useState('');
  const [url, setUrl] = useState(null);
  const [loading] = useState(false);
  const [loadingWebView, setLoadingWebView] = useState(true);

  useEffect(() => {
    console.log('====================================');
    console.log('_HtmlWebView', props?.isWebview);
    console.log('====================================');
    if (props?.isWebview === true) {
      var tokenRes;
      AsyncStorage.getItem('@UserAuth').then((res: any) => {
        tokenRes = JSON.parse(res);
        let tokn = tokenRes.token;
        setToken(tokn);
        let baseUrl = user.companyUrl;
        let stdId = 0;
        let classId = 0;
        if (isStudent(props?.role as StudentInterface)) {
          stdId = user.userID;
        } else {
          classId = props?.classId;
          stdId = props?.studentId;
        }
        let uri: any = `${baseUrl}/Account/AutoLogin?BacklogId=${classId}&ForUserId=${stdId}&isReturnWhiteBoard=true&NoteId=${props?.noteId}`;
        console.log('uri', uri);

        setUrl(uri);
      });
    }
  }, [props.isWebview, loadingWebView]);

  return (
    <Modal
      visible={props.isWebview}
      onRequestClose={props.changeVisibleState}
      animationType='slide'
      supportedOrientations={['portrait', 'landscape']}
    >
      <_View
        style={{
          flexDirection: 'column',
          // backgroundColor: whiteThemeColors.modalWhiteBG,
        }}
      >
        <Header
          isBack={true}
          isMenu={false}
          Screen={props.title}
          isLogout={false}
          GoBack={props.changeVisibleState}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <_View style={styles.container}>
            {loadingWebView ? (
              <_View style={styles.loadingContainer}>
                <ActivityIndicator
                  size={'large'}
                  color={whiteThemeColors.primary}
                />
              </_View>
            ) : null}
            {loading ? (
              <></>
            ) : (
              url &&
              token != '' && (
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
                  useSharedProcessPool={false}
                />
              )
            )}
          </_View>
        </ScrollView>
      </_View>
    </Modal>
  );
};
_HtmlWebView.propTypes = {
  title: PropTypes?.string?.isRequired,
  courseID: PropTypes.number,
  changeVisibleState: PropTypes.func.isRequired,
};

export const HtmlWebView = React.memo(_HtmlWebView);

const styles = StyleSheet.create({
  loading: {
    width: getWidth('100%'),
    height: getHeight('91%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '80%',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    width: '100%',
    paddingTop: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    flex: 1,
  },
});
