export interface RequestTimeOffCalendarInterface {
  current?: string;
  onDayPress: (dte: any) => void;
  onDayLongPress: (dy: any) => void;
  markedDates: any;
  onMonthChange: (mnt: any) => void;
}
