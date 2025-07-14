export interface HtmlChallengeInterface {
  route: Route;
  title?: string;
  changeVisibleState?: any;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  header: string;
  isNextStep: boolean;
  isPreviousStep: boolean;
  navigateToNextScreen: any;
  nextStep: string;
  previousStep: string;
  role: string;
  stepId: number;
  stepType: number;
  updateLocalStep: any;
}
