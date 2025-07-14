export interface cameraScreenInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path: undefined;
}

interface Params {
  onSend: any;
}
