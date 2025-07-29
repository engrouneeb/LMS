import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../../../reducers/Appstate';
import { AttachmentTypes, isStudent, whiteThemeColors } from '../../../../../../Utilities';
import ApiEndpoints from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import { endpoint, _VectorIcons, _View } from '../../../../../../components';
import { UploadAttachment } from '../../../../../CoursePlayer/components/ChallengeDetails/Homework/components/SubmitHomework/components';
import { Attachments } from '../../../../../CoursePlayer/components/CourseDetails/components';
import { _ActivityIndicator } from '../../../../../../screens/Loader';
interface props {
  studentId: any;
}
const AttachmentsTab: React.FC<props> = ({ studentId }) => {
  const [attachments, setAttachments] = useState([]);
  const [isVisible, setIsModalVisible] = useState(false);
  let { roleName, userID }: any = useSelector(
    (state: Appstate) => state.User.UserInfo,
  );

  const StdId = isStudent(roleName) ? userID : studentId;
  const [loading, setloading] = useState(true);
  const { Get } = DataAccess();

  useEffect(() => {
    getAttachments();
  }, []);

  const getAttachments = useCallback(() => {
    setloading(true);
    let url: endpoint = ApiEndpoints.GetAttachment;
    url.params = `?itemId=${StdId}&itemType=${AttachmentTypes.Student.value}`;
    Get(url)
      .then((res: any) => {
        if (res) {
          setAttachments(res);
          return;
        }
      })
      .catch(() => {})
      .finally(() => setloading(false));
  }, [studentId]);
  const handleVisibleModal = () => {
    setIsModalVisible(false);
  };
  const handleUploadedAttachment = () => {
    getAttachments();
  };
  return (
    <>
      <_View style={{ flex: 1, backgroundColor: whiteThemeColors.background }}>
        {loading ? (
          <_View
            style={{
              position: 'absolute',
              top: '50%',
              zIndex: 1,
              alignSelf: 'center',
            }}
          >
            <_ActivityIndicator color={whiteThemeColors.primary} size='large' />
          </_View>
        ) : (
          <Attachments list={attachments} isFromCourseAttachment={false} />
        )}
        <_View style={styles.addFileCont}>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}
            style={styles.addFileBtn}
          >
            <_VectorIcons
              type='AntDesign'
              name='addfile'
              size={21}
              color={whiteThemeColors.white}
            />
          </TouchableOpacity>
        </_View>
        <SafeAreaView>
          <Modal
            animationType='slide'
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
              setIsModalVisible(false);
            }}
            supportedOrientations={['portrait', 'landscape']}
          >
            <UploadAttachment
              isVisible={isVisible}
              visibleModal={handleVisibleModal}
              uploadedAttachment={handleUploadedAttachment}
              dependentId={0}
              itemId={StdId}
              itemType={AttachmentTypes.Student.value}
            />
          </Modal>
        </SafeAreaView>
      </_View>
    </>
  );
};
export { AttachmentsTab };
const styles = StyleSheet.create({
  addFileCont: {
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 10,
    height: 55,
    bottom: 10,
    right: 10,
    width: 55,
  },
  addFileBtn: {
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27.5,
    height: '100%',
    width: '100%',
  },
});
