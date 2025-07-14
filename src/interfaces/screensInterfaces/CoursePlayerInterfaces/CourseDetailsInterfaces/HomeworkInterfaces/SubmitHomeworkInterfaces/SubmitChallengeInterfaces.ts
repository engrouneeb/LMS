export interface SubmitChallengeInterface {
  navigation?: any;
  route: Route;
  user?: any;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  data?: any;
  description: string;
  homeWorkId: number;
  homeworkAssignmentId: number;
  instructorFeedback: string;
  isFromHomework: boolean;
  parentFeedback: string;
  updateParent?: any;
  ChallengeId?: any;
}
