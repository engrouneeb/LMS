import { AzureVideoPlayerInterface } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { isStudent, Orientation, whiteThemeColors } from 'utilities';
import { SetStepState } from '../../../../../actions/OnlineNotesActions';
import { _Screen, _Text, _VectorIcons, _View } from '../../../../../components';
import CommonStyles from '../../../../CommonStyles';
import Header from '../../../../Headers';
import { style } from './styles';
import { Appstate } from '../../../../../reducers/Appstate';

let isPrevNxtInPrgrs = false;

const _AzureVideoPlayer: React.FC<AzureVideoPlayerInterface> = ({
  navigation,
  route,
}) => {
  const dispatch: any = useDispatch();
  const [orientation, setOrientation] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const { commonWords } = useSelector((state: Appstate) => state.language);
  const domainUrl = useSelector(
    (state: Appstate) => state?.User?.UserInfo?.companyUrl
  );

  useEffect(() => {
    setIsCompleted(route.params.isCompleted);
    isPrevNxtInPrgrs = false;
  }, [route.params.stepId, route.params.isCompleted]);

  let secureVideoUrl = `${domainUrl}/CoursePlayer/ShowAzureVideoOnMobile?isEncrypted=${
    route.params.isEncrypted
  }&url=${encodeURIComponent(route.params.mediaFileUrl)}`;
  const handleBack = () => {
    navigation.goBack();
    return true;
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
        getOrientation={(o: any) => {
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
          <WebView
            source={{
              uri: secureVideoUrl,
            }}
            allowsFullscreenVideo={true}
          />

          <_View style={[style.content, { marginTop: 10 }]}>
            <TouchableOpacity
              onPress={() => {
                if (!isPrevNxtInPrgrs) {
                  isPrevNxtInPrgrs = true;
                  navigation.goBack();
                  route.params.navigateToNextScreen(
                    JSON.parse(route.params.previousStep)
                  );
                }
              }}
              style={[
                {
                  display: route?.params?.isPreviousStep ? 'flex' : 'none',
                  width: isStudent(route.params.role) ? '30%' : '49%',
                },
                style.previousBtn,
              ]}
            >
              <_VectorIcons
                type='Entypo'
                name='chevron-thin-left'
                size={14}
                color={whiteThemeColors.textColor.darkGrayText}
                style={style.arrowLeft}
              />
              <_Text style={style.btnText}>{commonWords.previous}</_Text>
            </TouchableOpacity>
            {!isStudent(route.params.role) ? null : (
              <TouchableOpacity
                style={style.completeBtn}
                onPress={() => {
                  if (!isPrevNxtInPrgrs) {
                    isPrevNxtInPrgrs = true;
                    const Obj = {
                      StepId: route.params.stepId,
                      Status: !isCompleted,
                    };
                    route.params?.updateLocalStep(route.params.stepId);
                    dispatch(SetStepState(Obj)).then(() => {
                      setIsCompleted(!isCompleted);
                    });
                    navigation.goBack();
                  }
                }}
              >
                <_Text style={[CommonStyles.className, style.completeText]}>
                  {!isCompleted
                    ? commonWords.markAsComplete
                    : commonWords.markAsIncomplete}
                </_Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                if (!isPrevNxtInPrgrs) {
                  isPrevNxtInPrgrs = true;
                  navigation.goBack();
                  route.params.navigateToNextScreen(
                    JSON.parse(route.params.nextStep)
                  );
                }
              }}
              style={[
                {
                  display: route?.params?.isNextStep ? 'flex' : 'none',
                  width: isStudent(route.params.role) ? '30%' : '49%',
                  marginRight: 5,
                },
                style.nextBtn,
              ]}
            >
              <_Text style={style.btnText}>{commonWords.next}</_Text>
              <_VectorIcons
                type='Entypo'
                name='chevron-thin-right'
                size={14}
                color={whiteThemeColors.textColor.darkGrayText}
                style={style.arrowRight}
              />
            </TouchableOpacity>
          </_View>
        </_View>
      </Orientation>
    </_Screen>
  );
};
export const AzureVideoPlayer = React.memo(_AzureVideoPlayer);
