import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { _View } from '../../../components';
import { whiteThemeColors } from '../../../Utilities';
export const Loader = ({ miniLoader = false }) => {
  return (
    <_View style={styles.container}>
      <ActivityIndicator
        size={miniLoader ? 'small' : 'large'}
        color={whiteThemeColors.primary}
      />
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
