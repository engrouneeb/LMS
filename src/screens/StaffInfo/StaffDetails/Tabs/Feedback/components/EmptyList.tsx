import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../components';

export const EmptyList = () => {
  return (
    <_View style={styles.container}>
      <_VectorIcons
        name='users'
        type='FontAwesome5'
        size={100}
        color={whiteThemeColors.primary}
      />
      <_Text style={styles.noDataTxt}>No User found</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 80,
  },
  noDataTxt: {
    fontSize: 14,
    color: whiteThemeColors.greyDark,
  },
});
