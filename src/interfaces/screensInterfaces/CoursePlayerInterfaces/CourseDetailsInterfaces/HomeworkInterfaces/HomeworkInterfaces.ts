export interface HomeWorkInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path: any;
}

interface Params {
  challengeId: number;
  homeWorkId: number;
  isNextStep: boolean;
  isPreviousStep: boolean;
  navigateToNextScreen: any;
  nextStep: string;
  previousStep: string;
  stepId: number;
}
