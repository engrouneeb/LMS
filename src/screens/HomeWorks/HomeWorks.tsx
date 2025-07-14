import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { _ActivityIndicator } from 'screens/Loader';
import { AttachmentTypes, isStudent, whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  homeWorkAssignmentInterface,
} from '../../components';
import { EndpointType } from '../../interfaces';
import CstHeader from '../Headers';
import { HomeworkTabs, RenderItem } from './Components';
import { TABS } from './SubmittHomeWork/constants';
import { styles } from './styles';
export const Homework: FC<homeWorkAssignmentInterface> = ({
  // navigation,
  route,
}) => {
  const { studentId,header } = route.params;
  let { roleName } = useSelector((state: any) => state.User.UserInfo);
  const navigation: any = useNavigation();
  const [shouldRerender, setShouldRerender] = useState(false);

  const [activeTab, setActiveTab] = useState<any>({
    id: 1,
    name: 'Assigned',
    icon: {
      type: 'FontAwesome',
      name: 'calendar',
    },
    subTabs: [
      {
        name: 'Details',
        id: 'details',
        icon: {
          type: 'MaterialIcons',
          name: 'find-in-page',
        },
        attachmentDetails: {
          folderName: AttachmentTypes.CorrectedCoursePlayerHomework.folderName,
          folderType: AttachmentTypes.CorrectedCoursePlayerHomework.value,
        },
      },
      {
        name: 'Submit',
        id: 'submit',
        icon: {
          name: 'file-send-outline',
          type: 'MaterialCommunityIcons',
        },
        attachmentDetails: {
          folderName: AttachmentTypes.SubmitCoursePlayerHomework.folderName,
          folderType: AttachmentTypes.SubmitCoursePlayerHomework.value,
        },
      },
    ],
  });
  const [attachments, setAttachments] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { Get } = DataAccess();

  useEffect(() => {
    if (shouldRerender) {
      getHomeWorks();
    }
    return () => {
      setShouldRerender(false);
    };
  }, [shouldRerender]);

  useEffect(() => {
    getHomeWorks();
  }, [navigation]);

  const backPress = () => {
    if (route?.params.goBackScreen) {
      navigation.navigate(route?.params.goBackScreen, { ...route?.params });
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  };

  const getHomeWorks = (isActiveValue?: number) => {
    setIsLoading(true);
    var endpoint: EndpointType = ApiEndpoints.GetStudentHomeworks;
    endpoint.params = `?studentId=${studentId}&tabType=${
      isActiveValue ? isActiveValue : activeTab.id
    }`;
    Get(endpoint)
      .then((res: any) => {
        if (!res.error) {
          setAttachments(res);
        } else {
          console.log('Error while fetching homeworks');
        }
      })
      .finally(() => setIsLoading(false));
  };
  const FooterComponent = () => {
    return <_View width={'100%'} height={40} />;
  };
  return (
    <_Screen
      header={
        <CstHeader
          isBack={!isStudent(roleName)}
          isMenu={isStudent(roleName)}
          OpenMenu={() => {
            navigation!.toggleDrawer();
          }}
          goBack={backPress}
          Screen={header}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={backPress}
      backgroundColor={whiteThemeColors.background}
    >
      <_View>
        <HomeworkTabs
          tabs={TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          getHomeWorks={getHomeWorks}
        />
      </_View>
      <_View style={styles.subContainer}>
        {isLoading ? (
          <_ActivityIndicator
            size={'large'}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        ) : (
          <FlatList
            data={attachments}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <RenderItem
                studentId={studentId}
                item={item}
                tabId={activeTab.id}
                tab={activeTab}
                handleRerender={setShouldRerender}
                header={header}
              />
            )}
            ListFooterComponent={FooterComponent}
            ListEmptyComponent={() => <NoDataFound header={header} />}
          />
        )}
      </_View>
    </_Screen>
  );
};

const NoDataFound = (props:any) => { 
  return (
    <_View style={styles.emptyListContainer}>
      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name={'book-open-page-variant-outline'}
        size={70}
        color={whiteThemeColors.primary}
      />
      <_Text
        style={{
          fontSize: 13,
          color: whiteThemeColors.greyDark,
          marginTop: 20,
        }}
      >{`No ${props?.header} Found`}</_Text>
    </_View>
  );
};
