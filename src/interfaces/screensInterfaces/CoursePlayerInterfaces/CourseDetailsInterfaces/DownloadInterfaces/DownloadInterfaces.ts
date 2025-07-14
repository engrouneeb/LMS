export interface DownloadInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  isNextStep: boolean;
  isPreviousStep: boolean;
  navigateToNextScreen: any;
  nextStep: string;
  previousStep: string;
  role: string;
  stepId: number;
  stepType: number;
  title: string;
  updateLocalStep: any;
}
export interface GetChallengeStepsInterface {
  data: responseData;
}
interface responseData {
  id: number;
  stepType: number;
  stepInfo?: any;
  stepData: string;
  assesmentId: number;
  assignmentId: number;
  assesmentType: number;
  challengeId: number;
  homeWorkId?: any;
  mediaFileUrl: string;
  mediaFileName: string;
  mediaUploadOption: 1 | 2 | 3;
  isCompleted: boolean;
  secureVideoId?: any;
  isEncrypted?: any;
  base64URL: string;
  assessmentDetail?: any;
  offlineAssessmentDetail: OfflineAssessmentDetail;
  status: number;
}

interface OfflineAssessmentDetail {
  offlineTemplateId: number;
  offlineTemplateName?: any;
  assessmentTopics: any[];
  assessmentColumns?: any;
}
