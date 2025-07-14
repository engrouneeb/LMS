export interface ScheduleSelectInstructorModalInterface {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  DayID: number;
  DayDate: any;
  ScheduleID: number;
  Description: string;
  BgColor: string;
  StartTimeString: string;
  EndTimeString: string;
  changeModalState: () => void;
  UserID: number;
}

export interface wageInterface {
  effectiveDate?: any;
  effectiveDateString?: any;
  fixHours: number;
  isDeleteAbleWage?: any;
  isForAllTimeCards?: any;
  itemName: string;
  userID: number;
  wageFrom: number;
  wageID: number;
  wageRate?: any;
  wageType?: any;
  wagesCount: number;
}
