export interface TimeSheetCheckUnCheckBoxInterface {
  Obj: Obj;
  onCheckBoxPress: () => void;
  selectedSheets: any;
  show: boolean;
}

interface Obj {
  image: string;
  itemName: string;
  roleName: string;
  status: string;
  tmskey: number;
  totelWeekHr: number;
  userName: string;
  week: any;
  weekStartDate: string;
}
