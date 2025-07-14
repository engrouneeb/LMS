export interface AzureAudioInterface {
  route?: Route;
  isCompleted?: any;
  isPreviousStep: any;
  isNextStep: any;
  role?: string;
  header?: any;
  mediaFileUrl?: any;
  // updateLocalStep?: any;
  stepId?: any;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  header: string;
  isAudio: boolean;
  isCompleted: boolean;
  isNextStep: boolean;
  isPreviousStep: boolean;
  mediaFileUrl: string;
  navigateToNextScreen: any;
  nextStep: string;
  previousStep: string;
  role: string;
  stepId: number;
  stepType: number;
  updateLocalStep: any;
}
