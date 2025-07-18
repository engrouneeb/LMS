import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import { isStudent, whiteThemeColors } from '../../../../../Utilities';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import {
  endpoint,
  _Screen,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../components';
import Header from '../../../../Headers';
import { _ActivityIndicator } from '../../../../Loader';
import { styles } from './styles';
import { OnlineAssesmentInterface } from '../../../../../interfaces';
import { Appstate } from '../../../../../reducers/Appstate';
import { useNavigation } from '@react-navigation/native';

const _OnlineAssessment: React.FC<OnlineAssesmentInterface> = ({ route }) => {
  const navigation: any = useNavigation();
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [token, setToken] = useState('');
  const selectedStudent: any = useSelector(
    (state: Appstate) => state.courseAssignStudentsReducer.data,
  );
  const [loadingWebView, setLoadingWebView] = useState(false);
  const [url, setUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { commonWords } = useSelector((state: Appstate) => state.language);
  const { Get } = DataAccess();
  let isPrevNxtInProgress = false;

  useEffect(() => {
    AsyncStorage.getItem('@UserAuth').then((res: any) => {
      let tokenRes = JSON.parse(res);
      let tkn = tokenRes.token;
      setToken(tkn);
    });
    setLoadingWebView(true);
    if (route.params.isFromStudentAssessment) {
      let uri = ``;
      setLoading(true);
      let baseUrl = user.companyUrl;
      // uri = `${baseUrl}/Account/AutoLogin?AssessmentID=${route.params.assessmentID}&ForUserId=${user.userID}&StepId=null&isReturnWhiteBoard=false`;
       //uri = `https://fungreenphone20.conveyor.cloud/Account/AutoLogin?AssessmentID=${route.params.assessmentID}&ForUserId=${route.params.assessmentUserId}&StepId=null&isReturnWhiteBoard=false`;
      uri = `${baseUrl}/Account/AutoLogin?AssessmentID=${route.params.assessmentID}&ForUserId=${route.params.assessmentUserId}&StepId=null&isReturnWhiteBoard=false`;
      setUrl(uri);
      setLoading(false);
      return;
    } else {
      let stdId;
      if (isStudent(route.params.role)) {
        stdId = user.userID;
      } else {
        stdId = selectedStudent == null ? 0 : selectedStudent.id;
      }
      let uri = ``;
      let url: endpoint = ApiEndpoints.GetCourseSteps;
      url.params = `?StepId=${route.params.stepId}&StepType=${route.params.stepType}&StudentId=${stdId}`;
      setLoading(true);
      Get(url)
        .then((res: any) => {
          if (!res) {
            setLoading(false);
            return;
          }
          let baseUrl = user.companyUrl;
          uri = `${baseUrl}/Account/AutoLogin?AssessmentID=${res.assignmentId}&StepId=${route.params.stepId}&ForUserId=${user.userID}&isReturnWhiteBoard=false`;
          setUrl(uri);
          setLoading(false);
          return;
        })
        .catch(() => {
          setLoading(false);
          return;
        });
    }
  }, [route.params.stepId, route.params.isCompleted]);
  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          isBack={true}
          isMenu={false}
          Screen={route.params?.header}
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
      <SafeAreaView
        style={{ flex: 1, backgroundColor: whiteThemeColors.background }}
      >
        <_View style={styles.container}>
          {loadingWebView ? (
            <_View style={styles.indicatorContainer}>
              <_ActivityIndicator size={'large'} />
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
                style={styles.webView}
                cacheMode='LOAD_NO_CACHE'
                allowsLinkPreview
                domStorageEnabled
                useSharedProcessPool={false}
              />
            )
          )}
        </_View>
        <_View
          style={{
            ...styles.btnContainer,
            display:
              route.params.navigateToNextScreen == null ? 'none' : 'flex',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (!isPrevNxtInProgress) {
                isPrevNxtInProgress = true;
                navigation.goBack();
                route.params.navigateToNextScreen(
                  JSON.parse(route.params.previousStep),
                );
              }
            }}
            style={{
              display: route?.params?.isPreviousStep ? 'flex' : 'none',
              ...styles.leftChevron,
            }}
          >
            <_VectorIcons
              type='Entypo'
              name='chevron-thin-left'
              size={14}
              color={whiteThemeColors.textColor.darkGrayText}
              style={styles.chevron}
            />
            <_Text style={styles.previousStepText}>
              {commonWords.previous}
            </_Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!isPrevNxtInProgress) {
                isPrevNxtInProgress = true;
                navigation.goBack();
                route.params.navigateToNextScreen(
                  JSON.parse(route.params.nextStep),
                );
              }
            }}
            style={{
              display: route?.params?.isNextStep ? 'flex' : 'none',
              ...styles.rightChevron,
            }}
          >
            <_Text style={styles.nextStepText}>{commonWords.next}</_Text>
            <_VectorIcons
              type='Entypo'
              name='chevron-thin-right'
              size={14}
              color={whiteThemeColors.textColor.darkGrayText}
              style={styles.chevron}
            />
          </TouchableOpacity>
        </_View>
      </SafeAreaView>
    </_Screen>
  );
};

export const OnlineAssessment = React.memo(_OnlineAssessment);
