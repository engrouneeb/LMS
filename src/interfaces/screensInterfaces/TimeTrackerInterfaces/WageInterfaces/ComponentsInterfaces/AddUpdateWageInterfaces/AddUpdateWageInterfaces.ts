export interface AddUpdateWageInterface {
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
  UserId: number;
  type: string;
  wagesObject: any;
  selectedWage: any;
}
