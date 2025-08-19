import React, {FC, useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import {SendIcon} from '../../../../../assets/Icons';
import {_TextInput, _View, _VectorIcons} from '../../../../components';
import Loader from '../../../Loader/loader';
import {whiteThemeColors} from '../../../../Utilities';
import {useUploadAttachment} from './useUploadAttachment';

interface ImagePreview {
  uri: string;
  imagePreviewModal: boolean;
  setImagePreviewModal: (imagePreviewModal: boolean) => void;
  onSend: (caption: string, uploadFileResponse: any) => void;
}

const ImagePreview: FC<ImagePreview> = ({
  uri,
  imagePreviewModal,
  setImagePreviewModal,
  onSend,
}) => {
  const [caption, setCaption] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {uploadFile} = useUploadAttachment();
  const sendMessageAttachment = async () => {
    setLoading(true);
    const uploadFileResponse = await uploadFile(uri, true, false, false);
    setLoading(false);
    onSend(caption, uploadFileResponse);
  };
  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      visible={imagePreviewModal}
      style={styles.modal}>
      <FastImage
        style={styles.fullScreenImage}
        source={{
          uri: uri,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.contain}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={'position'}
        keyboardVerticalOffset={0}>
        <_View style={styles.captionView}>
          <_TextInput
            multiline={true}
            style={styles.captionText}
            placeholderTextColor={whiteThemeColors.white}
            value={caption}
            placeholder={'Add a caption...'}
            onChangeText={text => {
              setCaption(text);
            }}
          />
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              sendMessageAttachment();
            }}>
            <SendIcon size={33} color={whiteThemeColors.white} />
          </TouchableOpacity>
        </_View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() => {
          setImagePreviewModal(false);
        }}
        style={styles.closeModal}>
        <_VectorIcons
          type="AntDesign"
          name="closecircleo"
          size={22}
          color={whiteThemeColors.white}
        />
      </TouchableOpacity>
      {loading && <Loader />}
    </Modal>
  );
};

export {ImagePreview};
const styles = StyleSheet.create({
  modal: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  captionView: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    borderRadius: 20,
    width: '94%',
    height: 45,
    alignItems: 'center',
    backgroundColor: whiteThemeColors.greyDark + 90,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    margin: 5,
    marginRight: 2,
  },
  closeModal: {
    position: 'absolute',
    right: 20,
    top: 50,
    backgroundColor: whiteThemeColors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionText: {
    flex: 7,
    width: '90%',
    color: whiteThemeColors.white,
    padding: 10,
    marginBottom: 5,
  },
});
