export interface attendanceInterface {
  navigation?: any;
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  refresh: boolean;
}
