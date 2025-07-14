export interface ApprovalsListModalInterface {
  approvers: any;
  modalVisible: boolean;
  onPressCallback: any;
  timeSheet: TimeSheet;
}

interface TimeSheet {
  Approvers: string;
  Close: string;
  Error: string;
  NoApproversAssigned: string;
  NoTimesheetFound: string;
  Okay: string;
  Status: string;
  Success: string;
  Timesheet: string;
  TotelHrs: string;
}
