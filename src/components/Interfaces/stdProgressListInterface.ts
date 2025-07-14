export interface stdProgressListInterface {
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
  header: string;
  studentId: number;
  studentName: string;
}
