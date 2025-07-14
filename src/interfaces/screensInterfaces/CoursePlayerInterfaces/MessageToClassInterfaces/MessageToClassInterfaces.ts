export interface MessageToClassInterface {
  navigation?: any;
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: string;
}

interface Params {
  backTo: string;
  classId: number;
  classImage: string;
  className: string;
  nummerOfStudent?: string;
}
