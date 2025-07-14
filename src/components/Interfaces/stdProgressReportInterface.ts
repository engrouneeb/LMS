export interface stdProgressReportInterface {
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
  courseId?: any;
  goBackScreen: string;
  header: string;
  isFromStd: boolean;
  parentgoBackScreen: string;
  studentId: number;
  studentName: string;
}
