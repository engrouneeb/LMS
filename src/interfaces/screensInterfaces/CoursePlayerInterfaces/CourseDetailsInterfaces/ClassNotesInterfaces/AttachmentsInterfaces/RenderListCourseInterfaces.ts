export interface RenderListCourseInterface {
  user: userInterface;
  attachmentList: attachmentList;
  index: number;
}
interface userInterface {
  comment: string;
  createdBy: number;
  downloadbleLink?: any;
  fileContentType?: any;
  fileExtension: string;
  fileName: string;
  filePath?: any;
  flagIsWhiteBoardFile: boolean;
  id: number;
  isCodeFile: boolean;
  itemID: number;
  itemType: number;
  mimE_TYPE: string;
  projecType: number;
  uploadFrom: number;
}
interface attachmentList {
  attachments: Attachment[];
  isAddable: boolean;
  isDeletable: boolean;
  isDownloadable: boolean;
  isViewable: boolean;
  status: number;
}

interface Attachment {
  comment?: string;
  createdBy: number;
  downloadbleLink?: string;
  fileContentType?: any;
  fileExtension: string;
  fileName: string;
  filePath?: string;
  flagIsWhiteBoardFile: boolean;
  id: number;
  isCodeFile: boolean;
  itemID: number;
  itemType: number;
  mimE_TYPE: string;
  projecType: number;
  uploadFrom: number;
}
