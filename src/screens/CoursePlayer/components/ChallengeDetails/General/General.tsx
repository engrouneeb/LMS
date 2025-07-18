import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  isStudent,
  Orientation,
  StudentInterface,
  whiteThemeColors,
} from '../../../../../Utilities';
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
import { Description } from '../../CourseDetails/components/ClassNotes/components';
import { styles } from './styles';
import { GeneralStepInterface } from '../../../../../interfaces';
import { Appstate } from '../../../../../reducers/Appstate';
import { useNavigation } from '@react-navigation/native';

const General: React.FC<GeneralStepInterface> = ({ route }) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const { commonWords } = useSelector((state: Appstate) => state.language);
  const [isCompleted, setIsCompleted] = useState(route.params.isCompleted);
  const [, setOrientation] = useState('');
  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  let description = {
    title: route.params.title,
    description: route.params.description,
  };
  let isPrevNxtInPrgrs = false;
  return (
    <Orientation
      getOrientation={(o: string) => {
        setOrientation(o);
      }}
    >
      <_Screen
        header={
          <Header
            isBack={true}
            isMenu={false}
            Screen={route.params.title}
            GoBack={() => navigation.goBack()}
          />
        }
        flex={1}
        hideTopSafeArea
        onAndroidBack={handleBack}
        backgroundColor={whiteThemeColors.white}
      >
        <_View style={{ flex: 1 }}>
          <Description discription={description} isOnlineNotes={false} />
        </_View>
        <_View style={styles.bottomBtnContainer}>
          <TouchableOpacity
            onPress={() => {
              if (!isPrevNxtInPrgrs) {
                isPrevNxtInPrgrs = true;
                navigation.pop();
                route.params.navigateToNextScreen(
                  JSON.parse(route.params.previousStep)
                );
              }
            }}
            style={[
              styles.btn,
              {
                display: route?.params?.isPreviousStep ? 'flex' : 'none',
              },
            ]}
          >
            <_VectorIcons
              type='Entypo'
              name='chevron-thin-left'
              size={14}
              color={whiteThemeColors.textColor.darkGrayText}
            />
            <_Text
              style={{
                color: whiteThemeColors.textColor.darkGrayText,
              }}
            >
              {commonWords.previous}
            </_Text>
          </TouchableOpacity>
          {isStudent(route.params.role as StudentInterface) ? (
            <TouchableOpacity
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
              style={styles.btnComplete}
            >
              <_Text
                style={{
                  ...CommonStyles.className,
                  ...styles.buttonText,
                }}
              >
                {isCompleted
                  ? commonWords.markAsIncomplete
                  : commonWords.markAsComplete}
              </_Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              if (!isPrevNxtInPrgrs) {
                isPrevNxtInPrgrs = true;
                navigation.pop();
                route.params.navigateToNextScreen(
                  JSON.parse(route.params.nextStep)
                );
              }
            }}
            style={[
              {
                display: route?.params?.isNextStep ? 'flex' : 'none',
              },
              styles.btn,
            ]}
          >
            <_Text
              style={{
                color: whiteThemeColors.textColor.darkGrayText,
              }}
            >
              {commonWords.next}
            </_Text>
            <_VectorIcons
              type='Entypo'
              name='chevron-thin-right'
              size={14}
              color={whiteThemeColors.textColor.darkGrayText}
            />
          </TouchableOpacity>
        </_View>
      </_Screen>
    </Orientation>
  );
};

export { General };
