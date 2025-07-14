import { AttachmentTabInterface } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../reducers/Appstate';
import { _ActivityIndicator } from '../../../Loader';
import { Attachments } from '../CourseDetails/components';

const _AttachmentTab: React.FC<AttachmentTabInterface> = ({
  isWhiteBoardAttachments,
  attachment,
  isActive,
}) => {
  const [Attachment, setAttachment] = useState<any>([]);
  const { loading } = useSelector(
    (state: Appstate) => state.courseDownloadReducer,
  );
  useEffect(() => {
    attachment && setAttachment(attachment);
  }, [isActive, isWhiteBoardAttachments, attachment]);

  return loading ? (
    <_ActivityIndicator size='large' />
  ) : (
    <Attachments list={Attachment} isFromCourseAttachment={true} />
  );
};

export const AttachmentTab = React.memo(_AttachmentTab);
