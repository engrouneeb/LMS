export interface TimeSheetDetailInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path: any;
}

interface Params {
  timeSheet: any;
  wStart: string;
}
