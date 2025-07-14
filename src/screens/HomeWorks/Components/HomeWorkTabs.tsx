import React, { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../components';
import { DriveTabsProps, TabsInterface } from '../../../interfaces';
import CommonStyles from 'screens/CommonStyles';
export const HomeworkTabs: React.FC<DriveTabsProps> = ({
  activeTab,
  setActiveTab,
  tabs,
  getHomeWorks,
}) => {
  const tabBtnBg = useCallback(
    (id: number | string) => {
      return {
        backgroundColor:
          activeTab?.id === id ? whiteThemeColors.primary : 'transparent',
      };
    },
    [activeTab]
  );

  const tabIconColor = useCallback(
    (id: string | number) => {
      return activeTab?.id === id
        ? whiteThemeColors.white
        : whiteThemeColors.primary;
    },
    [activeTab]
  );

  const tabTextStyle = useCallback(
    (id: string | number) => {
      return {
        fontSize: 13,
        fontFamily: CommonStyles.fonts.semiBold,
        color:
          activeTab?.id === id
            ? whiteThemeColors.white
            : whiteThemeColors.primary,
      };
    },
    [activeTab]
  );

  return (
    <_View style={styles.container}>
      {tabs?.map((tab: TabsInterface, index: number) => {
        return (
          <Pressable
            disabled={activeTab?.id == tab?.id}
            style={[styles.tabBtn, tabBtnBg(tab.id)]}
            onPress={() => {
              setActiveTab(tabs[index]);
              getHomeWorks(++index);
            }}
          >
            <_VectorIcons
              name={tab.icon.name}
              type={tab.icon.type}
              color={tabIconColor(tab.id)}
              size={16}
            />
            <_Text style={[styles.tabTxt, tabTextStyle(tab.id)]}>
              {tab.name}
            </_Text>
          </Pressable>
        );
      })}
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 50,
    backgroundColor: whiteThemeColors.white,
    paddingVertical: 3,
    paddingHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,

    borderColor: whiteThemeColors.primaryDark,
    marginHorizontal: 0,
    marginTop: 5,
    alignSelf: 'center',
  },
  tabBtn: {
    height: '100%',
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  tabTxt: {
    marginLeft: 10,
  },
});
