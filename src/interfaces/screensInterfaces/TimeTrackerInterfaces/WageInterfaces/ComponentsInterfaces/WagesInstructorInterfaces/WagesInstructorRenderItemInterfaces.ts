export interface WagesInstructorRenderItemInterface {
  WAGES_FROM: WAGESFROM[];
  WAGES_TYPE: WAGESFROM[];
  addWage: AddWage;
  changableWidth: number;
  item: Item;
  role: any;
  _onPress: () => void;
}

interface Item {
  effectiveDate: string;
  effectiveDateString?: any;
  fixHours: number;
  isDeleteAbleWage: boolean;
  isForAllTimeCards: boolean;
  itemName: string;
  userID: number;
  wageFrom: number;
  wageID: number;
  wageRate: number;
  wageType: number;
  wagesCount: number;
}

interface AddWage {
  AddWage: string;
  AlreadyExists: string;
  EffectiveDate: string;
  EnterItemName: string;
  EnterWageRate: string;
  Error: string;
  ItemName: string;
  Okay: string;
  PleaseEnterDifferentEffectiveDate: string;
  PleaseEnterItemName: string;
  PleaseEnterWageRate: string;
  PleaseSelectEffectiveDate: string;
  PleaseSelectWageFrom: string;
  PleaseSelectWageType: string;
  Select: string;
  SelectEffectiveDate: string;
  SelectWageFrom: string;
  SelectWageType: string;
  SomeThingWentWrong: string;
  Success: string;
  UpdateWage: string;
  WageAddedSuccessfully: string;
  WageFrom: string;
  WageRate: string;
  WageType: string;
  WageUpdatedSuccessfully: string;
  Wages: string;
}

interface WAGESFROM {
  key: number;
  value: string;
}
