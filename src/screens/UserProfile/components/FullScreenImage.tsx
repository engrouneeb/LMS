import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import FastImage from '@d11/react-native-fast-image';
import {_View, _VectorIcons} from '../../../components';
import {whiteThemeColors} from '../../../Utilities';

interface FullScreenImageProps {
  imageUri: string;
  showFullScreen: boolean;
  closeFullScreen: (value: boolean) => void;
}

const FullScreenImage: FC<FullScreenImageProps> = ({
  imageUri,
  showFullScreen,
  closeFullScreen,
}) => {
  const closeModal = () => {
    closeFullScreen(false);
  };
  return (
    <Modal
      animationType="fade"
      onRequestClose={closeModal}
      visible={showFullScreen}
      style={styles.container}>
      <_View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: imageUri,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </_View>

      <TouchableOpacity onPress={closeModal} style={styles.goBackBtn}>
        <_VectorIcons
          type="MaterialCommunityIcons"
          name="keyboard-backspace"
          size={42}
          color={whiteThemeColors.primary}
        />
      </TouchableOpacity>
    </Modal>
  );
};

export {FullScreenImage};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: whiteThemeColors.background,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  goBackBtn: {
    position: 'absolute',
    left: 20,
    top: 50,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
