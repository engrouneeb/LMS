import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../components';
import CommonStyles from '../../CommonStyles';

export const HeaderTabs = ({ tabs, activeTab, setActiveTab }) => {
  const onPressTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <_View style={{ width: '100%', height: 60 }}>
      <ScrollView
        horizontal={true}
        centerContent={true}
        style={styles.topView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs?.map((tab, index) => {
          return (
            <TouchableOpacity
              key={tab?.title}
              disabled={tab == activeTab}
              activeOpacity={0.6}
              style={[
                styles.topViewButton,
                {
                  backgroundColor:
                    activeTab === tab
                      ? whiteThemeColors.primary
                      : whiteThemeColors.white,
                  width: 150,
                  padding: 13,
                  borderRadius: 15,
                },
              ]}
              onPress={() => onPressTab(tab, index)}
            >
              <_Text
                numberOfLines={1}
                style={[
                  styles.ctName,
                  {
                    fontFamily: CommonStyles.fonts.medium,
                    color:
                      activeTab === tab
                        ? whiteThemeColors.white
                        : whiteThemeColors.primary,
                  },
                ]}
              >
                {tab}
              </_Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </_View>
  );
};

const styles = StyleSheet.create({
  topView: {
    backgroundColor: whiteThemeColors.prreimary,
    width: '100%',
  },
  topViewButton: {
    backgroundColor: whiteThemeColors.primary,

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 10,
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
    fontSize: 14,
  },
});
