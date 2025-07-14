import React, { memo, useEffect, useState } from 'react';
import { Tabs } from './components';
import { useDispatch } from 'react-redux';
import Headers from '../../../../../../Headers';
import Screen from '../../../../../../../screenNames';
import { _Screen } from '../../../../../../../components';
import { HomeworkUpdate } from '../../../../../../../actions/HomeworkAction';
import { submittCourseWork } from '../../../../../../../actions/SubmittChallengeAction';
import { SetAttachmentNavigateScreen } from '../../../../../../../actions/CoursePlayerAction';
import { Alert } from 'react-native';
import { SubmitChallengeInterface } from 'interfaces';
const _SubmitChallenge: React.FC<SubmitChallengeInterface> = ({
  navigation,
  route,
  user,
}) => {
  let params = route.params;
  const dispatch: any = useDispatch();
  const [HomeworkAssignmentId, setHomeworkAssignmentId] = useState(
    params.data.homeworkAssignmentId
  );
  const [Description, setDescription] = useState(params.data.description);
  const [instructorFeedback, setInstructorFeedback] = useState(
    params.data.instructorFeedback
  );
  const [parentFeedback, setParentFeedback] = useState(
    params.data.parentFeedback
  );
  const [homeWorkId] = useState(params.homeWorkId);
  useEffect(() => {
    dispatch(SetAttachmentNavigateScreen(Screen.submitChallenge.name));
    setHomeworkAssignmentId(params.data.homeworkAssignmentId);
    setDescription(params.description);
    setInstructorFeedback(params.instructorFeedback);
    setParentFeedback(params.parentFeedback);
  }, []);

  const updateData = (type: any, value: any) => {
    var submittedValue = {
      homeworkAssignmentId: HomeworkAssignmentId,
      description: Description,
      parentFeedback: parentFeedback,
      instructorFeedback: instructorFeedback,
    };
    switch (type) {
      case 'Description':
        setDescription(value);
        submittedValue.description = value;
        break;
      case 'InstructorFeedback':
        setInstructorFeedback(value);
        submittedValue.instructorFeedback = value;
        break;
      case 'ParentFeedback':
        setParentFeedback(value);
        submittedValue.parentFeedback = value;
        break;

      default:
        break;
    }
    _submitChallengeWork(submittedValue);
  };

  const _submitChallengeWork = (submittedValue: any) => {
    var submittedObj = {
      homeworkAssignmentId: HomeworkAssignmentId,
      description: encodeURIComponent(submittedValue.description),
      parentFeedback: encodeURIComponent(submittedValue.parentFeedback),
      instructorFeedback: encodeURIComponent(submittedValue.instructorFeedback),
    };
    dispatch(submittCourseWork(submittedObj)).then((response: any) => {
      if (response.data) {
        var updateData = params.data;
        updateData.instructorFeedback = submittedValue.instructorFeedback;
        updateData.description = submittedValue.description;
        updateData.parentFeedback = submittedValue.parentFeedback;
        params.updateParent(submittedValue);
        Alert.alert('Homework has been submitted successfully');
        dispatch(HomeworkUpdate(homeWorkId));
        navigation?.navigate(Screen.homeWork.name, {
          stepId: params?.data?.id,
        });
      } else {
        Alert.alert(response?.error_description);
      }
    });
  };
  const handleBack = () => {
    navigation.goBack();
    return true; //disable back button
  };
  return (
    <_Screen
      header={
        <Headers
          isBack={true}
          isMenuRight={false}
          Screen={'Submit Homework'}
          isLogout={false}
          GoBack={() => {
            dispatch(SetAttachmentNavigateScreen(Screen.homeWork.name));
            navigation.goBack();
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      <Tabs
        Description={Description}
        parentFeedback={parentFeedback}
        instructorFeedback={instructorFeedback}
        updateFunction={(type: any, value: any) => updateData(type, value)}
        style={{ height: '60%' }}
        ChallengeId={params.ChallengeId}
        data={params.data}
        navigation={navigation}
        user={user}
      />
    </_Screen>
  );
};
export const SubmitChallenge = memo(_SubmitChallenge);
