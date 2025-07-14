export interface NoteDetialsInterface {
  route: {
    params: ParamsInterface;
  };
}

interface ParamsInterface {
  discription: Discription;
  downloads: Downloads;
  header: string;
}

interface Downloads {
  attachments: any[];
  isAddable: boolean;
  isDeletable: boolean;
  isDownloadable: boolean;
  isViewable: boolean;
}

interface Discription {
  classId: number;
  description?: any;
  id: number;
  notesBacklogId?: any;
  title: string;
}
