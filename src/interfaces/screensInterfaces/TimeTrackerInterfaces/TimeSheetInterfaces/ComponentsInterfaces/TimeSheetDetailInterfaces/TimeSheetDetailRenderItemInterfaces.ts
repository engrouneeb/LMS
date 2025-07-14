export interface TimeSheetDetailRenderItemInterface {
  Obj: Obj;
  handleComments: (txt: any, obj: any) => void;
  handleHours: (txt: any, obj: any) => void;
  timeSheetDetial: TimeSheetDetial;
  txtInptRef: any;
}

interface TimeSheetDetial {
  AddCommentsHere: string;
  AddHr: string;
  Error: string;
  LoggedHr: string;
  Okay: string;
  PleaseEnterSomeDataPleaseTryAgain: string;
  Retry: string;
  Submit: string;
  Success: string;
  TimeSheetDetial: string;
  TimeSheetHoursIsLogedSuccessfully: string;
  TotelHr: string;
}

interface Obj {
  color: string;
  comments: string;
  date: number;
  day: string;
  time: number;
}
