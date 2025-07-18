import React, { memo, useEffect, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { isStudent, Orientation, whiteThemeColors } from '../../../../../Utilities';
import { SetStepState } from '../../../../../actions/OnlineNotesActions';
import {
  _Button,
  _Screen,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../components';
import CommonStyles from '../../../../CommonStyles';
import Header from '../../../../Headers';
import { styles } from './styles';
import { YoutubeWebViewInterface } from '../../../../../interfaces';
import { Appstate } from '../../../../../reducers/Appstate';
import { useNavigation } from '@react-navigation/native';

const YoutubeWebViewComponent: React.FC<YoutubeWebViewInterface> = ({
  route,
}) => {
  const navigation: any = useNavigation();
  let isPrevNxtInProgress = false;
  const { commonWords } = useSelector((state: Appstate) => state.language);
  const userInfo: any = useSelector((state: Appstate) => state.User.UserInfo);
  const dispatch: any = useDispatch();
  const [url, setUrl] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [orientation, setOrientation] = useState('');
  
  useEffect(() => {
    setIsComplete(route.params.isCompleted);
    setUrl(route.params.mediaFileUrl);
  }, []);
  const handleBack = () => {
    navigation.goBack();
    return true; //disable back button
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          Screen={route.params.header}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      <Orientation
        getOrientation={(o: string) => {
          setOrientation(o);
        }}
      >
        <_View
          style={{
            height:
              orientation == 'PORTRAIT'
                ? Platform.OS == 'ios'
                  ? '88%'
                  : '91%'
                : '89%',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <WebView source={{ uri: url }} allowsFullscreenVideo={true} />
          <_View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
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
                width: isStudent(userInfo.roleName) ? '30%' : '49%',
                ...styles.lefChevron,
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
            {isStudent(userInfo.roleName) ? (
              <_Button
                borderRadius={25}
                width='35%'
                submitting={true}
                loaderColor={whiteThemeColors.white}
                BtnTxt={{
                  ...CommonStyles.className,
                  ...styles.BtnTxt,
                }}
                style={styles.markAsComplete}
                btnText={
                  !isComplete
                    ? commonWords.markAsComplete
                    : commonWords.markAsIncomplete
                }
                callback={() => {
                  if (!isPrevNxtInProgress) {
                    isPrevNxtInProgress = true;
                    const Obj = {
                      StepId: route.params.stepId,
                      Status: !isComplete,
                    };
                    route.params?.updateLocalStep(route.params.stepId);
                    dispatch(SetStepState(Obj)).then(() => {
                      setIsComplete(!isComplete);
                    });
                    navigation.goBack();
                  }
                }}
              />
            ) : null}
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
                width: isStudent(userInfo.roleName) ? '30%' : '49%',
                ...styles.nextStep,
              }}
            >
              <_Text style={styles.nextText}>{commonWords.next}</_Text>
              <_VectorIcons
                type='Entypo'
                name='chevron-thin-right'
                size={14}
                color={whiteThemeColors.textColor.darkGrayText}
                style={styles.chevron}
              />
            </TouchableOpacity>
          </_View>
        </_View>
      </Orientation>
    </_Screen>
  );
};

export const YoutubeWebview = memo(YoutubeWebViewComponent);
