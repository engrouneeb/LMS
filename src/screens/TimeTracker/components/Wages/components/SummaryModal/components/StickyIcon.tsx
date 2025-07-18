import React from 'react';
import { StyleSheet } from 'react-native';
import { _VectorIcons, _View } from '../../../../../../../components';
import { whiteThemeColors } from '../../../../../../../Utilities';

export const StickyIcon = () => {
  return (
    <_View style={styles.timingContainer}>
      <_VectorIcons
        type={'Entypo'}
        name='clock'
        size={80}
        color={whiteThemeColors.primaryDark + 10}
      />
    </_View>
  );
};

const styles = StyleSheet.create({
  timingContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
    overflow: 'hidden',
    bottom: 10,
  },
});
