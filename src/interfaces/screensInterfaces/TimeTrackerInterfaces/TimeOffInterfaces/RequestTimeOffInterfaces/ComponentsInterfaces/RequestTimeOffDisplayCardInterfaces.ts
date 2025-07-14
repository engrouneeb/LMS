export interface RequestTimeOffDisplayCardInterface {
  element: Element;
  isTimeOff: boolean;
  selectedDay: any;
  timeOffComment: string;
  timings: string;
  onPress: () => void;
  onPressDelete: () => void;
}

interface Element {
  userID: number;
  userImage: string;
  userName: string;
  weekDays: any;
  weekEndDate: string;
  weekStartDate: string;
}
