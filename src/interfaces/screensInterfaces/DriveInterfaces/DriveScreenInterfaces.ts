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
  createdByName?:string;
  createdAt?:string
}

export interface RenderItemProps {
  item: Item;
  openFile: (val: Item) => void;
  checkIsDeleteable: any;
  onDeletion: (val: Item) => void;
  onDownload: (val: Item) => void;
}
export interface RenderItemPropsForHomWork {
  studentId: number | string;
  item: Item;
  tabId: any;
  tab: any;
  header:string;
  handleRerender: (value: boolean) => void;
}

export interface active {
  id: number;
  name: string;
}

export interface DriveTabsProps {
  activeTab: TabsInterface;
  setActiveTab: (tab: TabsInterface) => void;
  tabs: TabsInterface[];
  radius?: number;
  getHomeWorks: any;
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
export interface DriveStudentRenderItemInterface {
  item: ItemStudent;
  props: any;
  header:string
}

type SubTab = {
  name: string;
  id: string;
  icon: {
    type: string;
    name: string;
  };
  attachmentDetails: {
    folderName: string;
    folderType: string;
  };
};

export interface TabsInterface {
  id: number;
  name: string;
  icon: {
    type: string;
    name: string;
  };
  subTabs: SubTab[];
}
