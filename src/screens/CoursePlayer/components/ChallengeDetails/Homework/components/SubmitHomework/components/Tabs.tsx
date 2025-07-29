import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { AttachmentTypes, getHeight, whiteThemeColors,isInstructor } from '../../../../../../../../Utilities';
import { _VectorIcons, _View } from '../../../../../../../../components';
import CommonStyles from '../../../../../../../CommonStyles';
import { Attachments } from '../../../../..';
import { Editor } from '.';
import { TabInterface } from '../../../../../../../../interfaces';
import { Appstate } from '../../../../../../../../reducers/Appstate';

let tabsRoutes = [
  {
    key: 'description',
    title: 'Description',
    icon: 'description',
  },
  {
    key: 'attachments',
    title: 'Attachments',
    icon: 'attachment',
  },
  {
    key: 'instructorAttachments',
    title: 'Instructor Attachments',
    icon: 'document-attach-outline',
  },
  {
    key: 'instructorFeedback',
    title: 'Instructor Feedback',
    icon: 'feedback',
  },
  {
    key: 'parentFeedback',
    title: 'Parent Feedback',
    icon: 'rate-review',
  },
];
const _Tabs: React.FC<TabInterface> = ({
  Description,
  updateFunction,
  ChallengeId,
  user,
  navigation,
  data,
  parentFeedback,
  instructorFeedback,
  ...props
}) => {
  const { UserInfo }: any = useSelector((state: Appstate) => state.User);
  const [index, setIndex] = useState(0);
  const [routes] = useState(tabsRoutes);
  const updatefunction = (t: any) => {
    updateFunction('Description', t);
  };
  const DescriptionRoute = () => (
    <Editor
      updateFunction={updatefunction}
      IntialValue={Description}
      type={'Description'}
      user={user}
    />
  );

  const AttachmentsRoute = () => (
    <Attachments
      index={index}
      list={data}
      dependentId={UserInfo.userID}
      user={user}
      type={'Homework'}
      title={'Student Attachments'}
      moduleFolder={AttachmentTypes.SubmitCoursePlayerHomework.folderName}
      itemType={AttachmentTypes.SubmitCoursePlayerHomework.value}
      isAddable={true}
      itemId={data.homeWorkID}
    />
  );
  const InstructorAttachmentsRoute = () => (
    <Attachments
      index={index}
      list={data}
      dependentId={UserInfo.userID}
      user={UserInfo}
      title={'Instructor Attachments'}
      type={'Homework_instructor'}
      moduleFolder={AttachmentTypes.InstructorHomeWorkAttachments.folderName}
      itemType={AttachmentTypes.InstructorHomeWorkAttachments.value}
      isAddable={isInstructor(UserInfo.roleName)}
      itemId={data.homeWorkID}
    />
  );
  const InstructorFeedbackRoute = () => (
    <Editor
      updateFunction={(value: any) =>
        updateFunction('InstructorFeedback', value)
      }
      IntialValue={instructorFeedback}
      type={'Instructor Feedback'}
      user={user}
    />
  );

  const ParentFeedbackRoute = () => (
    <Editor
      updateFunction={(value: any) => updateFunction('ParentFeedback', value)}
      IntialValue={parentFeedback}
      type={'Parent Feedback'}
      user={user}
    />
  );

  const RenderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        activeColor={whiteThemeColors.white}
        indicatorStyle={{ height: 0 }}
        style={{
          backgroundColor: whiteThemeColors.primary + 30,
          justifyContent: 'space-between',
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,

          elevation: 0,
        }}
        tabStyle={{
          height: getHeight(8),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        renderIcon={(props) => RenderTabIcon(props)}
        labelStyle={{
          display: 'none',
        }}
      />
    );
  };

  const RenderScene = useCallback(
    SceneMap({
      description: DescriptionRoute,
      attachments: AttachmentsRoute,
      instructorFeedback: InstructorFeedbackRoute,
      parentFeedback: ParentFeedbackRoute,
      instructorAttachments: InstructorAttachmentsRoute,
    }),
    [props],
  );

  const RenderTabIcon = (props: any) => {
    const { route } = props;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].key === route.key) {
        return (
          <_View
            style={[
              styles.mainContainer,
              {
                backgroundColor:
                  index == i
                    ? CommonStyles.themeClr.backgroundColor
                    : whiteThemeColors.white,
              },
            ]}
          >
            <_VectorIcons
              color={
                index === i
                  ? whiteThemeColors.white
                  : CommonStyles.themeClr.backgroundColor
              }
              size={i == index ? 24 : 21}
              type={i == 2 ? 'document-attach-outline' : 'MaterialIcons'}
              name={route.icon}
              key={i}
            />
          </_View>
        );
      }
    }
    return null;
  };

  return (
    <TabView
      lazy={true}
      style={styles.container}
      navigationState={{ index, routes }}
      renderScene={RenderScene}
      renderTabBar={RenderTabBar}
      onIndexChange={setIndex}
    />
  );
};

export const Tabs = React.memo(_Tabs);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 15,
  },
});
