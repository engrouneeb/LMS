import { SetupScreenStickyHeaderInterface } from 'interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Switch from 'react-native-switch-pro';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

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
        height={23}
        backgroundActive={whiteThemeColors.assignClassIcons.checkIcon}
        backgroundInactive={whiteThemeColors.assignClassIcons.uncheckIcon}
        onSyncPress={(value: any) => handleShowSelectedOnly(value)}
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
