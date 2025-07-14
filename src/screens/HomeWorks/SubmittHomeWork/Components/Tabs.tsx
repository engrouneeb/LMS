import { FC } from 'react';
import { _View, _VectorIcons, _Text } from 'components';
import { whiteThemeColors } from 'utilities';
import { Pressable, StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';

export interface TabsInterface {
  tabs: any;
  selectedTab: any | null;
  changeTab: (tab: any) => void;
}

export const Tabs: FC<TabsInterface> = ({ tabs, selectedTab, changeTab }) => {
  return selectedTab === null ? null : (
    <_View
      style={{
        height: 50,
        width: '95%',
        backgroundColor: whiteThemeColors.white + 90,
        marginVertical: 5,
        marginHorizontal: 50,
        alignSelf: 'center',
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',

        borderColor: whiteThemeColors.primary,
      }}
    >
      {tabs.subTabs.map((item: any, index: any) => {
        return (
          <Pressable
            onPress={() => changeTab(item)}
            style={{
              width: '50%',
              height: '100%',
              backgroundColor:
                item.id === selectedTab.id
                  ? whiteThemeColors.primary
                  : 'transparent',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <_VectorIcons
              type={item.icon.type}
              name={item.icon.name}
              size={18}
              color={
                item.id === selectedTab.id
                  ? whiteThemeColors.white
                  : whiteThemeColors.primary
              }
            />

            <_Text
              style={{
                fontSize: item.id === selectedTab.id ? 13 : 13,
                color:
                  item.id === selectedTab.id
                    ? whiteThemeColors.white
                    : whiteThemeColors.greyDark,
                fontFamily: CommonStyles.fonts.semiBold,
                marginLeft: 8,
              }}
            >
              {item.name}
            </_Text>
          </Pressable>
        );
      })}
    </_View>
  );
};
