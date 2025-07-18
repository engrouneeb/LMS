import { SetupScreenStickyHeaderInterface } from '../../../../../../../interfaces';
import React, { FC } from 'react';
import { StyleSheet, Switch } from 'react-native';
// REMOVED: import Switch from 'react-native-switch-pro';
// REPLACED WITH: React Native's built-in Switch component
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _View } from '../../../../../../../components';
import CommonStyles from '../../../../../../CommonStyles';

export const StickyHeader: FC<SetupScreenStickyHeaderInterface> = ({
  addOrEdit,
  showSelected,
  handleShowSelectedOnly,
}) => {
  return (
    <_View
      style={[
        styles.stickyHeaderContainer,
        styles.shadow,
        { shadowColor: whiteThemeColors.greyDark + 80 },
      ]}
    >
      <_Text style={styles.stickyHeaderTxt}>{addOrEdit.ShowSelectedOnly}</_Text>
      <Switch
        value={showSelected}
        // REMOVED: height, backgroundActive, backgroundInactive (react-native-switch-pro specific props)
        // REPLACED WITH: React Native Switch standard props
        onValueChange={(value: any) => handleShowSelectedOnly(value)}
        trackColor={{ 
          false: whiteThemeColors.assignClassIcons.uncheckIcon, 
          true: whiteThemeColors.assignClassIcons.checkIcon 
        }}
        thumbColor={showSelected ? whiteThemeColors.white : whiteThemeColors.greyDark}
      />
    </_View>
  );
};

const styles = StyleSheet.create({
  stickyHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: whiteThemeColors.white,
  },
  stickyHeaderTxt: {
    fontSize: 12,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
