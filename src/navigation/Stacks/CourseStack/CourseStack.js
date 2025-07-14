import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import ScreensNames from '../../../screenNames';
import {
  AudioChallenge,
  AzureVideoPlayer,
  ChallengeDetail,
  CourseAssignment,
  CourseClasses,
  CourseContent,
  CoursePlayer,
  Download,
  General,
  HtmlChallengeType,
  MessageToClass,
  NoteDetials,
  NotesRecording,
  OnlineNotes,
  TabIndex,
  VideoPlayer,
  YoutubeWebview,
  AttachmentView,
  ClassOverview,ClassRoster
} from '../../../screens/CoursePlayer';
import {ClassRosterStack} from "../ClassRosterStack"
import DrawerNames from '../../Drawer/DrawerScreenNames';

const Stack = createStackNavigator();

const CourseStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={DrawerNames.coursePlayer.name}
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
        animationEnabled:
          Platform.OS == 'android' &&
          parseInt(deviceInfoModule.getSystemVersion()) > 9
            ? false
            : true,
      }}
    >
      <Stack.Screen
        component={CoursePlayer}
        name={DrawerNames.coursePlayer.name}
      />
       <Stack.Screen name="ClassOverview" component={ClassOverview} />
      <Stack.Screen
        name="ClassRoster"
        component={ClassRoster}
      />
      <Stack.Screen
        component={CourseClasses}
        name={ScreensNames.courseClasses.name}
      />
      <Stack.Screen
        component={OnlineNotes}
        name={ScreensNames.onlineNotes.name}
      />
      <Stack.Screen
        component={NoteDetials}
        name={ScreensNames.NoteDetials.name}
      />
      <Stack.Screen
        component={CourseAssignment}
        name={ScreensNames.courseAssignment.name}
      />
      <Stack.Screen
        component={NotesRecording}
        name={ScreensNames.notesRecording.name}
      />
      <Stack.Screen
        component={CourseContent}
        name={ScreensNames.courseContent.name}
      />
      <Stack.Screen
        component={AudioChallenge}
        name={ScreensNames.audioChallenge.name}
      />
      <Stack.Screen
        component={ChallengeDetail}
        name={ScreensNames.challengeDetail.name}
      />
      <Stack.Screen component={Download} name={ScreensNames.download.name} />
      <Stack.Screen component={General} name={ScreensNames.general.name} />
      <Stack.Screen
        component={HtmlChallengeType}
        name={ScreensNames.htmlProjectStep.name}
      />
      <Stack.Screen
        component={VideoPlayer}
        name={ScreensNames.videoPlayer.name}
      />
      <Stack.Screen
        component={AzureVideoPlayer}
        name={ScreensNames.azurevideoPlayer.name}
      />
      <Stack.Screen
        component={YoutubeWebview}
        name={ScreensNames.youtubeWebView.name}
      />
      <Stack.Screen
        component={MessageToClass}
        name={ScreensNames.messageToClass.name}
      />
      <Stack.Screen
        component={TabIndex}
        name={ScreensNames.courseDetails.name}
      />
      <Stack.Screen
        component={AttachmentView}
        name={'OnlineNotesAttachmentView'}
      />
    </Stack.Navigator>
  );
};

export default CourseStack;
