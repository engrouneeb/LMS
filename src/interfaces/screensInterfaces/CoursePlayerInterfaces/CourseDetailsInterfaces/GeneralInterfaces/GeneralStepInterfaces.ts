export interface GeneralStepInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  description: string;
  isCompleted: boolean;
  isNextStep: boolean;
  isPreviousStep: boolean;
  navigateToNextScreen: any;
  nextStep: string;
  previousStep: string;
  role: string;
  stepId: number;
  title: string;
  updateLocalStep: any;
}
