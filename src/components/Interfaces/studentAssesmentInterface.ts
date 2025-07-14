export interface studentAssesmentInterface {
  navigation: any;
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path: any;
}

interface Params {
  goBackScreen: string;
  stdId: number;
  stdName: string;
  isFromStudentAssessment?: any;
  assessmentId?: any;
}
