export interface Bottom_TabInterface {
  currentScreenIndex: number;
  item: Route;
  onPress: any;
  index?: number;
}

interface Route {
  backlogColumnName: number;
  key: string;
  label: string;
  title: string;
}
