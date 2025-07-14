export interface TimeTrackerCounterInterface {
  item: itemInterface;
  sumOfBadges: number;
  timeTrackerScreen: timeTrackerScreenInterface;
}
interface itemInterface {
  title: string;
}

interface timeTrackerScreenInterface {
  timeTracker: string;
  Schedule: string;
  Timesheet: string;
  TimeOff: string;
  Wages: string;
  Requests: string;
  Setup: string;
  ViewSummary: string;
  menuList: MenuList[];
  adminList: MenuList[];
}

interface MenuList {
  title: string;
}
