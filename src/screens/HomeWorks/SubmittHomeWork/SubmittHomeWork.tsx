import { useNavigation } from '@react-navigation/native';
import { _Screen, _Text, _TextInput, _VectorIcons, _View } from 'components';
import { EndpointType } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import Loader from 'screens/Loader/loader';
import { CustomAlert, isParent, isStudent, whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { Attachments } from '../../CoursePlayer/components';
import Header from '../../Headers';
import { HomeworkDetails } from './Components';
import { SectionTitle } from './Components/SectionTitle';
import { Tabs } from './Components/Tabs';
import CommonStyles from 'screens/CommonStyles';
import WhiteLabelConfig from '../../../WhiteLabelConfig';
interface SubmittHomeWorkProps {
  navigation?: any;
  route: any;
}

export const SubmittHomeWork: React.FC<SubmittHomeWorkProps> = ({ route }) => {
  const { studentId, item, tabId, header,label, tab } = route?.params;
  const variantName = WhiteLabelConfig.APP_VARIANT_NAME; 
  const [selectedTab, setSelectedTab] = useState<any | null>(null);
  const { UserInfo }: any = useSelector((state: Appstate) => state.User);
  const [comments, setComments] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertObj, setAlertObj] = useState({
    alertTitle: '',
    alertMessage: '',
    showAlert: false,
  });
  const [updatedHomework, setUpdateHomeword] = useState(false);
  const navigation = useNavigation();
  const { PostSecured } = DataAccess();
  useEffect(() => {
    tab.subTabs.length > 0
      ? setSelectedTab(tab.subTabs[0])
      : setSelectedTab(null);

    tabId === 3 && setComments(item.instructorFeedback);

    return () => {
      setUpdateHomeword(false);
    };
  }, [tab]);

  const submitHomework = () => {
    setLoading(true);
    var endpoint: EndpointType = ApiEndpoints.SubmitHomework;
    endpoint.params = {
      studentHomeworkId: item.studentHomeworkId,
      homeworkTab: tabId,
      studentComment: tabId == 1 ? comments : item.studentComment,
      instructorFeedback: tabId !== 1 ? comments : item.instructorFeedback,
    };
    PostSecured(endpoint, endpoint.params)
      .then((res: any) => {
        if (!res.error) {
          setUpdateHomeword(true);
          setAlertObj({
            alertTitle: 'Success',
            alertMessage:variantName=="smavylms"?`Submit ${label} saved successfully`: res?.msg,
            showAlert: true,
          });
        } else {
          setUpdateHomeword(false);
          setAlertObj({
            alertTitle: 'Error',
            alertMessage: `Error while submitting ${label}`,
            showAlert: true,
          });
          setError(true);
          console.log(`Error while fetching ${label}`);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleTabChange = (tab: any) => setSelectedTab(tab);

  const permissionAttachment = () => {
    if (tabId === 1) {
      return true;
    } else if (tabId === 2) {
      return !isStudent(UserInfo.roleName) && !isParent(UserInfo.roleName);
    } else {
      return !isStudent(UserInfo.roleName) && !isParent(UserInfo.roleName);
    }
  };

  const permissionSubmit = () => {
    if (tabId === 1) {
      return true;
    } else if (tabId === 2) {
      return !isStudent(UserInfo.roleName) && !isParent(UserInfo.roleName);
    } else {
      return false;
    }
  };

  const handleGoBack = () => {
    if (route.params?.handleRerender) {
      if (updatedHomework) {
        route.params?.handleRerender(true);
      } else {
        route.params?.handleRerender(false);
      }
    }
    navigation.goBack();
  };

  return (
    <_Screen
      header={<Header isBack goBack={handleGoBack} Screen={header} />}
      flex={1}
      hideTopSafeArea
      backgroundColor={whiteThemeColors.background}
    >
      {permissionSubmit() && selectedTab && tab.subTabs.length !== 0 && (
        <Tabs
          tabs={tab}
          selectedTab={selectedTab}
          changeTab={handleTabChange}
        />
      )}
      <_View style={{ flex: 1, marginBottom: 5 }}>
        {selectedTab && ['submitted', 'details'].includes(selectedTab.id) ? (
          <HomeworkDetails
            item={item}
            tabId={tabId}
            userId={studentId}
            moduleFolder={selectedTab.attachmentDetails.folderName}
            itemType={selectedTab.attachmentDetails.folderType}
          />
        ) : (
          <_View style={{ flex: 1, paddingHorizontal: 5 }}>
            <_View marginVertical={10}>
              <SectionTitle
                icon={{
                  name: 'integration-instructions',
                  type: 'MaterialIcons',
                }}
                title={'Comment'}
              />
            </_View>
            <_View
              style={{
                width: '96%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 7,
                alignSelf: 'center',
              }}
            >
              <_TextInput
                multiline
                editable={tabId !== 3}
                placeholder={'Enter comment'}
                textAlignVertical='top'
                value={comments}
                onChangeText={(value) => {
                  setComments(value);
                }}
                width={'100%'}
                style={{
                  height: 80,
                  fontSize: 14,
                  fontFamily: CommonStyles.fonts.regular,
                  paddingHorizontal: 10,
                  alignSelf: 'center',
                  backgroundColor: whiteThemeColors.white,
                  borderRadius: 7,
                }}
              />
            </_View>
            <_View marginVertical={10}>
              <SectionTitle
                icon={{
                  name: 'document-attach',
                  type: 'Ionicons',
                }}
                title={'Attachments'}
              />
            </_View>
            <Attachments
              index={0}
              list={item}
              dependentId={studentId}
              type={'Homework'}
              moduleFolder={
                tab?.attachmentDetails
                  ? tab?.attachmentDetails.folderName
                  : selectedTab?.attachmentDetails.folderName
              }
              itemType={
                tab?.attachmentDetails
                  ? tab?.attachmentDetails.folderType
                  : selectedTab?.attachmentDetails.folderType
              }
              isAddable={permissionAttachment()}
              itemId={item.homeworkId}
              hideNodata
              userId={studentId}
            />
          </_View>
        )}
      </_View>
      {selectedTab && ['correction', 'submit'].includes(selectedTab.id) && (
        <Pressable
          onPress={() => submitHomework()}
          style={{
            width: '90%',
            height: 45,
            borderRadius: 10,
            backgroundColor: whiteThemeColors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            bottom: 10,
            flexDirection: 'row',
            display: permissionSubmit() ? 'flex' : 'none',
          }}
        >
          <_VectorIcons
            type='AntDesign'
            name={'save'}
            size={25}
            color={whiteThemeColors.white}
          />
          <_Text
            style={{
              fontSize: 18,
              color: whiteThemeColors.white,
              marginLeft: 10,
            }}
          >
            Submit
          </_Text>
        </Pressable>
      )}
      {alertObj.showAlert && (
        <CustomAlert
          visible={alertObj.showAlert}
          title={alertObj.alertTitle}
          msg={alertObj.alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setAlertObj({ alertTitle: '', alertMessage: '', showAlert: false });
            if (error) setError(false);
            else handleGoBack();
          }}
        />
      )}
      {loading && <Loader />}
    </_Screen>
  );
};
