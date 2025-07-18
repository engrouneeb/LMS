import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, SafeAreaView } from 'react-native';
import { AttachmentTypes } from '../../../../Utilities';
import { _View, endpoint } from '../../../../components';
import { Attachments } from '../../../CoursePlayer/components/CourseDetails/components';

import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { UploadAttachment } from '../../../CoursePlayer/components/ChallengeDetails/Homework/components/SubmitHomework/components';
interface props {
  staffId: any;
}
const AttachmentsTab: React.FC<props> = ({ staffId }) => {
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setIsModalVisible] = useState(false);
  const StdId = staffId;
  const { Get } = DataAccess();
  useFocusEffect(
    React.useCallback(() => {
      getAttachments();
    }, [])
  );
  const getAttachments = () => {
    let url: endpoint = ApiEndpoints.GetAttachment;
    url.params = `?itemId=${StdId}&itemType=${AttachmentTypes.StaffForm.value}`;
    Get(url)
      .then((res: any) => {
        if (res) {
          setAttachments(res);
          return;
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleVisibleModal = () => {
    setIsModalVisible(false);
  };
  const handleUploadedAttachment = () => {
    getAttachments();
  };
  return (
    <>
      <_View style={{ flex: 1, marginTop: 0 }}>
        <Attachments list={attachments} isFromCourseAttachment={false} />
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
              // assignmentId={list.homeworkAssignmentId}
              visibleModal={handleVisibleModal}
              uploadedAttachment={handleUploadedAttachment}
              dependentId={0}
              itemId={StdId}
              // type={type}
              // moduleFolder={AttachmentTypes.StaffForm.folderName}
              itemType={AttachmentTypes.StaffForm.value}
            />
          </Modal>
        </SafeAreaView>
      </_View>
    </>
  );
};
export { AttachmentsTab };
