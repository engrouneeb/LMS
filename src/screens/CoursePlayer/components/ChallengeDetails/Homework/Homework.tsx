import { useNavigation } from '@react-navigation/native';
import { HomeWorkInterface } from '../../../../../interfaces';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  TouchableOpacity,
  findNodeHandle,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { isStudent, whiteThemeColors } from '../../../../../Utilities';
import {
  GetHomeWorkStep,
  SaveHomeWorkStep,
} from '../../../../../actions/CoursePlayerAction';
import { _Screen, _Text, _VectorIcons, _View } from '../../../../../components';
import { Appstate } from '../../../../../reducers/Appstate';
import Headers from '../../../../Headers';
import { Attachment, Details, HtmlView, Whiteboard } from './components';
import { renderTabBar } from './components/RenderTabs';
import { tabsArray } from './components/TabsArray';
import { styles } from './styles';

let __ref: any;
const _TabViewComponent: React.FC<HomeWorkInterface> = ({ route }) => {
  const navigation = useNavigation();
  const initialLayout = { width: Dimensions.get('window').width };
  const [selectedTab, setSelectedTab] = useState(0);
  const [index, setIndex] = useState(0);
  const [homeWorkId, setHomeWorkId] = useState(route?.params?.homeWorkId);

  const [, setScrollWidth] = useState(0);
  const [routes, setRoutes] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [, setInitialData] = useState<any>([]);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const [isPreviousStep, setIsPreviousStep] = useState(false);
  const [navigateToScreen, setNavigateToScreen] = useState<any>();
  const [isNextStep, setIsNextStep] = useState(false);
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const { stepId } = route.params;
  const selectedStudent: any = useSelector(
    (state: Appstate) => state.courseAssignStudentsReducer.data
  );
  let isPrevNxtInProgress = false;

  useEffect(() => {
    setIsPreviousStep(Boolean(route?.params?.isPreviousStep) ? true : false);
    setIsNextStep(Boolean(route?.params?.isNextStep) ? true : false);
    setNavigateToScreen(Boolean(route?.params) ? route?.params : false);
    setHomeWorkId(route?.params?.homeWorkId);
    fetchApi();
    if (isStudent(user.roleName) || selectedStudent != null) {
      setRoutes(tabsArray);
    } else {
      let slicedArray = tabsArray.slice(0, 3);
      setRoutes(slicedArray);
    }
  }, []);

  const fetchApi = async () => {
    let userId;
    if (selectedStudent == null || selectedStudent.length === 0) {
      userId = user.userID;
    } else {
      userId = selectedStudent.id;
    }
    let homeWorkStep = await dispatch(
      GetHomeWorkStep(
        route?.params?.challengeId,
        route?.params?.homeWorkId,
        route?.params?.stepId,
        userId
      )
    );
    setData(homeWorkStep);
    setInitialData(homeWorkStep);
  };

  const saveData = async () => {
    let save: any = await dispatch(SaveHomeWorkStep(data));
    Alert.alert((await save()) ? 'Saved Successfully' : 'Failed to save');
  };
  const render = ({ route }: any) => {
    if (route.key === 'details') {
      return (
        <Details
          saveData={() => {
            saveData();
          }}
          setEditable={() => {
            setEditable(!editable);
          }}
          data={data}
          homeWorkId={homeWorkId}
          navigation={navigation}
          tabName={route.title}
          editable={editable}
        />
      );
    } else if (route.key === 'attachments') {
      return (
        <Attachment
          saveData={() => {
            saveData();
          }}
          setEditable={() => {
            setEditable(!editable);
          }}
          data={data}
          tabName={route.title}
          editable={editable}
          navigation={navigation}
        />
      );
    } else if (route.key === 'WhiteBoard') {
      {
        return isStudent(user.roleName) || selectedStudent != null ? (
          <Whiteboard stepId={stepId} data={data} tabName={route.title} />
        ) : null;
      }
    } else {
      return (
        <HtmlView
          type={route.key}
          data={data}
          tabName={route.title}
          isActive={route.key === selectedTab ? true : false}
        />
      );
    }
  };

  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <Headers
          isBack
          Screen={data.title}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={render}
        onIndexChange={(num) => {
          let pos: any = findNodeHandle(num);
          __ref?.scrollTo({
            x: pos * 80,
            y: 0,
            animated: true,
          });
          setSelectedTab(routes[num].key);
          setIndex(num);
        }}
        initialLayout={initialLayout}
        style={styles.container}
        renderTabBar={(props) =>
          renderTabBar(props, routes, index, __ref, setScrollWidth)
        }
        tabBarPosition='top'
      />
      <_View style={[styles.bottomBtnContainer]}>
        <TouchableOpacity
          onPress={() => {
            if (!isPrevNxtInProgress) {
              isPrevNxtInProgress = true;
              navigation.goBack();
              navigateToScreen?.navigateToNextScreen(
                JSON.parse(navigateToScreen?.previousStep)
              );
            }
          }}
          style={[
            styles.btn,
            {
              display: isPreviousStep ? 'flex' : 'none',
            },
          ]}
        >
          <_VectorIcons
            type='Entypo'
            name='chevron-thin-left'
            size={14}
            color={whiteThemeColors.black}
          />
          <_Text style={styles.btnText}>Previous</_Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!isPrevNxtInProgress) {
              isPrevNxtInProgress = true;
              navigation.goBack();
              navigateToScreen?.navigateToNextScreen(
                JSON.parse(navigateToScreen.nextStep)
              );
            }
          }}
          style={[
            {
              display: isNextStep ? 'flex' : 'none',
            },
            styles.btn,
          ]}
        >
          <_Text style={styles.btnText}>Next</_Text>
          <_VectorIcons
            type='Entypo'
            name='chevron-thin-right'
            size={14}
            color={whiteThemeColors.black}
          />
        </TouchableOpacity>
      </_View>
    </_Screen>
  );
};
export const Homework = React.memo(_TabViewComponent);
