export interface tab_Interface {
  currentScreenIndex: number;
  i: number;
  routes: Route[];
  onPress: any;
}

interface Route {
  backlogColumnName: number;
  key: string;
  label: string;
  title: string;
}
