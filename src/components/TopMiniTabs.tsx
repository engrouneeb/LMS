import { TopMiniTabsProps } from '../interfaces';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../Utilities';
import { _Text, _View } from '.';
import CommonStyles from '../screens/CommonStyles';
import IconBadge from 'react-native-icon-badge';

export const TopMiniTabs: FC<TopMiniTabsProps> = ({
  activeTab,
  setActiveTab,
  tabs,
  groupsCount,
  isForGroupChat,
}) => {
  return (
    <_View style={styles.miniTab}>
      {tabs?.map((tab, index) => {
        return (
          <TouchableOpacity
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
            {isForGroupChat && tab.name == 'Groups' && groupsCount > 1 && (
              <_View style={styles.badgeView}>
                <IconBadge
                  MainElement={<_View style={styles.badge} />}
                  BadgeElement={
                    <_Text style={styles.countText}>{groupsCount}</_Text>
                  }
                  IconBadgeStyle={styles.iconBadge}
                />
              </_View>
            )}
          </TouchableOpacity>
        );
      })}
    </_View>
  );
};

const styles = StyleSheet.create({
  firstRouteContainer: {
    flex: 1,
    paddingTop: 10,
  },
  firstRouteScrolling: {
    flexGrow: 1,
    borderRadius: 10,
    backgroundColor: whiteThemeColors.white,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  miniTab: {
    width: '90%',
    height: 40,
    backgroundColor: whiteThemeColors.white + 90,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 15,
    flexDirection: 'row',
    zIndex: 1,
  },
  activeMiniTab: {
    width: '50%',
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nonActiveMiniTab: {
    width: '50%',
    backgroundColor: whiteThemeColors.white + 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
  },
  nonActiveMiniTabText: {
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 12,
  },
  activeMiniTabText: {
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 12,
  },
  badge: {
    width: 5,
    height: 5,
  },
  countText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: whiteThemeColors.white,
  },
  iconBadge: {
    width: 22,
    height: 22,
    backgroundColor: whiteThemeColors.red,
    borderWidth: 1.5,
    borderColor: whiteThemeColors.white,
  },
  badgeView: {
    position: 'absolute',
    right: -5,
    top: -10,
  },
});
