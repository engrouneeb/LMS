import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../components';

export const NoData = () => {
  return (
    <_View style={styles.emptyListContainer}>
      <_VectorIcons
        type={'FontAwesome5'}
        name={'users-cog'}
        size={85}
        color={whiteThemeColors.primary}
      />
      <_Text style={styles.emptyListTxt}>No user found</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.contentBg,
  },
  emptyListTxt: {
    fontWeight: '600',
    fontSize: 14,
    color: whiteThemeColors.greyDark,
    marginTop: 15,
  },
});
