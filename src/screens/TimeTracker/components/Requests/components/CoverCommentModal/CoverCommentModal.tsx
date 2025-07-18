import { TimeTrackerRequestCoverCommentModalInterface } from '../../../../../../interfaces';
import { FC } from 'react';
import { Modal, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { whiteThemeColors } from '../../../../../../Utilities';
import {
  _Button,
  _Text,
  _TextInput,
  _VectorIcons,
  _View,
} from '../../../../../../components';
import { CoverRequestConstants } from '../../../../../../constants';
import CommonStyles from '../../../../../CommonStyles';
import { englishRequests } from '../../../../../Strings/english';
import { styles } from './style';

const COLOR = {
  [CoverRequestConstants.Accept]: whiteThemeColors.green,
  [CoverRequestConstants.Approve]: whiteThemeColors.green,
  [CoverRequestConstants.Decline]: whiteThemeColors.red,
  [CoverRequestConstants.Reject]: whiteThemeColors.red,
};

export const CoverCommentModal: FC<
  TimeTrackerRequestCoverCommentModalInterface
> = ({
  modalVisible,
  setModalVisible,
  modalComment,
  setModalComment,
  commentFor,
  onCloseModalCallBack,
}) => {
  const onCloseModal = () => setModalVisible(false);

  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardContainer}>
      <Modal
        transparent
        supportedOrientations={['portrait', 'landscape']}
        animationType='fade'
        visible={modalVisible}
        onRequestClose={onCloseModal}
      >
        <_View style={styles.centeredView}>
          <_View style={styles.modalView}>
            <_View style={styles.headerContainer}>
              <_Text style={styles.headText}>
                {englishRequests.AddYourComment}
              </_Text>
              <TouchableOpacity onPress={onCloseModal} style={styles.crossIcon}>
                <_VectorIcons
                  type={'Entypo'}
                  name='cross'
                  size={15}
                  color={whiteThemeColors.white}
                />
              </TouchableOpacity>
            </_View>
            <_View style={styles.textinputContainer}>
              <_TextInput
                style={styles.textinput}
                value={modalComment}
                placeholderTextColor={whiteThemeColors.greyDark}
                placeholder={englishRequests.AddYourComment}
                onChangeText={(text) => setModalComment(text)}
              />
            </_View>
            <_View style={styles.buttonContainer}>
              <_Button
                borderRadius={5}
                width={'100%'}
                submitting={true}
                loaderColor={COLOR[commentFor]}
                BtnTxt={[
                  CommonStyles.className,
                  styles.btnTxt,
                  { color: COLOR[commentFor] },
                ]}
                style={[
                  styles.button,
                  { borderWidth: 0, backgroundColor: COLOR[commentFor] + 20 },
                ]}
                btnText={commentFor}
                callback={onCloseModalCallBack}
              />
            </_View>
          </_View>
        </_View>
      </Modal>
    </KeyboardAvoidingView>
  );
};
