import React, { useEffect, useState } from 'react';
import {  Platform, ScrollView } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { TabBar, TabView } from 'react-native-tab-view';
import { height, Orientation, whiteThemeColors, width } from '../../../../Utilities';
import {
  AssignStudents,
  AttachmentsTab,
  Details,
  Feedback,
  Skills,
  StaffIntro,
  Video,
} from '.';
import { _Image, _Text, _VectorIcons, _View } from '../../../../components';
import { wp } from '../../../../Helpers/Responsiveness';
import { Routes } from './Routes';
import { styles } from './styles';
import { useAppModulePermission } from '../../../../customHooks';
import { NoPermission } from '../../../../components';

interface props {
  staffId: number;
}
const Tabs: React.FC<props> = ({ staffId }) => {
  const [index, setIndex] = useState(0);
  const [scrollRef1, setScrollRef] = useState<any>();
  const [orientation, setOrientation] = useState();
  const [showNoPermission,setNoPermission]= useState(false)
   const { filterMenuOptions } = useAppModulePermission();
   const routes=filterMenuOptions(Routes);
  useEffect(()=>{
    setNoPermission(!(routes.length>0));
  },[routes])

  const renderTabBar = (props: any) => {
    return (
      <Orientation
        getOrientation={(o: any) => {
          setOrientation(o);
        }}
      >
        <_View style={{ height: 85, backgroundColor: whiteThemeColors.white }}>
          <ScrollView
            horizontal={true}
            style={{
              height: Platform.OS === 'ios' ? 80 : 65,
              borderTopColor: whiteThemeColors.greyLite,
              borderTopWidth: 1,
            }}
            showsHorizontalScrollIndicator={false}
            ref={(ref: any) => {
              setScrollRef(ref);
            }}
          >
            <TabBar
              {...props}
              activeColor={whiteThemeColors.white}
              indicatorStyle={{ height: 0 }}
              indicatorContainerStyle={{
                backgroundColor: whiteThemeColors.white,
              }}
              style={{
                justifyContent: 'space-between',
              }}
              tabStyle={{
                height: Platform.OS === 'ios' ? 80 : 65,
                width:
                  orientation === 'PORTRAIT'
                    ? isTablet()
                      ? 125
                      : 80
                    : isTablet()
                    ? wp(19.4)
                    : wp(33),
                backgroundColor: whiteThemeColors.white,
              }}
              renderIcon={(props) => renderTabIcon(props)}
              labelStyle={{
                display: 'none',
              }}
            />
          </ScrollView>
        </_View>
      </Orientation>
    );
  };
  const renderTabIcon = (props: any) => {
    const { route } = props;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].key === route.key) {
        return (
          <_View
            style={[
              styles.infoTabCon,
              {
                borderTopWidth: index === i ? 3 : 0,
                borderColor:
                  index === i
                    ? whiteThemeColors.tabs.tabLabelActive
                    : whiteThemeColors.greyLite,
                paddingTop: 10,
              },
            ]}
          >
            <_VectorIcons
              size={22}
              color={
                index === i
                  ? whiteThemeColors.tabs.tabLabelActive
                  : whiteThemeColors.tabs.tabLabelNotActive
              }
              style={{ textAlign: 'center' }}
              key={i}
              name={routes[i]?.iconName}
              type={routes[i]?.iconType}
            />
            <_Text
              numberOfLines={1}
              style={[
                styles.titleTxt,
                {
                  color:
                    index === i
                      ? whiteThemeColors.tabs.tabLabelActive
                      : whiteThemeColors.tabs.tabLabelNotActive,
                },
              ]}
            >
              {routes[i]?.title}
            </_Text>
          </_View>
        );
      }
    }
    return null;
  };

  const _renderScene = ({ route }: any) => {
    const tabComponents = {
      AssignStudents: <AssignStudents staffId={staffId} />,
      Attachments: <AttachmentsTab staffId={staffId} />,
      Details: <Details staffId={staffId} />,
      Feedback: <Feedback staffId={staffId} />,
      Skills: <Skills staffId={staffId} />,
      StaffIntro: <StaffIntro staffId={staffId} />,
      Video: <Video staffId={staffId} />,
    };
  
    return tabComponents[route.key] || null;
  };

  return (
    showNoPermission?
    <NoPermission/>
    :
    <TabView
      style={styles.tabContainer}
      tabBarPosition='bottom'
      lazy
      navigationState={{ index, routes }}
      renderScene={_renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={(num) => {
        const pos = routes.findIndex((route) => route.key === routes[num]?.key);
        if (pos !== -1) {
          scrollRef1.scrollTo({
            x: pos * 70,
            y: 0,
            animated: true,
          });
          setIndex(num);
        }
      }}
    />
  );
};
export default React.memo(Tabs);
