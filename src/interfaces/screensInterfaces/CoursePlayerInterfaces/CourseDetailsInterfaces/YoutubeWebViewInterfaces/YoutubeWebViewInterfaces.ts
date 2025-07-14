export interface YoutubeWebViewInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  header: string;
  isCompleted: boolean;
  isNextStep: boolean;
  isPreviousStep: boolean;
  mediaFileUrl: string;
  navigateToNextScreen: any;
  nextStep: string;
  previousStep: string;
  stepId: number;
  stepType: string;
  updateLocalStep: any;
}
