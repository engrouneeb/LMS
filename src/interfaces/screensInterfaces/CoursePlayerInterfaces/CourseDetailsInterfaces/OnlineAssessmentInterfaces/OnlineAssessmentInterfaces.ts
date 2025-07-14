export interface OnlineAssesmentInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  assessmentID: number;
  header: string;
  isFromStudentAssessment: boolean;
  stepId?: any;
  stepType?: any;
  isCompleted?: any;
  navigateToNextScreen?: any;
  previousStep?: any;
  isPreviousStep?: boolean;
  nextStep?: any;
  isNextStep?: boolean;
  role?: any;
}
