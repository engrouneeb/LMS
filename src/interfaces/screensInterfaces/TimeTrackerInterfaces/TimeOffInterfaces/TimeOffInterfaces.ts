export interface TimeOffInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path: any;
}

interface Params {
  userId: number;
  syncDate: any;
}
