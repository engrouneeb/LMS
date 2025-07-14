export interface RenderTabIconPropsInterface {
  color: string;
  focused: boolean;
  route: Route;
}

export interface Route {
  icon: string;
  key: string;
  title: string;
  type: string;
}

export interface HomeworkRoutesInterface {
  icon: string;
  key: string;
  title: string;
  type: string;
}
