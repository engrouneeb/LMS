interface selectedInstructorInterface {
  text: string;
  value: number;
}

interface selectedWageInterface {
  effectiveDate?: any;
  effectiveDateString?: string;
  fixHours: number;
  isDeleteAbleWage?: boolean;
  isForAllTimeCards?: any;
  itemName: string;
  userID: number;
  wageFrom: number;
  wageID: number;
  wageRate?: number;
  wageType?: string;
  wagesCount: number;
}
export interface SelecteInstructorModalChangeBtnInterface {
  selectedInstructor: selectedInstructorInterface | null;
  selectedWage?: selectedWageInterface;
  loading: boolean;
  changeInstructor: () => void;
}
