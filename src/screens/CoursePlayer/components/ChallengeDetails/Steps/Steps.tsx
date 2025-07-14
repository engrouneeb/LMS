import React, { memo, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { loading } from '../../../../../actions/AsyncStorage';
import { getCourseSteps } from '../../../../../actions/CoursePlayerAction';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import Screens from '../../../../../screenNames';
import { _ActivityIndicator } from '../../../../Loader';
import { ChallengeItem } from './components/ChallengeItem';
import { courseTypes } from './components/StepsFunctions';
import { styles } from './styles';
import { StepsInterface } from 'interfaces';
import { useNavigation } from '@react-navigation/native';

const _Steps: React.FC<StepsInterface> = ({
  route,
  isActive,
  loader,
  challengeSteps,
}) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [steps, setSteps] = useState<any>();
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
  useEffect(() => {
    if (isActive) {
      setSteps(challengeSteps);
    }
  }, [isActive, challengeSteps]);

  const updateLocalStep = (id: any) => {
    const _steps = [];
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].id === id) {
        steps[i].isCompleted = !steps[i].isCompleted;
      }
      _steps.push(steps[i]);
    }
    setSteps(_steps);
  };

  const handlePreviousNextStep = (item: any) => {
    let stepLength = steps.length;
    let curStepId = item.id;
    let curStepIndex: any;
    steps.map((item: any, index: number) => {
      if (curStepId == item.id) {
        curStepIndex = index;
      }
    });
    let prvStep = JSON.stringify({});
    let isPrevStep = false;
    if (curStepIndex > 0) {
      prvStep = JSON.stringify(steps[curStepIndex - 1]);
      isPrevStep = true;
    }
    let nxtStep = JSON.stringify({});
    let isNxtStep = false;
    if (curStepIndex + 1 < stepLength) {
      nxtStep = JSON.stringify(steps[curStepIndex + 1]);
      isNxtStep = true;
    }
    return { prvStep, nxtStep, isPrevStep, isNxtStep };
  };

  const navigateToNextScreen = (item: any) => {
    let preNextObj = handlePreviousNextStep(item);
    switch (item.type) {
      case courseTypes.assessment:
        return navigation.navigate(Screens.onlineAssessment.name, {
          header: item.name,
          back: Screens.challengeDetail.name,
          stepId: item.id,
          stepType: item.type,
          updateLocalStep: updateLocalStep,
          role: route?.params?.role,
          previousStep: preNextObj.prvStep,
          nextStep: preNextObj.nxtStep,
          isPreviousStep: preNextObj.isPrevStep,
          isNextStep: preNextObj.isNxtStep,
          isFromStudentAssessment: false,
          navigateToNextScreen: navigateToNextScreen,
        });
      case courseTypes.code:
        return;
      case courseTypes.html:
        return navigation.navigate(Screens.htmlProjectStep.name, {
          header: item.name,
          stepId: item.id,
          stepType: item.type,
          updateLocalStep: updateLocalStep,
          role: route?.params?.role,
          previousStep: preNextObj.prvStep,
          nextStep: preNextObj.nxtStep,
          isPreviousStep: preNextObj.isPrevStep,
          isNextStep: preNextObj.isNxtStep,
          navigateToNextScreen: navigateToNextScreen,
        });
      case courseTypes.download:
        return navigation.navigate(Screens.download.name, {
          stepId: item.id,
          stepType: item.type,
          title: item.name,
          updateLocalStep: updateLocalStep,
          role: route?.params?.role,
          previousStep: preNextObj.prvStep,
          nextStep: preNextObj.nxtStep,
          isPreviousStep: preNextObj.isPrevStep,
          isNextStep: preNextObj.isNxtStep,
          navigateToNextScreen: navigateToNextScreen,
        });
      default:
        dispatch(loading(true));
        dispatch(getCourseSteps(item.id, item.type)).then((res: any) => {
          dispatch(loading(false));
          if (res.data.stepType == courseTypes.audio) {
            return navigation.navigate(Screens.audioChallenge.name, {
              stepId: item.id,
              stepType: item.type,
              updateLocalStep: updateLocalStep,
              isCompleted: res.data.isCompleted,
              role: route?.params?.role,
              isAudio: true,
              mediaFileUrl: res.data.mediaFileUrl,
              previousStep: preNextObj.prvStep,
              nextStep: preNextObj.nxtStep,
              isPreviousStep: preNextObj.isPrevStep,
              isNextStep: preNextObj.isNxtStep,
              navigateToNextScreen: navigateToNextScreen,
              header: item.name ? item.name : route?.params?.header,
            });
          } else if (res.data.secureVideoId != null) {
            return navigation.navigate(Screens.azurevideoPlayer.name, {
              header: item.name,
              stepId: item.id,
              stepType: item.type,
              updateLocalStep: updateLocalStep,
              isCompleted: res.data.isCompleted,
              role: route?.params?.role,
              isAudio: false,
              mediaFileUrl: res.data.mediaFileUrl,
              isEncrypted: res.data.IsEncrypted,
              previousStep: preNextObj.prvStep,
              nextStep: preNextObj.nxtStep,
              isPreviousStep: preNextObj.isPrevStep,
              isNextStep: preNextObj.isNxtStep,
              navigateToNextScreen: navigateToNextScreen,
            });
          } else if (res.data.homeWorkId != null) {
            return navigation.navigate(Screens.homeWork.name, {
              challengeId: res.data.challengeId,
              homeWorkId: res.data.homeWorkId,
              stepId: res.data.id,
              previousStep: preNextObj.prvStep,
              nextStep: preNextObj.nxtStep,
              isPreviousStep: preNextObj.isPrevStep,
              isNextStep: preNextObj.isNxtStep,
              navigateToNextScreen: navigateToNextScreen,
            });
          } else if (res.data.mediaUploadOption === 1) {
            return navigation.navigate(Screens.videoPlayer.name, {
              header: item.name,
              stepId: item.id,
              stepType: item.type,
              isCompleted: res.data.isCompleted,
              updateLocalStep: updateLocalStep,
              role: route?.params?.role,
              mediaFileUrl: res.data.mediaFileUrl,
              previousStep: preNextObj.prvStep,
              nextStep: preNextObj.nxtStep,
              isPreviousStep: preNextObj.isPrevStep,
              isNextStep: preNextObj.isNxtStep,
              navigateToNextScreen: navigateToNextScreen,
            });
          } else if (res.data.mediaUploadOption === 2) {
            return navigation.navigate(Screens.youtubeWebView.name, {
              header: item.name,
              stepId: item.id,
              stepType: item.stepType,
              isCompleted: res.data.isCompleted,
              updateLocalStep: updateLocalStep,
              mediaFileUrl: res.data.mediaFileUrl,
              previousStep: preNextObj.prvStep,
              nextStep: preNextObj.nxtStep,
              isPreviousStep: preNextObj.isPrevStep,
              isNextStep: preNextObj.isNxtStep,
              navigateToNextScreen: navigateToNextScreen,
            });
          } else {
            return navigation.navigate(Screens.general.name, {
              title: item.name,
              description: res.data.stepData,
              isCompleted: res.data.isCompleted,
              stepId: item.id,
              role: route?.params?.role,
              updateLocalStep: updateLocalStep,
              previousStep: preNextObj.prvStep,
              nextStep: preNextObj.nxtStep,
              isPreviousStep: preNextObj.isPrevStep,
              isNextStep: preNextObj.isNxtStep,
              navigateToNextScreen: navigateToNextScreen,
            });
          }
        });
        return;
    }
  };

  return (
    <_View style={{ flex: 1, backgroundColor: whiteThemeColors.background }}>
      {loader ? (
        <_View style={styles.loaderContainer}>
          <_ActivityIndicator size='large' />
        </_View>
      ) : (
        <>
          {steps != undefined && (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.courseList}
              data={steps && steps}
              renderItem={({ item, index }) => (
                <ChallengeItem
                  item={item}
                  index={index}
                  onPress={() => navigateToNextScreen(item)}
                />
              )}
              ListEmptyComponent={() => (
                <_View style={styles.courseListEmpty}>
                  <_VectorIcons
                    type={'Entypo'}
                    name={'medal'}
                    size={100}
                    color={whiteThemeColors.red}
                  />
                  <_Text style={styles.listEmptyText}>
                    {`No ${terminologies['Step(Challenge)']?.pluralLabel} Found..`}
                  </_Text>
                </_View>
              )}
            />
          )}
        </>
      )}
    </_View>
  );
};

export const Steps = memo(_Steps);
