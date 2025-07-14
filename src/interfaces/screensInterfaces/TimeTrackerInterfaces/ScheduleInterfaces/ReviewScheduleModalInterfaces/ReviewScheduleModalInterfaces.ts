export interface ReviewScheduleModalInterface {
  modalVisible: boolean;
  onSelect: (ind: any) => void;
  publishSchedule: () => void;
  selectedWeekEndDate: string;
  selectedWeekStartDate: string;
  setModalVisible: any;
  totalShifts: number;
}
