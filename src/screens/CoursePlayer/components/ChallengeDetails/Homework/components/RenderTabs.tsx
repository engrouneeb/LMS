import React from 'react';
import { ScrollView } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { _VectorIcons, _View } from '../../../../../../components';
import { whiteThemeColors } from 'utilities';
import { styles } from '../styles';
import {
  RenderTabIconPropsInterface,
  HomeworkRoutesInterface,
  Route,
} from 'interfaces';

const renderTabIcon = (
  props: RenderTabIconPropsInterface,
  routes: HomeworkRoutesInterface[],
  index: number,
) => {
  const { route } = props;
  return routes.map((item: HomeworkRoutesInterface, mapIndex: number) => {
    return item.key === route.key ? (
      <_View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              index === mapIndex
                ? whiteThemeColors.primary
                : whiteThemeColors.primary + 40,
          },
        ]}
      >
        <_VectorIcons
          color={
            index === mapIndex ? whiteThemeColors.white : whiteThemeColors.white
          }
          size={mapIndex == index ? 24 : 21}
          type={route.type}
          name={route.icon}
          key={mapIndex}
        />
      </_View>
    ) : null;
  });
};

export const renderTabBar = (
  props: any,
  routes: Route[],
  index: number,
  __ref: any,
  setScrollWidth: (val: number) => void,
) => {
  return (
    <_View style={styles.tabBarView}>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        ref={(ref) => (__ref = ref)}
        onLayout={(event) => setScrollWidth(event.nativeEvent.layout.width)}
      >
        <TabBar
          {...props}
          style={styles.tabBar}
          tabStyle={styles.tabBarContainer}
          renderIcon={(props: RenderTabIconPropsInterface) =>
            renderTabIcon(props, routes, index)
          }
          labelStyle={{
            display: 'none',
          }}
          indicatorStyle={{
            height: 0,
          }}
        />
      </ScrollView>
    </_View>
  );
};
