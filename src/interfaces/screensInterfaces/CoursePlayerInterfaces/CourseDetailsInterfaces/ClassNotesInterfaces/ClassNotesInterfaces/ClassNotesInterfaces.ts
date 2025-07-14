export interface ClassNotesPropsInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path: string;
}

interface Params {
  CourseId: number;
  ProjectId: string;
  backTo: string;
  classId: number;
}

export interface ClassNotesListInterface {
  chatViewUrl?: any;
  recordingViewUrl?: any;
  notesBacklogId?: any;
  updateDateString?: any;
  description?: any;
  updateDate?: any;
  meetingId?: number;
  createdDateString?: any;
  updateByName: string;
  updatedBy?: any;
  createdByName: string;
  createdBy: number;
  title: string;
  id: number;
  createDate: string;
  isMeetingData: boolean;
  recordingId: string;
  imageUrl: string;
  date: string;
  time: string;
  classId: number;
  courseName?: any;
  className: string;
  playBackUrl: string;
  isZoomRecording: boolean;
}

export interface GetNotesDetialInterace {
  type: string;
  data: Data;
}

interface Data {
  notesDescription: NotesDescription;
  notesAttachment: NotesAttachment;
  status: number;
}

interface NotesAttachment {
  isViewable: boolean;
  isDownloadable: boolean;
  isDeletable: boolean;
  isAddable: boolean;
  attachments: any[];
}

interface NotesDescription {
  id: number;
  title: string;
  description?: any;
  classId: number;
  notesBacklogId?: any;
}
