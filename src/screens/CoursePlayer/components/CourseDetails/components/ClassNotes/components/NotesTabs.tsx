import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _View } from '../../../../../../../components';
import { TopMiniTabs } from '../../../../../../../components/TopMiniTabs';
import Header from '../../../../../../Headers';
import { ClassNotesTabs } from '../../../../../../values/english';
import { Attachments } from '../..';
import { Description } from '.';
import { useNavigation } from '@react-navigation/native';

function TabViewExample(props: any) {
  const navigation: any = useNavigation();
  const [activeTab, setActiveTab] = useState({ id: 0, name: 'Details' });
  const noteTabs = [
    { id: 0, name: 'Details' },
    { id: 1, name: 'Attachments' },
  ];

  const renderDetails = () => (
    <SafeAreaView style={styles.firstRouteContainer}>
      <ScrollView contentContainerStyle={styles.firstRouteScrolling}>
        <Description discription={props?.Discription} isOnlineNotes />
      </ScrollView>
    </SafeAreaView>
  );
  const renderAttachments = () => (
    <Attachments list={props.Attachment} isFromCourseAttachment={false} />
  );
  return (
    <_View style={styles.container}>
      <Header
        isBack
        GoBack={() => {
          navigation.goBack();
        }}
        Screen={props.header}
      />
      <TopMiniTabs
        tabs={noteTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab.name == ClassNotesTabs.Attachments
        ? renderAttachments()
        : renderDetails()}
    </_View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  firstRouteContainer: {
    flex: 1,
    paddingTop: 10,
  },
  firstRouteScrolling: {
    flexGrow: 1,
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export { TabViewExample };
