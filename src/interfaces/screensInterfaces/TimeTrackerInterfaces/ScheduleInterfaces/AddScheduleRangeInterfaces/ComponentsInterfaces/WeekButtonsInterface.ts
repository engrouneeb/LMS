type dayType = {
  day: string;
  key: string;
};
export interface WeekButtonsInterface {
  _existingDay: string | undefined;
  day: dayType;
  index: number;
  handleDaySelection: (ind: number, day: dayType) => void;
}
