export interface studentAdminListInterface {
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
  isFromStudentProgress: boolean;
}
