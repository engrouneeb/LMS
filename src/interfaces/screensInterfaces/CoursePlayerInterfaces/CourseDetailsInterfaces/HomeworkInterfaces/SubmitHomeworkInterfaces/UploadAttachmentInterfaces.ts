export interface UploadAttachmentInterface {
  attachmentFor?: string;
  isVisible: boolean;
  itemId: number;
  itemType: number;
  uploadedAttachment: (fleName: any, response: any) => void;
  visibleModal: () => void;
  dependentId: any;
  type?: any;
  moduleFolder?: string;
  assignmentId?: any;
}
