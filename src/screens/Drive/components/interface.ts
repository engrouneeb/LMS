export interface Item {
  comment?: string;
  createdBy: number;
  downloadbleLink?: string | null;
  fileContentType?: string | null;
  fileExtension?: string;
  fileName: string;
  filePath: string;
  flagIsWhiteBoardFile: boolean;
  id: number;
  isCodeFile?: boolean;
  itemID: number;
  itemType?: number;
  mimE_TYPE?: string;
  projecType?: number;
  uploadFrom?: number;
  base64URL?: string | null;
}

export interface RenderItemProps {
  item: Item;
  openFile: (val: Item) => void;
  checkIsDeleteable: any;
  onDeletion: (val: Item) => void;
  onDownload: (val: Item) => void;
}

export interface active {
  id: number;
  name: string;
}

export interface DriveTabsProps {
  activeTab: active;
  setActiveTab: (tab: active) => void;
  tabs: any;
  radius?: number;
}
export interface ItemStudent {
  familyGuid?: string | null;
  familyName?: string;
  imageURL?: string;
  studentAge?: string | null;
  studentId?: number;
  studentName: string;
  role?: string;
}
