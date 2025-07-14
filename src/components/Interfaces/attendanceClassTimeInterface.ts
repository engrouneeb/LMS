export interface attendanceClassTimeInterface {
  navigation?: any;
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path: any;
}

interface Params {
  screenVariant: string;
}
