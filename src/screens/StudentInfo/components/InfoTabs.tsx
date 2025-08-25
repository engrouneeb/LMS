import React, {FC, useEffect, useMemo, useState} from 'react';
import {Platform, ScrollView} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {TabBar, TabView} from 'react-native-tab-view';

import {Orientation, whiteThemeColors} from '../../../Utilities';
import {_Text, _VectorIcons, _View, NoPermission} from '../../../components';
import {wp} from '../../../Helpers/Responsiveness';
import {styles} from '../styles';
import {
  AttachmentsTab,
  BillingTab,
  ClassesTab,
  EventsTab,
  FeedbackTab,
  MedicalTab,
  OverviewTab,
  SkillsTab,
} from './Tabs';
import {Appstate} from '../../../reducers/Appstate';
import {useSelector} from 'react-redux';
import {useStudentInfoTabs} from '../hooks';
import {_ActivityIndicator} from '../../Loader/_ActivityIndicator';
import {useNavigation} from '@react-navigation/native';

const InfoTabs: FC<props> = ({
  studetName,
  studentId,
  classTerminology,
  courseTerminology,
  levleTerminology,
  billing,
  initialIndex = 0,
}) => {
  const navigation: any = useNavigation();
  const name = studetName;
  const [index, setIndex] = useState(initialIndex);
  const [orientation, setOrientation] = useState<any>();
  const [showNoPermission, setNoPermission] = useState(false);
  const {routes, tabsLoading} = useStudentInfoTabs();

  // Memoize showNoPermission based on routes
  useEffect(() => {
    setNoPermission(routes.length === 0);
  }, [routes]);
  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  // const renderTabIcon = useMemo(() => {
  //   return (props: any) => {
  //     const {route} = props;
  //     const currentRoute = routes.find(r => r.key === route.key);
  //     if (!currentRoute) return null;

  //     const isActive = routes.indexOf(currentRoute) === index;

  //     return (
  //       <_View
  //         style={[
  //           styles.infoTabCon,
  //           {
  //             borderTopWidth: isActive ? 2 : 0,
  //             borderColor: isActive
  //               ? whiteThemeColors.tabs.tabLabelActive
  //               : whiteThemeColors.greyLite,
  //             paddingTop: currentRoute?.iconType === 'MaterialIcons' ? 7 : 10,
  //           },
  //         ]}>
  //         <_VectorIcons
  //           size={currentRoute?.iconType === 'MaterialIcons' ? 27 : 19}
  //           color={
  //             isActive
  //               ? whiteThemeColors.tabs.tabLabelActive
  //               : whiteThemeColors.tabs.tabLabelNotActive
  //           }
  //           style={{textAlign: 'center'}}
  //           name={currentRoute?.iconName}
  //           type={currentRoute?.iconType}
  //         />
  //         <_Text
  //           numberOfLines={1}
  //           style={[
  //             styles.titleTxt,
  //             {
  //               color: isActive
  //                 ? whiteThemeColors.tabs.tabLabelActive
  //                 : whiteThemeColors.tabs.tabLabelNotActive,
  //             },
  //           ]}>
  //           {currentRoute?.title}
  //         </_Text>
  //       </_View>
  //     );
  //   };
  // }, [routes, index]);

  const renderTabBar = useMemo(() => {
    return () => (
      <Orientation
        getOrientation={(o: any) => {
          setOrientation(o);
        }}>
        <_View style={{height: 80}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              height: Platform.OS === 'ios' ? 80 : 65,
              borderTopColor: whiteThemeColors.greyLite,
              borderTopWidth: 1,
              backgroundColor: whiteThemeColors.tabs.tabBarBg,
            }}>
            {routes.map((route, i) => {
              const isActive = i === index;

              return (
                <_View
                  key={route.key}
                  style={{
                    width:
                      orientation === 'PORTRAIT'
                        ? isTablet()
                          ? 125
                          : 80
                        : isTablet()
                        ? wp(19.4)
                        : wp(33),
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: Platform.OS === 'ios' ? 80 : 65,
                    borderTopWidth: isActive ? 2 : 0,
                    borderColor: isActive
                      ? whiteThemeColors.tabs.tabLabelActive
                      : whiteThemeColors.greyLite,
                    paddingTop: route.iconType === 'MaterialIcons' ? 7 : 10,
                  }}>
                  <_View
                    onTouchEnd={() => setIndex(i)}
                    style={{alignItems: 'center'}}>
                    <_VectorIcons
                      size={route.iconType === 'MaterialIcons' ? 27 : 20}
                      color={
                        isActive
                          ? whiteThemeColors.tabs.tabLabelActive
                          : whiteThemeColors.tabs.tabLabelNotActive
                      }
                      name={route.iconName}
                      type={route.iconType}
                      style={{textAlign: 'center'}}
                    />
                    <_Text
                      numberOfLines={1}
                      style={[
                        styles.titleTxt,
                        {
                          color: isActive
                            ? whiteThemeColors.tabs.tabLabelActive
                            : whiteThemeColors.tabs.tabLabelNotActive,
                          fontSize: 11,
                          marginTop: 5,
                        },
                      ]}>
                      {route.title}
                    </_Text>
                  </_View>
                </_View>
              );
            })}
          </ScrollView>
        </_View>
      </Orientation>
    );
  }, [routes, index, orientation]);

  const _renderScene = ({route}: {route: route}) => {
    switch (route.key) {
      case 'studentInfo':
        return <OverviewTab />;
      case 'skills':
        return <SkillsTab />;
      case 'classes':
        return (
          <ClassesTab
            name={name}
            courseLabel={courseTerminology[0]?.name}
            levleLabel={levleTerminology[0]?.name}
            classLabel={classTerminology[0]?.name}
          />
        );
      case 'events':
        return <EventsTab />;
      case 'medicals':
        return <MedicalTab />;
      case 'feedback':
        return (
          <FeedbackTab
            classLabel={classTerminology[0]?.name}
            courseLabel={courseTerminology[0]?.name}
            levleLabel={levleTerminology[0]?.name}
          />
        );
      case 'billing':
        return (
          <BillingTab
            navigation={navigation}
            studentId={studentId}
            studentName={studetName}
          />
        );
      case 'attachments':
        return <AttachmentsTab studentId={studentId} />;
      default:
        return null;
    }
  };

  return tabsLoading ? (
    <_ActivityIndicator />
  ) : showNoPermission ? (
    <NoPermission />
  ) : (
    <TabView
      key={index}
      swipeEnabled
      style={styles.tabContainer}
      tabBarPosition="bottom"
      lazy
      navigationState={{index, routes}}
      renderScene={_renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
    />
  );
};

export default React.memo(InfoTabs);
