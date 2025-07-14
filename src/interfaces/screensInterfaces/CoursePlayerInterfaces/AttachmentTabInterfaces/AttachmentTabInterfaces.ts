export interface AttachmentTabInterface {
  attachment: Attachment;
  isActive: boolean;
  isWhiteBoardAttachments: boolean;
}

interface Attachment {
  attachments: any[];
  isAddable: boolean;
  isDeletable: boolean;
  isDownloadable: boolean;
  isViewable: boolean;
  status: number;
}
