export interface StepsInterface {
  challengeSteps: ChallengeStep[];
  isActive: boolean;
  loader: any;
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
  header: string;
  role: string;
}

interface ChallengeStep {
  id: number;
  isCompleted: boolean;
  isOfflineAssessment: boolean;
  name: string;
  parentId: number;
  type: number;
}
