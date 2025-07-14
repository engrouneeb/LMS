export interface SignleScheduleWeekViewInterface {
  route: Route;
}
interface Route {
  key: string;
  name: string;
  params: Params;
  path: any;
}
interface Params {
  date: any;
  userID: number;
  weekDays: any;
}
