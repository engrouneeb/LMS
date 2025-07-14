interface dataInterface {
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

export interface SelectInstructorModalWagesDropDownInterface {
  show: boolean;
  data: string[];
  onValueChange: (ind: number) => void;
}
