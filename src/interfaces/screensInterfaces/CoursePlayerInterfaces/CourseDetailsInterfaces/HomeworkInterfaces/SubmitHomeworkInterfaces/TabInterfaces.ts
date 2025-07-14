export interface TabInterface {
  ChallengeId: string;
  Description: string;
  data: Data;
  instructorFeedback: string;
  navigation?: any;
  parentFeedback: string;
  style: Style;
  updateFunction?: any;
  user: string;
}

interface Style {
  height: string;
}

interface Data {
  attachments?: any;
  backlogId?: any;
  description: string;
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
  userId: number;
}
