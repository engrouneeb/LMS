
import React, {FC, useRef, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import {useDispatch} from 'react-redux';
import {whiteThemeColors} from '../../../../Utilities';
import {SendIcon} from '../../../../../assets/Icons';
import {saveGalleryAttachmentImageURI} from '../../../../actions/MessengerActions';
import {_TextInput, _VectorIcons, _View} from '../../../../components';
import Loader from '../../../Loader/loader';
import {useUploadAttachment} from './useUploadAttachment';

interface videoPreviewProps {
  uri: string;
  videoPreviewModal: boolean;
  setVideoPreviewModal: (videoPreviewModal: boolean) => void;
  onSend: (text: string, data: any) => void;
}

const Videopreview: FC<videoPreviewProps> = ({
  uri,
  videoPreviewModal,
  setVideoPreviewModal,
  onSend,
}) => {
  const {uploadFile} = useUploadAttachment();
  const dispatch = useDispatch();
  const videoPlayerRef: any = useRef(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(false);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSeek = (seek: any) => {
    videoPlayerRef.current.seek(seek);
    setCurrentTime(seek);
  };

  const onReplay = () => {
    setPaused(false);
    videoPlayerRef.current.seek(0);
  };

  const onProgress = (data: any) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => setPaused(true);

  const sendMessage = async (text: string) => {
    setLoading(true);
    const data = await uploadFile(uri, false, true, false);
    dispatch(saveGalleryAttachmentImageURI(uri));
    onSend(text, data);
    setLoading(false);
  };

  return (
    <Modal
      animationType="fade"
      visible={videoPreviewModal}
      style={styles.modal}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayerRef}
        resizeMode={'contain'}
        source={{uri: uri}}
        style={styles.mediaPlayer}
        volume={10}
        ignoreSilentSwitch="ignore"
      />

      <_View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={() => (paused ? setPaused(false) : setPaused(true))}>
          <_VectorIcons
            type="MaterialIcons"
            name={paused ? 'play-arrow' : 'pause'}
            size={25}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>

        <Slider
          style={{flex: 1, marginHorizontal: 10}}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          minimumTrackTintColor={whiteThemeColors.white}
          maximumTrackTintColor="#888"
          thumbTintColor={whiteThemeColors.primary}
          onSlidingComplete={onSeek}
        />

        <TouchableOpacity onPress={onReplay}>
          <_VectorIcons
            type="MaterialIcons"
            name="replay"
            size={24}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
      </_View>

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
            sendMessage(caption);
          }}>
          <SendIcon size={33} color={whiteThemeColors.white} />
        </TouchableOpacity>
      </_View>

      <TouchableOpacity
        onPress={() => {
          setVideoPreviewModal(false);
        }}
        style={styles.closeIcon}>
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

export const VideoPreview = React.memo(Videopreview);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: whiteThemeColors.black,
    justifyContent: 'center',
  },
  captionView: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    borderRadius: 20,
    width: '94%',
    backgroundColor: whiteThemeColors.greyDark + 90,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaPlayer: {
    backgroundColor: whiteThemeColors.black,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  captionText: {
    flex: 7,
    width: '90%',
    color: whiteThemeColors.white,
    padding: 10,
    marginBottom: 5,
  },
  closeIcon: {
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
  controlsContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
