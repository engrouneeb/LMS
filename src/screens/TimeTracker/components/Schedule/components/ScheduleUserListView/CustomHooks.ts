interface userSortArg {
  fName: string;
  lName: string;
  userID: number;
  schedule: Schedule[];
}

interface Schedule {
  todaySchedule: boolean;
  todayCheckIn: string;
  todayCheckOut: string;
  daySchedules: any[];
}

export const useSort = (a: userSortArg, b: userSortArg) => {
  if (a.fName < b.fName) return -1;
  if (a.fName > b.fName) return 1;
  return 0;
};
