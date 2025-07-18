import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { StudentInterface, isStudent, whiteThemeColors } from '../../../../../Utilities';
import ApiEndPoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import {
  htmlStepFailed,
  htmlStepLoading,
  htmlStepSuccess,
} from '../../../../../actions/HtmlStepActions';
import { SetStepState } from '../../../../../actions/OnlineNotesActions';
import {
  endpoint,
  _Screen,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../components';
import CommonStyles from '../../../../CommonStyles';
import Header from '../../../../Headers';
import { _ActivityIndicator } from '../../../../Loader';
import { styles } from './styles';
import { HtmlChallengeInterface } from '../../../../../interfaces';
import { Appstate } from '../../../../../reducers/Appstate';
import { useNavigation } from '@react-navigation/native';

const _HtmlChallengeType: React.FC<HtmlChallengeInterface> = ({
  route,
}): JSX.Element => {
  const { Get } = DataAccess();
  const navigation: any = useNavigation();
  let isPrevNxtInPrgrs = false;
  const dispatch: any = useDispatch();
  const [url, setUrl] = useState();
  const [isCompleted, setCourseCompleteState] = useState(false);
  const { loading, success, failed } = useSelector(
    (state: Appstate) => state.htmlStepReducer,
  );
  const { commonWords } = useSelector((state: Appstate) => state.language);
  useEffect(() => {
    getCourseSteps();
  }, [route.params.stepId]);

  const getCourseSteps = () => {
    let url: endpoint = ApiEndPoints.GetCourseSteps;
    url.params = `?StepId=${route.params.stepId}&StepType=${route.params.stepType}`;
    dispatch(htmlStepLoading());
    Get(url)
      .then((res: any) => {
        if (!res) {
          return dispatch(htmlStepFailed());
        }
        setCourseCompleteState(res.isCompleted);
        setUrl(res.mediaFileUrl);
        return dispatch(htmlStepSuccess(res));
      })
      .catch(() => {
        return dispatch(htmlStepFailed());
      });
  };
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
          Screen={route.params.header}
          isLogout={false}
          GoBack={() => {
            navigation.goBack();
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.modalWhiteBG}
    >
      {loading ? (
        <_View style={styles.loading}>
          <_ActivityIndicator size='large' />
        </_View>
      ) : failed ? (
        <_View style={styles.loading}>
          <_Text style={styles.failedText}>Failed to load data.</_Text>
        </_View>
      ) : success ? (
        <_View style={{ flex: 1 }}>
          <_View style={{ flex: 1 }}>
            {url && (
              <WebView
                source={{ uri: url }}
                cacheMode='LOAD_CACHE_ELSE_NETWORK'
                allowsLinkPreview
                domStorageEnabled
                useSharedProcessPool={false}
              />
            )}
          </_View>
        </_View>
      ) : null}
      <_View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!isPrevNxtInPrgrs) {
              isPrevNxtInPrgrs = true;
              navigation.goBack();
              route.params.navigateToNextScreen(
                JSON.parse(route.params.previousStep),
              );
            }
          }}
          style={{
            display: route?.params?.isPreviousStep ? 'flex' : 'none',
            width: isStudent(route.params.role as StudentInterface)
              ? '30%'
              : '45%',
            ...styles.leftChevron,
          }}
        >
          <_VectorIcons
            type='Entypo'
            name='chevron-thin-left'
            size={14}
            color={whiteThemeColors.black}
            style={styles.leftChevronIcon}
          />
          <_Text style={styles.previousText}>{commonWords.previous}</_Text>
        </TouchableOpacity>
        {isStudent(route.params.role as StudentInterface) ? (
          <TouchableOpacity
            style={styles.markAsComplete}
            onPress={() => {
              if (!isPrevNxtInPrgrs) {
                isPrevNxtInPrgrs = true;
                const Obj = {
                  StepId: route.params.stepId,
                  Status: !isCompleted,
                };
                route.params.updateLocalStep(route.params.stepId);
                dispatch(SetStepState(Obj)).then(() => {
                  setCourseCompleteState(!isCompleted);
                });
                navigation.goBack();
              }
            }}
          >
            <_Text
              style={[
                CommonStyles.className,
                { color: whiteThemeColors.textColor.darkGrayText },
              ]}
            >
              {isCompleted === true
                ? commonWords.markAsIncomplete
                : commonWords.markAsComplete}
            </_Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            if (!isPrevNxtInPrgrs) {
              isPrevNxtInPrgrs = true;
              navigation.goBack();
              route.params.navigateToNextScreen(
                JSON.parse(route.params.nextStep),
              );
            }
          }}
          style={{
            display: route?.params?.isNextStep ? 'flex' : 'none',
            width: isStudent(route.params.role as StudentInterface)
              ? '30%'
              : '45%',
            ...styles.nextButton,
          }}
        >
          <_Text style={styles.nextText}>{commonWords.next}</_Text>
          <_VectorIcons
            type='Entypo'
            name='chevron-thin-right'
            size={14}
            color={whiteThemeColors.black}
            style={styles.leftChevronIcon}
          />
        </TouchableOpacity>
      </_View>
    </_Screen>
  );
};

_HtmlChallengeType.propTypes = {
  title: PropTypes.string.isRequired,
  changeVisibleState: PropTypes.func.isRequired,
};

export const HtmlChallengeType = React.memo(_HtmlChallengeType);
