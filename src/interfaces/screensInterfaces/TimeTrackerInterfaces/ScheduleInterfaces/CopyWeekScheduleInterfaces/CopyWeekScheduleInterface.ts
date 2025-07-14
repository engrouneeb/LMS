export interface CopyWeekScheduleInterface {
  changeModalState: (ms: boolean) => void;
  fetchData: () => void;
  selectedWeekEndDate: string;
  selectedWeekStartDate: string;
  showModal: boolean;
  userID: number;
}
