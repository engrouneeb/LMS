import React from 'react';
import { _View } from '../../components';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { whiteThemeColors } from '../../Utilities';
import { ActivityIndicator, Modal, } from 'react-native';

const LoadingSc = () => {
  const token = useSelector((state) => state.token);
  return (
    <Modal
      animationType='fade'
      transparent={true}
      onRequestClose={() => null}
      visible={token.loading}
      supportedOrientations={['portrait', 'landscape']}
    >
      <_View style={styles.container} />
      <_View style={styles.subContainer}>
        <_View style={styles.indicator}>
          <ActivityIndicator size='large' color={whiteThemeColors.primary} />
        </_View>
      </_View>
    </Modal>
  );
};

export default LoadingSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.black,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.09,
    height: '100%',
    width: '100%',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
  },
});
