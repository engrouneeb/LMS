export interface TimeTrackerRenderItemInterface {
  index: number;
  item: Item;
  onPressCard: any;
  sumOfBadges: number;
  timeTrackerScreen: TimeTrackerScreen;
}

interface TimeTrackerScreen {
  Requests: string;
  Schedule: string;
  Setup: string;
  TimeOff: string;
  Timesheet: string;
  ViewSummary: string;
  Wages: string;
  adminList: any;
  menuList: any;
  timeTracker: string;
}

interface Item {
  title: string;
}
