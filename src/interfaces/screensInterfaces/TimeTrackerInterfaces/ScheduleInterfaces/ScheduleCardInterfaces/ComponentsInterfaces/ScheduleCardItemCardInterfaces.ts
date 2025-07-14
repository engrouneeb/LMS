export interface ScheduleCardItemCardInterface {
  changeModalState: any;
  dates: any;
  index: number;
  schedule: Schedule[];
  setEditingEnable: () => void;
  userName: string;
  show: any;
  setShowRecoverModal: any;
  setIndexVal: any;
}
interface Schedule {
  checkIn: string;
  daySchedules: any;
  timeOffs: any;
}
