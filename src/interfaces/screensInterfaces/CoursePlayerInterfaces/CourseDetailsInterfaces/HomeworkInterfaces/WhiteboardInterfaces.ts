interface HomeworkWhiteboardDataInterface {
  attachments: any[];
  backlogId?: any;
  description?: any;
  dueDate: string;
  homeWorkID: number;
  homeWorkTitle: string;
  homeworkAssignmentId: number;
  id: number;
  instructions: string;
  instructorFeedback: string;
  isDeleted: boolean;
  modifiedDate?: any;
  parentFeedback: string;
  priority: number;
  priorityVal: string;
  stateKey: number;
  status: number;
  title: string;
  type: string;
  userId?: any;
}

export interface HomeworkWhiteboardInterface {
  data?: HomeworkWhiteboardDataInterface;
  stepId?: number;
  tabName?: string;
  isFromDrawer?: boolean;
  hideNodata?: boolean;
  userId?: number | string;
}
