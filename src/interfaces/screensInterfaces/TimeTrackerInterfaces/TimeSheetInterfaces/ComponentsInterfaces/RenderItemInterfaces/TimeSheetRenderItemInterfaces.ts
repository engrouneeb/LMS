export interface TimeSheetRenderItemInterface {
  isAddTimesheet:boolean
  Obj: Obj;
  btnDisabled: boolean;
  onCardPress: () => void;
  onCheckBoxPress: () => void;
  selectedSheets: any;
  userRole: any;
  aprrovers: any;
  setModal: () => void;
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
