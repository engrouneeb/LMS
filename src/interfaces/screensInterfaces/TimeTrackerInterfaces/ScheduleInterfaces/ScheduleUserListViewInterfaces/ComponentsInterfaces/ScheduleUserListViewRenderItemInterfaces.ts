export interface ScheduleUserListViewRenderItemInterface {
  index: number;
  onPress: (id: any) => void;
  user: User;
  weekDaysShort: any;
}

interface User {
  fName: string;
  lName: string;
  schedule: any;
  userID: number;
}
