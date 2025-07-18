import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';

export const EmptyList = () => {
  return (
    <_View style={styles.container}>
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
  container: {
    width: '100%',
    height: Dimensions.get('window').height - 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListTxt: {
    fontWeight: '600',
    fontSize: 14,

    color: whiteThemeColors.greyDark,
    marginTop: 15,
  },
});
