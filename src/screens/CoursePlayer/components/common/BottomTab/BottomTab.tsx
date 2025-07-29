import {BottomTabInterface} from '../../../../../interfaces';
import React, {useEffect, useRef, useState} from 'react';
import {
  // Animated,
  Dimensions,
  FlatList,
  Platform,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {
  AttachmentTypes,
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from '../../../../../Utilities';
import {AttachmentTab, OverviewTab} from '../index';
import {_View} from '../../../../../components';
import {useLogin} from '../../../../../navigation/MainNav';
import {Appstate} from '../../../../../reducers/Appstate';
import ScreensNames from '../../../../../screenNames';
import {Steps} from '../../ChallengeDetails';
import {CourseContent, ReviewTab} from '../../CourseDetails';
import {DiscussionTab} from '../Discussion/components';
import {
  attrTypes,
  backlogColumnName,
  getDiscussion,
  handleAttachmentTabOnChange,
  scrollScreenAndTabs,
  setScreenSettings,
} from './components/BottomTabsFunctions';
import {Tab} from './components/Tab';
interface RoutesInterface {
  backlogColumnName: number;
  key: string;
  label: string;
  title: string;
}

const _TabViewComponent: React.FC<BottomTabInterface> = ({
  challengeStepsLst,
  courseContent,
  courseFeilds,
  navigation,
  routePath,
  isCourse,
  tabBar,
  role,
}) => {
  const dispatch = useDispatch();
  const tabRef: any = useRef(undefined);
  const screenRef: any = useRef(undefined);
  const [routes, setRoutes] = useState<RoutesInterface[]>([]);
  const [reviewTabResponse] = useState<any>();
  const [tabValue, setTabValue] = useState<any>([]);
  const [Attachments, setAttachments] = useState<any>([]);
  const [challengeSteps, setChallengeSteps] = useState<any>();

  const {orientation} = useLogin();
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [discussionComments, setDiscussionComments] = useState([]);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [whiteBoardAttachment] = useState<any>([]);
  const {courseContentScreen} = useSelector(
    (state: Appstate) => state.language,
  );
  const flatlistRef: any = useRef();
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
  const onTabPress = (index: number) => {
    setCurrentScreenIndex(index);
    scrollScreenAndTabs(index, tabRef, screenRef, width);
  };
  const scrollToIndex = (index: number) => {
    flatlistRef?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  };
  useEffect(() => {
    return () => {
      clearInterval(screenRef.current);
      clearInterval(tabRef.current);
    };
  }, []);
  useEffect(() => {
    setScreenSettings(
      Dimensions.get('window').width,
      width,
      tabRef,
      screenRef,
      setWidth,
      currentScreenIndex,
    );
  }, [orientation]);
  useEffect(() => {
    setChallengeSteps(challengeStepsLst);
    const tabsArray: any = [];
    if (isCourse)
      tabsArray.push({
        key: 'courseContent',
        title: courseContentScreen.CourseContent,
        label: `${terminologies['Course']?.label} Content`,
        backlogColumnName: 0,
      });
    const tabValues: any = [];
    if (isCourse) tabValues.push({fieldValue: null});
    var tabs = tabBar ? tabBar : [];
    tabs = tabs.filter(x => Object.keys(x).length != 0);
    for (let i = 0; i < tabs.length; i++) {
      if (
        tabs[i].attrType !== attrTypes.History &&
        tabs[i].attrType !== attrTypes.Checklist &&
        tabs[i].attrType !== attrTypes.Curriculum &&
        tabs[i].fieldName
      ) {
        const obj = {
          key:
            tabs[i].fieldName != ''
              ? tabs[i].fieldName.replace(' ', '').toLowerCase()
              : ' ',
          title: tabs[i].fieldName,
          label: tabs[i].fielLabel,
          backlogColumnName: tabs[i].backlogColumnName,
        };
        const tabValue_ = {
          fieldValue: tabs[i].fieldValue,
        };
        tabsArray.push(obj);
        tabValues.push(tabValue_);
      }
    }
    setTabValue(tabValues);
    setRoutes(tabsArray);
  }, [tabBar, terminologies]);
  useEffect(() => {
    handleAttachmentTabOnChange(
      false,
      isCourse,
      routePath,
      ScreensNames,
      setAttachments,
      dispatch,
    );
  }, []);
  const TabFun = (event: any) => {
    scrollToIndex(currentScreenIndex);
    const x = event.nativeEvent.velocity.x;
    if (Platform.OS == 'android') {
      if (x > 3 && currentScreenIndex != 0) {
        onTabPress(currentScreenIndex - 1);
      } else if (x < -3 && currentScreenIndex != tabValue.length - 1) {
        onTabPress(currentScreenIndex + 1);
      } else {
        onTabPress(currentScreenIndex);
      }
    } else {
      if (x < -2 && currentScreenIndex != 0) {
        onTabPress(currentScreenIndex - 1);
      } else if (x > 2 && currentScreenIndex != tabValue.length - 1) {
        onTabPress(currentScreenIndex + 1);
      } else {
        onTabPress(currentScreenIndex);
      }
    }
  };
  return (
    <View style={{backgroundColor: whiteThemeColors.background, flex: 1}}>
      <Animated.ScrollView
        ref={screenRef}
        horizontal
        onMomentumScrollEnd={event => {
          const x = Math.round(event.nativeEvent.contentOffset.x / width);
          scrollToIndex(x);
          Platform.OS == 'android' && x != currentScreenIndex && onTabPress(x);
        }}
        pagingEnabled={true}
        directionalLockEnabled
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        overScrollMode="never"
        scrollToOverflowEnabled
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        automaticallyAdjustContentInsets={false}
        onScrollEndDrag={event => TabFun(event)}
        style={{height: '100%'}}>
        {isCourse && (
          <_View
            style={{
              height: '100%',
              width,
            }}>
            <CourseContent
              navigation={navigation}
              route={routePath}
              courseContent={courseContent}
              courseFeilds={courseFeilds}
              role={role}
            />
          </_View>
        )}
        {tabValue.map((route: any, i: number) => {
          if (!(isCourse && i == 0)) {
            if (
              routes[i].backlogColumnName == backlogColumnName.CourseReviews
            ) {
              return (
                <_View style={{height: '100%', width}} key={i}>
                  <ReviewTab
                    isActive
                    route={routePath}
                    reviewsResponse={reviewTabResponse}
                  />
                </_View>
              );
            } else if (
              routes[i].backlogColumnName == backlogColumnName.Discussion
            ) {
              return (
                <_View style={{height: '100%', width}} key={i}>
                  <DiscussionTab
                    route={routePath}
                    Discussion={() =>
                      getDiscussion(
                        isCourse,
                        AttachmentTypes,
                        routePath,
                        setDiscussionComments,
                      )
                    }
                    discussionRes={discussionComments}
                    itemType={
                      isCourse
                        ? AttachmentTypes.Epic.value
                        : AttachmentTypes.UserStory.value
                    }
                  />
                </_View>
              );
            } else if (
              routes[i].backlogColumnName == backlogColumnName.Attachments
            ) {
              return (
                <_View style={{height: '100%', width}} key={i}>
                  <AttachmentTab
                    isActive
                    attachment={Attachments}
                    isWhiteBoardAttachments={false}
                  />
                </_View>
              );
            } else if (
              routes[i].backlogColumnName ==
              backlogColumnName.WhiteBoardAttachments
            )
              return (
                <_View style={{height: '100%', width}} key={i}>
                  <AttachmentTab
                    isActive
                    attachment={whiteBoardAttachment}
                    isWhiteBoardAttachments={true}
                  />
                </_View>
              );
            else if (
              !isCourse &&
              routes[i].backlogColumnName == backlogColumnName.Instructions
            ) {
              return (
                <_View style={{height: '100%', width}} key={i}>
                  <Steps
                    isActive
                    route={routePath}
                    loader={courseContentScreen.loading}
                    challengeSteps={challengeSteps}
                  />
                </_View>
              );
            } else
              return (
                <_View style={{height: '100%', width}} key={i}>
                  <OverviewTab value={tabValue[i].fieldValue} isActive={true} />
                </_View>
              );
          }
        })}
      </Animated.ScrollView>
      <_View>
        <FlatList
          horizontal
          data={routes}
          ref={flatlistRef}
          contentContainerStyle={{
            height: 50,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Tab
              onPress={() => onTabPress(index)}
              item={item}
              currentScreenIndex={currentScreenIndex}
              index={index}
            />
          )}
        />
      </_View>
    </View>
  );
};

export const TabViewComponent = React.memo(_TabViewComponent);
