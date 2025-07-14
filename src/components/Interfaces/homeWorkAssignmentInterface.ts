export interface homeWorkAssignmentInterface {
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
  header: string;
  parentgoBackScreen: string;
  studentId: number;
  studentName: string;
}
