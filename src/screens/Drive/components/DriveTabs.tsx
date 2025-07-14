import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../components';
import { active, DriveTabsProps } from '../../../interfaces';
import CommonStyles from 'screens/CommonStyles';

export const DriveTabs: React.FC<DriveTabsProps> = ({
  activeTab,
  setActiveTab,
  tabs,
  radius,
}) => {
  return (
    <_View style={styles.miniTab}>
      {tabs?.map((tab: active, index: number) => {
        return (
          <TouchableOpacity
            disabled={activeTab?.name == tab?.name}
            style={
              activeTab?.name === tab?.name
                ? styles.activeMiniTab
                : styles.nonActiveMiniTab
            }
            onPress={() => setActiveTab(tab)}
          >
            <_Text
              style={
                activeTab?.name === tab?.name
                  ? styles.activeMiniTabText
                  : styles.nonActiveMiniTabText
              }
            >
              {tab.name}
            </_Text>
          </TouchableOpacity>
        );
      })}
    </_View>
  );
};

const styles = StyleSheet.create({
  miniTab: {
    width: '95%',
    height: 45,
    alignSelf: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    zIndex: 1,
    marginTop: 5,
    backgroundColor: whiteThemeColors.white,
    marginHorizontal: 80,
  },
  activeMiniTab: {
    width: '33.3%',
    height: 45,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
    borderRadius: 18,
  },
  nonActiveMiniTab: {
    width: '33.3%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 18,
  },
  nonActiveMiniTabText: {
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 13,
  },
  activeMiniTabText: {
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 13,
  },
});
