export interface studentExamnterface {
  route: Route;
  navigation: any;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path: string;
}

interface Params {
  goBackScreen: string;
  quickLinks: boolean;
  stdId: number;
}
