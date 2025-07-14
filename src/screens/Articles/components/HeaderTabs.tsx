import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View, articlesInterface } from '../../../components';
import CommonStyles from 'screens/CommonStyles';
interface props {
  tabs: any;
  activeTab?: articlesInterface;
  setActiveTab: (item: any) => void;
  showIcon?: any;
  showTabName: boolean;
}
export const HeaderTabs: React.FC<props> = ({
  tabs,
  activeTab,
  setActiveTab,
  showIcon = true,
  showTabName = false,
}) => {
  const onPressTab = (tab: any) => {
    setActiveTab(tab);
  };
  return (
    <_View>
      <ScrollView
        horizontal={true}
        centerContent={true}
        style={styles.topView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs?.map((tab: any) => {
          return (
            <TouchableOpacity
              key={tab?.title}
              activeOpacity={0.6}
              style={[
                styles.topViewButton,
                {
                  backgroundColor:
                    activeTab?.title === tab?.title
                      ? whiteThemeColors.primary
                      : whiteThemeColors.primary + 10,
                  width: showTabName ? 120 : 45,
                  padding: showTabName ? 18 : 22,
                  borderRadius: showTabName ? 20 : 60,
                },
              ]}
              onPress={() => onPressTab(tab)}
            >
              {showIcon && (
                <>
                  <Image
                    source={require('../../../../assets/categor.png')}
                    style={{
                      height: 32,
                      width: 32,
                      tintColor:
                        activeTab?.title === tab?.title
                          ? whiteThemeColors.white + 90
                          : whiteThemeColors.primaryDark,
                    }}
                  />
                  {tab.noOfArticles > 0 && (
                    <_Text
                      style={{
                        fontSize: 14,
                        fontFamily: CommonStyles.fonts.semiBold,
                        position: 'absolute',
                        top: 18,
                        color: whiteThemeColors.white,
                      }}
                    >
                      {tab?.noOfArticles}
                    </_Text>
                  )}
                </>
              )}
              {showTabName && (
                <_Text
                  numberOfLines={1}
                  style={[
                    styles.ctName,
                    {
                      fontFamily: CommonStyles.fonts.semiBold,
                      color:
                        activeTab?.title === tab?.title
                          ? whiteThemeColors.white
                          : whiteThemeColors.primaryDark,
                    },
                  ]}
                >
                  {tab?.title}
                </_Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </_View>
  );
};

const styles = StyleSheet.create({
  topView: {
    paddingBottom: 15,
    width: '100%',
  },
  topViewButton: {
    backgroundColor: whiteThemeColors.primaryDark,
    shadowColor: whiteThemeColors.black,
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 10,
  },
  scrollContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
  },
  ctName: {
    paddingHorizontal: 10,
    fontSize: 10,
    marginTop: 2,

    width: '100%',
    textAlign: 'center',
  },
});
