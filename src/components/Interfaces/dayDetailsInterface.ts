export interface dayDetailInterface {
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
  classIds: string;
  selectedDay: string;
}
