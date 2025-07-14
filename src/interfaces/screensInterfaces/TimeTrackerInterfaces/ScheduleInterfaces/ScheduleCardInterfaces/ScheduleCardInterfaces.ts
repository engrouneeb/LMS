export interface ScheduleCardInterface {
  changeModalState: any;
  dates: any;
  day: string;
  domainURL: string;
  index: number;
  isAdmin: boolean;
  onPress: any;
  schedule: Schedule[];
  setEditingEnable: any;
  userID: number;
  userName: string;
}

interface Schedule {
  checkIn: string;
  daySchedules: any;
  timeOffs: any;
}
