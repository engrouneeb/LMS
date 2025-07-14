export interface AdminListInterface {
  Obj: Obj;
  getCourseDetails: any;
  index: number;
  permission?: Permission | null;
  findColor: (val: number) => string;
  downloadDocsRef?: any;
  setIsLoadingRecords: (val: boolean) => void;
  setAlertMessage: (val: string) => void;
  setAlertTitle: (val: string) => void;
  setShowAlert: (val: boolean) => void;
}

interface Permission {
  create: boolean;
  delete: boolean;
  edit: boolean;
  functionId: number;
  moduleId: number;
  pageId: number;
  pageName?: any;
  selected: boolean;
  view: boolean;
}

interface Obj {
  chatViewUrl?: any;
  classId: number;
  className: string;
  courseName?: any;
  createDate: string;
  createdBy: number;
  createdByName: string;
  createdDateString?: any;
  date: string;
  description?: any;
  id: number;
  imageUrl: string;
  isMeetingData: boolean;
  meetingId?: any;
  notesBacklogId?: any;
  playBackUrl: string;
  recordingId: string;
  recordingViewUrl?: any;
  time: string;
  title: string;
  updateByName: string;
  updateDate?: any;
  updateDateString?: any;
  updatedBy?: any;
}
